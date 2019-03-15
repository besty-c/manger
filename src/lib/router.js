//导入vue
import Vue from 'vue';
//导入路由
import VueRouter from 'vue-router';
Vue.use(VueRouter);

//导入组件
import login from '../components/login.vue';
import index from '../components/index.vue';
import users from '../components/users.vue';
import roles from '../components/roles.vue';
import rights from '../components/rights.vue';
import params from '../components/params.vue';
import goods from '../components/goods.vue';
import categories from '../components/categories.vue';
import orders from '../components/orders.vue';
import reports from '../components/reports.vue';
//写规则

let routes = [{
        path: '/login',
        component: login,
    },
    {
        path: '/',
        component: index,
        children: [{
                path: 'users',
                component: users
            },
            {
                path: 'roles',
                component: roles
            },
            {
                path: 'rights',
                component: rights
            },
            {
                path: 'params',
                component: params
            },
            {
                path: 'goods',
                component: goods
            },
            {
                path: 'orders',
                component: orders
            },
            {
                path: 'categories',
                component: categories
            },
            {
                path: 'reports',
                component: reports
            },
        ]
    },
    {
        path: '/index',
        component: index,
    },
];

//实例化路由
const router = new VueRouter({
    routes,
})

//使用导航守卫进行登录验证
router.beforeEach((to, from, next) => {
    // to是指要跳转的网址
    // console.log(to);

    // from是指跳转过来的网址
    // next继续往下执行,可以给一个网址参数,让她跳到对应网址
    //出了登陆页,都需要进行登录验证
    if (to.path == '/login') {
        //是登陆页
        next()
    } else {
        //验证token
        if (window.sessionStorage.getItem("token")) {
            //存在token
            next();
        } else {
            //不存在token
            //提示不能查看,打回登陆页
            //此时的this是指路由对象,$message在vue对象中
            Vue.prototype.$message.warning("没登录不能查看呢");
            next('/login');
        }
    }
})
//导出路由对象
export default router;