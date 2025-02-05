/* SPDX-License-Identifier: 0BSD */

import * as planck from 'planck';
import global from './global';


/** @type {planck.World} */
let gWorld;
/**  @type {Object.<string, Object.<string, {callback: Function, last: Number}>} */
const gContacts = {};


function setup() {

	gWorld = new planck.World({
		gravity: new planck.Vec2(0, 0),
	});

	global.physicsWorld = gWorld;
	global.physicsWorld.addContactCallback = addContactCallback;

	gWorld.on('begin-contact', (c) => {

		const objectA = c.m_nodeA.other.m_userData;
		const objectB = c.m_nodeB.other.m_userData;

		if (objectA === undefined || objectB === undefined) {
			return;
		}

		if (!gContacts[objectA] || !gContacts[objectA][objectB]) {
			return;
		}

		const contact = gContacts[objectA][objectB];

		// debounce
		const now = performance.now();
		if (now - contact.last < 250) {
			return;
		}
		contact.last = now;

		contact.callback();
	});
}


/**
 * @param {string} srcObjName
 * @param {string} targetObjName
 * @param {Function} callback
 */
function addContactCallback(srcObjName, targetObjName, callback) {

	if (!gContacts[srcObjName]) {
		gContacts[srcObjName] = {};
	}

	if (!gContacts[srcObjName][targetObjName]) {
		gContacts[srcObjName][targetObjName] = {};
	}

	gContacts[srcObjName][targetObjName].callback = callback;
	gContacts[srcObjName][targetObjName].last = 0;
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
