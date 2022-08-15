<template>
    <el-row>
        <el-col :span="24">
            <el-button @click="loginOut" class="float-right mb-10 ">退出</el-button>
        </el-col>
        <el-col :span="24">
            <el-tabs @tab-click="handleClick" v-model="editableTabsValue" closable type="card" class="demo-tabs"
                @tab-remove="removeTab">
                <el-tab-pane v-for="item in editableTabs" :key="item.menuId" :label="item.name" :name="item.name">
                </el-tab-pane>
            </el-tabs>
        </el-col>
    </el-row>
</template>

<script lang="ts" setup>
import { onMounted, ref, computed, watch } from 'vue'
import { toRaw } from '@vue/reactivity'
import { useStore } from 'vuex';
import { useRouter, onBeforeRouteUpdate } from 'vue-router'
import { localRemove } from "../../utils";

const router = useRouter()
let store = useStore()
const editableTabsValue = ref()
const editableTabs = ref<any[]>([])

//路由监听
watch(() => router.currentRoute.value.path, (newValue, oldValue) => {
    console.log('watch', newValue);
    editableTabs.value = toRaw(store.state.tabList)
    const tabs = editableTabs.value as any[]
    tabs.forEach((tab, index) => {
        let path = '/' + tab.url
        if (path === newValue) {
            editableTabsValue.value = tab.name
        }
    })
}, { immediate: true })


const handleClick = (tab: any, event: Event) => {
    let name = toRaw(tab.props).name
    let list = toRaw(store.state.tabList)
    let path
    // console.log(name)
    list.map(ele => {
        if (ele.name === name) {
            path = '/' + ele.url
        }
    })
    router.push({ path: path })
}

//删除tab页时，也换页面，如果没有tab了，就展示为空
const removeTab = (targetName: string) => {
    const tabs = editableTabs.value as any[]
    let activeName = editableTabsValue.value
    if (activeName === targetName && tabs.length > 1) {
        tabs.forEach((tab, index) => {
            if (tab.name === targetName) {
                const nextTab = tabs[index + 1] || tabs[index - 1]
                if (nextTab) {
                    activeName = nextTab.name
                    router.push({ path: '/' + nextTab.url })
                }

            }
        })
    } else if (tabs.length === 1) {
        router.push({ name: 'home' })
    }
    let arr = toRaw(store.state.tabList)

    arr = arr.filter((ele: any) => {
        return ele.name !== targetName
    })
    editableTabs.value = arr
    store.commit('setTabList', arr)
    editableTabsValue.value = activeName
}

const loginOut = () => {
    localRemove('token')
    store.commit('setTabList', [])
    router.push({ path: '/login' })
}
</script>

<style>
.demo-tabs>.el-tabs__content {
    padding: 32px;
    color: #6b778c;
    font-size: 32px;
    font-weight: 600;
}
</style>