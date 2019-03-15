<template>
  <div>
    <!-- 面包屑导航 -->
    <my-breadcrumb second="权限管理" third="角色列表"></my-breadcrumb>
    <!-- 按钮 -->
    <el-button type="primary" plain>主要按钮</el-button>
    <!-- 表格 -->
    <el-table :data="tableData5" style="width: 100%" border>
      <el-table-column type="expand">
        <template slot-scope="props">
          <!-- 最顶级 -->
          <el-row v-for="level1 in props.row.children" class="my_row">
            <el-col :span="6">
              <el-tag @close="delOne(level1,props.row)" :key="level1.id" closable>{{level1.authName}}</el-tag>
              <i class="el-icon-arrow-right"></i>
            </el-col>
            <el-col :span="18">
              <el-row v-for="level2 in level1.children">
                <el-col :span="6">
                  <el-tag @close="delOne(level2,props.row)" :key="level2.id" closable type="success">{{level2.authName}}</el-tag>
                  <i class="el-icon-arrow-right"></i>
                </el-col>
                <el-col :span="18">
                  <el-tag @close="delOne(level2,props.row)" v-for="level3 in level2.children" :key="level3.id" closable type="warning" class="my_tag">{{level3.authName}}</el-tag>
                </el-col>
              </el-row>
            </el-col>
          </el-row>
        </template>
      </el-table-column>
      <el-table-column label="#" width="50" type="index"></el-table-column>
      <el-table-column label="角色名称" prop="roleName"></el-table-column>
      <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" icon="el-icon-edit" plain size="mini"></el-button>
          <el-button type="danger" icon="el-icon-delete" plain size="mini"></el-button>
          <el-button type="success" icon="el-icon-check" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data() {
    return {
      //角色列表数据
      tableData5: []
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
    async delOne(value,item){
      // console.log(value); 权限
      // console.log(item); //角色
      let res = await this.$http.delete(`roles/${item.id}/rights/${value.id}`);
      // console.log(res);
      //返回的数据是操作完成后的权限数据
      item.children = res.data.data;
      
      
      
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
  .my_tag{
    margin-right: 10px;
    margin-bottom: 5px;
  }
</style>
