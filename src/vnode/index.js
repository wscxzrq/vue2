export function renderMixin(Vue) {
  // 处理标签
  Vue.prototype._c = function () {
    // 创建标签
  };
  // 文本
  Vue.prototype._v = function () {};
  // 变量
  Vue.prototype._s = function (val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val) : val;
  };
  // render 函数 变成 vnode
  Vue.prototype._render = function () {
    let vm = this;
    let render = vm.$options.render;
    let vnode = render.call(this);
    console.log('vnode', vnode);
  };
}
