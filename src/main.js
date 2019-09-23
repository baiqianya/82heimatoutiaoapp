import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import {
  Button,
  NavBar,
  Field,
  Cell,
  CellGroup,
  Toast,
  Loading,
  Tabbar,
  TabbarItem,
  Tab,
  Tabs,
  List,
  PullRefresh,
  Grid,
  GridItem,
  Icon,
  Image,
  Lazyload,
  Popup
} from 'vant'
import './styles/index.less'
import { ValidationProvider, ValidationObserver, extend } from 'vee-validate'
import zhCN from 'vee-validate/dist/locale/zh_CN' // 加载验证插件的语言包
import * as rules from 'vee-validate/dist/rules'
import { relativeTime } from './utils/date'

Vue.filter('relativeTime', relativeTime)

Vue.use(Button)
  .use(NavBar)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Toast)
  .use(Loading)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Tab)
  .use(Tabs)
  .use(List)
  .use(PullRefresh)
  .use(Grid)
  .use(GridItem)
  .use(Image)
  .use(Icon)
  .use(Lazyload)
  .use(Popup)

for (let rule in rules) {
  extend(rule, {
    ...rules[rule], // add the rule
    message: zhCN.messages[rule] // add its message
  })
}

// 配置表单验证插件
extend('phone', {
  validate (value) {
    return /^1[3456789][0-9]{9}$/.test(value)
  },
  message: '请输入正确的手机号'
})

// Register it globally
Vue.component('ValidationProvider', ValidationProvider)
Vue.component('ValidationObserver', ValidationObserver)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
