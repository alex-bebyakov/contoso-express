<template>
    <table class="table">
        <thead>
            <tr>
                <th>Name</th>
                <th>Budget</th>
                <th>Start Date</th>
                <th>Administrator</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr is="department-row" v-for="department in departments" :department="department"
                :delete-department-action="deleteDepartmentAction"></tr>
        </tbody>
    </table>

    <simple-confirm :show.sync="showConfirm" :confirm-action.sync="confirmAction"></simple-confirm>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="awesome-typescript" src="./departmentsList.vue.ts"></script>