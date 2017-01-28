const TYPE_LIST = 
	["Fighting","Flying","Poison","Ground",
	 "Rock","Bug","Ghost","Steel",
	 "Fire","Water","Grass","Electric",
	 "Psychic","Ice","Dragon","Dark"];

function HiddenPower(ivs){
	var type_index = (((ivs.hp % 2) + 2 * (ivs.atk % 2) + 4 * (ivs.def % 2)
		+ 8 * (ivs.speed % 2) + 16 * (ivs.spatk % 2) + 32 * (ivs.spdef % 2)) * 15 / 63 | 0);
	this.type = TYPE_LIST[type_index];
	this.damage = 30 + (((ivs.hp >>> 1) % 2) + 2 * ((ivs.atk >>> 1) % 2)
		+ 4 * ((ivs.def >>> 1) % 2) + 8 * ((ivs.speed >>> 1) % 2)
		+ 16 * ((ivs.spatk >>> 1) % 2) + 32 * ((ivs.spdef >>> 1) % 2)) * 40 / 63 | 0;
}

module.exports = HiddenPower;