import axios from 'axios'
import { MessageBox, Message } from 'element-ui'
import qs from 'qs'
import local from './local'
// 基本配置信息
axios.defaults.baseURL = 'http://127.0.0.1:5000'
axios.defaults.timeout = 10000
// 2.0 拦截器
axios.interceptors.request.use(config => {
  // 如果你有token，那么久给header来一个
  const token = local.get('token')
  if (token) {
    // 设置请求header
    config.headers.Authorization = token
  }
  return config
})
// 3.0导入一下基本的方法
export default {
  get(url, params = {}) {
    return new Promise((resolve, reject) => {
      axios
        .get(url, { params })
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  },
  post(url, req = {}) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, qs.stringify(req))
        .then(res => {
          resolve(res.data)
        })
        .catch(err => {
          reject(err)
        })
    })
  }
}
