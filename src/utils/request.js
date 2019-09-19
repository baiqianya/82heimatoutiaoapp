import axios from 'axios' // 引入axios
import JSONbig from 'json-bigint' // 引入json-bigint

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

// 导出request
export default request
