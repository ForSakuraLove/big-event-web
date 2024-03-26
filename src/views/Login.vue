<script setup>
import { User, Lock } from '@element-plus/icons-vue'
import { ref } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user.js'
import { ElMessage } from 'element-plus'
import { useRouter } from 'vue-router'
import { useTokenStore } from '@/stores/token.js'
import { GITHUB_LOGIN_URL } from '@/config/config.js'
import { getCookieValue } from '@/common/cookie.js'

const router = useRouter()

//控制注册与登录表单的显示， 默认显示注册
const isRegister = ref(false)

const registerData = ref({
    username: '',
    password: '',
    rePassword: ''
})

const checkRePassword = (rule, value, callback) => {

    if (value === '') {
        callback(new Error('密码不能为空'))
    } else if (value !== registerData.value.password) {
        callback(new Error('请确保两次输入的密码一致'))
    } else {
        callback()
    }

}

const rules = {
    username: [
        { required: true, message: '请输入用户名', trigger: 'blur' },
        { min: 5, max: 16, message: '用户名长度在5到16位之间', trigger: 'blur' },
    ],
    password: [
        { required: true, message: '请输入密码', trigger: 'blur' },
        { min: 5, max: 16, message: '密码长度在5到16位之间', trigger: 'blur' },
    ],
    rePassword: [
        { validator: checkRePassword, trigger: 'blur' }
    ]
}

const register = async () => {
    let valid = validateForm()
    if (valid) {
        await userRegisterService(registerData.value)
        ElMessage.success('注册成功')
    }
}

const tokenStore = useTokenStore()

const login = async () => {
    const valid = validateForm()
    if (valid) {
        await userLoginService(registerData.value)
        ElMessage.success('登录成功')
        const token = getCookieValue("token");
        tokenStore.setToken(token)
        router.push('/')
    }
}

const clearRegisterData = () => {
    registerData.value = {
        username: '',
        password: '',
        rePassword: ''
    }
}

// 校验函数
const validateForm = () => {
    const formData = registerData.value
    let isValid = true;
    for (let field in rules) {
        // 登录场景不校验确认密码
        if (!isRegister.value && field === 'rePassword') {
            continue;
        }

        for (let rule of rules[field]) {
            if (rule.required && (!formData[field] || formData[field].trim() === '')) {
                ElMessage.error(rule.message)
                return false; // 校验失败
            }
            if (rule.min && formData[field] && formData[field].length < rule.min) {
                ElMessage.error(rule.message)
                return false; // 校验失败
            }
            if (rule.max && formData[field] && formData[field].length > rule.max) {
                ElMessage.error(rule.message)
                return false; // 校验失败
            }
            if (field === 'rePassword') {
                rule.validator(rule, formData[field], (error) => {
                    // 如果校验失败，输出错误消息并返回 false
                    if (error) {
                        ElMessage.error(error.message);
                        isValid = false;
                        return false;
                    }
                });
            }
        }
        if (!isValid) {
            return false;
        }
    }
    return true; // 校验通过
}

const options = {
    fpsLimit: 60,
    interactivity: {
        events: {
            onClick: {
                enable: true,
                mode: 'push' // 可用的click模式有: "push", "remove", "repulse", "bubble"。
            },
            onHover: {
                enable: true,
                mode: 'grab' // 可用的hover模式有: "grab", "repulse", "bubble"。
            },
            resize: true
        },
        modes: {
            bubble: {
                distance: 400,
                duration: 2,
                opacity: 0.5,
                size: 40
            },
            push: {
                quantity: 4
            },
            repulse: {
                distance: 200,
                duration: 0.4
            }
        }
    },
    particles: {
        color: {
            value: '#dedede'
        },
        links: {
            color: '#dedede', // '#dedede'。线条颜色。
            distance: 140, // 线条长度
            enable: true, // 是否有线条
            opacity: 0.6, // 线条透明度。
            width: 1// 线条宽度。
        },
        collisions: {
            enable: false
        },
        move: {
            direction: 'none',
            enable: true,
            outMode: 'bounce',
            random: false,
            speed: 2, // 粒子运动速度。
            straight: false
        },
        number: {
            density: {
                enable: true,
                area: 800
            },
            value: 100// 粒子数量。
        },
        opacity: {
            value: 0.7// 粒子透明度。
        },
        shape: {
            type: 'circle' // 可用的粒子外观类型有："circle","edge","triangle", "polygon","star"
        },
        size: {
            random: true,
            value: 5
        }
    },
    detectRetina: true
}

const redirectToGitHubLogin = async () => {
    tokenStore.removeToken()
    const githubLoginUrl = GITHUB_LOGIN_URL;
    window.location.href = githubLoginUrl;
}

</script>

<template>
    <Particles id="tsparticles" class="particles" :options="options" />
    <el-row class="login-page">
        <el-col :span="6" :offset="15" class="form">
            <!-- 注册表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-if="isRegister" :model="registerData" :rules="rules">
                <el-form-item>
                    <h1 style="margin-left: 40%;">注册</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item prop="rePassword">
                    <el-input :prefix-icon="Lock" type="password" placeholder="请输入再次密码"
                        v-model="registerData.rePassword"></el-input>
                </el-form-item>
                <!-- 注册按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="register">
                        注册
                    </el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <el-link type="info" :underline="false" @click="clearRegisterData(); isRegister = false">
                        ← 返回
                    </el-link>
                </el-form-item>
            </el-form>
            <!-- 登录表单 -->
            <el-form ref="form" size="large" autocomplete="off" v-else :model="registerData" :rules="rules">
                <el-form-item>
                    <h1 style="margin-left: 40%;">登录</h1>
                </el-form-item>
                <el-form-item prop="username">
                    <el-input :prefix-icon="User" placeholder="请输入用户名" v-model="registerData.username"></el-input>
                </el-form-item>
                <el-form-item prop="password">
                    <el-input name="password" :prefix-icon="Lock" type="password" placeholder="请输入密码"
                        v-model="registerData.password"></el-input>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-checkbox>记住我</el-checkbox>
                        <el-link type="primary" style="margin-right: 5%;" :underline="false">忘记密码？</el-link>
                    </div>
                </el-form-item>
                <!-- 登录按钮 -->
                <el-form-item>
                    <el-button class="button" type="primary" auto-insert-space @click="login">登录</el-button>
                </el-form-item>
                <el-form-item class="flex">
                    <div class="flex">
                        <el-link type="info" style="margin-left: 3%;" :underline="false"
                            @click="clearRegisterData(); isRegister = true">
                            注册 →
                        </el-link>
                        <svg @click="redirectToGitHubLogin" t="1710727200464" class="githubIcon" viewBox="0 0 1024 1024"
                            version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="1583" width="200" height="200">
                            <path
                                d="M512 42.666667A464.64 464.64 0 0 0 42.666667 502.186667 460.373333 460.373333 0 0 0 363.52 938.666667c23.466667 4.266667 32-9.813333 32-22.186667v-78.08c-130.56 27.733333-158.293333-61.44-158.293333-61.44a122.026667 122.026667 0 0 0-52.053334-67.413333c-42.666667-28.16 3.413333-27.733333 3.413334-27.733334a98.56 98.56 0 0 1 71.68 47.36 101.12 101.12 0 0 0 136.533333 37.973334 99.413333 99.413333 0 0 1 29.866667-61.44c-104.106667-11.52-213.333333-50.773333-213.333334-226.986667a177.066667 177.066667 0 0 1 47.36-124.16 161.28 161.28 0 0 1 4.693334-121.173333s39.68-12.373333 128 46.933333a455.68 455.68 0 0 1 234.666666 0c89.6-59.306667 128-46.933333 128-46.933333a161.28 161.28 0 0 1 4.693334 121.173333A177.066667 177.066667 0 0 1 810.666667 477.866667c0 176.64-110.08 215.466667-213.333334 226.986666a106.666667 106.666667 0 0 1 32 85.333334v125.866666c0 14.933333 8.533333 26.88 32 22.186667A460.8 460.8 0 0 0 981.333333 502.186667 464.64 464.64 0 0 0 512 42.666667"
                                fill="#231F20" p-id="1584"></path>
                        </svg>
                    </div>
                </el-form-item>
            </el-form>
        </el-col>
    </el-row>
</template>

<style lang="scss" scoped>
/* 样式 */
.login-page {
    height: 100vh;
    display: flex;
    align-items: center;

    .form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        user-select: none;
        background: rgba(255, 255, 255, 0.7);
        border-radius: 10px;

        .title {
            margin: 0 auto;
        }

        .button {
            width: 90%;
            margin-left: 5%;
        }

        .el-input {
            width: calc(100% - 20px);
            margin: 10px;
        }

        .flex {
            width: 100%;
            display: flex;
            justify-content: space-between;
            padding: 0 2%;

            .githubIcon {
                width: 8%;
                height: 8%;
                margin-right: 8%;
                cursor: pointer;
            }
        }
    }
}

.particles {
    height: 100%;
    width: 100%;
    background-size: cover;
    background-repeat: no-repeat;
    background-image: url('/src/assets/beach.jpg');
    opacity: 0.9;
    position: fixed;
    pointer-events: none;
}
</style>