/* SPDX-License-Identifier: 0BSD */

import * as THREE from 'three';
import global from './global';
import config from './config';


/** @type {Object.<string, ArrayBuffer>} */
const gBuffers = {};
/** @type {Object.<string, THREE.Audio>} */
const gSounds = {};
/** @type {Object.<string, string>} */
const gSoundFiles = {};
/** @type {Object.<string, string[]>} */
const gSoundGroups = {};
/** @type {THREE.AudioListener} */
let gListener = null;
/** @type {Boolean} */
let gSoundInitDone = false;
/** @type {Boolean} */
let gIsFirefox = false;


/**
 * @param {THREE.LoadingManager} manager
 */
function loadAssets(manager) {

	const fileLoader = new THREE.FileLoader(manager);
	fileLoader.setResponseType('arraybuffer');

	for (const sound in gSoundFiles) {
		if (Object.hasOwn(gSoundFiles, sound)) {
			fileLoader.load(
				config.soundsDir + gSoundFiles[sound],
				/** @param {ArrayBuffer} buf */
				(buf) => {
					gBuffers[sound] = buf.transfer();
				}
			);
		}
	}
}


/**
 * @param {Object.<string, string>} assetObj
 */
function addAssets(assetObj) {
	for (const assetName in assetObj) {
		if (Object.hasOwn(assetObj, assetName)) {
			gSoundFiles[assetName] = assetObj[assetName];
		}
	}
}


/**
 * @param {Object.<string, string[]>} groupObj
 */
function addGroups(groupObj) {
	for (const groupName in groupObj) {
		if (Object.hasOwn(groupObj, groupName)) {
			gSoundGroups[groupName] = groupObj[groupName];
		}
	}
}


function setup() {
	document.body.addEventListener('click', () => {
		if (!gSoundInitDone) {
			initSounds();
		}
	}, {once: true});

	gIsFirefox = /firefox/i.test(navigator.userAgent);

	document.body.addEventListener('keydown', handleKeyDown, {once: true});
}


/**
 * @param {KeyboardEvent} e
 */
function handleKeyDown(e) {

	// it appears that firefox does not consider pressing a key, with a name longer than
	// one character, to be a "user gesture" for the purposes of AudioContext creation
	if (gIsFirefox && e.key.length > 1) {
		if (!gSoundInitDone) {
			// wait for the next keydown event to try again
			document.body.addEventListener('keydown', handleKeyDown, {once: true});
		}
		return;
	}

	if (!gSoundInitDone) {
		initSounds();
	}
}


function initSounds() {

	gListener = new THREE.AudioListener();
	global.camera.add(gListener);

	const audioContext = new AudioContext();

	for (const buffer in gBuffers) {
		if (Object.hasOwn(gBuffers, buffer)) {
			if (!gSounds[buffer]) {
				gSounds[buffer] = new THREE.Audio(gListener);
				audioContext.decodeAudioData(
					gBuffers[buffer],
					(buf) => {
						gSounds[buffer].setBuffer(buf);
						gSounds[buffer].setLoop(false);
						delete gBuffers[buffer];
					}
				);
			}
		}
	}

	gSoundInitDone = true;
}


/**
 * Play the named sound
 * @param {string} soundName
 * @returns boolean
 */
function play(soundName) {

	if (gListener === null) {
		return true;
	}

	if (gSounds[soundName]) {
		if (gSounds[soundName].isPlaying) {
			gSounds[soundName].stop();
		}
		gSounds[soundName].play();
		return true;
	}

	return false;
}


/**
 * Play a sound selected randomly from the named group
 * @param {string} groupName
 */
function playFromGroup(groupName) {

	if (gListener === null) {
		return true;
	}

	if (gSoundGroups[groupName]) {
		const len = gSoundGroups[groupName].length;
		if (len > 0) {
			const idx = Math.floor(Math.random() * len);
			const soundName = gSoundGroups[groupName][idx];
			if (play(soundName)) {
				return true;
			}
			gSoundGroups[groupName].splice(idx, 1);
			return false;
		} else {
			return false;
		}
	}

	return false;
}


const _MODULE = 'sounds.js';


export {
	_MODULE,
	loadAssets,
	setup,
	play,
	playFromGroup,
	addAssets,
	addGroups,
};
