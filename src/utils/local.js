// 封装设置localStorage的方法
export default {
  set(key, value) {
    window.localStorage.setItem(key, value)
  },
  get(key) {
    return window.localStorage.getItem(key)
  },
  del(key) {
    window.localStorage.removeItem(key)
  },
  clear() {
    window.localStorage.clear()
  }
}
