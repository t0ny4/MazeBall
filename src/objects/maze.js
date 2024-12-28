/* SPDX-License-Identifier: 0BSD */

import '../types';
import * as THREE from 'three';
import * as planck from 'planck';
import global from '../global';
import config from '../config';


const HALF_PI = Math.PI / 2;

/** @type {THREE.Texture[]} */
const gWallTextures = [];
/** @type {THREE.Texture[]} */
const gFloorTextures = [];
/** @type {planck.Body[]} */
const gMazePhysicsBodies = [];

/** @type {THREE.Scene} */
let gScene
/** @type {THREE.Camera} */
let gCamera;
/** @type {THREE.PointLight} */
let gExitLight;
/** @type {THREE.Mesh} */
let gWallMesh;
/** @type {THREE.Mesh} */
let gFloorMesh;


function setup() {
	gScene = global.scene;
	gCamera = global.camera;
	gExitLight = new THREE.PointLight(0x00ff00, 0);
	global.scene.add(gExitLight);
	global.exitLight = gExitLight;
}


/** @returns {Promise<Boolean>} */
function loadAssets() {

	return new Promise((resolve, reject) => {

		const manager = new THREE.LoadingManager();
		manager.onLoad = () => {
			resolve(true);
		};
		manager.onError = (name) => {
			reject('failed to load texture ' + name);
		};

		const textureLoader = new THREE.TextureLoader(manager);

		for (const file of config.wallTextureFiles) {
			const texture = textureLoader.load(config.textureDir + '/walls/' + file);
			texture.colorSpace = THREE.SRGBColorSpace;
			gWallTextures.push(texture);
		}

		for (const file of config.floorTextureFiles) {
			const texture = textureLoader.load(config.textureDir + '/floors/' + file);
			texture.colorSpace = THREE.SRGBColorSpace;
			gFloorTextures.push(texture);
		}
	});
}


/**
 * Create the 3D mesh and physics model for the supplied maze,
 * clears the old ones if they exist.
 * Sets camera position and rotation
 * @param {MazeObject} maze
 */
function create(maze) {

	// --- PHYSICS ---

	// clear the old maze from the physics world, if one exists
	if (gMazePhysicsBodies.length > 0) {
		gMazePhysicsBodies.forEach((body) => global.physicsWorld.destroyBody(body));
		gMazePhysicsBodies.length = 0;
	}

	const bodyDefinition = {
		type: 'static',
		position: {x: 0, y: 0},
	};

	const shape = new planck.BoxShape(0.5, 0.5);

	for (let x = 0; x < maze.size.x; x++) {
		for (let y = 0; y < maze.size.z; y++) {
			if (maze.data[x][y] === false) {
				bodyDefinition.position = {x, y};
				const mazeBody = global.physicsWorld.createBody(bodyDefinition);
				gMazePhysicsBodies.push(mazeBody);
				mazeBody.createFixture({shape});
			}
		}
	}

	// --- 3D ---

	const mazeDimensionX = maze.size.x;
	const mazeDimensionZ = maze.size.z;

	// if the wallMesh exists, remove it and all its resources
	if (gWallMesh) {
		gScene.remove(gWallMesh);
		gWallMesh.geometry.dispose();
		gWallMesh.material.dispose();
		gWallMesh = null;
	}

	// if the floorMesh exists, remove it and all its resources
	if (gFloorMesh) {
		gScene.remove(gFloorMesh);
		gFloorMesh.geometry.dispose();
		gFloorMesh.material.dispose();
		gFloorMesh = null;
	}

	gWallMesh = mazeMesh(maze);
	gWallMesh.castShadow = true;
	gWallMesh.receiveShadow = true;
	gScene.add(gWallMesh);

	// pick random floor texture
	const rnd = Math.floor(Math.random() * gFloorTextures.length);
	const floorTexture = gFloorTextures[rnd];
	floorTexture.wrapS = floorTexture.wrapT = THREE.RepeatWrapping;
	floorTexture.repeat.set(mazeDimensionX + 15, mazeDimensionZ + 15);

	const floorPlane = new THREE.PlaneGeometry(mazeDimensionX + 15, mazeDimensionZ + 15);
	const material = new THREE.MeshPhongMaterial({map: floorTexture});
	gFloorMesh = new THREE.Mesh(floorPlane, material);
	gFloorMesh.rotateX(-HALF_PI);
	gFloorMesh.position.set((mazeDimensionX - 1) / 2, 0, (mazeDimensionZ - 1) / 2);
	gFloorMesh.receiveShadow = true;
	gScene.add(gFloorMesh);

	if (global.firstPersonModeActive) {
		gCamera.rotation.set(0, maze.start.angle, 0);
	} else {
		gCamera.rotation.set(-HALF_PI, 0, 0);
	}

	gCamera.position.set(maze.start.x, global.cameraYpos, maze.start.z);

	gExitLight.position.set(maze.exit.x, config.exitLightY, maze.exit.z);
	gExitLight.intensity = 0;

	global.mazeExited = false;
}



/**
 * @param {MazeObject} maze
 * @returns {THREE.InstancedMesh}
 */
function mazeMesh(maze) {

	const cube_geo = new THREE.BoxGeometry(1, config.mazeHeight, 1);
	const rnd = Math.floor(Math.random() * gWallTextures.length);
	const map = gWallTextures[rnd];
	const material = new THREE.MeshPhongMaterial({map});
	const mesh = new THREE.InstancedMesh(cube_geo, material, maze.size.x * maze.size.z);
	mesh.count = 0;
	const matrix = new THREE.Matrix4();

	for (let x = 0; x < maze.size.x; x++) {
	 	for (let z = 0; z < maze.size.z; z++) {
	 		if (maze.data[x][z] === false) {
				matrix.setPosition(x, config.mazeHeight / 2, z);
				mesh.setMatrixAt(mesh.count++, matrix);
			}
		}
	}

	return mesh;
}


const _MODULE = 'maze.js';


export {
	_MODULE,
	loadAssets,
	setup,
	create,
};
