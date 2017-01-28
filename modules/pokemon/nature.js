const NATURE_LIST = 
	["Hardy", "Lonely", "Brave", "Adamant", "Naughty",
	 "Bold", "Docile", "Relaxed", "Impish", "Lax",
	 "Timid", "Hasty", "Serious", "Jolly", "Naive",
	 "Modest", "Mild", "Quiet", "Bashful", "Rash",
	 "Calm", "Gentle", "Sassy", "Careful", "Quirky"];

function Nature(index){
	this.index = index;
	this.name = NATURE_LIST[index];
}

module.exports = Nature;