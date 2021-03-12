import Vue from 'vue'
import {
  Button,
  Layout,
  Menu,
  Input,
  Icon,
  Tabs,
  Drawer,
  Checkbox
} from 'ant-design-vue'
import 'ant-design-vue/dist/antd.less';
[
  Button,
  Layout,
  Menu,
  Input,
  Icon,
  Tabs,
  Drawer,
  Checkbox
].map(item => {
  Vue.use(item)
})
// Vue.prototype.$notification = notification
// Vue.prototype.$Modal = Modal
// Vue.prototype.$message = message