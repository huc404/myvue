<template>
  <Panel>
    <template #header>
      <span>管理员信息</span>
    </template>
    <template #body>
      <ul>
        <li>
          <strong>管理员ID：</strong>
          <span>{{ userInfo.id }}</span>
        </li>
        <li>
          <strong>账号：</strong>
          <span>{{ userInfo.account }}</span>
        </li>
        <li>
          <strong>用户组：</strong>
          <span>{{ userInfo.userGroup }}</span>
        </li>
        <li>
          <strong>创建时间：</strong>
          <span>{{ userInfo.ctime | dateFormat }}</span>
        </li>
        <li>
          <strong>管理员头像：</strong>
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img v-if="imageUrl" :src="imageUrl" class="avatar" />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </li>
        <li>
          <el-button type="primary" size="mini" @click="editimg"
            >提交</el-button
          >
        </li>
      </ul>
    </template>
  </Panel>
</template>

<script>
import Panel from '../../components/panel/index.vue'
import echarts from 'echarts'
import {
  accountinfo,
  editpwd,
  getUserList,
  avataredit
} from '../../api/users.js'
import { dateFormat } from '../../utils/filters.js'
export default {
  created() {
    this.getUserList()
  },
  filters: {
    dateFormat
  },
  components: {
    Panel
  },

  data() {
    return {
      imageUrl: '',
      userInfo: [],
      sqlUrl: ''
    }
  },

  methods: {
    async getUserList() {
      const data = await accountinfo()
      console.log(data)
      this.userInfo = data.accountInfo
    },
    handleAvatarSuccess(res, file) {
      this.imageUrl = URL.createObjectURL(file.raw)
      this.sqlUrl = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const arr = ['image/jpeg', 'image/png', 'image/jpg', 'image/webp']
      // const isJPG = file.type === 'image/jpeg'
      const isJPG = arr.includes(file.type)
      const isLt2M = file.size / 1024 / 1024 < 2

      if (!isJPG) {
        this.$message.error('上传头像图片只能是 JPG 格式!')
      }
      if (!isLt2M) {
        this.$message.error('上传头像图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 确认修改
    async editimg() {
      const data = await avataredit({
        imgUrl: this.sqlUrl
      })
      // console.log(data)
      if (data.code === 0) {
        location.reload()
      }
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.avatar-uploader .el-upload {
  border: 1px dashed #333;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  margin-top: 20px;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 178px;
  height: 178px;
  line-height: 178px;
  text-align: center;
}
.avatar {
  width: 178px;
  height: 178px;
  display: block;
}
li {
  margin: 20px 0px;
}
</style>
