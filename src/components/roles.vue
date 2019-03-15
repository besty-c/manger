<template>
  <div>
    <!-- 面包屑导航 -->
    <my-breadcrumb second="权限管理" third="角色列表"></my-breadcrumb>
    <!-- 按钮 -->
    <el-button type="primary" plain @click="addformVisible=true">添加角色</el-button>
    <!-- 表格 -->
    <el-table :data="tableData5" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 最顶级 -->
          <el-row v-for="level1 in props.row.children" class="my_row">
            <el-col :span="6">
              <el-tag
                @close="delOne(level1,props.row)"
                :key="level1.id"
                closable
              >{{level1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="18">
              <el-row v-for="level2 in level1.children">
                <el-col :span="6">
                  <el-tag
                    @close="delOne(level2,props.row)"
                    :key="level2.id"
                    closable
                    type="success"
                  >{{level2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag
                    @close="delOne(level2,props.row)"
                    v-for="level3 in level2.children"
                    :key="level3.id"
                    closable
                    type="warning"
                    class="my_tag"
                  >{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
          <el-row v-if="props.row.children.length === 0">没有更多数据</el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" width="50" type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            type="primary"
            icon="el-icon-edit"
            @click="editRole(scope.row)"
            plain
            size="mini"
          ></el-button>
          <el-button
            type="danger"
            icon="el-icon-delete"
            @click="delRole(scope.row)"
            plain
            size="mini"
          ></el-button>
          <el-button @click="getRights(scope.row)" type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 增加角色对话框 -->
    <el-dialog title="添加用户" :visible.sync="addformVisible">
      <el-form
        :model="addform"
        status-icon
        label-position="right"
        label-width="80px"
        :rules="rules"
        ref="addform"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="addform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="addform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addformVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('addform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 编辑角色的弹框 -->
    <el-dialog title="编辑角色" :visible.sync="editformVisible">
      <el-form
        :model="editform"
        status-icon
        label-position="right"
        label-width="80px"
        :rules="rules"
        ref="editform"
      >
        <el-form-item label="角色名称" prop="roleName">
          <el-input v-model="editform.roleName" autocomplete="off"></el-input>
        </el-form-item>
        <el-form-item label="角色描述" prop="roleDesc">
          <el-input v-model="editform.roleDesc" autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editformVisible = false">取 消</el-button>
        <el-button type="primary" @click="submitForm('editform')">确 定</el-button>
      </div>
    </el-dialog>
    <!-- 树形控件 -->
    <el-dialog title="分配权限" :visible.sync="treeVisible">
      <el-tree
        default-expand-all
        node-key="id"
        ref="tree"
        :default-checked-keys="checkedkeys"
        :props="defaultProps"
        :data="treedata"
        show-checkbox
      ></el-tree>
      <div slot="footer" class="dialog-footer">
        <el-button @click="treeVisible = false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //角色列表数据
      tableData5: [],
      //编辑角色数据
      editform: {
        roleName: "",
        roleDesc: ""
      },
      //编辑框的显示
      editformVisible: false,
      //增加角色
      addformVisible: false,
      //树形控件
      treeVisible: false,
      //增加角色的数据
      addform: {
        roleName: "",
        roleDesc: ""
      },
      //验证规则
      rules: {
        roleName: [
          { required: true, message: "该字段不能为空", trigger: "blur" }
        ],
        roleDesc: [
          { required: true, message: "该字段不能为空", trigger: "blur" }
        ]
      },
      defaultProps: {
        children: "children",
        label: "authName"
      },
      treedata: {},
      //树形控件被选中的部分
      checkedkeys:[],
      //角色数据
      editItem:{},
    };
  },
  methods: {
    //获取数据
    async getRoles() {
      let res = await this.$http.get("roles");
      // console.log(res);
      this.tableData5 = res.data.data;
    },
    //删除权限
    async delOne(value, item) {
      // console.log(value); 权限
      // console.log(item); //角色
      let res = await this.$http.delete(`roles/${item.id}/rights/${value.id}`);
      // console.log(res);
      //返回的数据是操作完成后的权限数据
      item.children = res.data.data;
    },
    //删除角色
    delRole(item) {
      //弹框提示用户
      this.$confirm("是否删除该角色?", "提示", {
        confirmButtonText: "删了",
        cancelButtonText: "不要",
        type: "warning"
      })
        .then(async () => {
          //点击确定,发送请求,删除角色
          let res = await this.$http.delete(`roles/${item.id}`);
          // console.log(res);
          if (res.data.meta.status == 200) {
            //删除成功,刷新列表
            this.getRoles();
          }
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除"
          });
        });
    },
    //编辑角色
    async editRole(item) {
      //请求角色数据
      let res = await this.$http.get(`roles/${item.id}`);
      // console.log(res);
      if (res.data.meta.status === 200) {
        //获取成功
        this.editform = res.data.data;
      }
      //显示对话框
      this.editformVisible = true;
    },
    //对话框表单提交
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          //验证通过
          //发送请求
          let res;
          if (formName == "editform") {
            //修改用户信息
            res = await this.$http.put(`roles/${this.editform.roleId}`, {
              roleName: this.editform.roleName,
              roleDesc: this.editform.roleDesc
            });
          } else if (formName == "addform") {
            res = await this.$http.post("roles", this.addform);
          }
          if (res.data.meta.status == 201 || res.data.meta.status == 200) {
            //创建成功,刷新页面
            this.getRoles();
            //隐藏表单
            this.addformVisible = false;
            this.editformVisible = false;
            //清空表单
            this.$refs[formName].resetFields();
          }
        } else {
          this.$message.warning("请正确输入数据");
          return false;
        }
      });
    },
    //树状控件
    //获取权限
    async getRights(items) {
      let res = await this.$http.get("rights/tree");
      // console.log(res);
      this.treedata = res.data.data;
      //显示树形控件
      this.treeVisible = true;
      //计算被选中的key(id)
      let ckecklist = [];
      //遍历数据,将id添加到数组中
      items.children.forEach(v1 => {
        ckecklist.push(v1.id);
        v1.children.forEach(v2=>{
          ckecklist.push(v2.id);
          v2.children.forEach(v3=>{
            ckecklist.push(v3.id);
          })
        })
      });
      this.checkedkeys = ckecklist;
      // 将当前角色数据保存,方便其他函数中调用
      this.editItem = items;
    },
    //权限分配的点击事件
     async submit(){
      //获取当前被选中的多选框的id
      console.log(this.$refs.tree.getCheckedNodes());
      let getCheckedNodes = this.$refs.tree.getCheckedNodes();
      //获取所有选中的节点
      let checkedIds = [];
      //遍历数组及子数组中每个id
      function getchecked(children){
        if(children){
          children.forEach(v=>{
            checkedIds.push(v.id);
            getchecked(children.children)
          })
        }
      };
      getchecked(getCheckedNodes);
      //会有重复的id
      //去重 es6中的set
      let set = new Set(checkedIds);
      //...  展开表达式 将set中的每个元素取出来

      let res = await this.$http.post(`roles/${this.editItem.id}/rights`,{
        rids:[...set].join(','),
      });
      console.log(res);
      if(res.data.meta.status === 200){
        //关闭对话框
        this.treeVisible = false;
        //刷新页面
        window.location.reload();
      }
      
      
      

    }
  },
  created() {
    this.getRoles();
  }
};
</script>

<style scoped>
.my_row {
  margin-bottom: 20px;
}
.my_tag {
  margin-right: 10px;
  margin-bottom: 5px;
}
</style>
