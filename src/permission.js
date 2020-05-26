import Vue from 'vue'
import router from './router'
import store from './store'

import NProgress from 'nprogress' // progress bar
import '@/components/NProgress/nprogress.less' // progress bar custom style
import notification from 'ant-design-vue/es/notification'
import { setDocumentTitle, domTitle } from '@/utils/domUtil'
import { ACCESS_TOKEN } from '@/store/mutation-types'

NProgress.configure({ showSpinner: false }) // NProgress Configuration

const whiteList = ['login', 'register', 'registerResult'] // no redirect whitelist
const defaultRoutePath = '/dashboard/workplace'

router.beforeEach((to, from, next) => {
  NProgress.start() // start progress bar
  to.meta && (typeof to.meta.title !== 'undefined' && setDocumentTitle(`${to.meta.title} - ${domTitle}`))
  if (Vue.ls.get(ACCESS_TOKEN)) {
    /* has token */
    if (to.path === '/user/login') {
      next({ path: defaultRoutePath })
      NProgress.done()
    } else {
      if (store.getters.permissions.length === 0) {
        store
          .dispatch('GetInfo')
          .then(res => {
            store.dispatch('GenerateRoutes').then(() => {
              // Generate accessible routing tables based on roles permissions
              // Dynamically add accessible routing table
              router.addRoutes(store.getters.addRouters)
              // When the request is redirected, the login is automatically redirected to this address
              const redirect = decodeURIComponent(from.query.redirect || to.path)
              if (to.path === redirect) {
                // Hack method to ensure that addRoutes is completed,set the replace: true so the navigation will not leave a history record
                next({ ...to, replace: true })
              } else {
                // Jump to destination route
                next({ path: redirect })
              }
            })
          })
          .catch(() => {
            notification.error({
              message: 'Error',
              description: 'Request for user information failed, please try again'
            })
            store.dispatch('Logout').then(() => {
              next({ path: '/user/login', query: { redirect: to.fullPath } })
            })
          })
      } else {
        next()
      }
    }
  } else {
    if (whiteList.includes(to.name)) {
      // In the login-free whitelist, enter directly
      next()
    } else {
      next({ path: '/user/login', query: { redirect: to.fullPath } })
      NProgress.done() // if current page is login will not trigger afterEach hook, so manually handle it
    }
  }
})

router.afterEach(() => {
  NProgress.done() // finish progress bar
})
