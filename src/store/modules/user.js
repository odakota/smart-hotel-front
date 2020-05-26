import Vue from 'vue'
import { ACCESS_TOKEN } from '@/store/mutation-types'
import { welcome } from '@/utils/util'
import { getPermission, getUserInfo, logout } from '@/api/api'

const user = {
  state: {
    token: '',
    fullName: '',
    welcome: '',
    avatar: '',
    permissionList: [],
    info: {}
  },

  mutations: {
    SET_TOKEN: (state, token) => {
      state.token = token
    },
    SET_NAME: (state, { fullName, welcome }) => {
      state.fullName = fullName
      state.welcome = welcome
    },
    SET_AVATAR: (state, avatar) => {
      state.avatar = avatar
    },
    SET_INFO: (state, info) => {
      state.info = info
    },
    SET_PERMISSIONS: (state, permissionList) => {
      state.permissionList = permissionList
    }
  },

  actions: {
    // log in
    Login ({ commit }, response) {
      return new Promise((resolve, reject) => {
        if (response.code === 200) {
          const result = response.body
          Vue.ls.set(ACCESS_TOKEN, result.accessToken, result.accessExpired * 60 * 1000)
          commit('SET_TOKEN', result.accessToken)
          resolve()
        }
      })
    },

    // Get user information
    GetInfo ({ commit }) {
      return new Promise((resolve, reject) => {
        getUserInfo().then(response => {
          const result = response.body

          if (result.permissions.length > 0) {
            const permissions = []
            result.permissions.forEach(tmp => {
              const permission = {
                permissionId: tmp.permissionId,
                actionList: tmp.actionList
              }
              permissions.push(permission)
            })
            commit('SET_INFO', result)
            commit('SET_PERMISSIONS', permissions)
          } else {
            reject(new Error('getInfo: roles must be a non-null array !'))
          }
          commit('SET_NAME', { fullName: result.fullName, welcome: welcome() })
          commit('SET_AVATAR', result.avatar)

          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // Sign out
    Logout ({ commit, state }) {
      return new Promise((resolve) => {
        logout(state.token).then(() => {
          resolve()
        }).catch(() => {
          resolve()
        }).finally(() => {
          commit('SET_TOKEN', '')
          commit('SET_PERMISSIONS', [])
          Vue.ls.remove(ACCESS_TOKEN)
        })
      })
    },

    GetAllPermission ({ commit }) {
      return new Promise((resolve) => {
        getPermission().then((res) => {
          if (res.code === 200) {
            commit('TOGGLE_ALL_PERMISSION', res.body)
          }
          resolve()
        }).catch(() => {
          resolve()
        })
      })
    }
  }
}

export default user
