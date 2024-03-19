export function mergeOptions(parent, child) {
  console.log('parent', parent);
  console.log('child', child);
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
}
