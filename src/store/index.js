import Vue from 'vue'
import Vuex from 'vuex'
import sessionStore from '@/utils/sessionStore'
import { post } from '@/config/axios'
import { toJson } from '@/utils/utils'
Vue.use(Vuex)

let loginInfo = {
  isLogin: false,
  voucherFlag: false,
  nickName: '',
  userType: 1,
  itemCount: 0,
  loanCount: 0,
  vipStatus: 0,
  ifGetInfo: false
}
let baseLoginInfo = loginInfo
if (sessionStore.get('loginInfo')) {
  loginInfo = sessionStore.get('loginInfo')
}
export default new Vuex.Store({
  state: {
    loginInfo: loginInfo
  },
  mutations: {
    changeLoginInfo (state, loginInfo) {
      state.loginInfo = loginInfo
      sessionStore.set('loginInfo', state.loginInfo)
    },
    removeLoginInfo (state) {
      state.loginInfo = baseLoginInfo
      sessionStore.set('loginInfo', state.loginInfo)
    }
  },
  actions: {
    getLoginInfo (context) {
      post('/member/session').then(res => {
        let result = toJson(res).jsonData
        if (result.userType && result.nickName) {
          loginInfo = { ...context.state.loginInfo, ...{ isLogin: true, ifGetInfo: true }, ...result }
        } else {
          loginInfo = { ...context.state.loginInfo, ...baseLoginInfo, ...result }
        }
        console.log(JSON.stringify(loginInfo) + '=====state.loginInfo')
        context.commit('changeLoginInfo', loginInfo)
      })
    }
  }
})
