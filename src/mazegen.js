/* SPDX-License-Identifier: 0BSD */

import './types';

const HALF_PI = Math.PI / 2;


/**
 * create a maze that is entirely solid apart from the exit hole in the outer wall
 * @param {Number} level
 * @return {MazeObject}
 */
function generateSolidMaze(level) {

	const sizeX = 5 + (level * 2);
	const sizeZ = sizeX;

	/** @type {MazeObject} */
	const maze = {
		size: {x: sizeX, z: sizeZ},
		start: {x: 0, z: 0, angle: 0},
		exit: {x: 0, z: 0},
		data: Array.from({length: sizeX}, () => Array(sizeZ).fill(false)),
	};

	let pos = generateStartAndExit(maze.size);

	maze.start = pos.start;
	maze.exit = pos.exit;

	// punch a hole in the outer wall for the player to exit through
	maze.data[maze.exit.x][maze.exit.z] = 'E';

	maze.start.angle = 0;

	return maze;
}


/**
 * generate a maze with no internal walls, for debugging
 * @param {Number} level
 * @return {MazeObject}
 */
function generateEmptyMaze(level) {

	const maze = generateSolidMaze(level);

	// carve out the entire maze, except the outer walls
	for (let x = 1; x < maze.size.x - 1; x++) {
		for (let z = 1; z < maze.size.z - 1; z++) {
			maze.data[x][z] = true;
		}
	}

	return maze;
}


/**
 * generate a maze with a random internal path
 * @param {Number} level
 */
function generateRandomMaze(level) {

	const maze = generateSolidMaze(level);

	makePathFrom(maze, maze.start.x, maze.start.z);

	// calculate the angle the 1st person mode player needs to face
	// so they aren't staring straight at a wall

	const x = maze.start.x;
	const z = maze.start.z;

	let rot = 0; // default to up

	if (maze.data[x - 1][z] !== false) { // left
		rot = 1;
	} else if (maze.data[x][z + 1] !== false) { // down
		rot = 2;
	} else if (maze.data[x + 1][z] !== false) { // right
		rot = 3;
	}

	maze.start.angle = rot * HALF_PI;

	return maze;
}


/**
 * recursive function to create the maze path
 * @param {{data: [][], size : {x: number, z: number}}} maze
 * @param {number} x
 * @param {number} z
 * @param {number} counter
 * @returns void
 */
function makePathFrom(maze, x, z, counter = 1) {

	const id = counter;
	counter++;

	// mark the inital square as part of the path
	// make it a string so that viewmaze.html knows it is the initial square
	maze.data[x][z] = '' + id;

	while (true) {

		// build an array of directions where the next but one
		// square exists and is a "wall" (value === false)
		const available = [];
		let dir;

		// up
		if (z < maze.size.z - 3 && maze.data[x][z + 2] === false) {
			available.push([0, 1]);
		}

		// right
		if (x < maze.size.x - 3 && maze.data[x + 2][z] === false) {
			available.push([1, 0]);
		}

		// down
		if (z > 2 && maze.data[x][z - 2] === false) {
			available.push([0, -1]);
		}

		// left
		if (x > 2 && maze.data[x - 2][z] === false) {
			available.push([-1, 0]);
		}

		// path has hit a dead end, this iteration is done
		if (available.length == 0) {
			return;
		}

		if (available.length == 1) {
			// this is the only available direction
			dir = available[0];
		} else {
			// pick one of the available directions at random
			dir = available[Math.floor(Math.random() * available.length)];
		}

		// mark the adjacent square in the chosen direction as part of the path
		maze.data[x + dir[0]][z + dir[1]] = id;

		// the next but one square in the chosen direction is the starting
		// point for the next iteration
		makePathFrom(maze, x + dir[0] * 2, z + dir[1] * 2, counter);

		// if there was only one direction available previously, there can't be any
		// directions left now. this iteration is done.
		if (available.length == 1) {
			return;
		}
	}
}


/**
 * Pick a random corner to start in. The exit has a 50% chance of being in the
 *  diagonally opposite corner and a 25% chance of being in either of the 2 other
 *  corners. The exit will be either horizontal or vertical with a 50% chance.
 * @param {{x: number, z: number}} size
 */
function generateStartAndExit(size) {

	const start = {};
	const exit = {};

	let top = Math.random() > 0.5;
	let left = Math.random() > 0.5;

	start.z = top ? size.z - 2 : 1;
	start.x = left ? 1 : size.x - 2;

	const r = Math.random();
	if (r > 0.5) {
		// exit diagonal opposite
		top = !top;
		left = !left;
	} else if (r > 0.25) {
		top = !top;
	} else {
		left = !left;
	}

	exit.z = top ? size.z - 2 : 1;
	const dz = top ? 1 : -1;
	exit.x = left ? 1 : size.x - 2;
	const dx = left ? -1 : 1;

	// exit vertical or horizontal
	if (Math.random() > 0.5) {
		exit.z += dz;
	} else {
		exit.x += dx;
	}

	return {start, exit};
}


const _MODULE = 'mazegen.js';


export {
	_MODULE,
	//generateSolidMaze as generateMazeData,
	//generateEmptyMaze as generateMazeData,
	generateRandomMaze as generateMazeData,
};
