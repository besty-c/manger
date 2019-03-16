import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false;

//导入路由
import router from './lib/router';

//导入饿了么ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);

//导入axios
import axios from './lib/http';
Vue.use(axios);

//导入面包屑组件
import mybreadcrumb from './components/mybreadcrumb.vue'

//导入vuex
import Vuex from 'vuex';
// 注册插件
Vue.use(Vuex);

//实例化vuex仓库对象
const store = new Vuex.Store({
  state : {
    //首页的菜单列表
    menuList:[],
  },
  mutations:{
    //修改权限时传入新的菜单列表以重新设置
    setMenu(state,newMenu){
      state.menuList = newMenu;
    }
  }
})


Vue.component('my-breadcrumb',mybreadcrumb );
new Vue({
  render: h => h(App),
  router,
  //设置仓库对象
  store,

}).$mount('#app')
