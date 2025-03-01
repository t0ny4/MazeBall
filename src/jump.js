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


function loadAssets() {
	addAssets(config.jumpSounds);
}


/**
 * @param {ObjectWithPosition} player
 */
function setup(player) {

	// this will always be the player's vertical position when not jumping

	gInitialPlayerY = player.position.y;

	setKeyHandler('jump', () => {
		if (!gIsJumping) {
			gIsJumping = true;
			const mazeGrid = getPlayerGridInfo();
			// limit jump height when under a teleporter arch
			if (mazeGrid.type === 'T') {
				gMaxJump = 0.5;
			} else {
				gMaxJump = (global.firstPersonModeActive) ? 1.2 : 0.6;
			}
			gJumpProgress = -1;
			gFirstPersonAtStart = global.firstPersonModeActive;
			if (gFirstPersonAtStart) {
				gInitialCameraY = global.camera.position.y;
			}
			gInitialLightY = global.playerLight.position.y;
			play('jump');
		}
	});
}


/**
 * update player position if jumping
 * @param {ObjectWithPosition} player
 * @returns {Boolean} true if player was jumping when called
 */
function update(player) {

	if (!gIsJumping) {
		return false;
	}

	// abort if view mode switched mid-jump
	if (global.firstPersonModeActive !== gFirstPersonAtStart) {
		// mode switch will have changed camera, so forget saved position
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

	if (global.firstPersonModeActive) {
		global.camera.position.y = gInitialCameraY + deltaY;
	}
	player.position.y = gInitialPlayerY + deltaY;
	global.playerLight.position.y = gInitialLightY + deltaY;
	return true;
}


/**
 * @param {ObjectWithPosition} player
 */
function reset(player) {
	player.position.y = gInitialPlayerY;
	if (gInitialLightY !== null) {
		global.playerLight.position.y = gInitialLightY;
		gInitialLightY = null;
	}
	if (gInitialCameraY !== null) {
		if (global.firstPersonModeActive) {
			global.camera.position.y = gInitialCameraY;
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
