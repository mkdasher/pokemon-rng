const N = 624;
const M = 397;
const MATRIX_A = 0x9908b0df;
const UPPER_MASK = 0x80000000;
const LOWER_MASK = 0x7fffffff;

function MersenneTwister(seed) {
	if (seed == undefined) {
		seed = new Date().getTime();
	}

	this.mt = new Array(N); 
	this.mti=N+1; 

	this.mt[0] = seed >>> 0;
	for (this.mti=1; this.mti<N; this.mti++) {
		var s = this.mt[this.mti-1] ^ (this.mt[this.mti-1] >>> 30);
		this.mt[this.mti] = (((((s & 0xffff0000) >>> 16) * 1812433253) << 16) + (s & 0x0000ffff) * 1812433253) + this.mti;
		this.mt[this.mti] >>>= 0;
	}
}

MersenneTwister.prototype.next_int = function() {
	var y;
	var mag01 = new Array(0x0, MATRIX_A);

	if (this.mti >= N) { 
		var kk;

		if (this.mti == N+1)  
			this.init_seed(5489);  

		for (kk = 0; kk < N-M; kk++) {
			y = (this.mt[kk] & UPPER_MASK)|(this.mt[kk+1] & LOWER_MASK);
			this.mt[kk] = this.mt[kk+M] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		for (; kk < N-1; kk++) {
			y = (this.mt[kk] & UPPER_MASK)|(this.mt[kk+1] & LOWER_MASK);
			this.mt[kk] = this.mt[kk+(M-N)] ^ (y >>> 1) ^ mag01[y & 0x1];
		}
		y = (this.mt[N-1] & UPPER_MASK)|(this.mt[0] & LOWER_MASK);
		this.mt[this.N-1] = this.mt[M-1] ^ (y >>> 1) ^ mag01[y & 0x1];

		this.mti = 0;
	}

	y = this.mt[this.mti++];

	y ^= (y >>> 11);
	y ^= (y << 7) & 0x9d2c5680;
	y ^= (y << 15) & 0xefc60000;
	y ^= (y >>> 18);

	return y >>> 0;
}

module.exports = MersenneTwister;