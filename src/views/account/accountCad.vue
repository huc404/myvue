<template>
  <panel>
    <!-- 账户列表页面 -->
    <template #header>
      <span>修改账号</span>
    </template>
    <!-- 账户列表内容 -->
    <template #body>
      <div class="from-box">
        <el-form
          :model="ruleForm"
          status-icon
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="原密码" prop="pass">
            <el-input
              type="password"
              v-model="ruleForm.pass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="newPass">
            <el-input
              type="password"
              v-model="ruleForm.newPass"
              autocomplete="off"
            ></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="checkpass">
            <el-input
              type="password"
              v-model="ruleForm.checkpass"
              autocomplete="off"
            ></el-input>
          </el-form-item>

          <el-form-item>
            <el-button type="primary" @click="submitForm('ruleForm')"
              >确定</el-button
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
import { pass, checkpass1 } from '../../utils/validate.js'
import { checkoldpwd, editpwd } from '../../api/users.js'
import local from '../../utils/local'

export default {
  components: {
    panel
  },
  data() {
    return {
      ruleForm: {
        pass: '',
        newPass: '',
        checkpass: ''
      },
      // 自定义效验规则
      rules: {
        pass: [
          {
            validator: pass('请输入原密码', this, () => this.oblPass()),
            trigger: 'blur'
          }
        ],
        newPass: [{ validator: pass('请输入新密码', this), trigger: 'blur' }],
        // 表单一致性
        checkpass: [{ validator: checkpass1(this), trigger: 'blur' }]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          if (await this.oblPass()) {
            const data = await editpwd({
              newPwd: this.ruleForm.newPass
            })
            console.log(data)
            if (data.code === 0) {
              this.$message.success('修改成功')
              local.del('token')
              this.$router.push('/login')
            }
          } else {
            this.$message.error('原密码有误')
          }
        } else {
          return false
        }
      })
    },
    resetForm(formName) {
      this.$refs[formName].resetFields()
    },
    // 验证密码
    async oblPass() {
      const data = await checkoldpwd({
        oldPwd: this.ruleForm.pass
      })
      if (data.code === '00') {
        this.$message.success(data.msg)
        return true
      } else {
        this.$message.error(data.msg)
        return false
      }
    }
    // 修改新密码
  }
}
</script>

<style lang="less" scoped>
.from-box {
  width: 400px;
}
</style>
