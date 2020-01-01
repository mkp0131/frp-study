// FRP ES6
const products = [
	{name: '반팔티', price: 15000},
	{name: '긴팔티', price: 20000},
	{name: '핸드폰케이스', price: 15000},
	{name: '후드티', price: 30000},
	{name: '바지', price: 25000}
];

// 1. map
// prodects 의 name 만 추출(arr 형식)
const map = (predi, iter) => {
	let result = [];
	for (const a of iter) {
		result.push(predi(a));
	}
	return result;
}

function *gen() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
}
var dd = map((a) => a + 1, gen());
console.log('', dd);