import axios from 'axios'
import { ElMessage } from 'element-plus'
import router from '../router'
import { localGet, getCookie } from './index'
import config from '../../config'


console.log(import.meta.env.MODE)
axios.defaults.baseURL = config[import.meta.env.MODE].baseUrl
// 携带 cookie，对目前的项目没有什么作用，因为我们是 token 鉴权
axios.defaults.withCredentials = true

axios.interceptors.request.use(config => {
    config.headers['token'] = localGet('token') || '' // 请求头带上token
    config.headers['appid'] = getCookie('appid') || ''
    config.headers['Content-Type'] = 'application/json; charset=utf-8'
    return config
}, error => {
    return Promise.reject(error)
})

// 请求拦截器，内部根据返回值，重新组装，统一管理。
axios.interceptors.response.use(res => {
    if (res.status != 200) {
        if (res.message) ElMessage.error(res.message)
        if (res.code == 419) {
            router.push({ path: '/login' })
        }
        return Promise.reject(res.data)
    }

    return res.data
})

export default axios