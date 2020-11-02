// 1.0 引入axios的二次封装
import request from '@/utils/request.js'

/*
 *  获取分类列表
 */
export function getCate(req) {
  return request.get('/goods/catelist', req)
}

/*
 *  添加分类
 */
export function addCate(req) {
  return request.post('/goods/addcate', req)
}

/*
 *  删除分类
 */
export function deleteCate(req) {
  return request.get('/goods/delcate', req)
}

/*
 *  修改分类
 */
export function editCategory(req) {
  return request.post('/goods/editcate', req)
}
// *  添加商品
// */
export function getHomeData(req) {
  return request.get('/order/totaldata', req)
}
