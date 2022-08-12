<template>
    <el-row class="">
        <el-col>
            <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" :default-active="curPath" @open="handleOpen"
                @close="handleClose">
                <el-sub-menu v-for="item in menuList" :key="item.menuId" :index="item.menuId.toString()">
                    <template #title>
                        <el-icon>
                            <!-- <location /> -->
                        </el-icon>
                        <span>{{ item.name }}</span>
                    </template>
                    <el-menu-item v-for="subItem in item.list" @click="toMenu(subItem)" :key="'/' + subItem.url"
                        :index="'/' + subItem.url">
                        <span>{{ subItem.name }}</span>
                    </el-menu-item>
                </el-sub-menu>
            </el-menu>
        </el-col>
    </el-row>
</template>

<script  setup>
import { reactive, ref, onMounted, watch } from 'vue'
import navApi from '@/api/navApi'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { pathArr } from '@/router/routes'
import { ElMessage } from 'element-plus'
import { toRaw } from '@vue/reactivity'

const router = useRouter()
const menuList = ref([])

let curPath = ref()
const isCollapse = ref(false)
onMounted(() => {

    if (router.name !== 'login') {
        getNav()
    }

})
let store = useStore()
//路由监听
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
    curPath.value = newValue
}, { immediate: true })


const toMenu = (ele) => {
    let checkedList = store.state.tabList
    console.log(checkedList)
    if (pathArr().includes('/' + ele.url)) {
        let ids = checkedList.map(ele => ele.menuId)
        if (!ids.includes(ele.menuId)) {
            checkedList.push(ele)
        }
        store.commit('setTabList', checkedList)
        router.push({ path: '/' + ele.url })
    } else {
        ElMessage.error('暂无组件')
    }
}
const handleOpen = () => {

}
const handleClose = () => {

}
const getNav = () => {
    let t = new Date().getTime()
    navApi.nav(t).then(res => {
        menuList.value = res.menuList
        if (res.code === 401) {
            router.push({ path: 'login' })
        }
    })
}
</script>