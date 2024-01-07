// 重写数组
// 1. 获取原来的数组方法
let oldArrayPrototMethods = Array.prototype;

// 2. 继承
export let ArrayMethods = Object.create(oldArrayPrototMethods);

// 3. 劫持
let methods = ['push','pop','unshift','shift','splice'];

methods.forEach(item => {
  ArrayMethods[item] = function (...args) {
    console.log('item',item)
    let result = oldArrayPrototMethods[item].apply(this,args);
    return result;
  }
})