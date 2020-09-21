<template>
    <a-modal title="意见反馈" :visible="ifShowModal" cancelText="取消" okText="确定"
        @ok="handleOk" @cancel="handleCancel" :maskClosable="false"
        :confirmLoading="confirmLoading">
        <p>{{ModalText}}</p>
        <a-textarea class="mt-10" maxlength="160" placeholder="请留下您的宝贵建议，以便我们改正" :rows="4" v-validate="'required'" name="ModalMsg" v-model="ModalMsg"/>
        <Errortip v-show="errors.has('ModalMsg')" :msg="errors.first('ModalMsg')"></Errortip>
        <a-input class="mt-10" placeholder="请输入您的手机号码" maxlength="11" v-validate="'required|mobile'" name="phone" v-model="phone"
            v-if="!pageInfo.loginInfo.isLogin" oncontextmenu="return false" oncopy="return false" onpaste="return false"/>
        <Errortip v-if="!pageInfo.loginInfo.isLogin && errors.has('phone')" :msg="errors.first('phone')"></Errortip>
    </a-modal>
</template>

<script>
import '@/utils/validate'
import Errortip from '@/components/common/Errortip'
import  { Validator } from "vee-validate";
Validator.localize({
    zh_CN: {
        attributes: {
            phone: "手机号码",
            ModalMsg: "反馈意见"
        }
    }
});
 export default {
    props:['ifShowModal','pageInfo'],
    components:{
        Errortip
    },
    data() {
        return {
            ModalText: '您的反馈对我们至关重要',
            confirmLoading: false,
            phone:'',
            ModalMsg:''
        }
    },
    methods:{
        handleOk(e) {
            this.$validator.validateAll().then((result) => {
                console.log(result)
                if(result){
                    this.confirmLoading = true;
                    this.$post("/help/feedBack",{phone:this.phone,msg:this.ModalMsg})
                    .then((res)=>{
                        let result=JSON.parse(res);
                        if(result.code == "0"){
                            this.$message.info('感谢您的反馈！');
                            this.confirmLoading = false;
                            setTimeout(()=>{
                                this.$emit('changeYJModal',false)
                            },300)
                        }else{
                            this.$message.error(result.msg);
                            this.confirmLoading = false;
                        }
                    })
                } else {
                    //this.$message.error(this.errors.all()[0]);
                }
            })
        },
        handleCancel(e) {
           this.$emit('changeYJModal',false)
        },
    },
}
</script>

<style scoped>
</style>