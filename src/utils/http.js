'use strict'
import axios from 'axios'
import router from '../router'

axios.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

axios.interceptors.response.use(response => {
  return response
}, error => {
  return Promise.resolve(error.response)
})

function checkStatus (response) {
  if (response && (response.status === 200 || response.status === 304 || response.status === 400)) {
    return response
  }
  return {
    status: -404,
    msg: '网络异常'
  }
}

function checkCode (res) {
  if (res.status === -404) {
    router.replace({ name: 'error' })
  }
  return res
}
export default {
  post (url, data) {
    return axios({
      method: 'post',
      url: url,
      data: data,
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'Content-Type': 'application/json; charset=UTF-8',
        'key': 1
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }).then(
      (res) => {
        return checkCode(res)
      })
  },
  get (url, params) {
    return axios({
      method: 'get',
      url,
      params, // get 请求时带的参数
      timeout: 10000,
      headers: {
        'X-Requested-With': 'XMLHttpRequest'
      }
    }).then(
      (response) => {
        return checkStatus(response)
      }).then(
      (res) => {
        return checkCode(res)
      })
  }
}
