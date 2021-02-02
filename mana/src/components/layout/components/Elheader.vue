<template>
	<el-header>
		<div style="position: absolute;color: #656565;font-size: 18px;">后台管理</div>
		<div style="position: absolute;right: 150px;display: flex;justify-content: center;align-items: center;">
			<span>{{usernametop}}</span>
		</div>
		<div style="position: absolute; cursor: pointer;right: 30px;" @click="logOut">退出登录</div>
	</el-header>
</template>

<script>
	import {
		singOut
	} from '@/network/api/index.js'
	export default {
		name: 'Elheader',
		data() {
			return {
				usernametop: ''
			}
		},
		created() {
			this.usernametop = window.localStorage.getItem('username')
		},
		methods: {
			/**
			 * 退出登录
			 */
			logOut() {
				const _this = this
				signOut({}, res => {
					console.log(res)
					if (res.code == 200) {
						window.localStorage.removeItem('manager-token')
						window.localStorage.removeItem('user-role')
						_this.router.push('/login')
					}
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style>
</style>
