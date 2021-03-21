function simpleClone(hash: any, source: any) {
  const target: any = Array.isArray(source) ? [] : {};
  if (hash.has(source)) return hash.get(source);
  Object.keys(source).forEach(key => {
    if (Object.prototype.toString.call(source[key]) === '[object Object]') {
      hash.set(source, target); // save
      target[key] = simpleClone(hash, source[key]);
    } else {
      target[key] = source[key];
    }
  });
  return target;
}
export function deepClone(source: any) {
  let hash = new WeakMap(); // hash
  return simpleClone(hash, source);
}
export const tableScrollHeight = 0
export function debounce(fn: any, wait: any) {
  let timer: any = null;
  return function() {
    let args = arguments;
    if (timer) {
      // 进来就清空之前的回调
      clearTimeout(timer);
    }
    timer = setTimeout(() => {
      // then 再次创建
      fn(args);
    }, wait);
  };
}