import Vue from 'vue'
import Router from 'vue-router'
import Home from '../views/layout'
import menuData from '@/utils/menuData.js'
// 全局router异常处理
const originalPush = Router.prototype.push
Router.prototype.push = function push (location) {
  return originalPush.call(this, location).catch(err => { if (typeof err !== 'undefined') console.log(err) })
}
Vue.use(Router)
const constRouter = [
  {
    path: '/',
    name: '首页',
    redirect: '/home'
  }
]
const router = new Router({
  routes: constRouter
})
const addRoutes = filterAsyncRouter(menuData)
const homeRoutes = [
  {
    path: '/home',
    name: '首页',
    component: Home,
    redirect: '/drag/origin',
    children: addRoutes
  }
]
router.addRoutes(homeRoutes)
function filterAsyncRouter (menuData) {
  const res = []
  menuData.forEach(menu => {
    if (menu.component) {
      menu.component = view(menu.path)
      res.push(menu)
    }
    if (menu.children) {
      const children = filterAsyncRouter(menu.children)
      res.push(...children)
    }
  })
  return res
}
function view (path) {
  return function (resolve) {
    import(`@/views${path}`).then(mod => {
      resolve(mod)
    })
  }
}
export default router