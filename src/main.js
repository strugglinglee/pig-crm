import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import * as filters from './filters'

import {
  Button,
  Layout,
  Menu,
  Icon,
  Breadcrumb,
  Table,
  Drawer,
  Modal,
  Input,
  FormModel,
  message,
  notification,
  Popconfirm,
  Select,
  Tooltip
} from 'ant-design-vue';

Vue.use(Button)
  .use(Layout)
  .use(Menu)
  .use(Icon)
  .use(Breadcrumb)
  .use(Table)
  .use(Drawer)
  .use(FormModel)
  .use(Modal)
  .use(Input)
  .use(Popconfirm)
  .use(Select)
  .use(Tooltip)

Vue.config.productionTip = false;

Vue.prototype.$message = message;
Vue.prototype.$notification = notification;
message.config({
    duration: 2,
});

Object.keys(filters).forEach(key=>{
    Vue.filter(key,filters[key])//插入过滤器名和对应方法
})

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');