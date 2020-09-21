<template>
    <div class="slider" id="nc"></div>
</template>
<script>
  import "@/utils/ali_validate"
  let nc = null
  export default {
    name: "validatorModal",
    props: {
      mobile: {
        type: String,
        default: ''
      },
      isSign: {
        type: Boolean,
        default: true
      }
    },
    watch: {
        isShow(curVal) {
            if (nc) {//重置滑块
                nc.reset()
            }
            this.$emit('visible-change', curVal);
        }
    },
    mounted() {
      //滑块验证
        let nc_appkey = 'FFFF0N00000000005F1A';// 应用标识,不可更改
        let nc_token = [nc_appkey, (new Date()).getTime(), Math.random()].join(':');
        let nc_scene = 'nc_register';
        nc = NoCaptcha.init({
            renderTo: '#nc',
            appkey: nc_appkey,
            scene: nc_scene,
            token: nc_token,
            elementID: ['phone'],
            callback: (data) => {
                this.$emit("onValidatorResult", {csessionid:data.csessionid,sig:data.sig,scene: nc_scene,token: nc_token})
            }
        });
        NoCaptcha.upLang('cn', {
            'SLIDER_LABEL': "向右滑动以完成验证",//等待滑动
        });
        nc.on('error', (e) => {
            console.log('error')
        });
        nc.on('fail', (e) => {
            console.log('fail')
        });
        nc.on('success', (e) => {
            console.log('success')
        });
        nc.on('afterverify', (e) => {
            console.log('afterverify')
        });
        NoCaptcha.setEnabled(true)
        nc.reset()
    }
  }
</script>



