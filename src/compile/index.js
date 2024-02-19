// 标签名 a-aaa
const ncname = `[a-zA-Z_][\\-\\.0-9_a-zA-Z]*`;  
// 命名空间标签 aa:aa-xxx
const qnameCapture = `((?:${ncname}\\:)?${ncname})`;
// 开始标签-捕获标签名
const startTagOpen = new RegExp(`^<${qnameCapture}`); 
// 结束标签-匹配标签结尾的 </div>
const endTag = new RegExp(`^<\\/${qnameCapture}[^>]*>`);
// 匹配属性
const attribute = /^\s*([^\s"'<>\/=]+)(?:\s*(=)\s*(?:"([^"]*)"+|'([^']*)'+|([^\s"'=<>`]+)))?/; 
// 匹配标签结束的 >
const startTagClose = /^\s*(\/?)>/;
// 匹配 {{ }} 表达式
const defaultTagRE = /\{\{((?:.|\r?\n)+?)\}\}/g;

// 遍历
/**
 * 开始标签
 * @param {*} tag 标签名
 * @param {*} attrs 标签属性
 */
function start(tag,attrs) {
  console.log('tag',tag)
  console.log('attrs',attrs)
}

/**
 * 获取文本
 * @param {*} text 文本
 */
function charts(text) {
  console.log('text',text)
}

/**
 * 结束标签
 */
function end (tag) {
  console.log('tag',tag)
}
// 解析 HTML
function parseHTML(html) {
  while(html) { // html 为空结束
    let textEnd = html.indexOf('<');
    if(textEnd === 0) { // 标签
      // 开始标签
      const startTagMatch = parseStartTag(); // 开始标签内容
      if(startTagMatch) {
        start(startTagMatch.tagName,startTagMatch.attrs);
        continue
      }
      // 结束标签
      let endTagMatch = html.match(endTag);
      if(endTagMatch) {
        advance(endTagMatch[0].length);
        end(endTagMatch[1]);
        continue
      }
    }
    // 文本
    let text;
    if(textEnd > 0) {
      // 获取文本内容
      text = html.substring(0, textEnd);
    }
    if(text) {
      advance(text.length);
      charts(text);
    }
  }

  function parseStartTag() {
    const start = html.match(startTagOpen); // 1结果  2false
    if(start) {
      // 创建语法树
      let match = {
        tagName: start[1],
        attrs: [],
      };
      // 删除开始标签
      advance(start[0].length);
  
      // 属性  属性有多个 需要遍历 
      // 注意 结束标签
      let attr;
      let end;
      // 不是结束标签并且有属性
      while(!(end = html.match(startTagClose)) && (attr = html.match(attribute))) {
        match.attrs.push({
          name:attr[1],
          value:attr[3] || attr[4] || attr[5]
        })
        advance(attr[0].length);
      }
      if(end) {
        advance(end[0].length);
        return match;
      }
    }
  }

  function advance(n) {
    html = html.substring(n);
  }
}

// 生成 ast 语法树
export function compileToFunction(el) {

  let ast = parseHTML(el);
}