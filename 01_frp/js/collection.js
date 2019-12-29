// 컬렉션 중심 프로그래밍
// 1. _values (obj의 value 를 가져온다.)
function _values(list) {
	return _map(list, _identity);
}
var _values2 = _map(_identity);


// 2. _identity
function _identity(val) {
	return val;
}

// 3. _pluck (배열안에 객체에서 원하는 key의  value를 가져온다.)
function _pluck(list, key) {
	return _map(list, _get(key));
}

// 4. _reject
function _reject(list, predi) {
	return _filter(list, _negate(predi));
}
var _reject = _curryr(_reject);

// 5. _negate (해당하는 값을 반대불리언 값으로 리턴)
function _negate(fn) {
	return function(val) {
		return !fn(val);
	}
}



// 6. _compact (배열의 값들중 false은 것은 제외하고 새로운 배열을 return)
var _compact = _filter(_identity);

// 7. _find(배열의 값들 중 순서대로 조건에 맞는 값을 찾으면 그 값을 리턴)
function _find(list, predi) {
	var keys = _keys(list);
	for (let i = 0; i < keys.length; i++) {
		var val = list[keys[i]];
		if(predi(val)) return val;
	}
}

// 8. _find_index (배열의 값들 중 순서대로 조건에 맞는 값을 찾고, 조건의 맞는 값중 첫번째로 찾은 값의 index를 리턴한다.)
function _find_index(list, predi) {
	var keys = _keys(list);
	for (let i = 0; i < keys.length; i++) {
		if(predi(list[keys[i]])) return i;
	}
	return -1;
}

// 9. _curryr 로 _find, _find_index 를 리뉴얼
var _find = _curryr(_find);
var _find_index = _curryr(_find_index);

// 10. _some (조건에 1개라도 맞는 값이 있다면 true 를 리턴)
function _some(list, predi) {
	return _find_index(list, predi || _identity) != -1;
}

// 11. _every (모든 값이 조건에 맞아여 true 를 리턴)
function _every(list, predi) {
	return _find_index(list, _negate(predi || _identity)) == -1;
}

// 12. _min (list의 값중에 제일 작은 값을 리턴)
function _min(list) {
	return _reduce(
		list,
		function(a, b) {
			return ( a < b ) ? a : b;
		}
	)
}

// 12. _max (list의 값중에 제일 큰 값을 리턴)
function _max(list) {
	return _reduce(
		list,
		function(a, b) {
			return ( a > b ) ? a : b;
		}
	)
}

// 13. _min_by (비교대상을 가공후 비교후에 제일 작은 값을 리턴)
function _min_by(list, iter) {
	return _reduce(
		list,
		function (a, b) {
			return ( iter(a) < iter(b) ) ? a : b;
		}
	)
}

// 14. _max_by (비교대상을 가공후 비교후에 제일 큰 값을 리턴)
function _max_by(list, iter) {
	return _reduce(
		list,
		function (a, b) {
			return ( iter(a) > iter(b) ) ? a : b;
		}
	)
}

// curryr로 재구축
var _min_by = _curryr(_min_by);
var _max_by = _curryr(_max_by);

// 15. _group_by (공통된 값을 키로 하여 해당하는 값들은 그룹화시켜서 obj 로 리턴)
function _group_by(list, iter) {
	return _reduce(list, function (grouped, val) { 
		_push(grouped, iter(val), val);
		return grouped;
	}, {});
}
var _group_by = _curryr(_group_by);

// 16. _push (json 형식으로 해당하는 key(arr)에 값을 push)
function _push(obj, key, val) {
	(obj[key] = obj[key] || []).push(val);
	return;
}

// 17. _count_by (원하는 공통된 값을 키로하여 해당하는 값들을 그룹화시켜 값들의 수 샌다.)
function _count_by(list, iter) {
	return _reduce(list, function(count, val) {
		_int(count, iter(val))
		return count;
	}, {});
} 
var _count_by = _curryr(_count_by);

// 18. _int (값증가)
function _int(count, key) {
	count[key] ? count[key]++ : count[key] = 1;
	return count;
}


// 19. _pairs (object 를 map 타입으로 변경 [key, value])
var _pairs = _map(function(val, key) {
	return [key, val];
});

