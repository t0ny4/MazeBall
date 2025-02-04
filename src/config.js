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
		keyPickup:	'DM-CGS-03.ogg',
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
	},
	/** @type {Object.<string, string[]>} */
	mazeSoundGroups: {
		mazeExit: ['dm12', 'dm26'],
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
	},


	// first_person.js
	mouseSensitivity:	0.005,


	// player.js
	idleTimeout:		15,	// seconds
	keyForce:			0.4,
	lightYpos:			1.4,


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
		throw new Error('Config has no property named ' + prop);
	},
	set(_, prop) {
		throw new Error('Config is read only, attempted to write to property named ' + prop);
	}
};

/**
 * freeze() and Proxy ensure that only existing properties of the object can be used
 *  and that they are read only.
 * @type {config}
 */
export default new Proxy(Object.freeze(config), handler);

// export default config;
