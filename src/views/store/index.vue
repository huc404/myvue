<template>
  <panel>
    <template #header>
      <span>店铺管理</span>
    </template>
    <template #body>
      <el-form ref="form" :model="storeForm" label-width="80px" size="mini">
        <el-form-item label="店铺名称">
          <el-input v-model="storeForm.name"></el-input>
        </el-form-item>
        <el-form-item label="店铺公告">
          <el-input type="textarea" v-model="storeForm.tips"></el-input>
        </el-form-item>
        <el-form-item label="店铺头像">
          <el-upload
            class="avatar-uploader"
            action="http://127.0.0.1:5000/users/avatar_upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
          >
            <img
              v-if="storeForm.imageUrl"
              :src="
                'http://127.0.0.1:5000/upload/imgs/acc_img/' +
                  storeForm.imageUrl
              "
              class="avatar"
            />
            <i v-else class="el-icon-plus avatar-uploader-icon"></i>
          </el-upload>
        </el-form-item>
        <el-form-item label="店铺图片">
          <el-upload
            action="http://127.0.0.1:5000/shop/upload"
            list-type="picture-card"
            :file-list="storeForm.imgUrl"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
          >
            <i class="el-icon-plus"></i>
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt="" />
          </el-dialog>
        </el-form-item>
        <el-form-item label="配送费">
          <el-input v-model="storeForm.price"></el-input>
        </el-form-item>
        <el-form-item label="配送时间">
          <el-input v-model="storeForm.time"></el-input>
        </el-form-item>
        <el-form-item label="配送描述">
          <el-input v-model="storeForm.desc"></el-input>
        </el-form-item>
        <el-form-item label="店铺评分">
          <el-input v-model="storeForm.rate"></el-input>
        </el-form-item>
        <el-form-item label="销量">
          <el-input v-model="storeForm.sellCount"></el-input>
        </el-form-item>
        <el-form-item label="活动">
          <el-checkbox-group v-model="storeForm.active">
            <el-checkbox
              v-for="item in activeArr"
              :key="item"
              :label="item"
            ></el-checkbox>
          </el-checkbox-group>
        </el-form-item>
        <el-form-item label="营业时间">
          <el-time-picker
            is-range
            v-model="storeForm.date"
            range-separator="至"
            start-placeholder="开始时间"
            end-placeholder="结束时间"
            placeholder="选择时间范围"
          >
          </el-time-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="editForm"
            >确认修改</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </panel>
</template>

<script>
import moment from 'moment'
import panel from '../../components/panel/index.vue'
import { getStoreInfo, editStore } from '../../api/store.js'

export default {
  components: {
    panel
  },
  data() {
    return {
      storeForm: {
        name: '',
        tips: '',
        // 店铺头像
        imageUrl: '',
        // 店铺图片
        imgUrl: [],
        price: '',
        time: '',
        desc: '',
        rate: '',
        sellCount: '',
        active: [],
        date: []
      },
      activeArr: [
        '在线支付满28减5',
        'VC无限橙果汁全场8折',
        '单人精彩套餐',
        '特价饮品8折抢购',
        '单人特色套餐'
      ],
      dialogVisible: false,
      dialogImageUrl: '',
      baseImg: 'http://127.0.0.1:5000/upload/shop/',
      shopAvatar: ''
    }
  },
  created() {
    this.getShop()
  },
  methods: {
    async getShop() {
      const { data } = await getStoreInfo()
      // console.log(data)
      const imgArr = []
      // 把请求回来的图片列表处理成想要的数组格式
      data.pics.forEach(item => {
        imgArr.push({
          url: this.baseImg + item,
          path: item
        })
      })
      this.storeForm = {
        id: data.id,
        name: data.name,
        tips: data.bulletin,
        // 店铺头像
        imageUrl: data.avatar,
        // 店铺图片
        imgUrl: imgArr,
        price: data.deliveryPrice,
        time: data.deliveryTime,
        desc: data.description,
        rate: data.score,
        sellCount: data.sellCount,
        active: data.supports,
        date: data.date
      }
    },
    handleAvatarSuccess(res, file) {
      this.storeForm.imageUrl = res.imgUrl
      this.shopAvatar = res.imgUrl
    },
    beforeAvatarUpload(file) {
      const arr = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']
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
    handleRemove(file, fileList) {
      // console.log(file, fileList)
      this.storeForm.imgUrl = this.storeForm.imgUrl.filter(
        item => item.uid !== file.uid
      )
      console.log(this.storeForm.imgUrl)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res) {
      // console.log(res)
      this.storeForm.imgUrl.push({
        url: this.baseImg + res.imgUrl,
        path: res.imgUrl
      })
    },
    // 确认修改
    async editForm() {
      const shopImgs = []
      this.storeForm.imgUrl.forEach(item => {
        shopImgs.push(item.path)
      })

      // 处理时间
      const timeArr = []
      this.storeForm.date.forEach(item =>
        timeArr.push(moment(item).format('YYYY-MM-DD HH:mm:ss'))
      )
      // 收集和整理请求参数
      const editData = {
        id: this.storeForm.id,
        name: this.storeForm.name,
        bulletin: this.storeForm.tips,
        // 店铺头像
        avatar: this.shopAvatar || this.storeForm.imageUrl,
        // 店铺图片
        pics: JSON.stringify(shopImgs),
        deliveryPrice: this.storeForm.price,
        deliveryTime: this.storeForm.time,
        description: this.storeForm.desc,
        score: this.storeForm.rate,
        sellCount: this.storeForm.sellCount,
        supports: JSON.stringify(this.storeForm.active),
        date: JSON.stringify(timeArr)
      }

      const data = await editStore(editData)
      if (data.code === 0) {
        this.$message.success('修改店铺信息成功！')
        location.reload()
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 350px;
}

/deep/ textarea {
  width: 350px;
  height: 120px;
  resize: none;
}

/deep/ .avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
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
  width: 128px;
  height: 128px;
  line-height: 128px;
  text-align: center;
}
.avatar {
  width: 128px;
  height: 128px;
  display: block;
}
</style>
