<template>
	<el-header>
		<div style="position: absolute;color: #656565;font-size: 18px;">{{title == '' ? initTitle : title}}</div>
		<div style="position: absolute;right: 150px;display: flex;justify-content: center;align-items: center;font-size: 16px;">
			<span>{{usernametop}}</span>
		</div>
		<div style="position: absolute; cursor: pointer;right: 30px;" @click="logOut">退出登录</div>
	</el-header>
</template>

<script>
	import {
		signOut
	} from '@/network/api/index.js'
	export default {
		name: 'Elheader',
		props:{
			title:{
				type:String,
				default:''
			}
		},
		data() {
			return {
				usernametop: '',
				initTitle:''
			}
		},
		created() {
			this.usernametop = window.localStorage.getItem('username')
			this.initTitle = window.localStorage.getItem('title')
		},
		mounted() {
			// this.$bus.$on('delTitle',title=>{
			// 	this.title = title
			// })
		},
		methods: {
			/**
			 * 退出登录
			 */
			logOut() {
				const _this = this
				signOut(res => {
					console.log(res)
				}, err => {
					// console.log(err)
					if (err.code == 200) {
						window.localStorage.removeItem('manager-token')
						window.localStorage.removeItem('user-role')
						window.localStorage.removeItem('username')
						window.localStorage.removeItem('title')
						window.localStorage.removeItem('type')
						_this.$router.push('/login')
					}
				})
			}
		}
	}
</script>

<style>
</style>
