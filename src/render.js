/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import global from './global';
import config from './config';
import { getPosition as getPlayerPosition } from './player';


let gSunLight;


/**
 * @param {Number} width
 * @param {Number} height
 * @param {HTMLElement} el - default: document.body
 */
function setup(width, height, el = document.body) {

	global.renderUpdate = update;
	global.cameraYpos = config.defaultCameraY;

	global.scene = new THREE.Scene();
	global.camera = new THREE.PerspectiveCamera(80, window.innerWidth / window.innerHeight);
	global.renderer = new THREE.WebGLRenderer({antialias: true});
	global.renderer.shadowMap.enabled = config.enableShadows;
	global.renderer.shadowMap.type = THREE.PCFShadowMap;

	el.appendChild(global.renderer.domElement);

	global.renderer.setPixelRatio(window.devicePixelRatio);
	global.renderer.setSize(width, height);

	window.addEventListener('resize', onWindowResize);

	global.scene.background = new THREE.Color(config.bgColour);

	gSunLight = new THREE.DirectionalLight(0xffffff, config.sunLightLevel);
	gSunLight.castShadow = true;
	gSunLight.position.set(5, 20, 5);
	gSunLight.shadow.camera.left = -10;
	gSunLight.shadow.camera.right = 10;
	gSunLight.shadow.camera.top = 0;
	gSunLight.shadow.camera.bottom = -20;
	gSunLight.shadow.camera.near = 10;
	gSunLight.shadow.camera.far = 25;
	global.scene.add(gSunLight);

	global.fog = new THREE.Fog(config.bgColour, 5, 10);
	global.scene.fog = global.fog;

	// const helper = new THREE.CameraHelper(gSunLight.shadow.camera);
	// global.scene.add(helper);
}


/**
 * Updates the camera position if needed. Calls the THREE renderer's render() method
 *  if the doUpdate parameter is true or if the camera is still moving
 * @param {Boolean} doUpdate default true
 */
function update(doUpdate = true) {

	let cameraMoving = false;

	// we only control the camera if orbit controls is not enabled
	if (!global.orbitControlsEnabled) {

		const playerPos = getPlayerPosition();

		if (global.firstPersonModeActive) {
			// in first person mode camera is locked to player position
			global.camera.position.x = playerPos.x;
			global.camera.position.z = playerPos.z;

		} else {
			// overhead view camera may be eased towards the player position
			const xDiff = playerPos.x - global.camera.position.x;
			const zDiff = playerPos.z - global.camera.position.z;

			if (xDiff !== 0 || zDiff !== 0) {
				// camera is still moving, need to do a renderer update
				cameraMoving = true;

				const cameraEase = global.mazeExited ? config.cameraExitEase : config.cameraEase;

				// if no easing configured or position difference very small, move camera
				// straight to player position
				if (cameraEase >= 1 || (Math.abs(xDiff) < 0.008 && Math.abs(zDiff) < 0.008)) {
					global.camera.position.x = playerPos.x;
					global.camera.position.z = playerPos.z;
				} else {
					// ease camera towards player
					global.camera.position.x += xDiff * cameraEase;
					global.camera.position.z += zDiff * cameraEase;
				}
			}
		}
	}

	if (doUpdate || cameraMoving) {
		// console.log('render.update() calling global.renderer.render()');
		global.renderer.render(global.scene, global.camera);
	}
}


/**
 * fade in the lights over multiple calls
 * @returns {Boolean} true when lights are fully on
 */
function fadeIn() {
	const fadeDelta = 0.1 * (config.playerLightLevel - global.playerLight.intensity);
	const sunDelta = 0.1 * (config.sunLightLevel - gSunLight.intensity);
	global.playerLight.intensity += fadeDelta;
	gSunLight.intensity += sunDelta;
	if (fadeDelta < 0.01) {
		global.playerLight.intensity = config.playerLightLevel;
		global.exitLight.intensity = config.exitLightLevel;
		gSunLight.intensity = config.sunLightLevel;
		return true;
	}
	return false;
}


/**
 * fade out the lights over multiple calls
 * @returns {Boolean} true when lights are fully off
 */
function fadeOut() {
	const fadeDelta = 0.04 * global.playerLight.intensity;
	global.playerLight.intensity -= fadeDelta;
	global.exitLight.intensity -= fadeDelta;
	gSunLight.intensity -= fadeDelta / 2;
	if (fadeDelta < 0.01) {
		global.playerLight.intensity = 0.0;
		global.exitLight.intensity = 0.0;
		gSunLight.intensity = 0.0;
		return true;
	}
	return false;
}


function onWindowResize() {
	global.camera.aspect = window.innerWidth / window.innerHeight;
	global.camera.updateProjectionMatrix();
	global.renderer.setSize(window.innerWidth, window.innerHeight);
	update();
}


const _MODULE = 'render.js';


export {
	_MODULE,
	fadeIn,
	fadeOut,
	setup,
	update,
};
