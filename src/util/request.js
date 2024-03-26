import axios from 'axios';
const baseURL = '/api';
const instance = axios.create({ baseURL })
import { ElMessage } from 'element-plus'
import { useTokenStore } from '@/stores/token.js';
import router from '@/router';
import { getCookieValue } from '@/common/cookie.js'

//添加响应拦截器
instance.interceptors.response.use(
    result => {
        if (result.data.code === 200) {
            return result.data;
        } else if (result.data.code === 405) {
            router.push('/')
        }
        ElMessage.error(result.data.message ? result.data.message : '服务异常')
        return Promise.reject(err)
    },
    err => {
        if (err.response.status === 401) {
            ElMessage.error('请先登录')
            router.push('/login')
        }
        ElMessage.error('服务异常');
        return Promise.reject(err);//异步的状态转化成失败的状态
    }
)

//添加请求拦截器
instance.interceptors.request.use(
    (config) => {
        const tokenStore = useTokenStore()
        if (tokenStore.token) {
            config.headers.Authorization = tokenStore.token
        }else {
            const token = getCookieValue("token");
            if(token) {
                tokenStore.setToken(token)
                config.headers.Authorization = tokenStore.token
            }
        }
        return config
    },
    (err) => {
        Promise.reject(err);
    }
)

export default instance;