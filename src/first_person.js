/* SPDX-License-Identifier: 0BSD */

import { Euler, Vector3 } from 'three';
import { bindMouseMove, unbindMouseMove, setKeyHandler } from './controls';
import global from './global';
import config from './config';
import * as player from './player';


// the camera rotates around Y (yaw - L/R), and X (pitch - U/D)
// the unrotated Z goes in the middle to avoid gimbal lock
const gCameraEuler = new Euler(0, 0, 0, 'YZX');
const gCameraDirection = new Vector3();

// does the browser support pointer locking? (required for 1st person view)
const gPointerLockAvailable = 'pointerLockElement' in document;

let gMousePitch = 0;
let gMouseYaw = 0;
/** @type {THREE.Camera} */
let gCamera;

const HALF_PI = Math.PI / 2;


function setup() {

	if (!gPointerLockAvailable) {
		console.log('browser does not support pointer lock, no first person view available');
		return;
	}

	gCamera = global.camera;

	setKeyHandler('first_person', toggleFirstPerson);

	document.addEventListener('pointerlockchange', () => {
		if (global.orbitControlsEnabled) {
			if (document.pointerLockElement) {
				console.log('Cannot switch to first person view while orbit controls are active');
				document.exitPointerLock();
			}
			return;
		}
		if (global.firstPersonModeActive) {
			document.exitPointerLock();
			gCamera.rotation.set(-HALF_PI, 0, 0);
			gCamera.position.y = global.cameraYpos = config.defaultCameraY;
			unbindMouseMove(mouseUpdate);
			global.firstPersonModeActive = false;
			console.log('first person view disabled');
		} else {
			gCamera.rotation.set(0, -player.getAngle(), 0);
			gCamera.position.y = global.cameraYpos = player.getCameraHeight();
			bindMouseMove(mouseUpdate);
			global.firstPersonModeActive = true;
			console.log('first person view enabled');
		}
		global.forceFrameRender = true;
	});
}


function toggleFirstPerson() {
		if (!global.firstPersonModeActive) {
			global.renderer.domElement.requestPointerLock();
		} else {
			document.exitPointerLock();
		}
}


function mouseUpdate(event) {
	const movementX = event.movementX || event.mozMovementX || event.webkitMovementX || 0;
	const movementY = event.movementY || event.mozMovementY || event.webkitMovementY || 0;
	gMousePitch = movementY * config.mouseSensitivity;
	gMouseYaw = movementX * config.mouseSensitivity;
}


/**
 * @returns {boolean} true if player's view has changed
 */
function update() {

	if (!global.firstPersonModeActive) {
		return false;
	}

	let retVal = false;

	if (gMousePitch !== 0 || gMouseYaw !== 0) {

		gCameraEuler.setFromQuaternion(gCamera.quaternion);
		gCameraEuler.x -= gMousePitch; // up/down
		gCameraEuler.y -= gMouseYaw; // left/right
		// constrain pitch
		gCameraEuler.x = Math.max(-HALF_PI, Math.min(HALF_PI, gCameraEuler.x));
		gCamera.quaternion.setFromEuler(gCameraEuler);

		gCamera.getWorldDirection(gCameraDirection);
		// a camera looks down it's negative z axis, so flip the z value
		player.setAngle(Math.atan2(gCameraDirection.x, -gCameraDirection.z));

		gMousePitch = 0;
		gMouseYaw = 0;
		retVal = true;
	}

	return retVal;
}


const _MODULE = 'first_person.js';


export {
	_MODULE,
	setup,
	update,
};
