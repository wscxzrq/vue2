import { initState } from "./initState";
import {mounetComponent} from './lifeCycle';
import {compileToFunction} from './compile/index'
// 初始化
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    let vm = this;
    // 1. 将 option 保存到 this.$options 上
    vm.$options = options;
    // 初始化状态
    initState(vm);

    // 渲染模板
    if(vm.$options.el) {
      vm.$mount(vm.$options.el);
    }
  }
  
  // 创建 $mount
  Vue.prototype.$mount = function (el) {
    let vm = this;
    el = document.querySelector(el); // 获取元素
    let options = vm.$options;
    if(!vm.render) { // 没有 render 函数
      let template = options.template;
      if(!template && el) { // 没有 template 但是有 el
        el = el.outerHTML;
        // 变成 ast 语法树
        let render = compileToFunction(el);
        // 将 render 函数变成 虚拟 dom vnode()
        options.render = render;
        // 将 vnode 变成真实 dom放到页面上去
      }
    }
    // 挂载组件
    mounetComponent(vm,el);
  }

}
