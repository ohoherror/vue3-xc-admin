const routes = [
    { path: '/login', name: 'login', component: () => import('../views/login.vue') },
    {
        path: '/', name: 'home', component: () => import('../views/Home.vue'),
    },
    { path: '/about', name: 'about', component: () => import('../views/About.vue') },
    {
        name: 'sys-menu',
        path: '/sys/menu',
        component: () => import('../views/sys/menu.vue'),
        meta: {
            title: '菜单管理',
            keepAlive: true,
        },
    },
    {
        name: 'sys-role',
        path: '/sys/role',
        component: () => import('../views/sys/role.vue'),
        meta: {
            title: '角色权限',
            keepAlive: false,
        },
    }

]

let pathList = []
function getPathList(arr) {
    arr.map(ele => {
        if (ele.children) {
            getPathList(ele.children)
        } else {
            if (!pathList.includes(ele.path)) {
                pathList.push(ele.path)
            }
        }
    })
    return pathList
}

export function pathArr() {
    return getPathList(routes)
}

export default routes