<template>
    <li :class="{'active': active, 'disabled': disabled}">
        <a role="button" href="" @click.prevent="handleClick">
            <slot></slot>
        </a>
    </li>
</template>
<style>
</style>
<script lang="ts" src="./paginationButton.vue.ts"></script>