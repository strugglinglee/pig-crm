import axios from 'axios'

const siteMap = {
}

const baseURL = siteMap[location.host] || 'http://localhost:3000' // api地址

// 创建 axios 实例
const service = axios.create({
  baseURL,
  timeout: 6000 // 请求超时时间
})

export default service
