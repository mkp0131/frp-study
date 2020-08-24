// FRP ES6
const products = [
	{name: '반팔티', price: 15000},
	{name: '긴팔티', price: 20000},
	{name: '핸드폰케이스', price: 15000},
	{name: '후드티', price: 30000},
	{name: '바지', price: 25000}
];

// const set = new Set('121');
// for (const iterator of set) {
// 	console.log('', iterator);
// }
// console.log('', set);

const map = new Map();
map.set(1,2);
map.set('1');
// console.log('', map);
// for (const iterator of map) {
// 	console.log('', iterator);
// }



const str = 'mkp';

const tt = str[Symbol.iterator]();


function * counter() {
	yield 1;
	yield 2;
	yield 3;
	yield 4;
	yield 5;
}
let value = counter();

// for (const iterator of value) {
// 	console.log('', iterator);
// }
// console.log('value', value.next());
// console.log('value', value.next());
// console.log('value', value.next());
// console.log('value', value.next());
// console.log('value', value.next());
// console.log('value', value.next());
console.log('', ...str);