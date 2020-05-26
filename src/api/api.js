import { deleteAction, getAction, postAction, putAction } from '@/api/manage'

export const externalAPIGetCountries = () => getAction('/countries')

export const login = (body) => postAction('/oauth/normal/token', null, body)
export const loginSpecial = (body) => postAction('/oauth/special/token', null, body)
export const getUserInfo = () => getAction('/userinfo')
export const getCurrentUserMenu = () => getAction('/employee/menu')
export const logout = (parameter) => deleteAction('/oauth/token/revoke', parameter)

export const getPermission = () => getAction('/permissions')
export const getRoles = (parameter) => getAction('/roles', parameter)
export const updateRole = (id, body) => putAction(`/roles/${id}`, null, body)
export const createRole = (body) => postAction('/roles', null, body)
export const deleteRole = (id) => deleteAction(`/roles/${id}`)

export const getHotels = () => getAction('/hotels')
export const getCurrentHotel = () => getAction('/current-hotel')
export const updateHotel = (id, body) => putAction(`/hotels/${id}`, null, body)
export const createHotel = (body) => postAction('/hotels', null, body)
export const deleteHotel = (id) => deleteAction(`/hotels/${id}`)

export const getTaxes = () => getAction('/taxes')
export const updateTax = (id, body) => putAction(`/taxes/${id}`, null, body)
export const createTax = (body) => postAction('/taxes', null, body)
export const deleteTax = (id) => deleteAction(`/taxes/${id}`)

export const getFees = () => getAction('/fees')
export const updateFee = (id, body) => putAction(`/fees/${id}`, null, body)
export const createFee = (body) => postAction('/fees', null, body)
export const deleteFee = (id) => deleteAction(`/fees/${id}`)
