/* SPDX-License-Identifier: 0BSD */

import { bindKey, bindKeyCombo } from '@rwh/keystrokes';
import config from './config';

/**
 * 1 = right, -1 = left
 * @type {(-1|0|1)}
 */
let gKeyX = 0;
/**
 * 1 = down, -1 = up
 * @type {(-1|0|1)}
 */
let gKeyY = 0;


/**
 * binds the control keys
 */
function setup() {
	function down() { gKeyY += 1; }
	function up() { gKeyY -= 1; }
	function left() { gKeyX -= 1; }
	function right() { gKeyX += 1; }

	bindKey(config.controlKeys.up, { onPressed: up, onReleased: down});
	bindKey(config.controlKeys.down, { onPressed: down, onReleased: up});
	bindKey(config.controlKeys.left, { onPressed: left, onReleased: right});
	bindKey(config.controlKeys.right, { onPressed: right, onReleased: left});
}


/**
 * @param {Function} handler
 */
function bindMouseMove(handler) {
	addEventListener('pointermove', handler, false);
}


/**
 * @param {Function} handler
 */
function unbindMouseMove(handler) {
	removeEventListener('pointermove', handler);
}


/**
 * @param {string} key
 * @param {Function} handler
 */
function setKeyHandler(key, handler) {
	if (!config.keys[key]) {
		console.error('Unknown key index: ' + key);
		return;
	}
	const keystr = config.keys[key];
	if (keystr.includes('>')) {
		bindKeyCombo(keystr, handler);
	} else {
		bindKey(keystr, handler);
	}
}


const _MODULE = 'controls.js';


export {
	_MODULE,
	setup,
	bindMouseMove,
	gKeyX as keyX,
	gKeyY as keyY,
	setKeyHandler,
	unbindMouseMove,
};
