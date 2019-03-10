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
      <el-aside class="index-aside" width="200px">Aside</el-aside>
      <el-main class="index-main">Main</el-main>
    </el-container>
  </el-container>
</template>

<script>
export default {
  beforeCreate() {
    //判断有没有token
    if (window.sessionStorage.getItem("token")) {
      //存在token
    } else {
      //不存在token
      //提示不能查看,编程式跳转
      this.$message.warning("没登录不能查看呢");
      this.$router.push("/login");
    }
  },
  methods: {
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
.index-main {
  background-color: #eaeef2;
}
</style>
