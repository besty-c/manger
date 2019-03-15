<template>
  <div>
    <!-- 面包屑导航 -->
    <!-- 抽取面包屑导航,每个页面的导航名称不同 -->
    <my-breadcrumb second='用户管理' third="用户列表"></my-breadcrumb>
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
      <el-table-column label="#" width="50" type="index"></el-table-column>
      <el-table-column prop="username" label="姓名" width="180"></el-table-column>
      <el-table-column prop="email" label="邮箱"></el-table-column>
      <el-table-column prop="mobile" label="电话"></el-table-column>
      <el-table-column prop="mg_state" label="用户状态" width="100">
        <template slot-scope="scope">
          <el-switch
            active-color="#13ce66"
            v-model="scope.row.mg_state"
            inactive-color="#ff4949"
            @change="changeStatus(scope.row)"
          ></el-switch>
        </template>
      </el-table-column>
      <el-table-column prop="prop" label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            @click="handleEdit(scope.row)"
            icon="el-icon-edit"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            @click="delOne(scope.row)"
            icon="el-icon-delete"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="success"
            @click="chooseRule(scope.row)"
            icon="el-icon-check"
            plain
            size="mini"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页器 -->
    <el-pagination
      :page-sizes="[5,10,15,20]"
      :page-size="sendData.pagesize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalpages"
      @size-change="changeSize"
      @current-change="currentPage"
    ></el-pagination>
    <!-- 添加用户的弹框 -->
    <el-dialog title="添加用户" :visible.sync="addformVisible">
      <el-form
        :model="addform"
        status-icon
        label-position="right"
        label-width="80px"
        :rules="rules"
        ref="addform"
      >
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
        <el-button @click="addformVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑的弹框 -->
    <el-dialog title="编辑用户" :visible.sync="editformVisible">
      <el-form
        :model="editform"
        status-icon
        label-position="right"
        label-width="80px"
        :rules="rules"
        ref="editform"
      >
        <el-form-item label="用户名" prop="username">
          <el-input v-model="editform.username" autocomplete="off" disabled></el-input>
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="editform.email" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="电话" prop="mobile">
          <el-input v-model="editform.mobile" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editformVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 分配角色的对话框 -->
    <el-dialog title="添加用户" :visible.sync="roleformVisible">
      <el-form
        :model="roleform"
        status-icon
        label-position="right"
        label-width="120px"
        :rules="rules"
        ref="roleform"
      >
        <el-form-item label="当前用户" prop="username">{{roleform.username}}</el-form-item>
        <el-form-item label="请选择角色">
          <el-select v-model="roleform.role_name" placeholder="请选择活动区域">
            <el-option
              v-for="item in rolelist"
              :key="item.value"
              :label="item.roleName"
              :value="item.id"
            ></el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="roleformVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('roleform')">确 定</el-button>
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
        callback();
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
    var checkMobie = (rule, value, callback) => {
      if (!value) {
        //手机号非必填项
        //相当于next()
        callback();
      }
      setTimeout(() => {
        let reg = /^(0|86|17951)?(13[0-9]|15[012356789]|17[678]|18[0-9]|14[57])[0-9]{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          callback(new Error("请输入正确的手机号"));
        }
      }, 1000);
    };
    return {
      totalpages: 0,
      tableData: [],
      //用户列表数据
      sendData: {
        query: "",
        pagenum: 1,
        pagesize: 10
      },
      //弹出框是否可以,默认不可见
      addformVisible: false,
      editformVisible: false,
      roleformVisible: false,
      //添加用户数据
      addform: {
        username: "",
        password: "",
        email: "",
        mobile: ""
      },
      //编辑用户数据
      editform: {
        username: "",
        email: "",
        mobile: "",
        region: []
      },
      //分配角色数据
      roleform: {
        username: "",
        email: "",
        mobile: ""
      },
      //角色列表
      rolelist: [],
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" },
          { min: 2, max: 12, message: "长度在 2 到 12 个字符", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入密码", trigger: "blur" },
          { min: 6, max: 18, message: "长度在 6 到 18 个字符", trigger: "blur" }
        ],
        email: [{ validator: checkEmail, trigger: "blur" }],
        mobile: [{ validator: checkMobie, trigger: "blur" }]
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
    //获取用户列表
    async search() {
      //发送请求,搜索框内容与sendData中的query进行绑定,即可查询内容
      let res = await this.$http.get("users", {
        params: this.sendData
      });
      // console.log(res);
      this.tableData = res.data.data.users;
      this.totalpages = res.data.data.total;
    },
    //弹窗的表单提交
    submitForm(formName) {
      //表单格式验证
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          //发送请求
          let res;
          if (formName == "addform") {
            //增加用户
            res = await this.$http.post("users", this.addform);
          } else if (formName == "editform") {
            //修改用户信息
            res = await this.$http.put(
              `users/${this.editform.id}`,
              this.editform
            );
          } else if (formName == "roleform") {
            //分配角色
            res = await this.$http.put(`users/${this.roleform.id}/role`, {
              rid: this.roleform.role_name
            });
          }
          if (res.data.meta.status == 201 || res.data.meta.status == 200) {
            //创建成功,刷新页面
            this.search();
            //隐藏表单
            this.addformVisible = false;
            this.editformVisible = false;
            this.roleformVisible = false;
            //清空表单
            this.$refs[formName].resetFields();
          }
        } else {
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
    //删除用户
    delOne(users) {
      //询问是否要删除
      this.$confirm("是否删除次用户?", "提示", {
        confirmButtonText: "删了",
        cancelButtonText: "不要",
        type: "warning"
      })
        .then(async () => {
          //点击确定,发送请求,删除用户
          let res = await this.$http.delete(`users/${users.id}`);
          // console.log(res);
          if (res.data.meta.status == 200) {
            //删除成功,刷新列表
            this.search();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑用户的弹窗
    async handleEdit(user) {
      //显示弹窗
      this.editformVisible = true;
      //渲染用户数据到弹框中
      let res = await this.$http.get(`users/${user.id}`);
      this.editform = res.data.data;
    },
    //选择角色的弹框
    async chooseRule(user) {
      //显示对话框
      this.roleformVisible = true;
      this.roleform = user;
      //发送请求,获取角色列表
      let res = await this.$http.get("roles");
      console.log(res);
      this.rolelist = res.data.data;
    },
    //改变用户状态
    async changeStatus(item) {
      //发送请求
      await this.$http.put(`users/${item.id}/state/${item.mg_state}`);
    },
    //改变页容量
    changeSize(size){
      this.sendData.pagesize = size;
      //重新获取数据
      this.search();  
    },
    currentPage(page){
      this.sendData.pagenum = page;
      //重新获取数据
      this.search();
      
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
