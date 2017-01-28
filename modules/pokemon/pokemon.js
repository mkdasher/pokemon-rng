const op32 = require('../rng/32bitoperation.js')
var RNG = require('../rng/rng.js')
var HiddenPower = require('./hiddenpower.js')
var Seed = require('../rng/seed.js')
var Nature = require('./nature.js')

function Pokemon(seed, frame, method){
	if (method == '1'){
		this._method1(seed, frame);
	}
	else{ //default = method 1
		this._method1(seed, frame);
	}
}

Pokemon.prototype._method1 = function(seed, frame){
	this.frame = frame;
	var rng1 = new RNG(seed);
	var rng2 = new RNG(seed);
	rng1.advance(frame + 1);
	rng2.advance(frame);
	this.pid = op32.addu(op32.mulu(rng1.gettop(), 0x10000), rng2.gettop());
	this.nature = new Nature(this.pid % 25);
	this.generate(rng1);
}

Pokemon.prototype.generate = function(rng){
	rng.advance();
	var top = rng.gettop();
	this.ivs = {};
	this.ivs.hp = top % 32;
	this.ivs.atk = (top >>> 5) % 32;
	this.ivs.def = (top >>> 10) % 32;
	rng.advance(); top = rng.gettop();
	this.ivs.spatk = (top >>> 5) % 32;
	this.ivs.spdef = (top >>> 10) % 32;
	this.ivs.speed = top % 32;
	this.hiddenPower = new HiddenPower(this.ivs);
};

module.exports = Pokemon;
	