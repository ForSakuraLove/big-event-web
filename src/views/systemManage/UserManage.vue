<script setup>
import { getAllUsersService, } from '@/api/systemManage.js'
const getAllUsers = async () => {
    await getAllUsersService()
}
getAllUsers()
</script>
<template>
    用户管理
</template>