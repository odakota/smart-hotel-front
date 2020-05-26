import { BasicLayout, BlankLayout, PageView, RouteView } from '@/layouts'
import { getCurrentUserMenu } from '@/api/api'

// Front-end routing table
const constantRouterComponents = {
  // Basic page layout must be introduced
  BasicLayout: BasicLayout,
  BlankLayout: BlankLayout,
  RouteView: RouteView,
  PageView: PageView,
  '403': () => import(/* webpackChunkName: "error" */ '@/views/exception/403'),
  '404': () => import(/* webpackChunkName: "error" */ '@/views/exception/404'),
  '500': () => import(/* webpackChunkName: "error" */ '@/views/exception/500'),

  // You need to dynamically introduce page components
  'Workplace': () => import('@/views/dashboard/Workplace'),
  'Analysis': () => import('@/views/dashboard/Analysis'),

  // form
  'BasicForm': () => import('@/views/form/BasicForm'),
  'StepForm': () => import('@/views/form/stepForm/StepForm'),
  'AdvanceForm': () => import('@/views/form/advancedForm/AdvancedForm'),

  // list
  'TableList': () => import('@/views/list/TableList'),
  'StandardList': () => import('@/views/list/StandardList'),
  'CardList': () => import('@/views/list/CardList'),
  'SearchLayout': () => import('@/views/list/search/SearchLayout'),
  'SearchArticles': () => import('@/views/list/search/Article'),
  'SearchProjects': () => import('@/views/list/search/Projects'),
  'SearchApplications': () => import('@/views/list/search/Applications'),
  'ProfileBasic': () => import('@/views/profile/basic/Index'),
  'ProfileAdvanced': () => import('@/views/profile/advanced/Advanced'),

  // result
  'ResultSuccess': () => import(/* webpackChunkName: "result" */ '@/views/result/Success'),
  'ResultFail': () => import(/* webpackChunkName: "result" */ '@/views/result/Error'),

  // exception
  'Exception403': () => import(/* webpackChunkName: "fail" */ '@/views/exception/403'),
  'Exception404': () => import(/* webpackChunkName: "fail" */ '@/views/exception/404'),
  'Exception500': () => import(/* webpackChunkName: "fail" */ '@/views/exception/500'),

  // account
  'AccountCenter': () => import('@/views/account/center/Index'),
  'AccountSettings': () => import('@/views/account/settings/Index'),
  'BaseSettings': () => import('@/views/account/settings/BaseSetting'),
  'SecuritySettings': () => import('@/views/account/settings/Security'),
  'CustomSettings': () => import('@/views/account/settings/Custom'),
  'BindingSettings': () => import('@/views/account/settings/Binding'),
  'NotificationSettings': () => import('@/views/account/settings/Notification'),

  'TestWork': () => import(/* webpackChunkName: "TestWork" */ '@/views/dashboard/TestWork'),

  'RoleSetting': () => import('@/views/system/RoleSetting'),
  'HotelSetting': () => import('@/views/system/HotelSetting'),
  'GeneralSetting': () => import('@/views/system/GeneralSetting')
}

// The front end did not find the page route (fixed without changing)
const notFoundRouter = {
  path: '*', redirect: '/404', hidden: true
}

// Root level menu
const rootRouter = {
  key: '',
  name: 'index',
  path: '',
  component: 'BasicLayout',
  redirect: '/dashboard',
  meta: {
    title: 'Home'
  },
  children: []
}

/**
 * Dynamically generated menu
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
  return new Promise((resolve, reject) => {
    getCurrentUserMenu().then(res => {
      console.log('res', res)
      const { body } = res
      const menuNav = []
      const childrenNav = []
      //      Back-end data, root-level tree array, root-level PID
      listToTree(body, childrenNav, 0)
      rootRouter.children = childrenNav
      menuNav.push(rootRouter)
      console.log('menuNav', menuNav)
      const routers = generator(menuNav)
      routers.push(notFoundRouter)
      console.log('routers', routers)
      resolve(routers)
    }).catch(err => {
      reject(err)
    })
  })
}

/**
 * Format tree structure data to generate vue-router hierarchical routing table
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent) => {
  return routerMap.map(item => {
    const { title, show, hideChildren, hiddenHeaderContent, target, icon } = item.meta || {}
    const currentRouter = {
      // If the route is set with path, it will be used as the default path, otherwise the dynamic stitching of the route address will be generated as / dashboard / workplace
      path: item.path || `${parent && parent.path || ''}/${item.key}`,
      // Route name, suggest unique
      name: item.name || item.key || '',
      // The component of the page corresponding to the route: Option 2 (dynamic loading)
      component: (constantRouterComponents[item.component || item.key]) || (() => import(`@/views/${item.component}`)),

      // meta: Page title, menu icon, page authority (for instruction authority, can be removed)
      meta: {
        title: title,
        icon: icon || undefined,
        hiddenHeaderContent: hiddenHeaderContent,
        target: target,
        permission: item.name
      }
    }
    // Whether a hidden menu is set
    if (show === false) {
      currentRouter.hidden = true
    }
    // Whether hidden submenu is set
    if (hideChildren) {
      currentRouter.hideChildrenInMenu = true
    }
    // In order to prevent irregular back-end results, the processing may splice two backslashes
    if (!currentRouter.path.startsWith('http')) {
      currentRouter.path = currentRouter.path.replace('//', '/')
    }
    // Redirect
    item.redirect && (currentRouter.redirect = item.redirect)
    // Is there a submenu, and recursive processing
    if (item.children && item.children.length > 0) {
      // Recursion
      currentRouter.children = generator(item.children, currentRouter)
    }
    return currentRouter
  })
}

/**
 * Array to tree structure
 * @param list Source array
 * @param tree tree
 * @param parentId Parent ID
 */
const listToTree = (list, tree, parentId) => {
  list.forEach(item => {
    // Determine if it is a parent menu
    if (item.parentId === parentId) {
      const child = {
        ...item,
        key: item.key || item.name,
        children: []
      }
      // Iterate through the list to find all submenus matching the current menu
      listToTree(list, child.children, item.id)
      // Remove attributes that don't have children values
      if (child.children.length <= 0) {
        delete child.children
      }
      // Add to tree
      tree.push(child)
    }
  })
}
