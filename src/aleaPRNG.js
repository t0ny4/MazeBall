// Alea by Johannes Baagøe (2010) which is based on
// MWC (Multiply-with-Carry) by George Marsaglia and Arif Zaman (1991)

export default function aleaPRNG() {

	// internal state variables
	let s0, s1, s2, c;

	let args = Array.prototype.slice.call(arguments);

	// if no seed args were supplied, generate random ones
	if (args.length === 0) {
		const uinta = new Uint32Array(3);
		window.crypto.getRandomValues(uinta);
		args = [uinta[0], uinta[1], uinta[2]];
	}

	initState(args);


	/**
	 * @param {Array} seed
	 * @private
	 */
	function initState(seed) {

		const mash = Mash();

		s0 = mash(' ');
		s1 = mash(' ');
		s2 = mash(' ');

		c = 1;

		for (let i = 0; i < seed.length; i++) {

			s0 -= mash(seed[i]);
			if (s0 < 0) { s0 += 1; }

			s1 -= mash(seed[i]);
			if (s1 < 0) { s1 += 1; }

			s2 -= mash(seed[i]);
			if (s2 < 0) { s2 += 1; }
		}
	};


	/**
	 * MASH = Modular Arithmetic Secure Hash
	 * @see https://en.wikipedia.org/wiki/MASH-1
	 * @returns {Function}
	 * @private
	 */
	function Mash() {
		// x >>> 0 is a faster version of Math.abs(x)
		let n = 4022871197; // 0xefc8249d

		var mash = function(data) {

			data = data.toString();

			// cache the length
			const l = data.length;
			for (let i = 0; i < l; i++) {
				n += data.charCodeAt(i);

				var h = 0.02519603282416938 * n;

				n  = h >>> 0;
				h -= n;
				h *= n;
				n  = h >>> 0;
				h -= n;
				n += h * 4294967296; // 0x100000000      2^32
			}

			return (n >>> 0) * 2.3283064365386963e-10; // 2^-32
		};

		return mash;
	};


	/**
	 * is the supplied value an integer
	 * @param {Number} n
	 * @returns {Boolean} true if integer
	 * @private
	 */
	function isInteger(n) {
		return parseInt(n, 10) === n;
	};


	/**
	 * this is the main function returned when aleaPRNG is instantiated
	 * @returns {Number} a 32-bit fraction in the range [0, 1]
	 * @public
	 */
	const random = function () {

		const t = 2091639 * s0 + c * 2.3283064365386963e-10; // 2^-32

		s0 = s1;
		s1 = s2;

		return s2 = t - (c = t | 0);
	};


	/**
	 * @returns {number} a 53-bit fraction in the range [0, 1]
	 * @public
	 */
	random.fract53 = function () {
		return random() + (random() * 0x200000 | 0) * 1.1102230246251565e-16; // 2^-53
	};


	/**
	 * @returns {number} an unsigned integer in the range [0, 2^32]
	 * @public
	 */
	random.int32 = function () {
		return random() * 0x100000000; // 2^32
	};


	/**
	 * advance the generator the specified amount of cycles
	 * @public
	 */
	random.cycle = function (count) {
		count = typeof count === 'undefined' ? 1 : +count; // + ??
		if (count < 1) { count = 1; }
		for (let i = 0; i < count; i++) { random(); }
	};


	/**
	 * @returns {number} inclusive range
	 * @public
	 */
	random.range = function (loBound = 0, hiBound = 0) {

		if (loBound === 0 && hiBound === 0) {
			return 0;
		}

		if (loBound > hiBound) {
			const tmp = loBound;
			loBound = hiBound;
			hiBound = tmp;
		}

		// return integer
		if (isInteger(loBound) && isInteger(hiBound)) {
			return Math.floor(random() * (hiBound - loBound + 1)) + loBound;
		}

		// return float
		return random() * (hiBound - loBound) + loBound;
	};


	/**
	 * initialize generator with the seed values used upon instantiation
	 * @public
	 */
	random.restart = function () {
		initState(args);
	};


	/**
	 * seeding function
	 * @public
	 */
	random.seed = function () {
		initState(Array.prototype.slice.call(arguments));
	};


	return random;
};
