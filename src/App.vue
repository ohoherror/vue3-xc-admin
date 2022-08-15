<template>
  <div id="app">
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <div v-if="state.showMenu">
      <el-container>
        <el-aside width="200px">
          <leftNav></leftNav>
        </el-aside>
        <el-container>
          <el-header v-if="state.currentPath !== '/login' && state.currentPath !== 'home'">
            <topNav></topNav>
          </el-header>
          <el-main class="mt-20">
            <router-view v-slot="{ Component, route }">
              <keep-alive>
                <component :is="Component" v-if="(route.meta && route.meta.keepAlive)" :key="router.name" />
              </keep-alive>
              <component :is="Component" :key="router.name" v-if="!(route.meta && route.meta.keepAlive)" />
            </router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { onUnmounted, reactive, defineComponent } from 'vue'
import { localGet } from './utils'
import leftNav from './components/layout/leftNav.vue';
import topNav from './components/layout/topNav.vue';

const router = useRouter()
const state = reactive({
  showMenu: true,
  currentPath: 'home'
})
const noMenu = ['/login']
onUnmounted(() => {
  unwatch()
})
// 监听浏览器原生回退事件
if (window.history && window.history.pushState) {
  history.pushState(null, null, document.URL);
  window.addEventListener('popstate', () => {
    if (!localGet('token')) {
      state.showMenu = false
    }
  }, false);
}
const unwatch = router.beforeEach((to, from, next) => {
  console.log(to + "to")
  if (to.path == '/login') {
    // 如果路径是 /login 则正常执行
    next()
  } else {
    // 如果不是 /login，判断是否有 token
    if (!localGet('token')) {
      // 如果没有，则跳至登录页面
      next({ path: '/login' })
    } else {
      // 否则继续执行
      next()
    }
  }
  state.showMenu = !noMenu.includes(to.path)
  state.currentPath = to.path
  console.log(state.currentPath)
  // document.title = pathMap[to.name]
})
</script>
