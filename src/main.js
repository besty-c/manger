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

Vue.component('my-breadcrumb',mybreadcrumb );
new Vue({
  render: h => h(App),
  router,

}).$mount('#app')
