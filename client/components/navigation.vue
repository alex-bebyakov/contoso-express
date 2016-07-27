<template>
    <nav class="navbar navbar-inverse navbar-fixed-top">
        <div class="container">
            <div class="navbar-header">
                <a class="navbar-brand navbar-brand" href="/">Contoso University</a>

                <button type="button" class="navbar-toggle collapsed">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span><span class="icon-bar"></span>
                </button>
            </div>

            <div class="navbar-collapse collapse">
                <ul class="nav navbar-nav">
                    <li role="presentation" class="active">
                        <a v-link="{ name: 'home'}" class="nav">Home</a>
                    </li>
                    <li role="presentation">
                        <a v-link="{ name: 'about'}" class="nav">About</a>
                    </li>
                </ul>

                <ul class="nav navbar-nav navbar-right">
                    <li role="presentation" class="">
                        <a href="/logout">LogOut <i class="fa fa-sign-out fa-lg"></i></a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>
<style lang="less" rel="stylesheet/less">

</style>
<script></script>