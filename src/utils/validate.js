// 专门做校验规则的函数
// 验证密码
const pwdReg = /^[0-9A-Za-z_]{6,16}$/
export function pass(str, o = {}, fn) {
  return (rule, val, cb) => {
    // 非空验证
    if (val === '') {
      cb(new Error(str))
    } else if (!pwdReg.test(val)) {
      cb(new Error('密码必须是6-16位，数字，字母'))
    } else {
      if (o.ruleForm.checkpass !== '') {
        o.$refs.ruleForm.validateField('checkPass')
      }
      fn && fn()
      cb()
    }
  }
}
export function checkpass1(o) {
  return (rule, val, cb) => {
    if (val === '') {
      cb(new Error('请在次输入密码'))
    } else if (val !== o.ruleForm.newPass) {
      cb(new Error('两次输入密码不一致!'))
    } else {
      cb()
    }
  }
}
