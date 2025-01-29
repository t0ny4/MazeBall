/* SPDX-License-Identifier: 0BSD */

import './types';
import * as THREE from 'three';
import * as planck from 'planck';
import { keyX, keyY } from './controls';
import config from './config';
import global from './global';
import * as actor from './objects/ball';


/** @type {THREE.Mesh} */
let gPlayer3DObject;
/** @type {planck.Body} */
let gPlayerPhysicsObject;
/** @type {THREE.PointLight} */
let gPlayerLight;
/** in Radians */
let gAngle = 0;
/** @type {function(number,number,number):void} */
let gUpdateMazePosition = () => {console.warn('gUpdateMazePosition not set');};


const gZeroZero = new planck.Vec2(0, 0);
const QUARTER_PI = Math.PI / 4;
const SIN45 = Math.sin(QUARTER_PI);
const COS45 = Math.cos(QUARTER_PI);


/**
 * @param {THREE.LoadingManager} manager
 */
function loadAssets(manager) {
	actor.loadAssets(manager);
}

/**
 * @param {function(number,number,number):void} updatePositionFunc
 */
function setup(updatePositionFunc) {

	if (typeof updatePositionFunc === 'function') {
		gUpdateMazePosition = updatePositionFunc;
	}

	[gPlayerPhysicsObject, gPlayer3DObject] = actor.setup(updatePositionFunc);

	gPlayerLight = new THREE.PointLight(0xffe0e0, config.playerLightLevel);
	gPlayerLight.castShadow = false;

	global.scene.add(gPlayerLight);

	global.playerLight = gPlayerLight;
}


/**
 * @returns {Boolean} true if the player is moving
 */
function update() {

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
			const x = cos * keyForce.x - sin * keyForce.y;
			const y = sin * keyForce.x + cos * keyForce.y;
			keyForce.x = x;
			keyForce.y = y;
		}

		applyForce(keyForce);
	}

	// player light is locked to player
	global.playerLight.position.x = gPlayer3DObject.position.x;
	global.playerLight.position.z = gPlayer3DObject.position.z;

	const actorMoving = actor.update();

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
	gUpdateMazePosition(x, pos.y, z);
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


/**
 * @param {bool} flag
 */
function hideMesh(flag) {
	actor.hide(flag);
}


const _MODULE = 'player.js';


export {
	_MODULE,
	getAngle,
	getCameraHeight,
	getPosition,
	hideMesh,
	loadAssets,
	setAngle,
	setNewMaze,
	setup,
	update,
};
