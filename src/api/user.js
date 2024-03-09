import request from '@/util/request.js'

export const userRegisterService = (registerData) => {
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post('/user/register', params)
}

export function userLoginService(registerData) {
    const params = new URLSearchParams()
    for (let key in registerData) {
        params.append(key, registerData[key])
    }
    return request.post('/user/login', params)
}

export function userInfoService() {
    return request.get('/user/userInfo')
}

export function userUpdateService(userInfoData) {
    return request.put('/user/update', userInfoData)
}