import router from './router'
import store from './store'
import getPageTitle from '@/utils/get-page-title'

let close

// 路由守卫 进入每个页面都会执行
router.beforeEach(async (to, from, next) => {
  // 设置浏览器标题
  document.title = getPageTitle(to.meta.title)
  const { meta: { load } } = to;
  if (load) {
    store.dispatch('setLoading', 1)
  }
  next()
})

router.afterEach((to, from,) => {
  store.dispatch('setMenu', false)

})
