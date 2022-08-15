<template>
    <template v-for="item in arrList">
        <el-menu-item v-if='!item.children' @click="toMenu(item)" :key="'/' + item.url" :index="'/' + item.url">
            <span>{{ item.name }}</span>
        </el-menu-item>
        <el-sub-menu :index="item.menuId.toString()" v-else>
            <template #title><span>{{ item.name }}</span></template>
            <menu-item :arrList="item.children" @toMenu="toMenu"></menu-item>
        </el-sub-menu>
    </template>
</template>

<script  setup>
import { pathArr } from '@/router/routes'
import menuItem from './menuItem.vue'
import { useRouter } from 'vue-router'
import { useStore } from 'vuex';
import { defineEmits } from 'vue'

const props = defineProps({
    arrList: Array,
});
const router = useRouter()

const emit = defineEmits(["toMenu"])
let store = useStore()

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
</script>