/* SPDX-License-Identifier: 0BSD */

import './types';
import * as THREE from 'three';
import * as planck from 'planck';
import { keyX, keyY } from './controls';
import config from './config';
import global from './global';
import * as actor from './objects/ball';
import * as jump from './jump';


/** @type {THREE.Mesh} */
let gPlayer3DObject;
/** @type {planck.Body} */
let gPlayerPhysicsObject;
/** @type {THREE.PointLight} */
let gPlayerLight;
/** in Radians */
let gAngle = 0;
/** @type {function(number,number,number):void} */
let gUpdateMazePosition = () => { console.warn('gUpdateMazePosition not set'); };
/** @type {{x: number, z: number} | null} */
let gDeferredPosition = null;
/** @type {planck.Vec2Value | null} */
let gDeferredVelocity = null;
/** @type {Number | null} */
let gDeferredRotation = null;
/** @type {THREE.Euler} */
const gCameraEuler = new THREE.Euler(0, 0, 0, 'YZX');
/** @type {THREE.Camera} */
let gCamera;

const gZeroZero = new planck.Vec2(0, 0);
const QUARTER_PI = Math.PI / 4;
const SIN45 = Math.sin(QUARTER_PI);
const COS45 = Math.cos(QUARTER_PI);


/**
 * @param {THREE.LoadingManager} manager
 */
function loadAssets(manager) {
	actor.loadAssets(manager);
	jump.loadAssets();
}


/**
 * @param {updatePositionCallback} updatePositionFunc
 */
function setup(updatePositionFunc) {

	gCamera = global.camera;

	if (typeof updatePositionFunc === 'function') {
		gUpdateMazePosition = updatePositionFunc;
	}

	[gPlayerPhysicsObject, gPlayer3DObject] = actor.setup(updatePositionFunc);

	gPlayerLight = new THREE.PointLight(0xffe0e0, config.playerLightLevel);
	gPlayerLight.castShadow = false;

	global.scene.add(gPlayerLight);

	global.playerLight = gPlayerLight;

	jump.setup(gPlayer3DObject);
}


/**
 * @returns {Boolean} true if the player is moving
 */
function update() {

	if (gDeferredPosition !== null) {
		setPositionXZ(gDeferredPosition.x, gDeferredPosition.z);
		gDeferredPosition = null;
		if (gDeferredVelocity !== null) {
			setLinearVelocity(gDeferredVelocity);
			gDeferredVelocity = null;
		}
		if (gDeferredRotation !== null) {
			if (global.firstPersonModeActive) {
				gCameraEuler.setFromQuaternion(gCamera.quaternion);
				gCameraEuler.y -= gDeferredRotation;
				gCamera.quaternion.setFromEuler(gCameraEuler);
				gAngle += gDeferredRotation;
			}
			gDeferredRotation = null;
		}
	}

	// if either movement key is pressed, apply the relevant force
	if (keyX !== 0 || keyY !== 0) {

		let keyForce;

		// if both keys are pressed, apply a 45 degree force
		if (keyX !== 0 && keyY !== 0) {
			keyForce = new planck.Vec2(keyX * COS45, keyY * SIN45);
		} else {
			keyForce = new planck.Vec2(keyX, keyY);
		}

		keyForce.mul(config.keyForce);

		if (global.firstPersonModeActive) {
			// make the force vector relative to the angle the player is facing
			const cos = Math.cos(gAngle);
			const sin = Math.sin(gAngle);
			const x = (cos * keyForce.x) - (sin * keyForce.y);
			const y = (sin * keyForce.x) + (cos * keyForce.y);
			keyForce.x = x;
			keyForce.y = y;
		}

		applyForce(keyForce);
	}

	// player light is locked to player
	gPlayerLight.position.x = gPlayer3DObject.position.x;
	gPlayerLight.position.z = gPlayer3DObject.position.z;

	let actorMoving = actor.update();
	actorMoving |= jump.update(gPlayer3DObject);

	if (actorMoving) {
		global.idleStartMs = 0;
		global.idleMode = false;
	}

	if (!actorMoving && !global.idleMode) {
		if (global.idleStartMs === 0) {
			global.idleStartMs = Date.now();
		} else if (Date.now() - global.idleStartMs > config.idleTimeout * 1000) {
			global.idleMode = true;
		}
	}

	return actorMoving;
}


/**
 * @param {planck.Vec2Value} v
 */
function setLinearVelocity(v) {
	gPlayerPhysicsObject.setLinearVelocity(v);
}


function getLinearVelocity() {
	return gPlayerPhysicsObject.getLinearVelocity();
}


/**
 * move the player to the start of the new maze,
 * set 1st person rotation to maze start angle,
 * set velocity to zero
 * @param {MazeObject} maze
 */
function setNewMaze(maze) {
	setLinearVelocity(gZeroZero);
	setPositionXZ(maze.start.x, maze.start.z);
	gAngle = -maze.start.angle;
	gPlayerLight.position.set(maze.start.x, config.lightYpos, maze.start.z);
	gPlayerLight.intensity = 0;
	jump.reset(gPlayer3DObject);
}


/**
 * @param {Number} x
 * @param {Number} z
 */
function setPositionXZ(x, z) {
	const pos = getPosition();
	gPlayer3DObject.position.set(x, pos.y, z);
	gPlayerPhysicsObject.setPosition({x, y: z});

	// tell maze about new position
	gUpdateMazePosition(x, pos.y, z, 0);
}


/**
 * Set a position/velocity update to happen on the next player.update()
 * @param {{x: number, z: number}} position
 * @param {planck.Vec2Value | null} velocity
 * @param {Number | null} angle
 */
function deferredPositionUpdate(position, velocity = null, angle = null) {
	gDeferredPosition = position;
	gDeferredVelocity = velocity;
	gDeferredRotation = angle;
}


function getPosition() {
	return gPlayer3DObject.position;
}


function getCameraHeight() {
	return actor.getCameraHeight();
}


/**
 * @param {planck.Vec2Value} force
 */
function applyForce(force) {
	gPlayerPhysicsObject.applyForceToCenter(force);
}


function getAngle() {
	return gAngle;
}


/**
 * @param {number} a
 */
function setAngle(a) {
	gAngle = a;
}


const _MODULE = 'player.js';


export {
	_MODULE,
	getAngle,
	getCameraHeight,
	getPosition,
	loadAssets,
	setAngle,
	setNewMaze,
	setup,
	update,
	getLinearVelocity,
	deferredPositionUpdate,
};
