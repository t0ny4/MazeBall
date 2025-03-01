/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { setKeyHandler } from './controls';
import global from './global';
import config from './config';
import * as player from './player';


/** @type {Boolean} */
let gHouseLightsActive = false;
/** @type {OrbitControls} */
let gControls;
/** @type {THREE.AmbientLight} */
let gHouseLights;
/** @type {Number} */
let gCameraYpos;
/** @type {Stats} */
let gStats;
/** @type {THREE.Camera} */
let gCamera;
/** @type {THREE.Scene} */
let gScene;


function setup() {

	gCamera = global.camera;
	gScene = global.scene;

	gStats = new Stats();
	document.body.appendChild(gStats.dom);

	setKeyHandler('orbit_controls', keyHandlerControls);
	setKeyHandler('house_lights', keyHandlerLight);

	gControls = new OrbitControls(gCamera, global.renderer.domElement);
	gControls.enableDamping = true;
	gControls.enabled = false;
	gControls.minPolarAngle = 0.02;
	gControls.maxPolarAngle = Math.PI - 0.05;

	gHouseLights = new THREE.AmbientLight(0xcccccc, 1);
	gHouseLights.intensity = 0;
	gScene.add(gHouseLights);
}


/**
 * function to be called in the main game loop
 * @returns {boolean} true if debug needs a render update
 */
function update() {
	if (gStats) {
		gStats.update();
	}
	if (gControls.enabled) {
		gControls.update();
		return true;
	}
	return false;
}


function keyHandlerControls() {

	if (global.firstPersonModeActive) {
		console.log('Cannot activate orbit controls while in first person view');
		return;
	}

	gControls.enabled = !gControls.enabled;
	global.orbitControlsEnabled = gControls.enabled;

	const playerPos = player.getPosition();
	if (gControls.enabled) {
		console.log('Orbit controls enabled');
		gCameraYpos = gCamera.position.y;
		gControls.target.set(playerPos.x, playerPos.y, playerPos.z);
	} else {
		console.log('Orbit controls disabled');
		gCamera.position.set(playerPos.x, gCameraYpos, playerPos.z);
		gCamera.rotation.set(3 * Math.PI / 2, 0, 0);
		global.renderUpdate();
	}
}


function keyHandlerLight() {

	gHouseLightsActive = !gHouseLightsActive;

	if (gHouseLightsActive) {
		gHouseLights.intensity = 1.0;
		gScene.fog = null;
		console.log('House lights up');
	} else {
		gHouseLights.intensity = 0;
		gScene.fog = global.fog;
		console.log('House lights down');
	}

	global.renderUpdate();
}


/**
 * call after resetting the player position when starting a new maze
 */
function reset() {
	if (gControls) {
		gControls.target.set(
			gCamera.position.x,
			config.ballRadius,
			gCamera.position.z
		);
	}
}


const _MODULE = 'debug.js';


export {
	_MODULE,
	reset,
	setup,
	update,
};
