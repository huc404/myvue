<template>
  <panel>
    <template #header>
      <span>商品添加</span>
    </template>
    <template #body>
      <el-form
        :model="ruleForm"
        :rules="rules"
        ref="ruleForm"
        label-width="100px"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item label="商品名称" prop="goodName">
          <el-input v-model="ruleForm.goodName"></el-input>
        </el-form-item>
        <el-form-item label="商品分类" prop="goodCate">
          <el-select v-model="ruleForm.goodCate" placeholder="请选择活动区域">
            <el-option
              v-for="item in cateData"
              :key="item.cateName"
              :label="item.cateName"
              :value="item.cateName"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商品价格">
          <el-input-number
            v-model="ruleForm.price"
            :min="1"
            :max="10"
          ></el-input-number>
        </el-form-item>
        <el-form-item label="商品图片">
          <el-upload
            action="http://127.0.0.1:5000/goods/goods_img_upload"
            list-type="picture-card"
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
        <el-form-item label="商品描述">
          <el-input
            type="textarea"
            v-model="ruleForm.desc"
            style="width: 270px;"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="mini" @click="goodsAdd('ruleForm')"
            >添加商品</el-button
          >
        </el-form-item>
      </el-form>
    </template>
  </panel>
</template>

<script>
import panel from '../../components/panel/index.vue'
import { addGoods, getAllCate } from '../../api/goods.js'

export default {
  components: { panel },
  data() {
    return {
      cateData: [],
      ruleForm: {
        goodName: '',
        goodCate: '',
        price: '',
        imgUrl: '',
        desc: ''
      },
      rules: {
        goodName: [
          { required: true, message: '请输入商品名称', trigger: 'blur' }
        ],
        goodCate: [
          { required: true, message: '请选择商品分类', trigger: 'change' }
        ]
      },
      dialogImageUrl: '',
      dialogVisible: false
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const data = await getAllCate()
      // console.log(data)
      this.cateData = data.categories
      console.log(this.cateData)
    },
    handleRemove(file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview(file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    handleSuccess(res) {
      console.log(res)
      this.ruleForm.imgUrl = res.imgUrl
    },
    goodsAdd(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await addGoods({
            name: this.ruleForm.goodName,
            category: this.ruleForm.goodCate,
            price: this.ruleForm.price,
            imgUrl: this.ruleForm.imgUrl,
            goodsDesc: this.ruleForm.desc
          })
          console.log(data)
          if (data.code === 0) {
            this.$message.success(data.msg)
            this.$router.push('./productLink')
          }
        } else {
          this.$message.error('请输入商品添加的必填项')
          return false
        }
      })
    }
  }
}
</script>

<style lang="less" scoped>
.el-input {
  width: 270px;
}
</style>
