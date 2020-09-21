import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store/index'
import { baseUrl, apiUrl } from './config/env'
import { post, fetch } from './config/axios'
import "babel-polyfill"

import './assets/font/iconfont.css'
import './assets/style/reset.less'
import './assets/style/common.less'
import './assets/style/swiper.css'
import 'vue-layer/lib/vue-layer.css'

import { Button, message, Modal, Form, Input, Select, Radio, Checkbox, Icon, Tabs, Tooltip, Row, Col, Spin, Affix } from 'ant-design-vue'
import layer from 'vue-layer'
import VueAwesomeSwiper from 'vue-awesome-swiper'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

Vue.prototype.moment = moment
Vue.prototype.baseUrl = baseUrl
Vue.prototype.apiUrl = apiUrl
Vue.prototype.$get = fetch
Vue.prototype.$post = post
Vue.use(Button)
Vue.use(Modal)
Vue.use(Form)
Vue.use(Input)
Vue.use(Select)
Vue.use(Radio)
Vue.use(Checkbox)
Vue.use(Icon)
Vue.use(Tabs)
Vue.use(Tooltip)
Vue.use(Row)
Vue.use(Col)
Vue.use(Spin)
Vue.use(Affix)
Vue.use(VueAwesomeSwiper)

Vue.prototype.$message = message
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
Vue.prototype.$layer = layer(Vue, { msgtime: 2.5 })

Vue.config.productionTip = false

router.beforeEach((to, from, next) => {
  let isLogin = store.state.loginInfo.isLogin // 判断是否登录
  if (to.name == null || (process.env.NODE_ENV == 'production' && !to.meta.isProduction)) {
    if (to.path.includes('/spa')) {
      next('/spa/404')
    } else {
      window.location.href = to.path
    }
    return
  }
  // console.log('[isLogin]' + isLogin)
  if (to.meta.auth && !isLogin) { // 需要登录
    next('/spa/secure/login?callbackUrl=' + to.path)
    return
  }
  next()
})

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
