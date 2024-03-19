import { mergeOptions } from '../utils/index';
export function InitGlobApi(Vue) {
  /**
   * 混入对象
   * @param {*} mixin {}
   */
  // Vue.options = {create:[a,b,c],watch:[a,b]}
  Vue.options = {};
  Vue.Mixin = function (mixin) {
    // 对象的合并
    mergeOptions(this.options, mixin);
  };
}
