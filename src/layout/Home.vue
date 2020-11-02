<template>
  <el-container>
    <el-aside :width="flag ? '64px' : '200px'">
      <navMenu :collFlag="flag" @isShow="fn" />
    </el-aside>
    <el-container>
      <el-header>
        <Header />
      </el-header>
      <el-main>
        <router-view />
      </el-main>
    </el-container>
  </el-container>
</template>

<script>
import navMenu from './menu/index.vue'
import Header from './header/index.vue'
export default {
  data() {
    return {
      flag: false
    }
  },
  components: {
    navMenu,
    Header
  },
  methods: {
    fn() {
      this.flag = !this.flag
    }
  }
}
</script>

<style lang="less" scoped>
.el-container {
  height: 100%;
  .el-main {
    background-color: #f0f2f5;
  }
}
.el-header,
.el-footer {
  background-color: #ffffff;
}

.el-aside {
  background-color: #304156;
}
</style>
