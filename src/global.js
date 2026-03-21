/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import * as planck from 'planck';

const global = {

	_MODULE: 'global.js',

	cameraYpos: 0, // height above maze floor

	firstPersonModeActive: false,
	mazeExited: false,
	orbitControlsEnabled: false,
	idleMode: false,

	/** @type {THREE.Camera} */
	camera: null,
	/** @type {THREE.PointLight} */
	exitLight: null,
	/** @type {THREE.Fog} */
	fog: null,
	/** @type {planck.World} */
	physicsWorld: null,
	/** @type {THREE.PointLight} */
	playerLight: null,
	/** @type {THREE.WebGLRenderer} */
	renderer: null,
	/** @type {THREE.Scene} */
	scene: null,
	/** @type {THREE.Texture} */
	errorTexture: null,
	/** @type {THREE.Mesh} */
	errorMesh: null,
	/** @type {HTMLElement} */
	statusBar: null,
	/** @type {Boolean} true forces a call to THREE.Renderer:render() for the current frame */
	forceFrameRender: false,
};


/** @type{global} */
let global_export;

// #if (DEV)
/*
 In development mode, Object.seal() and Proxy() are used to ensure that only existing properties
  of the object can be used. i.e. you cannot accidentally create new global variables.
*/
console.log('global.js in development mode.');

const handler = {
	get(target, prop) {
		if (prop in target) {
			return target[prop];
		}
		console.error('Cannot read non existent property "' + prop + '" from global');
		throw new Error();
	},
	set(target, prop, value) {
		if (prop in target) {
			target[prop] = value;
			return true;
		}
		console.error('Cannot create new property "' + prop + '" on global');
		throw new Error();
	},
	deleteProperty(_, prop) {
		console.error('Cannot delete property "' + prop + '" from global');
		throw new Error();
	}
};

// eslint-disable-next-line no-useless-assignment
global_export = new Proxy(Object.seal(global), handler);

// #else

global_export = global;

// #endif

export default global_export;
