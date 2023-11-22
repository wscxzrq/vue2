import { initState } from "./initState";

// 初始化
export function initMixin(Vue) {
  Vue.prototype._init = function(options) {
    let vm = this;
    // 1. 将 option 保存到 this.$options 上
    vm.$options = options;
    initState(vm);
  }
}
