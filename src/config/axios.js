import { baseUrl } from './env'
import axios from 'axios'
import Qs from 'qs'
axios.defaults.timeout = 60000 // 设置请求时间
axios.defaults.baseURL = baseUrl// 设置默认接口地址
axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded;charset=UTF-8'
axios.defaults.headers.post['X-Requested-With'] = 'XMLHttpRequest'

// POST传参序列化
axios.interceptors.request.use((config) => {
  if (config.method === 'post') {
    config.data = Qs.stringify(config.data)
  }
  return config
}, (error) => {
  return Promise.reject(error)
})

export function fetch (url, params = {}) {
  return new Promise((resolve, reject) => {
    axios.get(url, {
      params: params
    })
      .then(response => {
        resolve(response.data)
      })
      .catch(err => {
        reject(err)
      })
  })
}

export function post (url, data = {}, config = {}) {
  return new Promise((resolve, reject) => {
    axios.post(url, data, config)
      .then(response => {
        resolve(response.data)
      }, err => {
        reject(err)
      })
  })
}
