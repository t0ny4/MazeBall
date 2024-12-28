/* SPDX-License-Identifier: 0BSD */

/** type definition(s) for the IDEs autocomplete system */

/**
 * The current level's maze
 * @typedef {{
 * 	size: {x: number, z: number},
 * 	start: {x: number, z: number, angle: number},
 * 	exit: {x: number, z: number},
 * 	data: (boolean | number | string)[][],
 * }} MazeObject
 */

/*
	MazeObject.data is a 2D array representing the maze grid [x][z]
	 false indicates that the square is a wall, any other value means it isn't
*/
