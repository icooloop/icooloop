<template>
    <div>
        <Header :pageInfo="pageInfo"></Header> 
        <Content :pageInfo="pageInfo"></Content> 
    </div>
</template>

<script>
import {mapState} from 'vuex'
import Header from '@/components/include/Header'
import LoginFooter from '@/components/include/LoginFooter'

export default {
    components:{
        Header,
        Content
    },
    data() {
        return {
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
                ifAccess:true
            }
        }
    },
    computed: {
        ...mapState(['loginInfo'])
    },
 }
</script>

<style scoped>
</style>