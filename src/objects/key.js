/* SPDX-License-Identifier: 0BSD */

import '../types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as planck from 'planck';
import global from '../global';
import config from '../config';


const gBarrierGeometry = new THREE.CapsuleGeometry(config.barrierRadius, config.barrierHeight);
const gColourRed = new THREE.Color(0xff0000);
const gColourGreen = new THREE.Color(0x00ff00);

/** @type {THREE.Scene} */
let gScene;
/** @type {THREE.PointLight} */
let gExitLight;

/** @type {planck.Body} */
let gBarrierBody = null;
/** @type {THREE.Mesh} */
let gBarrierMesh;
/** @type {THREE.Texture} */
let gBarrierTexture;
/** @type {THREE.Mesh} */
let gKeyMesh;
/** @type {THREE.PointLight} */
let gKeyLight;
/** @type {THREE.Mesh} */
let gKeyBaseMesh;
/** @type {THREE.PointLight} */
let gKeyBaseLight;
/** @type {Boolean} */
let gWasSetupCalled = false;


function setup() {
	gScene = global.scene;
	gExitLight = global.exitLight;

	gKeyBaseLight = new THREE.PointLight(0xffd700, 0);
	gScene.add(gKeyBaseLight);

	gKeyLight = new THREE.PointLight(0xffd700, 0);
	gScene.add(gKeyLight);

	const material = new THREE.MeshBasicMaterial({map: gBarrierTexture});
	gBarrierMesh = new THREE.Mesh(gBarrierGeometry, material);

	gWasSetupCalled = true;
}


/** @returns {Promise<Boolean>} */
function loadAssets() {

	return new Promise((resolve, reject) => {

		const manager = new THREE.LoadingManager();
		manager.onLoad = () => {
			resolve(true);
		};
		manager.onError = (name) => {
			reject('failed to load asset: ' + name);
		};

		const modelLoader = new GLTFLoader(manager);
		modelLoader.setPath(config.modelDir + '/');

		modelLoader.load(config.keyModelFile, (gltf) => {
			gKeyMesh = gltf.scene;
			gKeyMesh.traverse(child => {
				if (child instanceof THREE.Mesh) {
					child.material.emissive = {b: 0, r: 1, g: 0.7, isColor: true};
					child.material.emissiveIntensity = 0.55;
				}
			});
			gKeyMesh.scale.set(0.6, 0.6, 0.6);
			gKeyMesh.rotateZ(-0.4);
			gKeyMesh.rotateY(0.5);
		});

		modelLoader.load(config.baseModelFile, (gltf) => {
			gKeyBaseMesh = gltf.scene;
			gKeyBaseMesh.scale.set(0.35, 0.1, 0.35);
		});

		const textureLoader = new THREE.TextureLoader(manager);
		gBarrierTexture = textureLoader.load(config.textureDir + '/misc/' + config.barrierTextureFile);
		gBarrierTexture.colorSpace = THREE.SRGBColorSpace;
		gBarrierTexture.wrapS = gBarrierTexture.wrapT = THREE.RepeatWrapping;
	});
}


/**
 * Removes any existing 3D/physics elements then, if maze.key is not false,
 * blocks the exit and adds a key into the maze
 * @param {MazeObject} maze
 */
function create(maze) {

	if (!gWasSetupCalled) {
		return;
	}

	if (gBarrierBody !== null) {
		global.physicsWorld.destroyBody(gBarrierBody);
		gBarrierBody = null;
	}

	gScene.remove(gKeyMesh);
	gScene.remove(gKeyBaseMesh);
	gKeyBaseLight.intensity = 0;
	gKeyLight.intensity = 0;

	if (maze.key === false) {
		return;
	}

	// --- PHYSICS ---

	const pinShape = new planck.CircleShape(config.barrierRadius);
	const bodyDefinition = {
		type: 'static',
		position: {x: maze.exit.x, y: maze.exit.z},
	};
	const mazeBody = global.physicsWorld.createBody(bodyDefinition);
	gBarrierBody = mazeBody;
	mazeBody.createFixture({shape: pinShape});

	// --- 3D ---

	gKeyBaseMesh.position.set(maze.key.x, 0, maze.key.z);
	gScene.add(gKeyBaseMesh);
	gKeyBaseLight.position.set(maze.key.x, 0.1, maze.key.z);
	gKeyBaseLight.intensity = 0.04;

	gKeyMesh.position.set(maze.key.x, 0.3, maze.key.z);
	gScene.add(gKeyMesh);
	gKeyLight.position.set(maze.key.x, 0.3, maze.key.z);
	gKeyLight.intensity = 0.1;

	gBarrierMesh.position.set(maze.exit.x, config.barrierHeight / 2, maze.exit.z);
	gScene.add(gBarrierMesh);
	gExitLight.color = gColourRed;
}


/**
 * 'collect' the key. removes the key from the maze and clears the exit barrier
 */
function collect() {
	gScene.remove(gKeyMesh);
	gKeyLight.intensity = 0;
	if (gBarrierBody !== null) {
		global.physicsWorld.destroyBody(gBarrierBody);
	}
	gExitLight.color = gColourGreen;
	gScene.remove(gBarrierMesh);
}


const _MODULE = 'key.js';


export {
	_MODULE,
	setup,
	loadAssets,
	create,
	collect,
};
