/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import global from './global';
import config from './config';
import { getPosition as getPlayerPosition, getAngle as getPlayerAngle } from './player';
import { setKeyHandler } from './controls';

const HALF_PI = Math.PI / 2;	// 90 degrees

const gMainViewport = new THREE.Vector4();
const gEuler = new THREE.Euler(0, 0, 0, 'YZX');

const MapStates = Object.freeze({
	disabled: 0,
	perpective: 1,
	orthographic: 2,
});

/** @type {MapStates} */
let gState;

/** @type {Number} */
let gMapViewportX;
/** @type {Number} */
let gMapViewportY;
/** @type {Number} */
let gMapViewportSize;

/** @type {THREE.Scene} */
let gScene;
/** @type {THREE.WebGLRenderer} */
let gRenderer;
/** @type {THREE.PerspectiveCamera} */
let gPerpectiveCamera;
/** @type {THREE.OrthographicCamera} */
let gOrthographicCamera;

let gSetupCalled = false;


function setup() {

	gPerpectiveCamera = new THREE.PerspectiveCamera(70);
	gPerpectiveCamera.position.x = 0;
	gPerpectiveCamera.position.y = 6;
	gPerpectiveCamera.position.z = 0;
	gPerpectiveCamera.rotation.set(-HALF_PI, 0, 0);

	gOrthographicCamera = new THREE.OrthographicCamera(-3, 3, 3, -3);
	gOrthographicCamera.position.x = 0;
	gOrthographicCamera.position.y = 6;
	gOrthographicCamera.position.z = 0;
	gOrthographicCamera.rotation.set(-HALF_PI, 0, 0);

	gState = MapStates.perpective;

	gScene = global.scene;
	gRenderer = global.renderer;

	onWindowResize();
	window.addEventListener('resize', onWindowResize);

	setKeyHandler('cycle_minimap', cycleMinimap);

	gSetupCalled = true;
}


function cycleMinimap() {

	if (!global.firstPersonModeActive || !gSetupCalled) {
		return;
	}

	switch (gState) {

		case MapStates.disabled:
			gState = MapStates.perpective;
		break;

		case MapStates.perpective:
			gState = MapStates.orthographic;
		break;

		case MapStates.orthographic:
			gState = MapStates.disabled;
		break;

		default:
			console.error('minimap was in an unknown state:', gState);
			gState = MapStates.perpective;
		break;
	}

	global.forceFrameRender = true;
}


function update() {

	if (!global.firstPersonModeActive || !gSetupCalled || gState === MapStates.disabled) {
		return;
	}

	const camera = (gState === MapStates.perpective) ? gPerpectiveCamera : gOrthographicCamera;
	const playerPos = getPlayerPosition();

	camera.position.x = playerPos.x;
	camera.position.z = playerPos.z;

	const angle = -getPlayerAngle();
	gEuler.setFromQuaternion(camera.quaternion);
	if (Math.abs(gEuler.y - angle) > 0.001) {
		gEuler.y = angle;
		camera.quaternion.setFromEuler(gEuler);
	}

	gRenderer.setViewport(gMapViewportX, gMapViewportY, gMapViewportSize, gMapViewportSize);

	gRenderer.setScissorTest(true);
	gRenderer.render(gScene, camera);
	gRenderer.setScissorTest(false);

	gRenderer.setViewport(gMainViewport);
}


function onWindowResize() {

	const smallest = Math.min(window.innerHeight, window.innerWidth);

	gMapViewportSize = Math.floor(smallest * config.mapWidthRatio);
	const mapBorder = Math.floor(smallest * config.mapBorderRatio);
	const mapScissorSize = gMapViewportSize + (mapBorder * 2);
	const mapScissorX = window.innerWidth - mapScissorSize;
	const mapScissorY = window.innerHeight - mapScissorSize;

	gMapViewportX = mapScissorX + mapBorder;
	gMapViewportY = mapScissorY + mapBorder;

	gRenderer.setScissor(mapScissorX, mapScissorY, mapScissorSize, mapScissorSize);
	gRenderer.getViewport(gMainViewport);
}


const _MODULE = 'minimap.js';


export {
	_MODULE,
	setup,
	update,
};
