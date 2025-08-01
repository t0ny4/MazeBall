/* SPDX-License-Identifier: 0BSD */

const config = {

	_MODULE: 'config.js',

	// used in multiple files
	ballRadius:			0.3,				// debug.js, objects/ball.js
	bgColour:			0x100000,			// render.js, objects/maze.js
	playerLightLevel:	0.9,				// player.js, render.js
	textureDir:			'./textures/128/',	// objects/ball.js, objects/maze.js, objects/key.js


	// main.js
	randomSeed:			0,		// for debugging, falsy value = don't use a seed


	// sounds.js
	soundsDir:			'./sounds/',


	// key.js
	modelDir:			'./models/',
	keyModelFile:		'Key.glb',
	baseModelFile:		'TeleporterBase.glb',
	doorModelFile:		'ArchDoor.glb',
	/** @type {Object.<string, string | SoundInfo>} */
	keySounds:			{
		keyPickup:	{filename: 'DM-CGS-07.ogg', volume: 0.4},
	},
	/** @type {Object.<string, string[]>} */
	keySoundGroups: {
	},


	// objects/ball.js
	ballTextureFile:	'Tile1.png',
	minVelocity:		0.1,


	// objects/maze.js
	exitLightY:		0.4,
	floorTextureFiles:	['Tile8.png', 'Tile16.png', 'Tile24.png', 'Tile25.png'],
	mazeHeight:		1.2,
	wallTextureFiles:	[
		'Tile11.png', 'Tile4.png', 'Tile18.png',
		'Tile20.png', 'Tile21.png', 'Tile23.png',
	],
	/** @type {Object.<string, string | SoundInfo>} */
	mazeSounds: {
		locked: {filename: 'DM-CGS-10.ogg', volume: 0.3},
		dm12:   {filename: 'DM-CGS-12.ogg', volume: 0.25},
		dm26:   {filename: 'DM-CGS-26.ogg', volume: 0.4},
		wallhit: {filename: 'DM-CGS-03.ogg', volume: 0.05},
	},
	/** @type {Object.<string, string[]>} */
	mazeSoundGroups: {
		mazeExit: ['dm12', 'dm26'],
	},


	// objects/teleporters.js
	teleportModelFile: 'ArchRound.glb',
	/** @type {Object.<string, string | SoundInfo>} */
	teleportSounds: {
		teleport: {filename: 'DM-CGS-42.ogg', volume: 0.1},
	},


	// controls.js
	controlKeys: {
		up:		['ArrowUp',		'w', 'k'],
		down:	['ArrowDown',	's', 'j'],
		left:	['ArrowLeft',	'a', 'h'],
		right:	['ArrowRight',	'd', 'l'],
	},
	keys: {
		orbit_controls: 'control>enter',
		house_lights: 'shift>enter',
		first_person: '+',
		jump: '@Space',
		cycle_minimap: 'm',
	},


	// first_person.js
	mouseSensitivity:	0.005,


	// minimap.js
	mapWidthRatio:		0.25,
	mapBorderRatio:		0.0125,


	// player.js
	idleTimeout:		15,	// seconds
	keyForce:			0.4,
	lightYpos:			1.4,


	// jump.js
	/** @type {Object.<string, string | SoundInfo>} */
	jumpSounds: {
		jump: {filename: 'DM-CGS-21.ogg', volume: 0.3},
	},


	// render.js
	cameraEase:		0.08,	// max 1.0 (default: 0.08) [1.0 = no easing]
	cameraExitEase:	0.04,	// a different easing for after the player has exited the maze
	defaultCameraY: 4,
	enableShadows:	true,
	exitLightLevel:	0.5,
	sunLightLevel:	0.4,
};


const handler = {
	get(target, prop) {
		if (prop in target) {
			return target[prop];
		}
		console.error('Cannot read non existent property "' + prop + '" from config');
		throw new Error();
	},
	set(_, prop) {
		console.error('Cannot write to property "' + prop + '" on config');
		throw new Error();
	},
	deleteProperty(_, prop) {
		console.error('Cannot delete property "' + prop + '" from config');
		throw new Error();
	}
};


/**
 * freeze() and Proxy ensure that only existing properties of the object can be used
 *  and that they are read only.
 * @type {config}
 */
export default new Proxy(Object.freeze(config), handler);

// export default config;
