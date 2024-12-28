/* SPDX-License-Identifier: 0BSD */

import * as planck from 'planck';
import global from './global';


/** @type {planck.World} */
let gWorld;


function setup() {

	gWorld = new planck.World({
		gravity: new planck.Vec2(0, 0),
	});

	global.physicsWorld = gWorld;
}


function update() {
	gWorld.step(1 / 60); // assume 60fps
	gWorld.clearForces();
}


const _MODULE = 'physics.js';


export {
	_MODULE,
	setup,
	update,
};
