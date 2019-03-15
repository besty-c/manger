<template>
  <div>
    <!-- 面包屑导航 -->
    <my-breadcrumb second="数据统计" third="数据报表"></my-breadcrumb>
    <!-- echart图表 -->
    <!-- 为 ECharts 准备一个具备大小（宽高）的 DOM -->
    <div id="main" style="width: 800px;height:500px;" ref="container"></div>
  </div>
</template>

<script>
//导入echarts
import echarts from 'echarts';
// 导入jQuery
import $ from 'jquery';
export default {
  data() {
    return {
      option: {
        title: {
          text: "堆叠区域图"
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "cross",
            label: {
              backgroundColor: "#6a7985"
            }
          }
        },
        legend: {
          data: ["邮件营销", "联盟广告", "视频广告", "直接访问", "搜索引擎"]
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            boundaryGap: false,
            data: ["周一", "周二", "周三", "周四", "周五", "周六", "周日"]
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: [
          {
            name: "邮件营销",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [120, 132, 101, 134, 90, 230, 210]
          },
          {
            name: "联盟广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [220, 182, 191, 234, 290, 330, 310]
          },
          {
            name: "视频广告",
            type: "line",
            stack: "总量",
            areaStyle: {},
            data: [150, 232, 201, 154, 190, 330, 410]
          },
          {
            name: "直接访问",
            type: "line",
            stack: "总量",
            areaStyle: { normal: {} },
            data: [320, 332, 301, 334, 390, 330, 320]
          },
          {
            name: "搜索引擎",
            type: "line",
            stack: "总量",
            label: {
              normal: {
                show: true,
                position: "top"
              }
            },
            areaStyle: { normal: {} },
            data: [820, 932, 901, 934, 1290, 1330, 1320]
          }
        ]
      }
    };
  },
  //这个钩子中可以获取到dom元素
   async mounted() {
    // // 获取数据
    let res = await this.$http.get('reports/type/1');
    console.log(res);
    // 将获取到的数据,合并到option中
    //使用遍历,或者es6的assign方法,只有浅拷贝
    //使用jquery的深拷贝方法
    $.extend(true,this.option,res.data.data);
    
    // 基于准备好的dom，初始化echarts实例
    //vue中可通过ref获取元素
    var myChart = echarts.init(this.$refs.container);
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(this.option);
  }
};
</script>

<style>
</style>
