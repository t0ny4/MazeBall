/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import * as planck from 'planck';

const global = {

	_MODULE: 'global.js',

	cameraYpos: 0, // height above maze floor
	idleStartMs: 0,

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
	/**
	 * calls render.update()
	 * @type {Function}
	 */
	renderUpdate: () => { console.warn('global.renderUpdate not set'); },
	/** @type {THREE.Scene} */
	scene: null,
	/** @type {THREE.Texture} */
	errorTexture: null,
	/** @type {THREE.Mesh} */
	errorMesh: null,
	/** @type {HTMLElement} */
	statusBar: null,
};


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


/**
 * The seal() and Proxy ensure that only existing properties of the object can be used
 *  You cannot accidentally create new global variables.
 * @type{global}
 */
export default new Proxy(Object.seal(global), handler);

// export default global;
