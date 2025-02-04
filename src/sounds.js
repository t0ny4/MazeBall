/* SPDX-License-Identifier: 0BSD */

import './types';
import * as THREE from 'three';
import global from './global';
import config from './config';


/** @type {Object.<string, ArrayBuffer>} */
const gBuffers = {};
/** @type {Object.<string, THREE.Audio>} */
const gSounds = {};
/** @type {Object.<string, {filename: string, volume: number}>} */
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

	for (const soundName in gSoundFiles) {
		if (Object.hasOwn(gSoundFiles, soundName)) {
			fileLoader.load(
				config.soundsDir + gSoundFiles[soundName].filename,
				/** @param {ArrayBuffer} buf */
				(buf) => {
					gBuffers[soundName] = buf.transfer();
				}
			);
		}
	}
}


/**
 * @param {Object.<string, string | SoundInfo>} assetObj
 */
function addAssets(assetObj) {
	for (const soundName in assetObj) {
		if (Object.hasOwn(assetObj, soundName)) {
			const soundData = assetObj[soundName];
			if (typeof soundData === 'string') {
				gSoundFiles[soundName] = {filename: soundData, volume: 1.0};
			} else if (typeof soundData === 'object') {
				if (soundData.filename) {
					gSoundFiles[soundName] = {filename: soundData.filename};
					gSoundFiles[soundName].volume = soundData.volume ? soundData.volume : 1.0;
				}
			}
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

	for (const soundName in gBuffers) {
		if (Object.hasOwn(gBuffers, soundName)) {
			if (!gSounds[soundName]) {
				gSounds[soundName] = new THREE.Audio(gListener);
				audioContext.decodeAudioData(
					gBuffers[soundName],
					(buf) => {
						gSounds[soundName].setBuffer(buf);
						gSounds[soundName].setLoop(false);
						gSounds[soundName].setVolume(gSoundFiles[soundName].volume);
						delete gBuffers[soundName];
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
