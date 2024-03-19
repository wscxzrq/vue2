import { initMixin } from './init';
import { renderMixin } from './vnode/index';
import { lifeCycleMixin } from './lifeCycle';
import { InitGlobApi } from './global-api/index';

function Vue(option) {
  // new Vue 对 option 进行初始化
  this._init(option);
}
// 对状态进行初始化
initMixin(Vue);
// 对生命周期进行初始化
lifeCycleMixin(Vue);
// 添加 _render
renderMixin(Vue);
// 全局方法 Vue.mixin Vue.component Vue.extend
InitGlobApi(Vue);
export default Vue;
