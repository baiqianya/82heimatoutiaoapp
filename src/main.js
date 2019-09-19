import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { Button, NavBar, Field, Cell, CellGroup, Toast, Loading } from 'vant'
import './styles/index.less'

Vue.use(Button)
  .use(NavBar)
  .use(Field)
  .use(Cell)
  .use(CellGroup)
  .use(Toast)
  .use(Loading)

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
