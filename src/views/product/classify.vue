<template>
  <panel>
    <template #header>
      <span>商品分类</span>
    </template>
    <template #body>
      <div>
        <!-- 1.0 添加按钮 -->
        <p>
          <el-button type="primary" size="mini" @click="dialogVisible = true"
            >添加分类</el-button
          >
        </p>
        <!-- 2.0 数据表格 -->
        <el-table :data="tableData" border style="width: 100%" size="medium">
          <el-table-column type="index" label="#" width="50"> </el-table-column>
          <el-table-column label="分类名称" width="180">
            <template v-slot="{ row }">
              <div>
                <span v-if="row.isEdit">{{ row.cateName }}</span>
                <el-input v-else v-model="row.cateName"></el-input>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="是否启用">
            <template v-slot="{ row }">
              <el-switch
                v-model="row.state"
                :disabled="row.isEdit"
                active-color="#13ce66"
                inactive-color="#ff4949"
              >
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button
                :type="row.isEdit ? 'primary' : 'success'"
                size="mini"
                @click="editCate(row.id)"
                >{{ row.isEdit ? '编辑' : '完成' }}</el-button
              >
              <el-button type="danger" size="mini" @click="delCate(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>
        <!-- 3.0 分页 -->
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage"
          :page-sizes="[2, 5, 10, 15]"
          :page-size="pageSize"
          layout="total, sizes, prev, pager, next, jumper"
          :total="total"
        >
        </el-pagination>

        <!-- 添加分类的对话框 -->
        <el-dialog
          title="添加分类"
          :visible.sync="dialogVisible"
          width="50%"
          :before-close="handleClose"
        >
          <!-- 主体布局 -->
          <div>
            <el-form
              ref="cateForm"
              :model="cateForm"
              :rules="cateRules"
              label-width="80px"
              size="mini"
            >
              <el-form-item label="分类名称" prop="cateName">
                <el-input v-model="cateForm.cateName"></el-input>
              </el-form-item>
              <el-form-item label="是否启用" prop="state">
                <el-switch
                  v-model="cateForm.state"
                  active-color="#13ce66"
                  inactive-color="#ff4949"
                >
                </el-switch>
              </el-form-item>
            </el-form>
          </div>
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false" size="mini"
              >取 消</el-button
            >
            <el-button type="primary" @click="addCate('cateForm')" size="mini"
              >确 定</el-button
            >
          </span>
        </el-dialog>
      </div>
    </template>
  </panel>
</template>

<script>
import panel from '../../components/panel/index.vue'
import {
  getCate,
  addCate,
  deleteCate,
  editCategory
} from '../../api/goodsCate.js'

export default {
  components: { panel },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      tableData: [],
      total: 0,
      dialogVisible: false,
      cateForm: {
        cateName: '',
        state: true
      },
      cateRules: {
        cateName: [
          { required: true, message: '必须输入分类名称', trigger: 'blur' }
        ]
      }
    }
  },
  created() {
    this.getCateList()
  },
  methods: {
    async getCateList() {
      const res = await getCate({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      // 由于 el-switch 需要一个布尔值，所以先过滤一下数组，把对应的值替换成布尔值
      res.data.forEach(item => {
        item.state = item.state === 1
        item.isEdit = true
      })
      this.tableData = res.data
      // console.log(this.tableData)
      this.total = res.total
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getCateList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getCateList()
    },
    handleClose(done) {
      this.$confirm('确认关闭？')
        .then(_ => {
          done()
        })
        .catch(_ => {})
    },
    // 添加分类
    addCate(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await addCate(this.cateForm)
          // console.log(data)
          if (data.code === 0) {
            this.$message.success(data.msg)
            this.getCateList()
            this.dialogVisible = false
          }
        } else {
          this.$message.error('请填写必填项！')
          return false
        }
      })
    },
    // 删除分类
    delCate(id) {
      this.$confirm('此操作将永久删除该分类, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(async () => {
        const data = await deleteCate({ id })
        this.getCateList()
        if (data.code === 0) {
          this.$message({
            type: 'success',
            message: data.msg
          })
        }
      })
    },
    // 编辑分类
    async editCate(id) {
      const data = this.tableData.find(item => item.id === id)
      if (data.isEdit) {
        data.isEdit = false
      } else {
        // 证明现在是 false了，就可以发请求了
        const res = await editCategory({
          id: data.id,
          cateName: data.cateName,
          state: data.state
        })
        // 如果修改成功，重新请求数据
        if (res.code === 0) {
          this.getCateList()
        }
      }
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  float: right;
  margin: 30px 0 40px;
}
</style>
