import request from '../index.js'

/**
 * 登录获取token
 */
export function getToken(params, success, failure) {
	return request.post('/v1/user/login', params, success, failure)
}

/**
 * 获取用户权限
 */
export function getPermissions(params, success, failure) {
	return request.post('/v1/resources/getResources', params, success, failure)
}
