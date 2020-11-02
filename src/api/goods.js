// 1.0 引入axios的二次封装
import request from '@/utils/request.js'

/*
 *  添加商品
 */
export function addGoods(req) {
  return request.post('/goods/add', req)
}

/*
 *  获取所有的分类
 */
export function getAllCate(req) {
  return request.get('/goods/categories', req)
}

/*
 *  获取所有商品
 */
export function getAllgoods(req) {
  return request.get('/goods/list', req)
}
