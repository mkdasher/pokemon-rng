var seed = require('./modules/rng/seed.js')
var RNG = require('./modules/rng/rng.js')
var RNG_generic = require('./modules/rng/rng-generic.js')
var Nature = require('./modules/pokemon/nature.js')
var HiddenPower = require('./modules/pokemon/hiddenpower.js')
var Pokemon = require('./modules/pokemon/pokemon.js')

module.exports = {
	seed,
	RNG,
	RNG_generic,
	Nature,
	HiddenPower,
	Pokemon
};