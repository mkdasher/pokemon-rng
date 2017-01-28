const op32 = require('./32bitoperation.js')
var Mersenne = require('./mersenne.js')
var RNG = require('./rng.js')

function seed(value = 0){
	this.value = value;
	
	this.frame = op32.getbottom(this.value);
	this.hour = op32.getbits(this.value, 8, 15);
	
	var m = new Mersenne(this.value);
	m.next_int();
	var n = m.next_int();
	this.trainerID = op32.getbottom(n);
	this.secretID = op32.gettop(n);
	
	var rng = new RNG(this.value);
	rng.advance(4);
	this.lotteryID = rng.gettop();
}

module.exports = seed;
	