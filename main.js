/* SPDX-License-Identifier: 0BSD */

import './src/types';
import * as THREE from 'three';
import aleaPRNG from './src/aleaPRNG';
import global from './src/global';
import config from './src/config';
import { generateMazeData } from './src/mazegen';
import { bindControlKeys } from './src/controls';
import * as physics from './src/physics';
import * as render from './src/render';
import * as maze from './src/objects/maze';
import * as key from './src/objects/key';
import * as player from './src/player';
import * as debug from './src/debug';
import * as firstPerson from './src/first_person';


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

document.addEventListener("DOMContentLoaded", () => {
	loadAssets(
		[player, maze, key],
		setup
	);
});


/**
 * Calls the supplied function when all game assets are loaded
 * @param {Object[]} objs array of Objects with a loadAssets() method
 * @param {Function} callback called when all asset loading is finished
 */
function loadAssets(objs, callback) {

	let initDone = false;
	let hadErrors = false;

	const manager = new THREE.LoadingManager();

	manager.onError = (name) => {
		console.warn('Failed to load asset:', name);
		hadErrors = true;
	};

	//manager.onProgress = function(url, itemsLoaded, itemsTotal) {
	//	console.log('Loading asset file: ' + url + ' [' + itemsLoaded + ' of ' + itemsTotal + ']');
	//};

	manager.onLoad = () => {
		if (!initDone) {
			return;
		}
		if (hadErrors) {
			console.error('LoadingManager: finished loading asset files with errors');
		}
		callback();
	};

	objs.forEach(obj => {
		if (typeof obj.loadAssets == 'function') {
			obj.loadAssets(manager);
		} else {
			console.warn(obj, 'has no loadAssets method');
		}
	});

	initDone = true;
}


function setup() {
	// physics & render must come first (in either order)
	physics.setup();
	render.setup();
	// next comes maze
	maze.setup();
	// the rest of the setup functions come next in any order
	player.setup(maze.updatePlayerPosition);
	key.setup();
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
			maze.create(mazeData);
			key.create(mazeData);
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
			const p = maze.getPlayerGridInfo();
			if (p.type === 'O') {
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


/**
 * @returns {THREE.Texture}
 */
function makeErrorTexture() {

	const side = 16;
	const size = side * side * 4;
	const data = new Uint8Array(size);

	for (let i = 0; i < size; i += 4) {
		data[i]     = 0xff;
		data[i + 1] = 0x69;
		data[i + 2] = 0xb4;
		data[i + 3] = 0xff;
	}

	const texture = new THREE.DataTexture(data, side, side);
	texture.needsUpdate = true;
	return texture;
}


/**
 * @returns {THREE.Mesh}
 */
function makeErrorMesh() {
	const errorGeometry = new THREE.SphereGeometry(0.1);
	const errorMaterial = new THREE.MeshBasicMaterial({color: 0xff69b4});
	return new THREE.Mesh(errorGeometry, errorMaterial);
}
