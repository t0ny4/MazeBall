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
 * }} MazeObject
 */

/*
	MazeObject.data is a 2D array representing the maze grid [x][z]
	 Values are:
	  false: a wall
	  'S' : initial player position (start)
	  'E' : final player position (end)
	  'H' : hole in maze wall (exit)
	  '.' : empty square
	  '*' : empty square on the path from 'S' to 'E'
	  'D' : a dead end

	 MazeObject.exit is the hole in the wall where the player escapes the maze

	 MazeObject.end is the square inside the maze, next to the exit
*/
