import axios from 'axios' // 引入axios
import JSONbig from 'json-bigint' // 引入json-bigint
import store from '@/store'

// 创建axios实例        .create 克隆一个axios实例
const request = axios.create({
  // 接口路径
  baseURL: 'http://ttapi.research.itcast.cn'
})
// 处理大数字
request.defaults.transformResponse =
    [function (data) {
      try {
        return JSONbig.parse(data)
      } catch (err) {
        return data
      }
    }]

// 请求拦截器

request.interceptors.request.use(function (config) {
  const { user } = store.state
  if (user) {
    config.headers.Authorization = `Bearer ${user.token}`
  }
  return config
}, function (error) {
  return Promise.reject(error)
})

// 响应拦截器

request.interceptors.response.use(function (response) {
  return response
}, function (error) {
  return Promise.reject(error)
})

// 导出request
export default request
