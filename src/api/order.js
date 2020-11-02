// 引入axios的第二次封装
import request from '../utils/request.js'

// 获取订单列表
export function getOrderList(req) {
  return request.get('/order/list', req)
}
// 查询订单
export function orderSearch(req) {
  return request.get('/order/search', req)
}
// 订单详情
export function orderDataLink(req) {
  return request.get('/order/detail', req)
}
