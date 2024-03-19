export function renderMixin(Vue) {
  // 处理标签
  Vue.prototype._c = function () {
    // 创建标签
    return createElement(...arguments);
  };
  // 文本
  Vue.prototype._v = function (text) {
    return createText(text);
  };
  // 变量
  Vue.prototype._s = function (val) {
    return val == null ? '' : typeof val === 'object' ? JSON.stringify(val) : val;
  };
  // render 函数 变成 vnode
  Vue.prototype._render = function () {
    let vm = this;
    let render = vm.$options.render;
    let vnode = render.call(this);
    return vnode;
  };
}

// 创建元素
function createElement(tag, data = {}, ...children) {
  return vnode(tag, data, data.key, children);
}

// 创建文本
function createText(text) {
  return vnode(undefined, undefined, undefined, undefined, text);
}
// 创建虚拟 dom
function vnode(tag, data, key, children, text) {
  return {
    tag,
    data,
    key,
    children,
    text,
  };
}
