import { createStore } from "vuex";
export default createStore({
    state: {
        tabList: localStorage.getItem('tabList') ? JSON.parse(localStorage.getItem('tabList')) : []
    },
    mutations: {
        setTabList(state, payload) {
            state.tabList = payload;
            localStorage.setItem("tabList", JSON.stringify(payload));
        },
        clearTabList() {
            localStorage.removeItem("tabList");
        },
    },
    modules: {},
})
