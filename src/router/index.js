import { createRouter, createWebHistory } from 'vue-router'
import LoginVue from '@/views/Login.vue';
import LayoutVue from '@/views/Layout.vue';

import ArticleCategoryVue from '@/views/article/ArticleCategory.vue'
import ArticleManageVue from '@/views/article/ArticleManage.vue'
import UserAvatarVue from '@/views/user/UserAvatar.vue'
import UserInfoVue from '@/views/user/UserInfo.vue'
import UserResetPasswordVue from '@/views/user/UserResetPassword.vue'
import UserManageVue from '@/views/systemManage/UserManage.vue'
import RoleManageVue from '@/views/systemManage/RoleManage.vue'
import MenuManageVue from '@/views/systemManage/MenuManage.vue'

const routes = [
    { path: '/login', component: LoginVue },
    {
        path: '/',
        component: LayoutVue,
        redirect: 'article/category',
        children: [
            { path: 'article/category', component: ArticleCategoryVue },
            { path: 'article/manage', component: ArticleManageVue },
        ]
    },
    {
        path: '/user',
        component: LayoutVue,
        redirect: '/avatar',
        children: [
            { path: 'avatar', component: UserAvatarVue },
            { path: 'info', component: UserInfoVue },
            { path: 'resetPassword', component: UserResetPasswordVue },
        ]
    },
    {
        path: '/systemManage',
        component: LayoutVue,
        redirect: '/userManage',
        children: [
            { path: 'userManage', component: UserManageVue },
            { path: 'roleManage', component: RoleManageVue },
            { path: 'menuManage', component: MenuManageVue },
        ]
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes: routes
})

export default router;