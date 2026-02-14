/* SPDX-License-Identifier: 0BSD */

import aleaPRNG from './src/aleaPRNG';
import global from './src/global';
import config from './src/config';
import { loadAssets, makeErrorMesh, makeErrorTexture } from './src/utils';
import { generateMazeData } from './src/mazegen';
import * as status from './src/status';
import * as physics from './src/physics';
import * as render from './src/render';
import * as controls from './src/controls';
import * as debug from './src/debug';
import * as firstPerson from './src/first_person';
import * as key from './src/objects/key';
import * as maze from './src/objects/maze';
import * as player from './src/player';
import * as sounds from './src/sounds';
import * as minimap from './src/minimap';


// override javascript builtin prng with alea, using seed if configured
Math.random = !config.randomSeed ? aleaPRNG() : aleaPRNG(config.randomSeed);

// fallback assets in case of loading errors
global.errorTexture = makeErrorTexture();
global.errorMesh = makeErrorMesh();

/**
 * @readonly
 * @enum {number}
 */
const GameStates = Object.freeze({
	init: 0,
	fadeIn: 1,
	play: 2,
	fadeOut: 3,
	delay: 4,
});

let gLevel = 1;
/** @type {GameStates} */
let gGameState = GameStates.init;

// calling setup() from within THREE.LoadingManager's onLoad() causes problems with
// error handling, so let onLoad() resolve a Promise and await on the Promise instead.
const {promise, resolve} = Promise.withResolvers();

document.addEventListener('DOMContentLoaded', () => {
	status.setup();
	status.message('Loading...');
	loadAssets(
		// sounds must come last
		[player, maze, key, sounds],
		resolve
	);
});

// wait here until loadAssets() has completed
await promise;
setup();
requestAnimationFrame(game_loop);


/**
 * call the setup() method on all modules that require it, then initiate the game loop
 */
function setup() {
	// physics & render must come first (in either order)
	physics.setup();
	render.setup();
	// the rest of the setup methods can now be called in (almost) any order
	// debug, firstPerson, minimap, key & sounds can be commented out to disable their functionality
	controls.setup();
	debug.setup();
	firstPerson.setup();
	minimap.setup();
	maze.setup();
	key.setup(); // cannot be called before maze.setup() [requires global.exitLight]
	player.setup(maze.updatePlayerPosition);
	sounds.setup();
}


function game_loop() {

	// assume that some change in this loop will require an update to the 3D scene
	let renderRequired = true;

	switch (gGameState) {

		case GameStates.init: {
			status.setLevel(gLevel);
			const mazeSeed = Math.random().toString().substring(2);
			const dimension = 5 + (gLevel * 2);
			const mazeData = generateMazeData(dimension, dimension, mazeSeed);
			maze.create(mazeData);
			key.create(mazeData);
			// console.log(mazeData.seed, mazeData.size, mazeData.keyIndex);
			player.setNewMaze(mazeData);
			debug.reset();
			gGameState = GameStates.fadeIn;
		}
		break;

		case GameStates.fadeIn:
			if (render.fadeIn()) {
				gGameState = GameStates.play;
			}
		break;

		case GameStates.play: {
			// this is the only call that can set renderRequired to false
			renderRequired = player.update();
			// every subsequent update to renderRequired must be OR'd so it can only
			// change from false to true
			renderRequired |= firstPerson.update();
			renderRequired |= key.update();
			renderRequired |= maze.update();
			// check to see if we are outside the maze
			const p = maze.getPlayerGridInfo();
			if (p.type === 'O') {
				gLevel++;
				global.mazeExited = true;
				gGameState = GameStates.fadeOut;
				sounds.playFromGroup('mazeExit');
			}
		}
		break;

		case GameStates.fadeOut:
			// calling update() allows the player object to keep moving after exiting the maze
			player.update();
			if (render.fadeOut()) {
				gGameState = GameStates.delay;
			}
		break;

		case GameStates.delay:
			// insert a short delay before restarting game_loop on the next level
			setTimeout(() => { gGameState = GameStates.init; requestAnimationFrame(game_loop); }, 800);
			return;

		default:
			console.log('game_loop(): Unknown game state: ' + gGameState);
			gGameState = GameStates.pause;
		break;
	}

	// enables render update if orbit controls are active
	renderRequired |= debug.update();

	physics.update();

	if (render.update(renderRequired)) {
		minimap.update();
	}

	requestAnimationFrame(game_loop);
}
