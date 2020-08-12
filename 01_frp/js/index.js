// 함수형 프로그래밍 공부

// add_maker
function add_maker(a) {
  return function (b) {
    return a + b;
  };
}

var users = [
  {
    id: 1,
    name: "ID",
    age: 36,
  },
  {
    id: 2,
    name: "BJ",
    age: 32,
  },
  {
    id: 3,
    name: "JM",
    age: 32,
  },
  {
    id: 4,
    name: "PJ",
    age: 27,
  },
  {
    id: 5,
    name: "HA",
    age: 25,
  },
  {
    id: 6,
    name: "JE",
    age: 26,
  },
  {
    id: 7,
    name: "JI",
    age: 31,
  },
  {
    id: 8,
    name: "MP",
    age: 23,
  },
];

// 3. _filter 로 리팩토링
function _filter(list, predi) {
  var result = [];

  _each(list, function (val) {
    if (predi(val)) result.push(val);
  });

  return result;
}

// 4. _map 로 리펙토링 (list 에서 원하는 값 변형 후 추출)
function _map(list, mapper) {
  var result = [];
  _each(list, function (val, key) {
    result.push(mapper(val, key));
  });

  return result;
}

// 5. each (list를 반복하여 안의 값을 추출)
function _each(list, iter) {
  // var _getLength = _get('length');
  var keys = _keys(list);
  for (let i = 0; i < keys.length; i++) {
    iter(list[keys[i]], keys[i]);
  }
  return;
}

// 6. curry (함수에 함수를 리턴)
function _curry(fn) {
  return function (a, b) {
    if (arguments.length === 2) return fn(a, b);
    return function (b) {
      return fn(a, b);
    };
  };
}

// 7. curryr (파라미터가 2개라면 뒤파라미터부터 적용)
function _curryr(fn) {
  return function (a, b) {
    if (arguments.length === 2) return fn(a, b);
    return function (b) {
      return fn(b, a);
    };
  };
}

// 7. _get (obj 의 키가 있다면 키값을, 없다면 undefined)
// function _get(obj, key) {
// 	return (obj == null) ? undefined : obj[key];
// }
var _get = _curryr(function (obj, key) {
  return obj == null ? undefined : obj[key];
});

// 7-1 예시 getName
var getName = _get("name");

// 8. _reduce (하나의 값으로 축약해주는 함수)
//  1) list 의 값(val)을 하나하나 뽑아서
//  2) 인자로 받은 fn(memo, val) 의 형태로 함수를 실행하여
//  3) 얻은 결과를 memo 덮어쓰고, 최종적으로 memo 를 return
function _reduce(list, fn, memo) {
  if (arguments.length == 2) {
    memo = list[0];
    list = _rest(list, 1);
  }

  _each(list, function (val) {
    memo = fn(memo, val);
  });

  return memo;
}

// 9. _rest (arr 복사 및 자르기)
function _rest(list, index) {
  var slice = Array.prototype.slice;
  if (index == null) index = 1;
  return slice.call(list, index);
}

// 10. _pipe(인자로 받은 모든 함수를 실행)
function _pipe() {
  var fns = arguments;
  return function (arg) {
    return _reduce(
      fns,
      function (arg, fn) {
        return fn(arg);
      },
      arg
    );
  };
}

// 11. _go (첫번째 인자에 가공할 값을 넣고, 순차적으로 함수를 실행, 원하는 값을 얻는다.)
function _go(arg) {
  var fns = _rest(arguments);
  return _pipe.apply(null, fns)(arg);
}

// 12. curryr 을 활용하여 _map, _filter 를 읽기쉽게 변경
var _map = _curryr(_map);
var _filter = _curryr(_filter);

// 13. _keys (오브젝트 or array 의 key를 객체로 리턴)
function _keys(obj) {
  return _is_object(obj) ? Object.keys(obj) : [];
}

// 14. _is_object (오브젝트인지 아닌지 구별)
function _is_object(obj) {
  return typeof obj === "object" && !!obj;
}
