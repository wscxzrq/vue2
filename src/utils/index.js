// 对象合并 {created:[a,b,c]}
export const HOOKS = [
  'beforeCreate',
  'created',
  'beforeMount',
  'mounted',
  'beforeUpdate',
  'updated',
  'beforeDestroy',
  'destroyed',
];
// 策略模式
let starts = {};
starts.data = function (parentVal, childVal) {
  return childVal;
}; // 合并 data
starts.computed = function () {}; // 合并计算属性
starts.watch = function () {}; // 合并 watch
starts.methods = function () {}; // 合并 methods

// 遍历 生命周期
HOOKS.forEach(hooks => {
  starts[hooks] = mergeHook;
});

function mergeHook(parentVal, childVal) {
  if (childVal) {
    if (parentVal) {
      return parentVal.concat(childVal);
    } else {
      return [childVal]; // [a]
    }
  } else {
    return parentVal;
  }
}

// child 就是 mixin中的对象
export function mergeOptions(parent, child) {
  // Vue.options = {create:[a,b,c],watch:[a,b]}
  const options = {};
  // 如果有父亲 没有儿子
  for (let key in parent) {
    mergeField(key);
  }

  // 儿子有父亲没有
  for (let key in child) {
    mergeField(key);
  }

  function mergeField(key) {
    // 根据 key 策略模式
    if (starts[key]) {
      // create {created:[a,b]}
      options[key] = starts[key](parent[key], child[key]);
    } else {
      options[key] = child[key];
    }
  }
  return options;
}
