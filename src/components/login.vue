<template>
  <div class="login">
    <el-form
      :model="fromData"
      :rules="rules"
      status-icon
      ref="ruleForm2"
      label-width="100px"
      class="demo-ruleForm"
      label-position="top"
    >
      <h3>用户登录</h3>
      <el-form-item label="用户名" prop="username">
        <el-input v-model.trim="fromData.username"></el-input>
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input type="password" v-model.trim="fromData.password" autocomplete="off"></el-input>
      </el-form-item>
      <el-form-item>
        <!-- 点击事件的参数对应form的ref值 -->
        <el-button type="primary" @click="submitForm('ruleForm2')">登录</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //表单数据
      fromData: {
        //用户名
        username: "",
        //密码
        password: ""
      },
      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "change" },
          { min: 3, max: 8, message: "长度在 3 到 8 个字符", trigger: "change" }
        ]
      }
    };
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          //字段验证通过
          alert("submit!");
        } else {
          //字段验证失败
          //饿了么UI的消息提示框
          this.$message.error("用户名或密码输入错误");
          return false;
        }
      });
    }
  }
};
</script>
<style>
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
/* body > div {
  height: 100%;
} */
.login {
  background-color: #344151;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}

.el-form {
  background-color: #fff;
  width: 580px;
  height: 440px;
  box-sizing: border-box;
  padding: 40px;
  border-radius: 10px;
}
.el-form .el-button--primary {
  width: 100%;
}
</style>
