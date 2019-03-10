//导入vue
import Vue from 'vue';
//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入组件
import login from '../components/login.vue';
import index from '../components/index.vue';
//写规则

let routes =[
    {
        path:'/login',
        component:login,
    },
    {
        path:'/',
        component:index,
    },
    {
        path:'/index',
        component:index,
    }
];

//实例化路由
const router = new VueRouter({
    routes,
})
//导出路由对象
export default router;