/* SPDX-License-Identifier: 0BSD */

import './types';
import global from './global';
import config from './config';
import { setKeyHandler } from './controls';
import { getPlayerGridInfo } from './objects/maze';
import { addAssets, play } from './sounds';


/** @type {Number} */
let gMaxJump = 1;
/** @type {Number} -1 to +1 */
let gJumpProgress = -1;
/** @type {Number} */
let gInitialPlayerY;
/** @type {Number | null} */
let gInitialCameraY = null;
/** @type {Number | null} */
let gInitialLightY = null;
/** @type {Boolean} */
let gIsJumping = false;
/** @type {Boolean} */
let gFirstPersonAtStart = false;
/** @type {THREE.Camera} */
let gCamera;
/** @type {THREE.PointLight} */
let gPlayerLight;
/** @type {Boolean} */
let gJumpKey = false;


function loadAssets() {
	addAssets(config.jumpSounds);
}


/**
 * @param {ObjectWithPosition} player
 */
function setup(player) {

	gCamera = global.camera;
	gPlayerLight = global.playerLight;

	// this will always be the player's vertical position when not jumping
	gInitialPlayerY = player.position.y;

	setKeyHandler(
		'jump',
		() => { gJumpKey = true; },
		() => { gJumpKey = false; }
	);
}


/**
 * update player position if jumping
 * @param {ObjectWithPosition} player
 * @returns {Boolean} true if player was jumping when called
 */
function update(player) {

	if (!gIsJumping && !gJumpKey) {
		return false;
	}

	const {firstPersonModeActive} = global;

	if (!gIsJumping) {
		gIsJumping = true;
		gFirstPersonAtStart = firstPersonModeActive;
		const mazeGrid = getPlayerGridInfo();
		// limit jump height when under a teleporter arch
		gMaxJump = (mazeGrid.type === 'T') ? 0.5 : 1.1;
		gJumpProgress = -1;
		if (gFirstPersonAtStart) {
			gInitialCameraY = gCamera.position.y;
		}
		gInitialLightY = gPlayerLight.position.y;
		play('jump');
	}

	// abort if view mode switched mid-jump
	if (firstPersonModeActive !== gFirstPersonAtStart) {
		// mode switch will have changed camera, so reset must ignore initial position
		gInitialCameraY = null;
		reset(player);
		return true;
	}

	gJumpProgress += 0.05;

	if (gJumpProgress > 1) {
		reset(player);
		return true;
	}

	/** @type {Number} 0 to 1 */
	const y = 1 - (gJumpProgress ** 2);
	/** @type {Number} 0 to gMaxJump */
	const deltaY = (gMaxJump * y);

	if (firstPersonModeActive) {
		// jump the camera a bit higher in first person mode, to get a better view over the walls
		gCamera.position.y = gInitialCameraY + (deltaY * 1.28);
	}

	player.position.y = gInitialPlayerY + deltaY;
	gPlayerLight.position.y = gInitialLightY + deltaY;
	return true;
}


/**
 * @param {ObjectWithPosition} player
 */
function reset(player) {
	player.position.y = gInitialPlayerY;
	if (gInitialLightY !== null) {
		gPlayerLight.position.y = gInitialLightY;
		gInitialLightY = null;
	}
	if (gInitialCameraY !== null) {
		if (global.firstPersonModeActive) {
			gCamera.position.y = gInitialCameraY;
		}
		gInitialCameraY = null;
	}
	gJumpProgress = -1;
	gIsJumping = false;
}


const _MODULE = 'jump.js';


export {
	_MODULE,
	loadAssets,
	setup,
	update,
	reset,
};
