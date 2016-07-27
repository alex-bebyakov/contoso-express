<template>
    <table class="table">
        <thead>
            <tr>
                <th>
                    <a href="#" value="name">Last Name</a>
                </th>
                <th>First Name</th>
                <th>
                    <a href="#" value="date">Enrollment Date</a>
                </th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr is="student-row" v-for="student in students" :student="student"
                :delete-student-action="deleteStudentAction" :student-details-action="studentDetailsAction"></tr>
        </tbody>
    </table>

    <simple-confirm :show.sync="showConfirm" :confirm-action.sync="confirmAction"></simple-confirm>
    <student-details :student="student" :show.sync="showDetailsModal"></student-details>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="ts" src="./studentsList.vue.ts"></script>