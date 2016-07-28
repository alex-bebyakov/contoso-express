<template>
    <div class="container">
        <h2>Students</h2>
        <a href="#" @click="showAdd">Create New</a>

        <students-list></students-list>
        <student-save :student="student" :show.sync="showAddModal"></student-save>
    </div>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="awesome-typescript" src="./students.vue.ts"></script>