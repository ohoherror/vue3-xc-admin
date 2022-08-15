<template>
    <div>
        <!-- 列表 -->
        <listTable pageKey="userApply">
            <template v-slot:operation="scope">
                <el-button type="primary">Primary</el-button>
            </template>
            <template v-slot:operationRow="scope">
                <el-button type="primary">Primary</el-button>
            </template>
        </listTable>
        <!-- 详情 -->
    </div>

</template>

<script setup >
import listTable from '@/views/listTable/listTable.vue'

function exportList(scope) {
    console.log(scope)
}
function viewPage(scope) {
    console.log(scope)
}


</script>