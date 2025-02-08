/* SPDX-License-Identifier: 0BSD */

/** @type {HTMLDivElement} */
let gStatusBar = null;
/** @type {Number} */
let gStatusHeight = 0;


/**
 * @returns {Number}
 */
function setup() {
	gStatusBar = document.createElement('div');
	gStatusBar.id = 'statusBar';
	gStatusBar.classList.add('status');
	document.body.append(gStatusBar);
	gStatusHeight = (gStatusBar === null) ? 0 : gStatusBar.clientHeight;
	return gStatusHeight;
}


function update(...messages) {
	if (gStatusBar) {
		gStatusBar.innerHTML = messages.join(' ');
	}
}


const _MODULE = 'status.js';


export {
	_MODULE,
	setup,
	update,
};
