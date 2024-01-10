import { initMixin } from "./init";

function Vue(option) {
  // new Vue 对 option 进行初始化
  
  this._init(option);
}
initMixin(Vue)
export default Vue