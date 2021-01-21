import {
	GETUSERINFO,
} from './mutation-types.js'
export default {
	/**
	 * 获取当前用户权限
	 */
	[GETUSERINFO](state, payload) {
		let {username,token} = payload
		state.username = username
		state.token = token
	}
}
