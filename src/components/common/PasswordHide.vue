<template>
    <div class="m-passwordHide" style=""><input type="password" autocomplete="off" class="passwordhide"></div>
</template>
<style scoped>
.m-passwordhide{display:inline-block;width:0;height:0;}
.m-passwordhide >>> .passwordhide{position:fixed;left:-10000px;top:-10000px;z-index:-100;opacity:0;}
</style>