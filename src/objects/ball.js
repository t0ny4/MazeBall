/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import * as planck from 'planck';
import global from '../global';
import config from '../config';


const gVec2ZeroZero = new planck.Vec2(0, 0);
const gAxisMatrix = new THREE.Matrix4();
const gBallRadius = config.ballRadius;
const gMinVelocity = config.minVelocity;

/** @type {THREE.Mesh} */
let gBallMesh;
/** @type {planck.Body} */
let gPhysicsBody;
/** @type {THREE.Texture} */
let gBallTexture;


/** @returns {Promise<boolean>} */
function loadAssets() {

	return new Promise((resolve, reject) => {

		const textureLoader = new THREE.TextureLoader();

		textureLoader.load(config.textureDir + '/ball/' + config.ballTextureFile,
			(tex) => {
				gBallTexture = tex;
				gBallTexture.colorSpace = THREE.SRGBColorSpace;
				resolve(true);
			},
			null,
			(err) => {
				reject('failed to load texture ' + err.target.src);
			}
		);
	});
}


/**
 * @returns {[planck.Body, THREE.Mesh]}
 */
function setup() {

	gPhysicsBody = global.physicsWorld.createBody({
		type: 'dynamic',
		position: gVec2ZeroZero,
		awake: false,
		fixedRotation: true,
	});

	gPhysicsBody.createFixture({
		shape: new planck.CircleShape(gVec2ZeroZero, gBallRadius),
		restitution: 0.15,
		density: 0.2,
	});

	// create and add the ball
	const geometry = new THREE.SphereGeometry(gBallRadius);
	const material = new THREE.MeshLambertMaterial({map: gBallTexture});

	gBallMesh = new THREE.Mesh(geometry, material);
	gBallMesh.position.y = gBallRadius;
	gBallMesh.castShadow = true;

	global.scene.add(gBallMesh);

	return [gPhysicsBody, gBallMesh];
}


/**
 * @returns {boolean} true if the object is moving
 */
function update() {

	// --- PHYSICS ---

	if (gPhysicsBody.isAwake()) {
		// returns a reference, changes to it affect the gPhysicsBody
		// (no need for setLinearVelocity())
		const velocity = gPhysicsBody.getLinearVelocity();

		// the 3D ball's "down" is in the dimension that the 2D physics engine doesn't have
		// meaning there is no gravity in that direction and, therefore, no friction.
		// lets fake some friction
		velocity.mul(0.98);

		// limit min velocity
		if (Math.abs(velocity.x) < gMinVelocity && Math.abs(velocity.y) < gMinVelocity) {
			velocity.x = 0;
			velocity.y = 0;
		}
	}

	const physBallPos = gPhysicsBody.getPosition();

	// --- 3D ---

	const physBallPosZ = physBallPos.y; // makes the following code easier to read

	// the distance the physics ball has travelled ahead of the 3D ball's position
	const distanceX = physBallPos.x - gBallMesh.position.x;
	const distanceZ = physBallPosZ - gBallMesh.position.z;

	if (distanceX !== 0 || distanceZ !== 0) {
		// update 3D ball position to match physics ball
		gBallMesh.position.set(physBallPos.x, gBallRadius, physBallPosZ)

		// no need to calculate rotation in 1st person mode, as ball can't be seen
		if (!global.firstPersonModeActive) {
			// distance travelled / radius = rotation in radians
			gAxisMatrix.makeRotationZ(-distanceX / gBallRadius);
			gBallMesh.matrix.premultiply(gAxisMatrix);
			gAxisMatrix.makeRotationX(distanceZ / gBallRadius);
			gBallMesh.matrix.premultiply(gAxisMatrix);
			gBallMesh.rotation.setFromRotationMatrix(gBallMesh.matrix);
		}

		return true;
	}

	return false;
}


/**
 * @returns {number}
 */
function getCameraHeight() {
	return gBallRadius;
}


/**
 * @param {bool} b
 */
function hide(b) {
	gBallMesh.visible = !b;
}


const _MODULE = 'ball.js';


export {
	_MODULE,
	getCameraHeight,
	hide,
	loadAssets,
	setup,
	update,
};
