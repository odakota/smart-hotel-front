import { axios } from '@/utils/request'

const api = {
  user: '/user',
  role: '/role',
  service: '/service',
  permission: '/permission',
  permissionNoPager: '/permission/no-pager',
  orgTree: '/org/tree'
}

export default api

export function postAction (url, parameter, data) {
  return axios({
    url: url,
    method: 'post',
    data: data,
    params: parameter
  })
}

export function putAction (url, parameter, data) {
  return axios({
    url: url,
    method: 'put',
    data: data,
    params: parameter
  })
}

export function getAction (url, parameter) {
  return axios({
    url: url,
    method: 'get',
    params: parameter
  })
}

export function deleteAction (url, parameter) {
  return axios({
    url: url,
    method: 'delete',
    params: parameter
  })
}

export function getRoleList (parameter) {
  return axios({
    url: api.role,
    method: 'get',
    params: parameter
  })
}

export function getServiceList (parameter) {
  return axios({
    url: api.service,
    method: 'get',
    params: parameter
  })
}

export function getPermissions (parameter) {
  return axios({
    url: api.permissionNoPager,
    method: 'get',
    params: parameter
  })
}

export function getOrgTree (parameter) {
  return axios({
    url: api.orgTree,
    method: 'get',
    params: parameter
  })
}
