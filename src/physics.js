/* SPDX-License-Identifier: 0BSD */

import * as planck from 'planck';
import global from './global';


/** @type {planck.World} */
let gWorld;
/**  @type {Object.<string, Object.<string, {callback: Function | Function[], last: Number}>} */
const gContacts = {};


function setup() {

	gWorld = new planck.World({
		gravity: new planck.Vec2(0, 0),
	});

	gWorld.addContactCallback = addContactCallback;
	global.physicsWorld = gWorld;

	gWorld.on('begin-contact', (c) => {

		const userDataA = c.m_nodeA.other.m_userData;
		const userDataB = c.m_nodeB.other.m_userData;

		if (userDataA === undefined || userDataB === undefined) {
			return;
		}

		const nameA = (typeof userDataA === 'object') ? userDataA.name : userDataA;
		const nameB = (typeof userDataB === 'object') ? userDataB.name : userDataB;

		if (!gContacts[nameA] || !gContacts[nameA][nameB]) {
			return;
		}

		const contact = gContacts[nameA][nameB];

		// debounce
		const now = performance.now();
		if (now - contact.last < 250) {
			return;
		}
		contact.last = now;

		if (typeof contact.callback === 'function') {
			contact.callback(c, userDataA, userDataB);
			return;
		}

		// not a function? must be an array
		contact.callback.forEach((cb) => { cb(c, userDataA, userDataB); });
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
		gContacts[srcObjName][targetObjName].last = 0;
		gContacts[srcObjName][targetObjName].callback = callback;
		return;
	}

	if (typeof gContacts[srcObjName][targetObjName].callback === 'function') {
		const oldCallback = gContacts[srcObjName][targetObjName].callback;
		gContacts[srcObjName][targetObjName].callback = [oldCallback];
	}

	gContacts[srcObjName][targetObjName].callback.push(callback);
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
