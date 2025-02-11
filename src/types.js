/* SPDX-License-Identifier: 0BSD */

/** type definition(s) for the IDEs autocomplete system */

/**
 * The current level's maze
 * @typedef {{
 * 	size: {x: number, z: number},
 * 	start: {x: number, z: number, angle: number},
 *  end: {x: number, z: number},
 * 	exit: {x: number, z: number},
 * 	data: (boolean | number | string)[][],
 *  deadends: [{x: number, z: number}],
 * }} MazeObject
 */

/**
 * @typedef {{
 *  key: false | {x: number, z: number},
 *  keyIndex: false | number,
 * }} MazeKey
 */

/**
 * @typedef { MazeObject & MazeKey } MazeWithKey
 */

/**
 * @typedef {{filename: string, volume?: number}} SoundInfo
 */

/**
 * @typedef {function(number,number,number,number):void} updatePositionCallback
 */

/**
 * @typedef {{x: number, z: number}} GridPosition
 */

/**
 * @callback RegisterOnTypeChange
 * @param {Function} callback
 * @param {String|null} to
 * @param {String|null} from
 * @returns {void}
 */

/**
 * @callback OnGridChange
 * @param {String} oldType
 * @param {String} newType
 * @param {GridPosition} oldGridPos
 * @param {GridPosition} newGridPos
 */

/**
 * @typedef {{from: string|null, to: string|null, callback: OnGridChange}} TypeChangeInfo
 */


/*
	MazeObject.data is a 2D array representing the maze grid [x][z]
	 Values from mazegen.js are:

	  false: a wall
	  'S' : initial player position (start)
	  'E' : final player position (end)
	  'H' : hole in maze wall (exit)
	  ''  : empty square
	  '*' : empty square on the path from 'S' to 'E'
	  'D' : a dead end

     Added by key.js
	  'K' : key
	  'L' : locked door

	 MazeObject.exit is the hole in the wall where the player escapes the maze
	 MazeObject.end is the square inside the maze, next to the exit
*/
