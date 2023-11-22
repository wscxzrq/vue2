# 学习手写vue2

## 创建项目
```bash
npm init -y
```

## 安装依赖
```bash
npm add @babel/core @babel/preset-env rollup rollup-plugin-babel rollup-plugin-serve -D
```

## 项目结构
```bash
├── build
├── config
├── index.html
├── package.json
├── src
│   ├── App.vue
│   ├── assets
│   │   └── logo.png
│   ├── components
```

## 面试题

### 为什么 data 有对象与函数两种方式
1. 隔离`作用域`
2. 在`根节点`中使用`对象`方式，在`组件`中使用`函数`方式，使用函数方式时 需要注意 `this` 指向，默认为 `window` 调用，需要使用 `call` 方法将 `vm` 也就是Vue 实例传递过去


