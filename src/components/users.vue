<template>
  <div>
    <!-- 面包屑导航 -->
    <el-breadcrumb separator-class="el-icon-arrow-right" class="my_breadcrumb">
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item>用户管理</el-breadcrumb-item>
      <el-breadcrumb-item>用户列表</el-breadcrumb-item>
    </el-breadcrumb>
    <!-- 搜索框 -->
    <!-- 栅格布局 -->
    <el-row>
      <el-col :span="6">
        <div class="grid-content bg-purple">
          <!-- 使用原生的事件,加上native -->
          <el-input
            @keyup.native.enter="search"
            v-model="sendData.query"
            placeholder="请输入内容"
            class="input-with-select"
          >
            <el-button @click="search" slot="append" icon="el-icon-search"></el-button>
          </el-input>
        </div>
      </el-col>
      <el-col :span="12" class="add_user">
        <div class="grid-content bg-purple-light">
          <el-button type="success" plain @click="addformVisible=true">添加用户</el-button>
        </div>
      </el-col>
    </el-row>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="#" width="30" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch active-color="#13ce66" v-model="scope.row.mg_state" inactive-color="#ff4949"></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[10, 20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="tableData.length"
    ></el-pagination>
    <!-- 添加用户的弹框 -->
    <el-dialog title="收货地址" :visible.sync="addformVisible">
      <el-form :model="addform" status-icon label-position="right" label-width="80px" :rules="rules">
        <el-form-item label="用户名" prop="username">
          <el-input v-model="addform.username" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="addform.password" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="addform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="addform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    var checkEmail = (rule, value, callback) => {
      if (!value) {
          //邮箱非必填项
      }
      setTimeout(() => {
        let reg = /\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*/;
        if (reg.test(value)) {
            callback();
        } else {
          callback(new Error("请输入正确的邮箱"));
        }
      }, 1000);
    };
    return {
      tableData: [],
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //弹出框是否可以,默认不可见
      addformVisible: false,
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 3, max: 12, message: "长度在 3 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        email: [
            { validator: checkEmail, trigger: 'blur' }
          ]
        //自定义规则
      }
    };
  },
  async created() {
    //发送请求,获取用户列表数据
    //调用search方法
    this.search();
  },
  methods: {
    async search() {
      //发送请求,搜索框内容与sendData中的query进行绑定,即可查询内容
      let res = await this.$http.get("users", {
        headers: {
          Authorization: sessionStorage.getItem("token")
        },
        params: this.sendData
      });
      // console.log(res);
      this.tableData = res.data.data.users;
    }
  }
};
</script>

<style>
/* 只有自己的类名层级不够 */
.el-breadcrumb.my_breadcrumb {
  height: 45px;
  line-height: 45px;
  background-color: #d4dce5;
  padding-left: 10px;
}
.add_user {
  padding-left: 10px;
}
</style>
