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

// 2. filter ( 배열 내의 모든 요소에 callback function 실행하여 조건에 맞는 값만 배열로 리턴. )
const filter = (fn, iter) => {
	let result = [];
	for (const a of iter) {
		if(fn(a)) result.push(a);
	}
	return result;
}

// 3. reduce ( list 의 값을 하나의 값으로 축약. )
const reduce = (fn, acc, iter) => {
	if (!iter) {
		iter = acc[Symbol.iterator]();
		acc = iter.next().value;
	}
	
	for (const a of iter) {
		acc = fn(acc, a);
	}
	return acc;
}

// 4. add
const add = (a, b) => a + b;
// 2만원 이하의 상품들의 가격을 뽑아온다.
// 1. 2만원이하의 상품들을 sort
// 2. 그 상품들의 가격을 sort

var dd = reduce(
	add,
	map((product) => product.price, filter((product) => product.price < 20000, products))
)
