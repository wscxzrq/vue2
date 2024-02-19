import { observer } from "./observer/index";

// 初始化状态
export function initState(vm) {
  let opts = vm.$options;
  if(opts.props) {
    initProps();
  }

  if(opts.data) {
    initData(vm);
  }

  if(opts.watch) {
    initWatch()
  }

  if(opts.computed) {
    initComputed()
  }

  if(opts.methods) {
    initMethods()
  }
}
function initProps() {}
// 对 data 进行初始化
function initData(vm) {
  let data = vm.$options.data;
  data = vm._data =  typeof data === 'function' ? data.call(vm) : data;

  // 对 data 数据进行劫持
  // 将 data 上所有属性代理到实例上
  for (const key in data) {
    proxy(vm,'_data',key);
  }
  observer(data);
}

function proxy(vm,source,key) {
  Object.defineProperty(vm,key,{
    get() {
      return vm[source][key]
    },
    set(newValue) {
      vm[source][key] = newValue;
    }
  })
}
function initWatch() {}
function initComputed() {}
function initMethods() {}
