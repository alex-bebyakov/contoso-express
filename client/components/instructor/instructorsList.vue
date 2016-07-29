<template>
    <table class="table">
        <thead>
            <tr>
                <th>Last Name</th>
                <th>First Name</th>
                <th>Hire Date</th>
                <th>Office</th>
                <th>Courses</th>
                <th></th>
            </tr>
        </thead>
        <tbody>
            <tr is="instructor-row" v-for="instructor in instructors" :instructor="instructor"
                :selected-instructor-id="selectedInstructorId" :select-instructor-action="selectInstructorAction"></tr>
        </tbody>
    </table>

    <instructor-courses-list :show.sync="selectInstructorVisible" :instructor="instructor"
                             :select-course-action="selectCourseAction" :selected-course-id="selectedCourseId">
    </instructor-courses-list>

    <instructor-students-list :show.sync="selectCourseVisible" :selected-course-id="selectedCourseId"></instructor-students-list>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="awesome-typescript" src="./instructorsList.vue.ts"></script>