<template>
    <el-form :model="form" label-width="120px" class="form">
        <el-form-item label="用户名">
            <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="密码">
            <el-input v-model="form.password" />
        </el-form-item>
        <el-form-item label="验证码">
            <div class="flex">
                <el-input v-model="form.captcha" class="pr-10 " />
            </div>
            <img :src="captchaPath" @click="getCaptcha()" alt="" />
        </el-form-item>
        <el-form-item>
            <el-button type="primary" @click="onSubmit">登录</el-button>
        </el-form-item>
    </el-form>
</template>

<script lang="ts" setup>
import { getUUID, baseUrl, localSet, setCookie } from "../utils";
import { reactive, ref, onMounted } from 'vue'
import loginApi from '../api/loginApi'
import router from "../router";
import { ElMessage } from 'element-plus'
// do not use same name with ref
const form = reactive({
    username: '',
    password: '',
    captcha: '',
    uuid: '',

})

let captchaPath = ref('')

onMounted(() => {
    getCaptcha()
})

const getCaptcha = () => {
    form.uuid = getUUID()
    captchaPath.value = `${baseUrl}/captcha?uuid=${form.uuid}`
    console.log(captchaPath.value)
}
const onSubmit = () => {
    loginApi.login(form).then((res: any) => {
        console.log(res)
        if (res.code === 200) {
            console.log(res.token)
            localSet("token", res.token)
            setCookie("token", res.token, 7)
            setCookie("appid", 'wx7d98ec3d5e134c2d', 7)
            router.push({ path: './' })
        } else {
            ElMessage.error('Oops, this is a error message.')
        }
    })
}
</script>

<style lang="scss" scoped>
.form {
    height: 100Vh;
    display: flex;
    margin: 300px auto;
    flex-direction: column;
    width: 600px;
    text-align: center;
}
</style>