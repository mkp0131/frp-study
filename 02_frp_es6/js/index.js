// FRP ES6

var str = 'sakjfklasjf';
var arr = [1,2,3,4];
var set = new Set([1,2,3,4]);
var map = new Map([['a',1], ['b', 2], ['c', 3], ['c', 3]])

console.log('###arr', arr);
for (const iterator of arr) {
	console.log('', iterator);
}

console.log('###set', set);
for (const iterator of set[Symbol.iterator]()) {
	console.log('', iterator);
}

console.log('###map', map);
for (const iterator of map) {
	console.log('', iterator);
}


console.log('$$$map', map[Symbol.iterator]());
console.log('$$$set', set[Symbol.iterator]());
console.log('$$$arr', arr[Symbol.iterator]());


var map_iterator = map[Symbol.iterator]();
console.log('', map_iterator);
console.log('', map.keys());
console.log('', map.values());
console.log('', map.entries());

console.log('############', );
var tt = map.entries();
console.log('', tt.next());
console.log('', tt.next());
console.log('', tt.next());
console.log('', tt.next());
console.log('', tt.next());