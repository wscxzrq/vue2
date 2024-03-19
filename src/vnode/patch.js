// 将 vnode 变成 真实 dom
export function patch(oldVnode, vnode) {
  // (1) 创建新的 dom
  let el = createEl(vnode);
  /**
   * (2) 将 oldVnode 替换为 el
   *  1) 获取父节点
   *  2）插入
   *  3) 删除 oldVnode.el
   */
  let parentEl = oldVnode.parentNode;
  // 将新创建的 el 插入到 oldVnode 的下一个兄弟节点之前。
  parentEl.insertBefore(el, oldVnode.nextSibling);
  parentEl.removeChild(oldVnode);
  return el;
}

// 创建 dom
function createEl(vnode) {
  // vnode: {tag, data, children, text}
  let { tag, children, key, date, text } = vnode;

  if (typeof tag === 'string') {
    // 表示是标签
    vnode.el = document.createElement(tag); // 创建元素
    if (children.length > 0) {
      children.forEach(child => {
        // 递归
        vnode.el.appendChild(createEl(child));
      });
    }
  } else {
    vnode.el = document.createTextNode(text);
  }
  return vnode.el;
}

// vue 的渲染流程 =》 数据初始化 =》 对模板进行编译 =》 变成 render 函数 =》 通过 render 函数变成 vnode
// =》 vnode 变成真实 dom =》 放到页面上去
