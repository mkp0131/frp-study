// FRP ES6
const products = [
	{name: '반팔티', price: 15000},
	{name: '긴팔티', price: 20000},
	{name: '핸드폰케이스', price: 15000},
	{name: '후드티', price: 30000},
	{name: '바지', price: 25000}
];

// 1. map ( 배열 내의 모든 요소에 callback function 을 실행한 결과로, 새로운 배열을 리턴. )
// prodects 의 name 만 추출(arr 형식)
const map = (fn, iter) => {
	let result = [];
	for (const a of iter) {
		result.push(fn(a));
	}
	return result;
}

let tt = new Map([['a', 1], ['b', 2]]);

const dd = map(([key, val]) => [key, val * 999], tt);
// console.log('', new Map(dd));

