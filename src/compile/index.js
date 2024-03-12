import { generate } from './generate';
import { parseHTML } from './parseAst';
// 生成 ast 语法树
export function compileToFunction(el) {
  // 将 html 解析成 ast语法树
  let ast = parseHTML(el);
  // 将 ast 语法树变成 字符串
  let code = generate(ast);
  // 将字符串变成函数
  let render = new Function(`with(this){return ${code}}`);
  return render;
}
