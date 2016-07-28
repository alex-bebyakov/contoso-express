<template>
    <table class="table">
        <thead>
            <tr>
                <th>Number</th>
                <th>Title</th>
                <th>Credits</th>
                <th>Department</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr is="course-row" v-for="course in courses" :course="course"
                :delete-course-action="deleteCourseAction"></tr>
        </tbody>
    </table>

    <simple-confirm :show.sync="showConfirm" :confirm-action.sync="confirmAction"></simple-confirm>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="ts" src="./coursesList.vue.ts"></script>