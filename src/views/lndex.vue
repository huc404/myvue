<template>
  <div class="enter">
    <h3>系统登录</h3>
    <div>
      <el-form
        :model="ruleForm"
        status-icon
        :rules="rules"
        ref="ruleForm"
        class="demo-ruleForm"
        size="mini"
      >
        <el-form-item prop="uname">
          <el-input
            type="text"
            v-model="ruleForm.uname"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item prop="pass">
          <el-input
            type="password"
            v-model="ruleForm.pass"
            autocomplete="off"
          ></el-input>
        </el-form-item>

        <el-form-item>
          <el-button type="primary" @click="submitForm('ruleForm')"
            >提交</el-button
          >
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import { login } from '../api/users.js'
import local from '../utils/local.js'
import { addRouter } from '@/router/index.js'
export default {
  data() {
    return {
      ruleForm: {
        pass: '',
        uname: ''
      },
      rules: {
        uname: [
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
        ],
        pass: [
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 2, max: 18, message: '长度在 2 到 18 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          const data = await login({
            account: this.ruleForm.uname,
            password: this.ruleForm.pass
          })
          console.log(data)
          // 根据登入结果判断
          if (data.code === 0) {
            this.$message.error(data.msg)
            // 把token存到本地
            local.set('token', data.token)
            // 用户登入成功后，把角色存在本地
            local.set('role', data.role)
            // 计算动态路由
            addRouter()
            setTimeout(() => {
              this.$router.push('/')
            }, 1000)
          }
        } else {
          this.$message.error('效验失败，请检查格式是否正确')
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
.enter {
  height: 100%;
  background-color: #2d3a4b;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h3 {
    letter-spacing: 3px;
    color: #fff;
  }
  .el-form {
    width: 360px;
    .el-button {
      width: 100%;
      letter-spacing: 5px;
    }
  }
}
</style>
