/* SPDX-License-Identifier: 0BSD */

import './types';
import * as THREE from 'three';
import {message as statusMessage} from './status';


/**
 * @returns {THREE.Texture}
 */
function makeErrorTexture() {

	const side = 16;
	const size = side * side * 4;
	const data = new Uint8Array(size);

	for (let i = 0; i < size; i += 4) {
		data[i] = 0xff;
		data[i + 1] = 0x69;
		data[i + 2] = 0xb4;
		data[i + 3] = 0xff;
	}

	const texture = new THREE.DataTexture(data, side, side);
	texture.needsUpdate = true;
	return texture;
}


/**
 * @returns {THREE.Mesh}
 */
function makeErrorMesh() {
	const errorGeometry = new THREE.SphereGeometry(0.1);
	const errorMaterial = new THREE.MeshBasicMaterial({color: 0xff69b4});
	return new THREE.Mesh(errorGeometry, errorMaterial);
}


/**
 * Calls the supplied function when all game assets are loaded
 * @param {Object[]} objs array of Objects with a loadAssets() method
 * @param {Function} resolve callback to resolve a Promise
 */
function loadAssets(objs, resolve) {

	let initDone = false;
	let hadErrors = false;

	const manager = new THREE.LoadingManager();

	manager.onError = (name) => {
		console.warn('Failed to load asset:', name);
		hadErrors = true;
	};

	manager.onProgress = function (url, itemsLoaded, itemsTotal) {
		statusMessage('Loaded', Math.floor(itemsLoaded / itemsTotal * 100) + '%');
	};

	manager.onLoad = () => {
		if (!initDone) {
			return;
		}
		if (hadErrors) {
			console.error('LoadingManager: finished loading asset files with errors');
		}
		statusMessage('');
		resolve();
	};

	objs.forEach((obj) => {
		if (typeof obj.loadAssets === 'function') {
			obj.loadAssets(manager);
		} else {
			console.warn(obj, 'has no loadAssets method');
		}
	});

	initDone = true;
}


const _MODULE = 'utils.js';


export {
	_MODULE,
	makeErrorMesh,
	makeErrorTexture,
	loadAssets,
};
