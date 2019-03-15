<template>
  <div>
    <!-- 面包屑导航 -->
    <my-breadcrumb second="订单管理" third="订单列表"></my-breadcrumb>
    <!-- 表格 -->
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column label="#" width="50" type="index"></el-table-column>
      <el-table-column prop="order_number" label="订单编号" width="180"></el-table-column>
      <el-table-column prop="order_price" label="订单价格" width="180"></el-table-column>
      <el-table-column prop="order_pay" label="是否付款">
        <!-- 使用自己的组件显示 -->
        <template slot-scope="scope">
          <el-button v-if="scope.row.order_pay == '0'" type="danger" plain>未付款</el-button>
          <el-button v-else type="success" plain>已付款</el-button>
        </template>
      </el-table-column>
      <el-table-column prop="is_send" label="是否发货"></el-table-column>
      <el-table-column prop="create_time" label="下单时间">
        <template slot-scope="scope">{{scope.row.create_time | formatTime()}}</template>
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="primary" @click="editformVisible= true" icon="el-icon-edit" plain size="mini"></el-button>
        </template>
      </el-table-column>
    </el-table>
    <!-- 分页 -->
    <el-pagination
      :current-page="1"
      :page-sizes="[5, 10, 15, 20]"
      :page-size="10"
      layout="total, sizes, prev, pager, next, jumper"
      :total="total"
      @size-change='changeSize'
      @current-change='changeCurrent'
    ></el-pagination>
    <!-- 编辑对话框 -->
    <!-- 编辑的弹框 -->
    <el-dialog title="修改订单地址" :visible.sync="editformVisible">
      <el-form
        status-icon
        label-position="right"
        label-width="80px"
        ref="editform"
      >
        <el-form-item label="省市区/县" prop>
          <!-- 级联选择器 -->
          <el-cascader
            expand-trigger="hover"
            :options="options"
            v-model="selectedOptions2"
          ></el-cascader>
        </el-form-item>
        <el-form-item label="详细地址">
          <el-input autocomplete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="editformVisible = false">取 消</el-button>
        <el-button type="primary">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
// 导入moment
import moment from "moment";
//导入省市区数据
import options from '../lib/city_data2017_element.js'
export default {
  data() {
    return {
      //表格数据
      tableData: [],
      sendData: {
        pagesize: 10,
        pagenum: 1
      },
      //修改信息
      editform: [],
      //省市区数据
      options,
      selectedOptions2:[],
      editformVisible:false,
      //总数据
      total:0,
    };
  },
  //使用moment.js转换时间格式
  filters: {
    formatTime(value) {
      // 处理时间 并返回 基于moment
      return moment(value).format("YYYY-MM-DD HH:mm:ss");
    }
  },
  //页面组件加载时渲染数据
  created() {
    this.getOrderData();
  },
  methods: {
    async getOrderData(){
      let res = await this.$http.get("orders", {
      params: this.sendData
    });
    // console.log(res);
    this.tableData = res.data.data.goods;
    this.total = res.data.data.total;
    },
    changeSize(size){
      // console.log(size);
      this.sendData.pagesize = size;
      this.getOrderData();
      
    },
    changeCurrent(current){
      // console.log(current);
      this.sendData.pagenum = current;
      this.getOrderData();
      
    }
  },
};
</script>

<style>
</style>
