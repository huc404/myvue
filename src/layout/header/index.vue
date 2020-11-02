<template>
  <div class="header-box">
    <!-- 面包屑 -->
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <el-breadcrumb-item
        v-for="item in pathArr"
        :key="item.name"
        :to="{ path: item.path }"
        >{{ item.name }}</el-breadcrumb-item
      >
    </el-breadcrumb>

    <!-- 个人中心 -->
    <div>
      <el-dropdown trigger="click" @command="handleCommand">
        <span class="el-dropdown-link">
          欢迎登陆，{{ userInfo.account }}
          <i class="el-icon-arrow-down el-icon--right"></i>
        </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="p">个人中心</el-dropdown-item>
          <el-dropdown-item command="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <el-avatar :src="userInfo.imgUrl" :size="35"></el-avatar>
    </div>
  </div>
</template>

<script>
import local from '@/utils/local.js'
import { accountinfo } from '../../api/users.js'

export default {
  data() {
    return {
      pathArr: [],
      userInfo: {}
    }
  },
  created() {
    this.calcPath()
    this.getUsers()
  },
  methods: {
    calcPath() {
      // console.log(this.$route)
      const arr = [{ path: '/', name: '首页' }]
      this.$route.matched.forEach((item, index) => {
        if (index !== 0) {
          arr.push({
            path: item.meta.path,
            name: item.meta.name
          })
        }
      })
      // console.log(arr)
      this.pathArr = arr
    },
    handleCommand(c) {
      if (c === 'logout') {
        this.$confirm('真的要退出了嘛？, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            local.del('token')
            this.$router.push('/login')
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消退出'
            })
          })
      } else if (c === 'p') {
        this.$router.push('/center')
      }
    },
    // 个人中心的数据
    async getUsers() {
      const data = await accountinfo()
      this.userInfo = data.accountInfo
    }
  },
  watch: {
    '$route.path'() {
      this.calcPath()
    }
  }
}
</script>

<style lang="less" scoped>
.header-box {
  height: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;

  > div {
    display: flex;
    align-items: center;

    .el-dropdown {
      margin-right: 20px;
      cursor: pointer;
    }
  }
}
</style>
