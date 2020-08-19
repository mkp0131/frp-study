// 컬렉션 중심 프로그래밍의 4가지 유형과 함수

// 1. 수집하기 - map, values, pluck 등
// 2. 거르기 - filter, reject, compact, without 등
// 3. 찾아내기 - find, some, every 등
// 4. 접기 - reduce, min, max, group_by, count_by

// ########################
// 각유형의 대표함수를 통해서 특화함수를 생성
// ########################

// 1. 수집하기 - map
// 1.1 values (value 를 꺼내는 함수)
// function _values(list) {
//   return _map(list, _identity);
// }
const _values = _map(_identity);

// % _identity (들어온 값을 그대로 리턴)
function _identity(val) {
  return val;
}

// 1.2 pluck(뽑다)
function _pluck(list, key) {
  return _map(list, _get(key));
}

// % _negate
function _negate(fn) {
  return function (val) {
    return !fn(val);
  };
}

// 1. 거르기 - _filter
// 1.1 _reject
function _reject(list, predi) {
  return _filter(list, _negate(predi));
}
_reject = _curryr(_reject);
// 1.2 _compact (인자로 받은 값들중 true 인값만 arr 로 만들어 리턴)
// function _compact(list) {
//   return _filter(list, _identity);
// }
const _compact = _filter(_identity);

// 2. 찾아내기 - _find
// % _find (조건의 맞는 값을 만났을때 맨처음 값을 return 하는 함수)
function _find(list, predi) {
  const keys = _keys(list);
  for (let i = 0; i < keys.length; i++) {
    const item = list[keys[i]];
    if (predi(item)) {
      return item;
    }
  }
}
_find = _curryr(_find);

// % _find_index (조건에 맞는 값의 index 값을 return)
function _find_index(list, predi) {
  const keys = _keys(list);
  for (let i = 0; i < keys.length; i++) {
    const item = list[keys[i]];
    if (predi(item)) {
      return i;
    }
  }
  return -1;
}
_find_index = _curryr(_find_index);

// % _some (조건을 만족하는 값이 하나라도 있으면 true 를 return)
function _some(list, predi) {
  predi = predi || _identity;
  return _find_index(list, predi) !== -1;
}

// % _every (모두 조건을 만족하는 값이라면 true 를 return)
function _every(list, predi) {
  predi = predi || _identity;
  return _find_index(list, _negate(predi)) === -1;
}

// 4. 접기 - reduce
// % _min (배열에 있는 값중에 제일 작은 값을 return)
function _min(list) {
  return _reduce(list, function (a, b) {
    return a > b ? b : a;
  });
}

// % _max (배열에 있는 값중 제일 큰 값을 return)
function _max(list) {
  return _reduce(list, function (a, b) {
    return a < b ? b : a;
  });
}

// % _min_by (보조함수로 원본값을 변경하여 비교하여 제일 작은 값은 return)
function _max_by(list, iter) {
  return _reduce(list, function (a, b) {
    return iter(a) < iter(b) ? b : a;
  });
}

// % _max_by (보조함수로 원본값을 변경하여 비교하여 제일 큰 값은 return)
function _min_by(list, iter) {
  return _reduce(list, function (a, b) {
    return iter(a) > iter(b) ? b : a;
  });
}
_max_by = _curryr(_max_by);
_min_by = _curryr(_min_by);

// % _group_by (key 별로 데이터를 group 시켜 object 를 return)
function _group_by(list, iter) {
  return _reduce(
    list,
    function (obj, item) {
      const key = iter(item);
      return _push(obj, key, item);
    },
    {}
  );
}
_group_by = _curryr(_group_by);

// % _count_by ( obj[key]에 맞는 값들을 카운트하여 obj[key] 값에 넣어준다)
function _count_by(list, iter) {
  return _reduce(
    list,
    function (obj, item) {
      const key = iter(item);
      return _inc(obj, key);
    },
    {}
  );
}
_count_by = _curryr(_count_by);

// % _push (obj 에 값이 있는지 확인하고 값을 넣는다. 형태: {[],[], []})
function _push(obj, key, val) {
  (obj[key] = obj[key] || []).push(val);
  return obj;
}

// % _inc (obj에 값이 있는지 확인하고 값이 있다면 +1 을 해준다.)
function _inc(obj, key) {
  obj[key] = ++obj[key] || 1;
  return obj;
}

// % _pair ([key, value] 로된 date 를 [] 로 감싸서 return)
const _pair = _map(function (item, key) {
  return [key, item];
});

// 20대-?명, 30대-?명 문장을 만들어서 출력해라
_go(
  users,
  _count_by(function (user) {
    return user.age - (user.age % 10);
  }),
  function (data) {
    let msg = "";
    _each(data, function (item, key) {
      msg += key + "대-" + item + "명 ";
    });
    // console.log(this);
  }
);

// result = _map([4, 5, 6], function (item, key) {
//   const obj = {};
//   obj[key] = item;
//   return obj;
// });

// _go(
//   [4, 5, 6],
//   _map(function (item, key) {
//     const obj = {};
//     obj[key] = item;
//     return obj;
//   }),
//   console.log
// );
