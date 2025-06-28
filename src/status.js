/* SPDX-License-Identifier: 0BSD */

/** @type {HTMLDivElement} */
let gStatusBar = null;
/** @type {Number} */
let gLevel = 0;
/** @type {Number} */
let gImpacts = 0;
/** @type {Number} */
let gDistance = 0;
/** @type {Number} */
let gDistanceRound = 0;
/** @type {Number} */
let gLastDistance = 0;


/**
 * @returns {Number}
 */
function setup() {
	gStatusBar = document.createElement('div');
	gStatusBar.id = 'statusBar';
	gStatusBar.classList.add('status');
	document.body.append(gStatusBar);
}


function message(...messages) {
	if (gStatusBar) {
		gStatusBar.innerHTML = messages.join(' ');
	}
}


function setLevel(lvl) {
	if (lvl !== gLevel) {
		gLevel = lvl;
		gImpacts = 0;
		gDistance = 0;
		refresh();
	}
}


function addImpact() {
	gImpacts++;
	refresh();
}


function addDistance(d) {
	gDistance += d;
	gDistanceRound = Math.round(gDistance);
	if (gDistanceRound !== gLastDistance) {
		gLastDistance = gDistanceRound;
		refresh();
	}
}


function refresh() {
	// @TODO: make this look better
	gStatusBar.innerHTML = 'Level: ' + gLevel + ' &nbsp; Distance Rolled: ' +
		gDistanceRound + ' &nbsp; Wall Impacts: ' + gImpacts;
}


const _MODULE = 'status.js';


export {
	_MODULE,
	setup,
	message,
	setLevel,
	addImpact,
	addDistance,
};
