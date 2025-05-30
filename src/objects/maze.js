/* SPDX-License-Identifier: 0BSD */

import '../types';
import * as THREE from 'three';
import * as planck from 'planck';
import global from '../global';
import config from '../config';
import * as key from './key';
import * as sounds from '../sounds';
import { addImpact, addDistance } from '../status';
import * as teleporters from './teleporters';


const HALF_PI = Math.PI / 2;

/** @type {THREE.Texture[]} */
const gWallTextures = [];
/** @type {THREE.Texture[]} */
const gFloorTextures = [];
/** @type {planck.Body[]} */
const gMazePhysicsBodies = [];
/** @type {TypeChangeInfo[]} */
const gOnTypeChangeCallbacks = [];

const gPlayerPos = {x: 0, y: 0, z: 0};
const gPlayerGridInfo = {x: 0, z: 0, type: ''};

/** @type {THREE.Scene} */
let gScene;
/** @type {THREE.Camera} */
let gCamera;
/** @type {THREE.PointLight} */
let gExitLight;
/** @type {THREE.Mesh} */
let gWallMesh;
/** @type {THREE.Mesh} */
let gFloorMesh;
/** @type {MazeObject} */
let gCurrentMaze;
/** @type {Number} */
let gSensitivity = 0.9;
/** @type {planck.World} */
let gPhysicsWorld;


function setup() {
	gPhysicsWorld = global.physicsWorld;
	gScene = global.scene;
	gCamera = global.camera;
	gExitLight = new THREE.PointLight(0x00ff00, 0);
	gScene.add(gExitLight);
	global.exitLight = gExitLight;
	gCurrentMaze = {size: {x: 0, z: 0}};
	gPhysicsWorld.addContactCallback(
		'ball',
		'wall',
		/** @param {planck.Contact} c */
		(c) => {
			const loc = c.getManifold().localNormal;
			const vel = c.getFixtureB().getBody().getLinearVelocity();

			const x = Math.abs(vel.x * loc.x);
			const y = Math.abs(vel.y * loc.y);

			if (x > gSensitivity || y > gSensitivity) {
				sounds.play('wallhit');
				addImpact();			// status
			}
		}
	);
	teleporters.setup();
}


/**
 * @param {THREE.LoadingManager} manager
 */
function loadAssets(manager) {

	const textureLoader = new THREE.TextureLoader(manager);

	for (const file of config.wallTextureFiles) {
		textureLoader.load(
			config.textureDir + 'walls/' + file,
			(texture) => {
				texture.colorSpace = THREE.SRGBColorSpace;
				gWallTextures.push(texture);
			},
			undefined,
			() => {
				gWallTextures.push(global.errorTexture);
			}
		);
	}

	for (const file of config.floorTextureFiles) {
		textureLoader.load(
			config.textureDir + 'floors/' + file,
			(texture) => {
				texture.colorSpace = THREE.SRGBColorSpace;
				gFloorTextures.push(texture);
			},
			undefined,
			() => {
				gFloorTextures.push(global.errorTexture);
			}
		);
	}

	sounds.addAssets(config.mazeSounds);
	sounds.addGroups(config.mazeSoundGroups);

	teleporters.loadAssets(manager);
}


/**
 * Create the 3D mesh and physics model for the supplied maze,
 * clears the old ones if they exist.
 * Sets camera position and rotation
 * @param {MazeObject} maze
 */
function create(maze, sensitivity = 0.9) {

	gCurrentMaze = maze;
	gSensitivity = sensitivity;

	const wallTextureIdx = Math.floor(Math.random() * gWallTextures.length);

	teleporters.add(maze, gWallTextures[wallTextureIdx]);

	// --- PHYSICS ---

	// clear the old maze from the physics world, if one exists
	if (gMazePhysicsBodies.length > 0) {
		gMazePhysicsBodies.forEach((body) => gPhysicsWorld.destroyBody(body));
		gMazePhysicsBodies.length = 0;
	}

	const bodyDefinition = {
		type: 'static',
		position: {x: 0, y: 0},
		userData: 'wall',
	};

	const boxShape = new planck.BoxShape(0.5, 0.5);

	for (let x = 0; x < maze.size.x; x++) {
		for (let z = 0; z < maze.size.z; z++) {
			if (maze.data[x][z] === false) {
				bodyDefinition.position = {x, y: z};
				const mazeBody = gPhysicsWorld.createBody(bodyDefinition);
				gMazePhysicsBodies.push(mazeBody);
				mazeBody.createFixture({shape: boxShape});
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

	gWallMesh = mazeMesh(maze, wallTextureIdx);
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
 * @param {Number} textureIdx
 * @returns {THREE.InstancedMesh}
 */
function mazeMesh(maze, textureIdx) {

	const cube_geo = new THREE.BoxGeometry(1, config.mazeHeight, 1);
	const map = gWallTextures[textureIdx];
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


/**
 * Tell the maze where the player currently is (3D world X,Y,Z position)
 * @param {number} x
 * @param {number} y
 * @param {number} z
 * @param {number} delta
 */
function updatePlayerPosition(x, y, z, delta) {

	gPlayerPos.x = x;
	gPlayerPos.y = y;
	gPlayerPos.z = z;

	addDistance(delta);	// status

	const gridX = Math.floor(x + 0.5);
	const gridZ = Math.floor(z + 0.5);

	const oldGridPos = {x: gPlayerGridInfo.x, z: gPlayerGridInfo.z};
	const newGridPos = {x, z};

	if (gridX === oldGridPos.x && gridZ === oldGridPos.z) {
		// grid square has not changed
		return;
	}

	// @TODO: onSquareChange callbacks

	const oldGridType = gPlayerGridInfo.type;

	gPlayerGridInfo.x = gridX;
	gPlayerGridInfo.z = gridZ;

	if (gridX >= 0 && gridX < gCurrentMaze.size.x && gridZ >= 0 && gridZ < gCurrentMaze.size.z) {
		gPlayerGridInfo.type = gCurrentMaze.data[gPlayerGridInfo.x][gPlayerGridInfo.z];
	} else {
		gPlayerGridInfo.type = 'O'; // outside maze
	}

	if (gPlayerGridInfo.type === oldGridType) {
		return;
	}

	if (gPlayerGridInfo.type === 'K') {
		key.collect();
		gCurrentMaze.data[gPlayerGridInfo.x][gPlayerGridInfo.z] = 'D';
	}

	gOnTypeChangeCallbacks.forEach((el) => {
		if ((el.from === null || el.from === oldGridType) &&
			(el.to === null || el.to === gPlayerGridInfo.type))
		{
			el.callback(oldGridType, gPlayerGridInfo.type, oldGridPos, newGridPos);
		}
	});
}


/**
 * @param {OnTypeChange} callback
 * @param {String|null} to
 * @param {String|null} from
 */
function registerOnTypeChange(callback, to = null, from = null) {
	gOnTypeChangeCallbacks.push({from, to, callback});
}


/**
 * Returns the details of the maze square the player is currently in
 * @returns {{x:number,z:number,type:string}}
 */
function getPlayerGridInfo() {
	return gPlayerGridInfo;
}


function update() {
	return teleporters.update();
}


const _MODULE = 'maze.js';


export {
	_MODULE,
	loadAssets,
	setup,
	create,
	updatePlayerPosition,
	getPlayerGridInfo,
	registerOnTypeChange,
	update,
};
