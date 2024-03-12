// 匹配 {{ }} 表达式
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

// 处理属性
function genProps(attrs) {
  let str = '';
  for (let i = 0; i < attrs.length; i++) {
    let attr = attrs[i];
    // 判断是否是行内样式 {style:{color:red,font}}  {name: 'style', value: 'color: red; font-size: 12px;'}
    if (attr.name === 'style') {
      let obj = {};
      attr.value.split(';').forEach(item => {
        let [key, val] = item.split(':');
        obj[key] = val;
      });
      attr.value = obj;
      // 拼接
    }
    str += `${attr.name}:${JSON.stringify(attr.value)},`;
  }
  return `{${str.slice(0, -1)}}`;
}
// 处理元素中的子节点
function genChildren(el) {
  let children = el.children; // []
  if (children) {
    return children.map(child => gen(child)).join(',');
  }
}
// 处理子节点具体逻辑
function gen(node) {
  // 1 元素 3 文本
  if (node.type === 1) {
    // 元素
    return generate(node);
  } else {
    // 文本 1 只是文本 2 插值表达式
    let text = node.text; // 获取文本
    if (!defaultTagRE.test(text)) {
      // 检测是否是插值表达式
      return `_v${JSON.stringify(text)}`;
    }
    // 带有{{}}
    let tokens = [];
    // 如果正则是全局模式 需要每次使用前变为0
    let lastindex = (defaultTagRE.lastIndex = 0);
    let match; // 每次匹配到的结果  exec 获取 {{name}}
    while ((match = defaultTagRE.exec(text))) {
      let index = match.index; // 匹配到的索引
      if (index > lastindex) {
        // 添加文本内容
        tokens.push(JSON.stringify(text.slice(lastindex, index)));
      }
      // 插值表达式
      tokens.push(`_s(${match[1].trim()})`);
      lastindex = index + match[0].length;
    }
    // 判断还有没有文本
    if (lastindex < text.length) {
      tokens.push(JSON.stringify(text.slice(lastindex)));
    }
    return `_v(${tokens.join('+')})`;
  }
}
export function generate(el) {
  let children = genChildren(el);
  let code = `_c('${el.tag}',${el.attrs.length ? `${genProps(el.attrs)}` : 'undefined'}${
    children ? `,${children}` : ''
  })`;
  return code;
}
