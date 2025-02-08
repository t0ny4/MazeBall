/* SPDX-License-Identifier: 0BSD */

import './src/types';
import aleaPRNG from './src/aleaPRNG';
import global from './src/global';
import config from './src/config';
import { loadAssets, makeErrorMesh, makeErrorTexture } from './src/utils';
import { generateMazeData } from './src/mazegen';
import { bindControlKeys } from './src/controls';
import * as status from './src/status';
import * as physics from './src/physics';
import * as render from './src/render';
import * as maze from './src/objects/maze';
import * as key from './src/objects/key';
import * as player from './src/player';
import * as debug from './src/debug';
import * as firstPerson from './src/first_person';
import * as sounds from './src/sounds';


// override javascript builtin prng with alea, using seed if configured
Math.random = !config.randomSeed ? aleaPRNG() : aleaPRNG(config.randomSeed);

// fallback assets in case of loading errors
global.errorTexture = makeErrorTexture();
global.errorMesh = makeErrorMesh();

const GameStates = Object.freeze({
	init: 0,
	fadeIn: 1,
	play: 2,
	fadeOut: 3,
	pause: 4,
	idle: 5,
});

let gLevel = 1;
let gGameState = GameStates.init;
let gStatusHeight = 0;

document.addEventListener('DOMContentLoaded', () => {
	gStatusHeight = status.setup();
	status.message('Loading...');
	loadAssets(
		// sounds must come last
		[player, maze, key, sounds],
		setup
	);
});


function setup() {
	// physics & render must come first (in either order)
	physics.setup();
	render.setup(window.innerWidth, window.innerHeight - gStatusHeight);
	// next comes maze
	maze.setup();
	// the rest of the setup functions come next in any order
	player.setup(maze.updatePlayerPosition);
	key.setup();
	bindControlKeys();
	debug.setup();
	firstPerson.setup();
	sounds.setup();
	// now everything is set up, start the game loop
	requestAnimationFrame(game_loop);
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
				gGameState = GameStates.pause;
			}
		break;

		case GameStates.pause:
			// insert a short delay before changing to the next level
			setTimeout(() => { gGameState = GameStates.init; }, 800);
			gGameState = GameStates.idle;
		break;

		case GameStates.idle:
			// nothing to do but wait
		break;

		default:
			console.log('game_loop(): Unknown game state: ' + gGameState);
			gGameState = GameStates.pause;
		break;
	}

	// enables render update if orbit controls are active
	renderRequired |= debug.update();

	physics.update();

	render.update(renderRequired);

	requestAnimationFrame(game_loop);
}
