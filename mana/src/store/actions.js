import {
	toLogin
} from '@/network/api/login.js'
export default {
	/**
	 * 登陆接口，用户名称保存state
	 */
	login({
		commit
	}, payload) {
		return new Promise((resolve, reject) => {
			let {
				username,
				password
			} = payload
			toLogin({
				username,
				password
			}, res => {
				// console.log(res)
				resolve(res)
				if(res.code == 200){
					commit('GETUSERINFO',{
						username:res.msg,
						token:res.data
					})
				}
			}, err => {
				console.log(err)
				reject(err)
			})
		})
	}
}
