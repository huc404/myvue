// 引入axios的第二次封装
import request from '../utils/request.js'

// 登入请求
export function login(req) {
  return request.post('/users/checkLogin', req)
}
// 用户列表
export function getUserList(req) {
  return request.get('/users/list', req)
}
// 检查旧密码是否正确
export function checkoldpwd(req) {
  return request.get('users/checkoldpwd', req)
}
// 修改新密码/users/accountinfo
export function editpwd(req) {
  return request.post('/users/editpwd', req)
}
// 修改新密码/users/accountinfo
export function accountinfo(req) {
  return request.get('/users/info', req)
}
// 确认修改头像/users/accountinfo
export function avataredit(req) {
  return request.get('/users/avataredit', req)
}
/*
 *  添加用户
 */
export function addUser(req) {
  return request.post('/users/add', req)
}
