<template>
    <tr>
        <td>{{department.name}}</td>
        <td>{{budgetDisplay}}</td>
        <td>{{startDateDisplay}}</td>
        <td>{{fullName}}</td>
        <td class="tools">
            <a href="#" v-if="isEditable" @click="showEdit"><i class="fa fa-pencil fa-lg"></i></a>

            <a href="#" @click="showDetails"><i class="fa fa-info fa-lg"></i></a>

            <a href="#" v-if="isEditable" @click="deleteDepartment"><i class="fa fa-trash-o fa-lg"></i></a>
        </td>
    </tr>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="ts" src="./departmentRow.vue.ts"></script>