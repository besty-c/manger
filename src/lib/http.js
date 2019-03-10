import axios from 'axios';
//设置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1";

//设置install方法
//导出
export default {
    install(Vue){
        Vue.prototype.$http = axios;
    }
}
