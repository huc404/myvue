<template>
  <!-- 主页 -->
  <div>
    <h3 @click="$emit('isShow')">
      <img src="../../assets/images/logo.jpg" alt="" />
      <span v-show="!collFlag">外卖商家中心</span>
    </h3>
    <el-menu
      class="el-menu-vertical-demo"
      background-color="#304156"
      text-color="#fff"
      active-text-color="#3d92eb"
      :unique-opened="true"
      :collapse="collFlag"
      :collapse-transition="false"
      :router="true"
    >
      <!-- 没有子菜单 -->
      <template v-for="item in menuList">
        <el-menu-item
          v-if="!item.children || item.meta.name === '订单管理'"
          :index="item.path"
          :key="item.path"
        >
          <i class="iconfont " :class="item.icon"></i>
          <span slot="title">{{ item.meta.name }} </span>
        </el-menu-item>
        <!--有子菜单   -->
        <el-submenu v-else :index="item.path" :key="item.path">
          <template slot="title">
            <i class="iconfont" :class="item.icon"></i>
            <span>{{ item.meta.name }}</span>
          </template>
          <el-menu-item
            v-for="sueItem in item.children"
            :key="sueItem.path"
            :index="sueItem.path"
            >{{ sueItem.meta.name }}</el-menu-item
          >
        </el-submenu>
      </template>
    </el-menu>
  </div>
</template>

<script>
import local from '../../utils/local.js'
export default {
  props: {
    collFlag: {
      type: Boolean,
      defalute: false
    }
  },
  data() {
    return {
      menuList: []
    }
  },
  created() {
    this.menuList = JSON.parse(local.get('menu'))
    console.log(this.menuList)
  }
}
</script>

<style lang="less" scoped>
.el-menu {
  border: none;
  i {
    color: #fff;
    margin-right: 8px;
  }
  .is-opened .el-menu-item {
    background-color: #263445 !important;
  }
}
h3 {
  width: 100%;
  display: block;
  justify-content: flex-end;
  display: flex;
  align-items: center;
  img {
    width: 50px;
    border-radius: 50%;
    margin-right: 10px;
  }
  span {
    margin-right: 15px;
    color: #fff;
  }
}
</style>
