<template>
    <div class="ma-side">
        <ul>
            <li v-for='item in sideMenus'>
                <router-link :to="item.link" :class="{on:item.onClass}">{{item.name}}</router-link>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props:['sideMenus'],
    data() { 
        return {

        }
    }
 }
</script>

<style scoped>
.ma-side{position:fixed;right:60px;top:200px;background:#fff;z-index:20;border-radius:5px;box-shadow: 0 0 6px rgba(30,30,30,.15);}
.ma-side ul{padding:20px;position:relative;}
.ma-side ul li a{display:block;border-left:1px solid #2e40a9;padding-left:15px;padding-right:10px;line-height:40px;color:#2e40a9;position:relative;white-space:nowrap;}
.ma-side ul li a:before{display:block;content:'';position:absolute;left:-4px;top:16px;width:8px;height:8px;border-radius:8px;background:#2e40a9;}
.ma-side ul li a.on,.ma-side ul li a:hover{color:#00aeef;}
.ma-side ul li a.on:before,.ma-side ul li a:hover:before{background:#00aeef;}
</style>