// 打包的配置文件
import bable from 'rollup-plugin-babel'
import serve from 'rollup-plugin-serve'

export default {
  input:'./src/index.js', // 打包入口文件
  output:{
    file:'dist/vue.js',
    format:'umd', // 在 window 上 Vue
    name:'Vue',
    sourcemap:true,
  },
  plugins:[
    bable({
      exclude:'node_modules/**'
    }),
    serve({
      port:3000,
      contentBase:'', // 如果是空字符串，则默认是当前目录
      openPage:'/index.html',
    })
  ]
}