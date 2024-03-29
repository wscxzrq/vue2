import { patch } from './vnode/patch';
// 渲染组件挂载组件的方法
export function mounetComponent(vm, el) {
  /**
   * vm.render 将 render 函数变成 vnode
   * vm.updata 将 vnode 变成真实 dom 在放到页面中
   */
  vm._update(vm._render());
}

// 生命周期
export function lifeCycleMixin(Vue) {
  Vue.prototype._update = function (vnode) {
    let vm = this;
    // 两个参数 1. 旧的 dom 2. vnode
    vm.$el = patch(vm.$el, vnode);
  };
}

// 生命周期调用
export function callHook(vm, hook) {
  const handlers = vm.$options[hook];
}
