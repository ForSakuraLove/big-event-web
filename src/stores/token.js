import { defineStore } from "pinia";
import { ref } from 'vue'
/*

    第一个参数：名字，唯一性！
    第二个参数：函数，函数内部定义所有内容

    返回值：函数

 */

export const useTokenStore = defineStore('token', () => {
    //定义响应式变量
    const token = ref('')

    const setToken = (newToken) => {
        token.value = newToken
    }

    const removeToken = () => {
        token.value = ''
    }

    return {
        token,
        setToken,
        removeToken
    }
},{
    persist: true,
})