/* SPDX-License-Identifier: 0BSD */

import '../types';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import * as planck from 'planck';
import global from '../global';
import config from '../config';
import * as sounds from '../sounds';
import * as player from '../player';
import fragmentShader from '../shaders/teleport_fragment.glsl';
import vertexShader from '../shaders/teleport_vertex.glsl';


const {PI} = Math;
const HALF_PI = PI / 2;
const TWO_PI = PI * 2;

/** @type {THREE.Mesh} */
let gArchMesh;
/** @type {THREE.Mesh} */
let gFrontPlaneMesh;
/** @type {THREE.Mesh} */
let gBackPlaneMesh;
/** @type {THREE.Mesh} */
let gRearBoxMesh;
/** @type {THREE.Material} */
let gRearBoxMaterial;

/** @type {Boolean} */
let gWasSetupCalled = false;

const gTpShapeHoriz = new planck.BoxShape(0.5, 0.01);
const gTpShapeVert = new planck.BoxShape(0.01, 0.5);

/** @type {Teleporter[]} */
const gTeleporters = [];

/** @type {ThreeMFLoader.ShaderMaterial} */
let gFrontPlaneMaterial;
/** @type {ThreeMFLoader.ShaderMaterial} */
let gBackPlaneMaterial;
/** @type {planck.World} */
let gPhysicsWorld;
/** @type {THREE.Scene} */
let gScene;


/**
 * @param {THREE.LoadingManager} manager
 */
function loadAssets(manager) {

	const modelLoader = new GLTFLoader(manager);

	modelLoader.load(
		config.modelDir + config.teleportModelFile,
		(gltf) => {
			gArchMesh = gltf.scene;
			gArchMesh.scale.set(0.34, 0.34, 2.0);
		},
		undefined,
		() => {
			gArchMesh = global.errorMesh.clone();
		}
	);

	sounds.addAssets(config.teleportSounds);
}


function setup() {

	gPhysicsWorld = global.physicsWorld;
	gScene = global.scene;
	gRearBoxMaterial = new THREE.MeshPhongMaterial();

	const planeGeo = new THREE.PlaneGeometry(0.79, 1.08);

	gFrontPlaneMaterial = new THREE.ShaderMaterial({
		uniforms: {
			u_ticks: { value: 1.0 },
			u_opacity: { value: 0.6 },
			u_rgb: { value: {r: 0.5, g: 0.5, b: 0.0} },
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
	});

	gBackPlaneMaterial = new THREE.ShaderMaterial({
		uniforms: {
			u_ticks: { value: 0.0 },
			u_opacity: { value: 0.92 },
			u_rgb: { value: {r: 0.0, g: 0.4, b: 0.3} },
		},
		vertexShader: vertexShader,
		fragmentShader: fragmentShader,
		transparent: true,
	});

	gFrontPlaneMesh = new THREE.Mesh(planeGeo, gFrontPlaneMaterial);
	gBackPlaneMesh = new THREE.Mesh(planeGeo, gBackPlaneMaterial);

	const rearBoxGeo = new THREE.BoxGeometry(1, config.mazeHeight, 0.14);
	fixupRearBoxUVs(rearBoxGeo, 0.14);
	gRearBoxMesh = new THREE.Mesh(rearBoxGeo, gRearBoxMaterial);

	gPhysicsWorld.addContactCallback('ball', 'teleporter', collision);
	gWasSetupCalled = true;
}


/**
 * Modifies the UV values on the rearBox geometry to stop the texture being squashed
 * @param {THREE.BoxGeometry} boxGeo
 * @param {Number} value
 */
function fixupRearBoxUVs(boxGeo, value) {
	/** @type {THREE.BufferAttribute} */
	const uv = boxGeo.getAttribute('uv');
	[0, 4, 10, 14, 21, 23, 25, 27].forEach((i) => { uv.array[i] = value; });
	[2, 6, 17, 19].forEach((i) => { uv.array[i] = 0; });
	uv.needsUpdate = true;
}


/**
 * @param {MazeObject} maze
 * @param {THREE.Texture} texture
 */
function add(maze, texture) {

	if (!gWasSetupCalled) {
		return;
	}

	// levels 1 & 2
	if (maze.size.z < 11) {
		return;
	}

	removeExisting();

	// change the rearBox material texture to match the current maze walls
	if (gRearBoxMaterial.map) {
		gRearBoxMaterial.map.dispose();
	}
	gRearBoxMaterial.map = texture.clone();

	// level 3+
	const tpZ = Math.floor((maze.size.z - 1) / 2);
	makeTeleporter(1, 0, tpZ, 'R', 2, maze);
	makeTeleporter(2, maze.size.x - 1, tpZ, 'L', 1, maze);
	// mark squares used to prevent mazeMesh() putting a wall there
	maze.data[0][tpZ] = 'T';
	maze.data[maze.size.x - 1][tpZ] = 'T';
	// force square in front of teleporter to be empty if it is a wall
	if (maze.data[1][tpZ] === false) {
		maze.data[1][tpZ] = '';
	}
	if (maze.data[maze.size.x - 2][tpZ] === false) {
		maze.data[maze.size.x - 2][tpZ] = '';
	}

	// level 5+
	if (maze.size.x > 13) {
		const tpX = Math.floor((maze.size.x - 1) / 2);
		makeTeleporter(3, tpX, 0, 'D', 4, maze);
		makeTeleporter(4, tpX, maze.size.z - 1, 'U', 3, maze);
		maze.data[tpX][0] = 'T';
		maze.data[tpX][maze.size.z - 1] = 'T';
		if (maze.data[tpX][1] === false) {
			maze.data[tpX][1] = '';
		}
		if (maze.data[tpX][maze.size.z - 2] === false) {
			maze.data[tpX][maze.size.z - 2] = '';
		}
	}

	// add the teleporters to the 3D scene
	gTeleporters.forEach((el) => {
		if (el.active) {
			gScene.add(el.meshGroup);
		}
	});
}


/**
 * Remove any existing teleporters from the 3D scene and physics world
 */
function removeExisting() {
	gTeleporters.forEach((el) => {
		gScene.remove(el.meshGroup);
		// destroyBody() implicitly destroys all the body's fixtures
		if (el.triggerBody !== null) {
			gPhysicsWorld.destroyBody(el.triggerBody);
			el.triggerBody = null;
		}
		if (el.rearBoxBody !== null) {
			gPhysicsWorld.destroyBody(el.rearBoxBody);
			el.rearBoxBody = null;
		}
		el.active = false;
	});
}


/**
 * @param {Number} index
 * @param {Number} x
 * @param {Number} z
 * @param {'L'|'R'|'U'|'D'} entrySide
 * @param {Number} targetIndex
 */
function makeTeleporter(index, x, z, entrySide, targetIndex) {

	const dir = {x: 0, z: 0, meshRotation: 0};

	let cameraRotation;

	switch (entrySide) {
		case 'R':
			dir.x = -1;
			dir.meshRotation = HALF_PI;
			cameraRotation = -HALF_PI;
		break;

		case 'L':
			dir.x = 1;
			dir.meshRotation = -HALF_PI;
			cameraRotation = HALF_PI;
		break;

		case 'D':
			dir.z = -1;
			dir.meshRotation = 0;
			cameraRotation = 0;
		break;

		case 'U':
			dir.z = 1;
			dir.meshRotation = PI;
			cameraRotation = PI;
		break;

		default:
			console.warn('invalid entrySide value:', entrySide);
		return;
	}

	if (!gTeleporters[index]) {
		gTeleporters[index] = {meshGroup: null};
	}

	const tp = gTeleporters[index];

	// --- 3D ---

	if (tp.meshGroup === null) {

		tp.meshGroup = new THREE.Group();

		const archMesh = gArchMesh.clone();
		archMesh.position.set(0, 0, 0.23);
		tp.meshGroup.add(archMesh);

		const frontPlaneMesh = gFrontPlaneMesh.clone();
		frontPlaneMesh.position.set(0, 0.5, -0.12);
		tp.meshGroup.add(frontPlaneMesh);

		const backPlaneMesh = gBackPlaneMesh.clone();
		backPlaneMesh.position.set(0, 0.5, -0.27);
		tp.meshGroup.add(backPlaneMesh);

		const rearBoxMesh = gRearBoxMesh.clone();
		rearBoxMesh.position.set(0, config.mazeHeight / 2, -0.43);
		tp.meshGroup.add(rearBoxMesh);
	}

	tp.meshGroup.position.set(x, 0, z);
	tp.meshGroup.rotation.set(0, dir.meshRotation, 0);

	// --- PHYSICS ---

	const tpShape = (dir.x !== 0) ? gTpShapeVert : gTpShapeHoriz;

	const planeDef = {
		type: 'static',
		position: {x: x + (dir.x * 0.44), y: z + (dir.z * 0.44)},
		userData: {name: 'teleporter', id: index},
	};

	tp.triggerBody = gPhysicsWorld.createBody(planeDef);
	tp.triggerBody.createFixture({shape: tpShape});

	planeDef.position = {x: x + (dir.x * 0.5), y: z + (dir.z * 0.5)};
	planeDef.userData = {};

	tp.rearBoxBody = gPhysicsWorld.createBody(planeDef);
	tp.rearBoxBody.createFixture({shape: tpShape});

	// -- OTHER --

	tp.index = index;
	tp.target = targetIndex;
	// position to place the player when they arrive at this teleporter from another
	tp.exit = {x: x + (dir.x * 0.08), z: z + (dir.z * 0.08)};
	tp.cameraRotation = cameraRotation;
	tp.active = true;
}


/**
 * @param {planck.Contact} _c
 * @param {TpUserData} _u
 * @param {TpUserData} userDataB
 * @returns {void}
 */
function collision(_c, _u, userDataB) {

	if (!gWasSetupCalled) {
		return;
	}

	const tpIn = gTeleporters[userDataB.id];

	if (!tpIn.target) {
		console.warn('no destination teleporter set:', userDataB.id);
		return;
	}

	if (!gTeleporters[tpIn.target]) {
		console.warn('destination teleporter does not exist:', tpIn.target);
		return;
	}

	const tpOut = gTeleporters[tpIn.target];

	if (!tpOut.exit) {
		console.warn('destination has no exit data:', tpIn.target);
		return;
	}

	const rotation = (tpOut.cameraRotation - tpIn.cameraRotation + PI) % TWO_PI;

	const vel = player.getLinearVelocity().clone();

	const newvel = new THREE.Vector2(vel.x, vel.y);
	newvel.rotateAround({x: 0, y: 0}, rotation);
	// going through the teleporter has a little bit of resistance
	newvel.multiplyScalar(0.75);

	// cannot update position or velocity while in a physics engine callback
	player.deferredPositionUpdate(tpOut.exit, newvel, rotation);

	sounds.play('teleport');
}


/**
 * @returns {Boolean} true if teleporters need a renderer update
 */
function update() {
	if (!gWasSetupCalled || global.idleMode) {
		return false;
	}
	gFrontPlaneMaterial.uniforms.u_ticks.value += 0.00000020;
	gBackPlaneMaterial.uniforms.u_ticks.value += 0.00000009;
	return true;
}


const _MODULE = 'teleporters.js';


export {
	_MODULE,
	add,
	loadAssets,
	setup,
	update,
};
