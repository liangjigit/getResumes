<template>
	<div id="login">
		<div class="background">
			<img src="@/assets/background.png" />
		</div>
		<div class="login-box">
			<div style="width: 5%;"></div>
			<div class="login-right">
				<div class="logo-text">
					<p>AIMER &nbsp;&nbsp; 内部竞聘平台</p>
				</div>
				<div class="sign-in">
					<el-form ref="form">
						<el-form-item>
							<el-input prefix-icon="el-icon-user-solid" v-model="username" placeholder="请输入用户名称" clearable></el-input>
						</el-form-item>
						<el-form-item>
							<el-input prefix-icon="el-icon-lock" v-model="password" placeholder="请输入登录密码" show-password></el-input>
						</el-form-item>
					</el-form>
					<div class="sign-in-button">
						<input id="login" ref="login" type="button" @click="getLogin" value="登录">
					</div>
				</div>
			</div>
			<div class="login-left">
				<img src="@/assets/cartoon.png">
			</div>
		</div>
	</div>
</template>
<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		data() {
			return {
				//用户名
				username: '',
				//登录密码
				password: '',
			}
		},
		created() {
			// console.log(this.$router)
		},
		methods: {
			...mapActions(['login']),
			// 通过点击登陆
			async getLogin() {
				const _this = this
				let response = await _this.login({
					username: _this.username,
					password: _this.password
				})
				console.log(response)
				if (response.code == 200) {
					let {name,status}= JSON.parse(response.msg)
					status = parseInt(status)
					let userRole = ''
					switch(status){
						case 1:
						userRole = 'personnel'
						break;
						case 2:
						userRole = 'CEO'
						break;
					}
					window.localStorage.setItem('manager-token', response.data)
					window.localStorage.setItem('user-role', userRole)
					window.localStorage.setItem('username',name)
					_this.$router.push('/')
				} else {
					_this.$message({
						showClose: true,
						message: '用户名称和登录密码错误，请检查！',
						type: 'error'
					});
				}
			},
		}
	}
</script>
<style lang="scss">
	@import '@/styles/login.scss'
</style>
