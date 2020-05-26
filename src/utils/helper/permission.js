export const PERMISSION_ENUM = {
  'create': { key: 'create', label: 'C', description: 'Additional action' },
  'delete': { key: 'delete', label: 'D', description: 'Delete action' },
  'update': { key: 'update', label: 'U', description: 'Update action' },
  'read': { key: 'read', label: 'R', description: 'Read action' },
  'import': { key: 'import', label: 'I', description: 'Import action' },
  'export': { key: 'export', label: 'E', description: 'Export action' }
}

function plugin (Vue) {
  if (plugin.installed) {
    return
  }

  !Vue.prototype.$auth && Object.defineProperties(Vue.prototype, {
    $auth: {
      get () {
        const _this = this
        return (permissions) => {
          const [permission, action] = permissions.split('.')
          const permissionList = _this.$store.getters.permissions
          const per = permissionList.find((val) => {
            return val.permissionId === permission
          })
          if (typeof per === 'undefined') {
            return false
          }
          return per.actionList.findIndex((val) => {
            return val === action
          }) > -1
        }
      }
    }
  })

  !Vue.prototype.$enum && Object.defineProperties(Vue.prototype, {
    $enum: {
      get () {
        // const _this = this;
        return (val) => {
          let result = PERMISSION_ENUM
          val && val.split('.').forEach(v => {
            result = result && result[v] || null
          })
          return result
        }
      }
    }
  })
}

export default plugin
