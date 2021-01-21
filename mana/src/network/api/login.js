import request from '../index.js'

/**
 * 登录
 */
export function toLogin(params, success, failure) {
	return request.post('user/sub', params, success, failure)
}


