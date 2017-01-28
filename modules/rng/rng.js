const op32 = require('./32bitoperation.js')

const RNG_A = [
    0x41C64E6D, 0xC2A29A69, 0xEE067F11, 0xCFDDDF21,
    0x5F748241, 0x8B2E1481, 0x76006901, 0x1711D201,
    0xBE67A401, 0xDDDF4801, 0x3FFE9001, 0x90FD2001,
    0x65FA4001, 0xDBF48001, 0xF7E90001, 0xEFD20001,
    0xDFA40001, 0xBF480001, 0x7E900001, 0xFD200001,
    0xFA400001, 0xF4800001, 0xE9000001, 0xD2000001,
    0xA4000001, 0x48000001, 0x90000001, 0x20000001,
    0x40000001, 0x80000001, 0x00000001, 0x00000001];

const RNG_B = [
    0x00006073, 0xE97E7B6A, 0x31B0DDE4, 0x67DBB608,
    0xCBA72510, 0x1D29AE20, 0xBA84EC40, 0x79F01880,
    0x08793100, 0x6B566200, 0x803CC400, 0xA6B98800,
    0xE6731000, 0x30E62000, 0xF1CC4000, 0x23988000,
    0x47310000, 0x8E620000, 0x1CC40000, 0x39880000,
    0x73100000, 0xE6200000, 0xCC400000, 0x98800000,
    0x31000000, 0x62000000, 0xC4000000, 0x88000000,
    0x10000000, 0x20000000, 0x40000000, 0x80000000];
	
const RNG_REV_A = [
    0xEEB9EB65, 0xDC6C95D9, 0xBECE51F1, 0xB61664E1,
	0x6A6C8DC1, 0xBD562B81, 0xBC109701, 0xB1322E01,
	0x62A85C01, 0xA660B801, 0xD1017001, 0xB302E001,
	0xAA05C001, 0x640B8001, 0x08170001, 0x102E0001,
	0x205C0001, 0x40B80001, 0x81700001, 0x02E00001,
	0x05C00001, 0x0B800001, 0x17000001, 0x2E000001,
	0x5C000001, 0xB8000001, 0x70000001, 0xE0000001,
	0xC0000001, 0x80000001, 0x00000001, 0x00000001];

const RNG_REV_B = [
    0x0A3561A1, 0x4D3CB126,	0x7CD1F85C,	0x9019E2F8, 
	0x24D33EF0, 0x2EFFE1E0, 0x1A2153C0, 0x18A8E780, 
	0x41EACF00, 0xBE399E00, 0x26033C00, 0xF2467800, 
	0x7D8CF000, 0x5F19E000, 0x4E33C000, 0xDC678000, 
	0xB8CF0000, 0x719E0000, 0xE33C0000, 0xC6780000, 
	0x8CF00000, 0x19E00000, 0x33C00000, 0x67800000, 
	0xCF000000, 0x9E000000, 0x3C000000, 0x78000000, 
	0xF0000000, 0xE0000000, 0xC0000000, 0x80000000];

function RNG(value = 0){
	this.value = value;
}

RNG.prototype.advance = function(n = 1){
	if (n < 0) return this.decrease(-n);
	var i = 0;
	while (n > 0)
	{
		if (n % 2 != 0)
			this.value = op32.addu(op32.mulu(this.value, RNG_A[i]), RNG_B[i]);
		n = n >> 1;
		i++;
		if (i >= 32) break;
	}
};

RNG.prototype.decrease = function(n = 1){
	if (n < 0) return this.advance(-n);
	var i = 0;
	while (n > 0)
	{
		if (n % 2 != 0)
			this.value = op32.addu(op32.mulu(this.value, RNG_REV_A[i]), RNG_REV_B[i]);
		n = n >> 1;
		i++;
		if (i >= 32) break;
	}
};

RNG.prototype.gettop = function(){
	return op32.gettop(this.value);
};

RNG.prototype.getDistance = function(val){
	var val2 = this.value;
	var val1 = val;
	var dist = 0;
    for (var i = 0; i < 32; i++){
        if (op32.getbits(val1, 31-i,31-i) != op32.getbits(val2, 31-i, 31-i)){
            val1 = op32.addu(op32.mulu(val1, RNG_A[i]), RNG_B[i]);
            dist += ((1 << i) >>> 0);
        }
    }
    return dist;
};

RNG.prototype.print = function(){
	return op32.print(this.value);
};

module.exports = RNG;
	