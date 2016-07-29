<template>
    <li :class="{'active': active, 'disabled': disabled}">
        <a role="button" href="" @click.prevent="handleClick">
            <slot></slot>
        </a>
    </li>
</template>
<style>
</style>
<script lang="awesome-typescript" src="./paginationButton.vue.ts"></script>