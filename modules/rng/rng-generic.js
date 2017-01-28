const op32 = require('./32bitoperation.js')
var RNG = require('./rng.js')
var util = require('util')

function euclid_gcd(a, b) {
    if (b == 0) return [a, 1, 0];
    var res = euclid_gcd(b, a%b);
    var q = a/b >> 0;
    return [res[0], res[2], (res[1] - q*res[2]) >>> 0];
}

function reverse_lcg(a, b){
	var m = 0x100000000
	var x = euclid_gcd(a, m)[1]
	return [x, op32.subu(m,op32.mulu(x,b))]
}

function init_lcg(a, b){
	for (var i = 0; i < 31; i++){
		b.push(op32.addu(op32.mulu(b[i],a[i]),b[i]))
		a.push(op32.subu(op32.mulu(op32.addu(a[i],b[i]),a[i]),op32.subu(b[i+1],b[i])))
	}
}

function RNG_generic(value = 0, lcg_a = 0x41C64E6D, lcg_b = 0x00006073){
	RNG.apply(this, [value]);
	this.RNG_A = [lcg_a];
	this.RNG_B = [lcg_b];
	init_lcg(this.RNG_A, this.RNG_B)
	var rev = reverse_lcg(lcg_a, lcg_b)
	this.RNG_REV_A = [rev[0]]
	this.RNG_REV_B = [rev[1]]
	init_lcg(this.RNG_REV_A, this.RNG_REV_B)
}
util.inherits(RNG_generic, RNG);

RNG_generic.prototype.advance = function(n = 1){
	if (n < 0) return this.decrease(-n);
	var i = 0;
	while (n > 0)
	{
		if (n % 2 != 0)
			this.value = op32.addu(op32.mulu(this.value, this.RNG_A[i]), this.RNG_B[i]);
		n = n >> 1;
		i++;
		if (i >= 32) break;
	}
};

RNG_generic.prototype.decrease = function(n = 1){
	if (n < 0) return this.advance(-n);
	var i = 0;
	while (n > 0)
	{
		if (n % 2 != 0)
			this.value = op32.addu(op32.mulu(this.value, this.RNG_REV_A[i]), this.RNG_REV_B[i]);
		n = n >> 1;
		i++;
		if (i >= 32) break;
	}
};

RNG_generic.prototype.getDistance = function(val){
	var val2 = this.value;
	var val1 = val;
	var dist = 0;
    for (var i = 0; i < 32; i++){
        if (op32.getbits(val1, 31-i,31-i) != op32.getbits(val2, 31-i, 31-i)){
            val1 = op32.addu(op32.mulu(val1, this.RNG_A[i]), this.RNG_B[i]);
            dist += ((1 << i) >>> 0);
        }
    }
    return dist;
};

module.exports = RNG_generic;
	