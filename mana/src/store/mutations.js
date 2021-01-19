import {
	GETUSERINFO,
} from './mutation-types.js'
export default {
	/**
	 * 获取当前用户权限
	 */
	[GETUSERINFO](state, payload) {
		state.userPermissions = payload.userPermissions
		state.roles = payload.roles
		state.rolesList = payload.rolesList
	},
	/**
	 * 区分一二级菜单
	 */
	[SEPARATEMENU](state,payload){
		state.firstMenu = payload.firstMenu
		state.secondMenu = payload.secondMenu
	}
}
