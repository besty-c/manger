<template>
  <el-breadcrumb separator-class="el-icon-arrow-right" class="my_breadcrumb">
    <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
    <el-breadcrumb-item >{{second}}</el-breadcrumb-item>
    <el-breadcrumb-item>{{third}}</el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
export default {
    //对外暴露可以设置的属性
    props:['second','third'],
};
</script>

<style>
</style>
