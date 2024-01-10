// 重写数组
// 1. 获取原来的数组方法
let oldArrayPrototMethods = Array.prototype;

// 2. 继承
export let ArrayMethods = Object.create(oldArrayPrototMethods);

// 3. 劫持
let methods = ['push','pop','unshift','shift','splice'];

methods.forEach(item => {
  ArrayMethods[item] = function (...args) {
    let result = oldArrayPrototMethods[item].apply(this,args);

    // 数组追加对象的情况
    let inserted 
    switch(item) {
      case 'push':
      case 'unshift':
        inserted = args;
        break
      case "splice":
        inserted = args.splice(2);
    }
    // 当前的 this 就是 数组方法传递过来的值
    let ob = this.__ob__;
    if(inserted) {
      ob.observerArray(inserted); // 对添加的对象进行劫持
    }
    return result;
  }
})