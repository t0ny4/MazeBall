/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import Stats from 'three/addons/libs/stats.module.js';
import { OrbitControls } from 'three/addons/controls/OrbitControls';
import { setKeyHandler } from "./controls";
import global from './global';
import config from './config';
import * as player from './player';


let gHouseLightsActive = false;
let gControls, gHouseLights;
let gCameraYpos;
let gStats;


function setup() {

	gStats = new Stats()
	document.body.appendChild(gStats.dom);

	setKeyHandler('orbit_controls', keyHandlerControls);
	setKeyHandler('house_lights', keyHandlerLight);

	gControls = new OrbitControls(global.camera, global.renderer.domElement);
	gControls.enableDamping = true;
	gControls.enabled = false;
	gControls.minPolarAngle = 0.02;
	gControls.maxPolarAngle = Math.PI - 0.05;

	gHouseLights = new THREE.AmbientLight(0xcccccc, 1);
	gHouseLights.intensity = 0;
	global.scene.add(gHouseLights);
}


/**
 * function to be called in the main game loop
 * @returns {boolean} true if debug needs a render update
 */
function update() {
	gStats.update();
	if (global.orbitControlsEnabled) {
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

	global.orbitControlsEnabled = !global.orbitControlsEnabled;

	const playerPos = player.getPosition();
	if (global.orbitControlsEnabled) {
		console.log('Orbit controls enabled');
		gCameraYpos = global.camera.position.y

		gControls.target.set(playerPos.x, playerPos.y, playerPos.z);
	} else {
		console.log('Orbit controls disabled');
		global.camera.position.x = playerPos.x;
		global.camera.position.y = gCameraYpos;
		global.camera.position.z = playerPos.z;
		global.camera.rotation.set(3 * Math.PI / 2, 0, 0);
		global.renderUpdate();
	}

	gControls.enabled = global.orbitControlsEnabled;
}


function keyHandlerLight() {

	gHouseLightsActive = !gHouseLightsActive;

	if (gHouseLightsActive) {
		gHouseLights.intensity = 1.0;
		global.scene.fog = null;
		console.log('House lights up');
	} else {
		gHouseLights.intensity = 0;
		global.scene.fog = global.fog;
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
			global.camera.position.x,
			config.ballRadius,
			global.camera.position.z
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
