<template>
    <div class="bgmain minh100">
        <LoanHeader :pageInfo="pageInfo"></LoanHeader> 
        <div class="m-access-form deposit_identify mt-30">
            <div class="hd">
                <div class="logo"><img alt="" src="@/assets/images/user/deposit_logo.png" height="50"></div>
                <h4>账户升级为新网银行存管账户</h4>
                <h6>为保障您的资金安全，请先开通存管帐户</h6>
            </div>
            <div class="bd">
                <form class="forminfo" action="/member/depository/reg" method="post" @submit.prevent="checkForm">
                    <div class="formdesc mt-30">姓名</div>
                    <div class="formline mt-5">
                        <div class="forminput">
                        <input class="input-text" name="realname" v-model="realname" @keyup="realname=realname.replace(/^ +| +$/g,'')" 
                            placeholder="请输入真实姓名" v-validate="idCardType=='PRC_ID'?'required|isRealName':'required'"></div>
                        <span class="icontip icon-font icon-error" v-if="errors.has('realname')"></span>
                        <span class="icontip icon-font icon-right" v-else-if="ifValidate"></span>
                    </div>
                    <div class="l20 text-second f-12 mt-5" v-show="idCardType=='COMPATRIOTS_CARD'">*为确保存管成功开户，请输入您的简体中文姓名</div>
                    <div class="formdesc mt-15">证件类型</div>
                    <div class="formline mt-5" v-if="pageInfo.loginInfo.userType!='5'">
                        <select class="select" name="idCardType" v-model="idCardType">
                            <option value="PRC_ID">身份证</option>
							<option value="PASSPORT">护照</option>
							<option value="COMPATRIOTS_CARD">港澳台同胞回乡证</option>
							<option value="PERMANENT_RESIDENCE">外国人永久居住证</option>
                        </select>
                    </div>
                    <div class="formline mt-5" v-else>
                        <select class="select" name="idCardType" v-model="idCardType">
                            <option value="PRC_ID" >身份证</option>
                        </select>
                    </div>
                    <div class="formdesc mt-15">证件号码</div>
                    <div class="formline mt-5">
                        <div class="forminput">
                            <input class="input-text" name="idNo" v-validate="idCardType=='PRC_ID'?'required|ID':'required|min:6|max:20'" v-model="idNo" placeholder="请输入您的证件号码">
                        </div>
                        <span class="icontip icon-font icon-error" v-if="errors.has('idNo')"></span>
                        <span class="icontip icon-font icon-right" v-else-if="ifValidate"></span>
                    </div>
                    <Errortip v-if="formtip1||errors.any()" :msg="formtip1?formtip1:errors.all()[0]"></Errortip>
                    <div class="h30" v-else></div>
                    <div class="formline mt-10">
                        <a-button type="primary" html-type="submit" block :class="['ant-btn-submit',disabledSubmit?'disabled':'']" :disabled="disabledSubmit">开通银行存管</a-button>
                    </div>
                </form>
            </div>
        </div>
        <LoginFooter :pageInfo="pageInfo"></LoginFooter>         
    </div>
</template>

<script>
import {mapState} from 'vuex'
import LoanHeader from '@/components/include/LoanHeader'
import LoginFooter from '@/components/include/LoginFooter'
import Errortip from '@/components/common/Errortip'
import '@/utils/validate'
import { Validator } from "vee-validate"
Validator.localize({
    zh_CN: {
      attributes: {
          realname:'真实姓名',
          idNo:'证件号码',
      }
    }
  });
export default {
    components:{
        LoanHeader,
        LoginFooter,
        Errortip,
    },
    data() { 
        return {
            realname:'',
            idCardType:'PRC_ID',
            idNo:'',
            formtip1:'',
            ifValidate:false,
            disabledSubmit:false,
            pageInfo:{
                loginInfo:this.$store.state.loginInfo,
            }
        }
    },
    mounted(){

    },
    methods:{
        checkForm(){
            this.$validator.validateAll().then((resp) => {
                this.ifValidate=true
                return resp
            })
        },
    }
 }
</script>

<style scoped>
@import "~@/assets/style/access.less";
</style>