<template>
    <el-row class="">
        <el-col>
            <el-menu :collapse="isCollapse" class="el-menu-vertical-demo" :default-active="curPath" @open="handleOpen"
                @close="handleClose">
                <el-sub-menu v-for="item in menuList" :key="item.menuId" :index="item.menuId.toString()">
                    <template #title>
                        <span>{{ item.name }}</span>
                    </template>
                    <!-- 此处调用menu-item组件 -->
                    <menu-item :arrList="item.children"></menu-item>
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
import { toRaw } from '@vue/reactivity'
import { listMenu } from '../../../config/menu'
import menuItem from './menuItem.vue'

const router = useRouter()
const menuList = ref([])

let curPath = ref()
const isCollapse = ref(false)
onMounted(() => {
    if (router.name !== 'login') {
        getNav()
    }

})
//路由监听
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
    curPath.value = newValue
}, { immediate: true })


const handleOpen = () => {

}
const handleClose = () => {

}
const getNav = () => {
    menuList.value = listMenu
}
</script>