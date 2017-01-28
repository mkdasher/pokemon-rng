module.exports.mulu = function(n, m) 
{
    n >>>= 0;
    m >>>= 0;
    var nlo = n & 0xffff;
    var nhi = n - nlo;
    return ( (nhi * m >>> 0) + (nlo * m) ) >>> 0;
}
module.exports.addu = function(n, m){
    return ((n + m) & 0xFFFFFFFF) >>> 0;
}
module.exports.subu = function(n, m){
	return (n - m) >>> 0;
}

module.exports.getbits = function(value, init, end){
	return (value & (0xFFFFFFFF >>> init)) >>> (31 - end);
}
module.exports.gettop = function(value){
	return ((value >> 16) & 0xFFFF) >>> 0;
}
module.exports.getbottom = function(value){
	return (value & 0xFFFF) >>> 0;
}

module.exports.print = function(n){
	return ("00000000" + n.toString(16)).substr(-8);
}