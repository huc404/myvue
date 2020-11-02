// getStoreInfo, editStore
// 引入axios的第二次封装
import request from '../utils/request.js'

// 登入请求
export function getStoreInfo(req) {
  return request.get('/shop/info', req)
}

/*
 *  获取店铺
 */
export function editStore(req) {
  return request.post('/shop/edit', req)
}
