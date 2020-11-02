<template>
  <panel>
    <!-- 账号列表页面 -->
    <template #header>
      <span>账号添加</span>
    </template>

    <template #body>
      <div>
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
          size="mini"
        >
          <el-form-item label="账号" prop="account">
            <el-input
              type="text"
              v-model="ruleForm.account"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="用户组" prop="role">
            <el-select v-model="ruleForm.val" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >提交</el-button
            >
            <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </template>
  </panel>
</template>

<script>
import panel from '../../components/panel/index.vue'
import { pass } from '../../utils/validate'
import { addUser } from '@/api/users.js'

export default {
  components: {
    panel
  },
  data() {
    return {
      ruleForm: {
        account: '',
        pass: '',
        val: ''
      },
      rules: {
        account: [
          { required: true, message: '请输入账号名称', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ],
        pass: [{ validator: pass('请输入密码', this), trigger: 'blur' }]
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
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await addUser({
            account: this.ruleForm.account,
            password: this.ruleForm.pass,
            userGroup: this.ruleForm.val
          })
          if (data.code === 0) {
            // 清空表单
            this.ruleForm.val = ''
            this.resetForm('ruleForm')
            this.$router.push('/account/accountLink')
          }
        } else {
          this.$message.error('你咋不验证好了呢！！！')
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
.el-form {
  width: 378px;
}
</style>
