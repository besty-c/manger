<template>
  <el-container class="index-container">
    <el-header class="index-header">
      <!-- 使用饿了么UI的栅格布局 -->
      <el-row>
        <el-col :span="4">
          <div class="grid-content bg-purple">
            <img src="../assets/logo.png" alt>
          </div>
        </el-col>
        <el-col :span="16" class="header-center">
          <div class="grid-content bg-purple-light">电商后台管理系统</div>
        </el-col>
        <el-col :span="4" class="header-right">
          <div class="grid-content bg-purple">
            <el-button type="info" @click="logout()">退出</el-button>
          </div>
        </el-col>
      </el-row>
    </el-header>
    <el-container>
      <el-aside class="index-aside" width="200px">
        <el-menu default-active="2" router class="el-menu-vertical-demo">
          <el-submenu :index="index+''" v-for="(item,index) in menuList">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span>{{item.authName}}</span>
            </template>
            <el-menu-item :index="'/'+it.path" v-for="it in item.children">
              <i class="el-icon-menu"></i> {{it.authName}}
            </el-menu-item>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-main class="index-main">
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  data() {
    return {
      menuList: []
    };
  },
  methods: {
    //退出
    logout() {
      //退出之前进行询问
      this.$confirm("确定要退出吗?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          //确定
          //退出,清除token
          window.sessionStorage.removeItem("token");
          //返回登陆页
          this.$router.push("/login");
        })
        .catch(() => {
          //取消
        });
    }
  },
  //菜单页渲染
  async created() {
    let res = await this.$http.get("menus");
    // console.log(res);
    this.menuList = res.data.data;
  }
};
</script>

<style>
.index-container {
  height: 100%;
}
.index-header {
  height: 60px;
  background-color: #b5c0cf;
  line-height: 60px;
}
.header-center {
  text-align: center;
  font-size: 30px;
  font-weight: 700;
  color: #fff;
}
.header-right {
  text-align: right;
}
.index-aside {
  width: 200px;
}
.el-main.index-main {
  background-color: #eaeef2;
  padding-top: 0;
}
</style>
