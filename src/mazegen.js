/* SPDX-License-Identifier: 0BSD */

import './types';
import aleaPRNG from './aleaPRNG';

const HALF_PI = Math.PI / 2;
const gMazeRnd = aleaPRNG();


/**
 * create a maze that is entirely solid apart from the exit hole in the outer wall
 * @param {Number} xSize
 * @param {Number} zSize
 * @param {*} [mazeSeed]
 * @return {MazeObject}
 */
function generateSolidMaze(xSize, zSize, mazeSeed) {

	// force dimensions to be odd and at least 3
	const x = xSize < 3 ? 3 : xSize | 1;
	const z = zSize < 3 ? 3 : zSize | 1;

	const size = {x, z};

	const seed = (mazeSeed === undefined) ? Math.random().toString().substring(2) : mazeSeed;

	gMazeRnd.seed(seed);

	/** @type {MazeObject} */
	const maze = {
		size,
		data: Array.from({length: size.x}, () => Array(size.z).fill(false)),
		deadends: [],
		seed: seed,
	};

	const pos = generateStartAndExit(size);

	maze.start = pos.start;
	maze.start.angle = 0;
	maze.end = pos.end;
	maze.exit = pos.exit;

	// punch a hole in the outer wall for the player to exit through
	maze.data[maze.exit.x][maze.exit.z] = 'H';

	return maze;
}


/**
 * generate a maze with no internal walls, for debugging
 * @param {Number} xSize
 * @param {Number} zSize
 * @param {*} seed
 * @return {MazeObject}
 */
function generateEmptyMaze(xSize, zSize, seed) {

	const maze = generateSolidMaze(xSize, zSize, seed);

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
 * @param {Number} xSize
 * @param {Number} zSize
 * @param {*} seed
 * @return {MazeObject}
 */
function generateRandomMaze(xSize, zSize, seed) {

	const maze = generateSolidMaze(xSize, zSize, seed);

	makePathFrom(maze, maze.start.x, maze.start.z);

	// calculate the angle the 1st person mode player needs to face
	// so they aren't staring straight at a wall

	const {x, z} = maze.start;

	let rot = 0; // default to up

	if (maze.data[x - 1][z] !== false) { // left
		rot = 1;
	} else if (maze.data[x][z + 1] !== false) { // down
		rot = 2;
	} else if (maze.data[x + 1][z] !== false) { // right
		rot = -1;
	}

	maze.data[maze.start.x][maze.start.z] = 'S';
	maze.data[maze.end.x][maze.end.z] = 'E';
	maze.start.angle = rot * HALF_PI;

	return maze;
}


/**
 * recursive function to create the maze path
 * @param {MazeObject} maze
 * @param {number} x
 * @param {number} z
 * @returns {boolean} true if a forward path from this square leads to the exit
 */
function makePathFrom(maze, x, z) {

	/** indicates if this square is the exit or one of the
	 *   forward paths from this square leads to the exit
	 */
	let toExit = (x === maze.end.x && z === maze.end.z);

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

		// either a dead end has been reached, or a previously available direction has
		// been used since the last pass through this while loop
		if (available.length === 0) {
			if (toExit) {
				// this square leads to the exit so it cannot be a dead end
				maze.data[x][z] = '*';
			} else if (maze.data[x][z] === false) {
				// this square was a wall, so we must have found a dead end
				maze.data[x][z] = 'D';
				maze.deadends.push({x, z});
			}
			// path has nowhere new to go, this iteration is done
			return toExit;
		}

		// square, by default, is basic path
		// must do this here because of the dead end check in the code above
		maze.data[x][z] = '';

		if (available.length === 1) {
			// this is the only available direction
			[dir] = available;
		} else {
			// pick one of the available directions at random
			dir = available[Math.floor(gMazeRnd() * available.length)];
		}

		// the next but one square in the chosen direction is the starting
		// point for the next iteration
		const leadsToExit = makePathFrom(maze, x + (dir[0] * 2), z + (dir[1] * 2));

		if (leadsToExit) {
			maze.data[x + dir[0]][z + dir[1]] = '*';
			toExit = true;
		} else {
			maze.data[x + dir[0]][z + dir[1]] = '';
		}

		// if there was only one direction available previously, there can't be any
		// directions left now. this iteration is done.
		if (available.length === 1) {
			if (toExit) {
				maze.data[x][z] = '*';
			}
			return toExit;
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

	const halfX = (size.x - 1) / 2;
	const halfZ = (size.z - 1) / 2;

	start.x = (gMazeRnd.range(0, halfX - 1) * 2) + 1;
	start.z = (gMazeRnd.range(0, halfZ - 1) * 2) + 1;

	let top = start.z < halfZ;
	let left = start.x < halfX;

	const r = gMazeRnd();
	if (r > 0.5) {
		// exit diagonal opposite
		top = !top;
		left = !left;
	} else if (r > 0.25) {
		top = !top;
	} else {
		left = !left;
	}

	exit.x = left ? 1 : size.x - 2;
	const dx = left ? -1 : 1;
	exit.z = top ? 1 : size.z - 2;
	const dz = top ? -1 : 1;

	const end = {...exit};

	if (gMazeRnd() > 0.5) {
		// vertical exit
		exit.z += dz;
		exit.dir = top ? 'U' : 'D';
	} else {
		// horizontal exit
		exit.x += dx;
		exit.dir = left ? 'L' : 'R';
	}

	return {start, end, exit};
}


const _MODULE = 'mazegen.js';


export {
	_MODULE,
	// generateEmptyMaze as generateMazeData,
	generateRandomMaze as generateMazeData,
};
