import request from '@/util/request.js'

export function getAllUsersService() {
    return request.get('/user/systemManage/getAllUsers')
}