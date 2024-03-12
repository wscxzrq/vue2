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
  Vue.prototype._update = function (vnode) {};
}
