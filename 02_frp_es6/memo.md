# 함수형 자바스크립트 ES6

### 평가
1. 코드가 계산(Evaluation) 되어 값을 만드는 것.

### 일급
1. 값으로 다룰 수 있다.
2. 변수에 담을 수 있다.
3. 함수의 인자로 사용 될 수 있다.
4. 함수의 결과로 사용 될 수 있다.

### 일급함수
1. 함수를 값으로 다룰 수 있다.
2. 조합성과 추상화의 도구

### 고차함수
1. 함수를 값으로 다루는 함수
2. 함수를 인자로 받아서 실행하는 함수
```javascript
function apply1(f) {
	return f(1);
}

function add2(a) {
	return a + 2;
}

console.log('', apply1(add2));
```

2. 함수를 만들어 리턴하는 함수 (클로저를 만들어 리턴하는 함수)
```javascript
var addMaker = a => b => a + b;
var a = addMaker(10);
var b = a(2);
console.log('', b);
```



## 이터러블(Iterable) / 이터레이터(Iterator) 프로토콜
1. 이터러블(Iterable): 이터레이터를 리턴하는 [Symbol.iterlator]() 를 가진 값
2. 이터레이터(Iterator): { value, done } 객체를 리턴하는 next() 를 가진 값
3. 이터러블(Iterable) / 이터레이터(Iterator) 프로토콜: 이터러블을 for...of, 전개 연산자 등과 함께 동작하도록한 규약
```javascript
var iterable = {
	[Symbol.iterator]: function() {
		let i = 3;
		return {
			next() {
				return (i === 0) ? {value: undefined, done: true} : {value: i--, done: false};
			},
			[Symbol.iterator]: function() { return this; }
		}
	},
}
```

### 제너레이터 / 이터레이터
1. 제너레이터: 이터레이터이자 이터러블을 생성하는 함수
```javascript
function *generator() {
	yield 'kddkdk';
	yield 2;
	yield 'iiuu';
}
```
