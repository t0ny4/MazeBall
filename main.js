/* SPDX-License-Identifier: 0BSD */

import './src/types';
import aleaPRNG from './src/aleaPRNG';
import global from './src/global';
import config from './src/config';
import { generateMazeData } from './src/mazegen';
import { bindControlKeys } from './src/controls';
import * as physics from './src/physics';
import * as render from './src/render';
import * as maze from './src/objects/maze';
import * as player from './src/player';
import * as debug from './src/debug';
import * as firstPerson from './src/first_person';


// override javascript builtin prng with alea, using seed if configured
Math.random = !config.randomSeed ? aleaPRNG() : aleaPRNG(config.randomSeed);

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
// maximum grid position values for the player to still be inside the current maze
// minimum values are always zero
let gMaxX, gMaxZ;

document.addEventListener("DOMContentLoaded", () => {
	loadAssets(
		[player, maze],
		setup
	);
});


/**
 * Calls the supplied function when all game assets are loaded
 * @param {Object[]} objs array of Objects with a loadAssets() method that returns a promise
 * @param {Function} callback called when all asset loading is finished
 */
async function loadAssets(objs, callback) {
	/** @type {Promise[]} */
	const promises = [];
	// set all the objects loading
	objs.forEach(obj => {
		if (typeof obj.loadAssets == 'function') {
			const ret = obj.loadAssets();
			if (ret instanceof Promise) {
				promises.push(ret);
			} else {
				console.warn(obj, 'loadAssets() did not return a promise, it returned', ret);
			}
		} else {
			console.warn(obj, 'has no loadAssets method');
		}
	});
	// now wait for them all to finish
	for (let i = 0; i < promises.length; i++) {
		try {
			await promises[i];
		} catch (e) {
			console.warn('loadAssets():', e);
		}
	}
	// all the loadAsset promises have returned
	callback();
}


function setup() {
	// physics & render must come first (in either order)
	physics.setup();
	render.setup();
	// the rest of the setup functions come next in any order
	maze.setup();
	player.setup();
	bindControlKeys();
	debug.setup();
	firstPerson.setup();
	// now everything is set up, start the game loop
	requestAnimationFrame(game_loop);
}


function game_loop() {

	// assume that some change in this loop will require an update to the 3D scene
	let renderRequired = true;

	switch (gGameState) {

		case GameStates.init: {
			const mazeData = generateMazeData(gLevel);
			gMaxX = mazeData.size.x - 1;
			gMaxZ = mazeData.size.z - 1;
			maze.create(mazeData);
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
			// check to see if we are outside the maze
			const p = player.getGridPosition();
			if (p.x < 0 || p.x > gMaxX || p.z < 0 || p.z > gMaxZ) {
				gLevel++;
				global.mazeExited = true;
				gGameState = GameStates.fadeOut;
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
			setTimeout(() => {gGameState = GameStates.init;}, 800);
			gGameState = GameStates.idle;
		break;

		case GameStates.idle:
			// nothing to do but wait
		break;

		default:
			console.log('game_loop(): Unknown game state: ' +  gGameState);
			gGameState = GameStates.pause;
		break;
	}

	// enables render update if orbit controls are active
	renderRequired |= debug.update();

	physics.update();

	render.update(renderRequired);

	requestAnimationFrame(game_loop);
}
