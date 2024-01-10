import {ArrayMethods} from './arr'
export function observer(data) {
  // 如果不是对象或是空对象
  if(typeof data != 'object' || data == null) {
    return data;
  }

  // 1 对象 通过一个类来进行劫持
  return new Observer(data);
}

class Observer {
  constructor(value) {
    // 给 value 定义一个属性
    Object.defineProperty(value,'__ob__',{
      enumerable:false,
      value:this
    })
    // 判断是数组还是对象
    if(Array.isArray(value)) {
      value.__proto__ = ArrayMethods;
      // 如果是数组对象
      this.observerArray(value); 
    }else {
      this.walk(value); // 遍历对象
    }
  }

  walk (data) {
    console.log('data',data)
    let keys = Object.keys(data);
    for(let i = 0; i<keys.length; i++) {
      // 对每个属性进行劫持
      let key = keys[i];
      let value = data[key];
      defineReactive(data,key,value);
    }
  }

  /**
   * 数组对象的劫持
   */
  observerArray(value) {
    for(let i = 0; i<value.length; i++) {
      observer(value[i]);
    }
  }
}

/**
 * 对对象中的属性进行劫持
 */
function defineReactive(data,key,value) {
  observer(value); // 深度代理
  Object.defineProperty(data,key,{
    get() {
      return value;
    },

    set(newValue) {
      if(newValue === value) return
      // 如果是设置新的值 需要重新劫持
      observer(newValue); 
      value = newValue;
    }
  })
}


// vue2 Object.defineProperty 缺点 只能劫持对象中的一个属性