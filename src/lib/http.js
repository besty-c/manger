import axios from 'axios';
//导入vue,设置弹窗
import Vue from 'vue';
//设置基地址
axios.defaults.baseURL = "http://localhost:8888/api/private/v1";

//使用请求拦截器,统一设置token
axios.interceptors.request.use(function (config) {
  // 发请求之前
  if (config.url.indexOf('/login') == -1) {
    //不存在login 不是登陆页
    //设置token
    config.headers.Authorization = sessionStorage.getItem("token");
  }

  return config;
}, function (error) {
  // Do something with request error
  return Promise.reject(error);
});

//相应前拦截器,统一设置弹窗
axios.interceptors.response.use(function (response) {
  // Do something with response data
  Vue.prototype.$message(response.data.meta.msg);
  return response;
}, function (error) {
  // Do something with response error
  return Promise.reject(error);
});
//设置install方法
//导出
export default {
  install(Vue) {
    Vue.prototype.$http = axios;
  }
}