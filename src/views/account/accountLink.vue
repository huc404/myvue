<template>
  <panel>
    <!-- 账号列表页面 -->
    <template #header>
      <span>账号列表</span>
    </template>

    <template #body>
      <div>
        <el-button size="mini" type="danger" @click="btnDelAll"
          >批量删除</el-button
        >
        <el-button size="mini" type="primary" @click="toggleSelection()"
          >取消选择</el-button
        >
        <!-- 1.0 展示表格 -->
        <el-table
          border
          size="mini"
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%; margin-top: 20px;"
          @selection-change="handleSelectionChange"
        >
          <el-table-column type="selection"> </el-table-column>
          <el-table-column prop="account" label="账号"></el-table-column>
          <el-table-column prop="userGroup" label="用户组"> </el-table-column>
          <el-table-column label="创建时间">
            <template v-slot="{ row }">
              {{ row.ctime | dateFormat }}
            </template>
          </el-table-column>
          <el-table-column label="操作">
            <template v-slot="{ row }">
              <el-button type="primary" size="mini" @click="editUser(row)"
                >编辑</el-button
              >
              <el-button type="danger" size="mini" @click="delUser(row.id)"
                >删除</el-button
              >
            </template>
          </el-table-column>
        </el-table>

        <!-- 2.0 显示分页 -->
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

        <!-- 编辑的面板 -->
        <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
          <!-- 1.0 展示内容的部分 -->
          <el-form
            :model="editForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="60px"
            class="demo-ruleForm"
            size="mini"
          >
            <el-form-item label="账号" prop="account">
              <el-input
                type="text"
                v-model="editForm.account"
                autocomplete="off"
              ></el-input>
            </el-form-item>
            <el-form-item label="用户组" prop="role">
              <el-select v-model="editForm.val" placeholder="请选择">
                <el-option
                  v-for="item in options"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </el-form-item>
          </el-form>

          <!-- 2.0 确认点击的部分 -->
          <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary" @click="editFn">确 定</el-button>
          </span>
        </el-dialog>
      </div>
    </template>
  </panel>
</template>

<script>
import { dateFormat } from '@/utils/filters.js'
import { getUserList, delUsers, delAll, editUser } from '@/api/users.js'
import panel from '../../components/panel/index.vue'

export default {
  filters: { dateFormat },
  components: {
    panel
  },
  data() {
    return {
      currentPage: 1,
      pageSize: 5,
      tableData: [],
      total: 0,
      ids: [],
      dialogVisible: false,
      editForm: {
        account: '',
        val: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 3, max: 12, message: '长度在 3 到 12 个字符', trigger: 'blur' }
        ]
      },
      options: [
        {
          value: '普通管理员',
          label: '普通管理员'
        },
        {
          value: '超级管理员',
          label: '超级管理员'
        }
      ]
    }
  },
  created() {
    this.getAccountList()
  },
  methods: {
    async getAccountList() {
      const res = await getUserList({
        currentPage: this.currentPage,
        pageSize: this.pageSize
      })
      // console.log(res)
      this.total = res.total
      this.tableData = res.data
    },
    handleSelectionChange(val) {
      val.forEach(item => this.ids.push(item.id))
    },
    handleSizeChange(val) {
      this.pageSize = val
      this.getAccountList()
    },
    handleCurrentChange(val) {
      this.currentPage = val
      this.getAccountList()
    },
    delUser(id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 删除用户的操作
          const data = await delUsers({ id })
          this.getAccountList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 取消选择
    toggleSelection(rows) {
      if (rows) {
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    // 批量删除
    btnDelAll() {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          // 删除用户的操作
          const data = await delAll({
            ids: JSON.stringify(this.ids)
          })
          this.getAccountList()
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    editUser(row) {
      this.dialogVisible = true
      this.editForm.id = row.id
      this.editForm.account = row.account
      this.editForm.val = row.userGroup
    },
    async editFn() {
      const data = await editUser({
        id: this.editForm.id,
        account: this.editForm.account,
        userGroup: this.editForm.val
      })
      this.getAccountList()
      this.dialogVisible = false
    }
  }
}
</script>

<style lang="less" scoped>
.el-pagination {
  float: right;
  margin: 30px 0 20px;
}
</style>
