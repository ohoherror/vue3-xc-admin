<template>
    <div>
        <div>
            <el-form :inline="true" :model="dataForm" @keyup.enter.native="getDataList()" label-width="120px">
                <el-form-item v-for="itemSerach in serachList" :label="itemSerach.name" :key="itemSerach.serachKey">
                    <el-input clearable v-if="isInput(itemSerach)" v-model="dataForm[itemSerach.serachKey]"></el-input>
                    <el-date-picker v-else-if="isDate(itemSerach)" v-model="dataForm[itemSerach.serachKey]" clearable
                        type="datetimerange" format="yyyy-MM-dd HH:mm:ss" value-format="yyyy-MM-dd HH:mm:ss"
                        @change="getTimer(itemSerach)" range-separator="至" start-placeholder="开始日期"
                        end-placeholder="结束日期">
                    </el-date-picker>
                    <el-select v-else-if="isSelect(itemSerach)" v-model="dataForm[itemSerach.serachKey]">
                        <el-option v-for="itemOption in itemSerach.formateList" :key="itemOption.key"
                            :label="itemOption.name" :value="itemOption.key"></el-option>
                    </el-select>
                </el-form-item>
                <div style="padding-right:100px;float: right; " v-if="serachList.length > 0">
                    <el-button @click="
    dataForm.page = 1;
getDataList();
                    ">查询</el-button>
                    <el-button @click="getClear()">清空</el-button>
                </div>
            </el-form>
            <div style="padding:20px 0">
                <!-- 操作 -->
                <slot name="operation" :dataForm="dataForm" :dataListSelections="dataListSelections"></slot>
            </div>
            <el-table height="600" class="font-normal" :data="dataList" border @selection-change="handleSelectionChange"
                style="width: 100%">
                <el-table-column type="selection" width="55" />
                <!-- <el-table-column type="selection" :key="Math.random()" v-if="pageConfig.hasSelect" header-align="center"
                    align="center" width="50" :selectable="selected">
                </el-table-column> -->
                <el-table-column type="index" width="70" align="center" label="编号">
                </el-table-column>
                <el-table-column v-for="itemTable in pageConfig.tableList" :key="itemTable.tableKey"
                    :label="itemTable.name" :formatter="valueFormat" :prop="itemTable.tableKey" header-align="center"
                    align="center" :width="itemTable.width">
                </el-table-column>
                <el-table-column v-if="!pageConfig.noOperation" fixed="right" header-align="center" align="center"
                    width="220" label="操作">
                    <!-- 操作行 -->
                    <template #default="scope">
                        <slot name="operationRow" :scope="scope"></slot>
                    </template>
                </el-table-column>
            </el-table>
            <el-pagination v-model:currentPage="dataForm.page" v-model:page-size="dataForm.limit"
                :page-sizes="[50, 100, 200, 300, 400]" layout="total, prev, pager, next" :total="totalCount"
                @size-change="sizeChangeHandle" @current-change="currentChangeHandle" />
        </div>
    </div>
</template>

<script setup lang="ts" >
import { config } from './config'
import { onMounted, ref, computed, watch, reactive } from 'vue'
import { toRaw } from '@vue/reactivity'
import { useStore } from 'vuex';
import { useRouter, onBeforeRouteUpdate } from 'vue-router'

const props = defineProps({
    pageKey: String,
});

const pageKey = ref(props.pageKey)

onMounted(() => {
    initConfig()

})
const dataForm = reactive({
    page: 1,
    limit: 10,
})

const pageConfig: any = reactive({})
const serachList: any = reactive([])
const dataListSelections: any = reactive([])
const dataListLoading = ref(false)
const dataList = ref([])
const totalCount = ref()

function initConfig() {
    for (let key in config[pageKey.value]) {
        pageConfig[key] = config[pageKey.value][key]
    }
    let arr: any[] = []
    //搜索项
    arr = pageConfig.tableList.filter((ele) => {
        return ele.serach
    })
    // 初始化搜索key
    arr.map(ele => {
        dataForm[ele.serachKey] = ''

        //日历搜索框
        if (ele.serachKey1) {
            dataForm[ele.serachKey1] = ''
            dataForm[ele.serachKey2] = ''
        }
    })
    arr.map(ele => {
        serachList.push(ele)
    })
    getDataList()
}
// 获取数据列表
function getDataList() {
    dataListLoading.value = true;
    let obj: any = {};
    //去掉为空的属性
    for (let key in dataForm) {
        if (dataForm[key]) {
            obj[key] = dataForm[key];
        }
    }
    obj.page = obj.page.toString()
    obj.limit = obj.limit.toString()
    pageConfig.listApi(obj).then((data) => {
        if (data && data.code === 200) {

            dataList.value = data?.page?.list || data.data.list;
            totalCount.value = data?.page?.totalCount || data.data.totalCount;
        } else {
            dataList.value = [];
            totalCount.value = 0;
            // $message.error(data.msg);
        }
        dataListLoading.value = false;
    });
}
// input框
function isInput(item) {
    return item.serachType === 'input'
}
// 日期框
function isDate(item) {
    return item.serachType === 'date'
}
// select框
function isSelect(item) {
    return item.serachType === 'select'
}
// 获取row的key值的方法
function getRowKeys(row) {
    return row.id;
}
//格式化 select
function valueFormat(row, column, cellValue) {
    let formatValue = cellValue
    pageConfig.tableList.map(ele => {
        if (ele.serachType === 'select' && row[ele.tableKey] !== undefined && row[ele.tableKey] !== null) {
            ele.formateList.map(item => {
                //多字段影响值
                if (item.mixinKey && item.mixinKey[0] === cellValue && row[item.mixinKey[1]]) {
                    formatValue = item.name
                } else if (item.key === cellValue) {
                    formatValue = item.name
                }
            })
        }
    })
    return formatValue
}
// 清除
function getClear() {
    for (let key in dataForm) {
        if (dataForm[key]) {
            dataForm[key] = "";
        }
    }
    dataForm.page = 1;
    dataForm.limit = 10;
    getDataList();
}
// 清空时间
function getTimer(item) {
    if (!dataForm[item.serachKey]) {
        dataForm[item.serachKey1] = "";
        dataForm[item.serachKey2] = "";
        return;
    }
    dataForm[item.serachKey1] = dataForm[item.serachKey][0];
    dataForm[item.serachKey2] = dataForm[item.serachKey][1];
}
//清空复选框
function clearSelection() {

}
// 每页数
function sizeChangeHandle(val) {
    dataForm.limit = val.toString();
    dataForm.page = 1;
    getDataList();
}
// 当前页
function currentChangeHandle(val) {
    dataForm.page = val.toString();
    getDataList();
}
// 多 选
function handleSelectionChange(val) {
    console.log(val)
    //清空数组
    dataListSelections.length = 0
    dataListSelections.push(val)
    console.log(dataListSelections)
}

//清除复选框
function clearSelectionHandle() {

}

</script>

<style lang="scss" scoped>
body {

    .el-table th.gutter {

        display: table-cell !important;
    }
}
</style>
