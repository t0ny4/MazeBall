/* SPDX-License-Identifier: 0BSD */

import '../types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as planck from 'planck';
import global from '../global';
import config from '../config';
import * as sounds from '../sounds';


const HALF_PI = Math.PI / 2;

const gColourRed = new THREE.Color(0xff0000);
const gColourGreen = new THREE.Color(0x00ff00);

/** @type {THREE.Scene} */
let gScene;
/** @type {THREE.PointLight} */
let gExitLight;

/** @type {THREE.Mesh} */
let gKeyMesh;
/** @type {THREE.PointLight} */
let gKeyLight;
/** @type {THREE.Mesh} */
let gKeyBaseMesh;
/** @type {THREE.PointLight} */
let gKeyBaseLight;
/** @type {THREE.Mesh} */
let gDoorMesh;
/** @type {planck.Body} */
let gDoorBody = null;
/** @type {planck.BoxShape} */
let gDoorShapeHoriz;
/** @type {planck.BoxShape} */
let gDoorShapeVert;
/** @type {MazeWithKey} */
let gCurrentMaze;
/** @type {Boolean} */
let gWasSetupCalled = false;
/** @type {Boolean} */
let gKeyVisible = false;
/** @type {planck.World} */
let gPhysicsWorld;


function setup() {
	gPhysicsWorld = global.physicsWorld;
	gScene = global.scene;
	gExitLight = global.exitLight;

	gKeyBaseLight = new THREE.PointLight(0xffd700, 0);
	gScene.add(gKeyBaseLight);

	gKeyLight = new THREE.PointLight(0xffd700, 0);
	gScene.add(gKeyLight);

	gDoorShapeHoriz = new planck.BoxShape(0.5, 0.04);
	gDoorShapeVert = new planck.BoxShape(0.04, 0.5);

	gPhysicsWorld.addContactCallback('ball', 'closed_door', () => { sounds.play('locked'); });

	gWasSetupCalled = true;
}


/**
 * @param {THREE.LoadingManager} manager
 */
function loadAssets(manager) {

	const modelLoader = new GLTFLoader(manager);

	modelLoader.load(
		config.modelDir + config.keyModelFile,
		(gltf) => {
			gKeyMesh = gltf.scene;
			gKeyMesh.traverse((child) => {
				if (child instanceof THREE.Mesh) {
					child.material.emissive = {b: 0, r: 1, g: 0.7, isColor: true};
					child.material.emissiveIntensity = 0.55;
				}
			});
			gKeyMesh.scale.set(0.6, 0.6, 0.6);
		},
		undefined,
		() => {
			gKeyMesh = global.errorMesh.clone();
		}
	);

	modelLoader.load(
		config.modelDir + config.baseModelFile,
		(gltf) => {
			gKeyBaseMesh = gltf.scene;
			gKeyBaseMesh.scale.set(0.35, 0.1, 0.35);
		},
		undefined,
		() => {
			gKeyBaseMesh = global.errorMesh.clone();
		}
	);

	modelLoader.load(
		config.modelDir + config.doorModelFile,
		(gltf) => {
			gDoorMesh = gltf.scene;
			gDoorMesh.scale.set(0.42, 0.4, 0.3);
		},
		undefined,
		() => {
			gDoorMesh = global.errorMesh.clone();
		}
	);

	sounds.addAssets(config.keySounds);
	sounds.addGroups(config.keySoundGroups);
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

	// remove old door physics body if it exists
	if (gDoorBody !== null) {
		gPhysicsWorld.destroyBody(gDoorBody);
		gDoorBody = null;
	}

	gScene.remove(gKeyMesh);
	gScene.remove(gKeyBaseMesh);
	gScene.remove(gDoorMesh);

	gKeyBaseLight.intensity = 0;
	gKeyLight.intensity = 0;

	gKeyVisible = false;

	/** @type {MazeWithKey} kMaze */
	const kMaze = maze;

	gCurrentMaze = kMaze;

	if (kMaze.deadends.length === 0) {
		kMaze.key = false;
		kMaze.keyIndex = false;
		return;
	}

	// pick a random deadend and put the key in it
	const rnd = Math.floor(Math.random() * kMaze.deadends.length);
	kMaze.key = kMaze.deadends[rnd];
	kMaze.keyIndex = rnd;
	kMaze.data[kMaze.key.x][kMaze.key.z] = 'K';

	// the exit is blocked by a door, so mark it as such (L = locked)
	const {x, z} = kMaze.exit;
	kMaze.data[x][z] = 'L';

	// door position calculations
	let doorX = kMaze.exit.x;
	let doorZ = kMaze.exit.z;
	let doorShape;
	if (kMaze.exit.dir === 'L' || kMaze.exit.dir === 'R') {
		gDoorMesh.rotation.set(0, HALF_PI, 0);
		doorX += (kMaze.exit.dir === 'R') ? 0.5 : -0.5;
		doorShape = gDoorShapeVert;
	} else {
		gDoorMesh.rotation.set(0, 0, 0);
		doorZ += (kMaze.exit.dir === 'D') ? 0.5 : -0.5;
		doorShape = gDoorShapeHoriz;
	}

	// --- PHYSICS ---

	const closedDoorDefinition = {
		type: 'static',
		position: {x: doorX, y: doorZ},
		userData: 'closed_door',
	};
	gDoorBody = gPhysicsWorld.createBody(closedDoorDefinition);
	gDoorBody.createFixture({shape: doorShape});

	// --- 3D ---

	gKeyBaseMesh.position.set(kMaze.key.x, 0, kMaze.key.z);
	gScene.add(gKeyBaseMesh);
	gKeyBaseLight.position.set(kMaze.key.x, 0.1, kMaze.key.z);
	gKeyBaseLight.intensity = 0.04;

	gKeyMesh.position.set(kMaze.key.x, 0.38, kMaze.key.z);
	gScene.add(gKeyMesh);
	gKeyLight.position.set(kMaze.key.x, 0.44, kMaze.key.z);
	gKeyLight.intensity = 0.1;
	gKeyVisible = true;

	gDoorMesh.position.set(doorX, 0, doorZ);
	gScene.add(gDoorMesh);

	gExitLight.color = gColourRed;
}


function update() {

	if (!gWasSetupCalled || !gKeyVisible || global.idleMode) {
		return false;
	}

	gKeyMesh.rotateY(0.03);
	gKeyMesh.rotateZ(0.03);
	return true;
}


/**
 * 'collect' the key. removes the key from the maze and opens the exit door
 */
function collect() {
	// remove key
	gScene.remove(gKeyMesh);
	gKeyLight.intensity = 0;
	gKeyVisible = false;
	sounds.play('keyPickup');

	// the door is no longer blocking the exit
	const {x, z} = gCurrentMaze.exit;
	gCurrentMaze.data[x][z] = 'H';

	// remove closed door physics body
	if (gDoorBody !== null) {
		gPhysicsWorld.destroyBody(gDoorBody);
		gDoorBody = null;
	}

	// new door position calculations
	const exitDir = gCurrentMaze.exit.dir;
	let doorX = gDoorMesh.position.x;
	let doorZ = gDoorMesh.position.z;
	let doorShape;
	let rotateY = 0;
	if (exitDir === 'L' || exitDir === 'R') {
		doorX += (exitDir === 'R') ? 0.5 : -0.5;
		doorZ += 0.5;
		doorShape = gDoorShapeHoriz;
	} else {
		rotateY = HALF_PI;
		doorX += 0.5;
		doorZ += (exitDir === 'D') ? 0.5 : -0.5;
		doorShape = gDoorShapeVert;
	}

	// create open door physics body
	const openDoorDefinition = {
		type: 'static',
		position: {x: doorX, y: doorZ},
		userData: 'open_door',
	};
	gDoorBody = gPhysicsWorld.createBody(openDoorDefinition);
	gDoorBody.createFixture({shape: doorShape});

	// move door mesh to open position
	gDoorMesh.position.set(doorX, 0, doorZ);
	gDoorMesh.rotation.set(0, rotateY, 0);

	gExitLight.color = gColourGreen;
}


const _MODULE = 'key.js';


export {
	_MODULE,
	setup,
	loadAssets,
	create,
	update,
	collect,
};
