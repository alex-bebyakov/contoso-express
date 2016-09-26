<template>
    <tr :class="{'success': active}">
        <td>{{instructor.lastName}}</td>
        <td>{{instructor.firstName}}</td>
        <td>{{hireDateDisplay}}</td>
        <td>{{office}}</td>
        <td>
            <div v-for="course in instructor.courses">{{course.number}}&nbsp;{{course.title}}</div>
        </td>
        <td class="tools">
            <a href="#" @click="selectInstructor"><i class="fa fa-hand-o-up fa-lg"></i></a>

            <a href="#" v-if="isEditable" @click="showEdit"><i class="fa fa-pencil fa-lg"></i></a>

            <a href="#" @click="showDetails"><i class="fa fa-info fa-lg"></i></a>

            <a href="#" v-if="isEditable" @click="deleteInstructor"><i class="fa fa-trash-o fa-lg"></i></a>
        </td>
    </tr>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script lang="ts" src="./instructorRow.vue.ts"></script>