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
								    <input id="login" ref="login" type="button" @click="login" value="登录">
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
		mapActions,
		mapMutations,
		mapState
	} from 'vuex'
	import {getToken} from '@/network/api/login.js'
	export default {
		data() {
			return{
				  //用户名
				  username: '',
				  //登录密码
				  password: '',
			}
		},
		created(){
			console.log(getToken)
		},
		methods: {
		    //通过点击登陆
		    login() {
		        const _this = this
		        request({
		            method: 'post',
		            url: 'user/sub',
		            params: {
		                username: _this.username,
		                password: _this.password
		            }
		        }).then(function (res) {
		            // console.log(res)
		            if (res.code == 200) {
		                window.localStorage.setItem('token', res.data)
		                window.location.href = 'index.html?username=' + res.msg
		            } else {
		                window.alert('用户名称和登录密码错误,请检查!')
		            }
		        })
		    },
		    //在输入用户名密码时通过回车登陆
		    submit() {
		        const _this = this
		        _this.login()
		    },
		    //登陆input聚焦
		    inputFocus() {
		        const _this = this
		        const input = _this.$refs.login
		        input.focus()
		    }
		}
		// name: 'login',
		// data() {
		// 	return {
		// 		username: '',
		// 		password: '',
		// 	}
		// },
		// methods: {
		// 	...mapActions('login',['loginSystem']),
		// 	...mapMutations('login', ['SAVEUSERNAME', 'SAVEPASSWORD']),
		// 	async login() {
		// 		const _this = this
		// 		_this.SAVEUSERNAME ({
		// 			username: _this.username
		// 		})
		// 		_this.SAVEPASSWORD({
		// 			password: _this.password
		// 		})
		// 		const data =await _this.loginSystem()
		// 		console.log(data)
		// 	}
		// },
		// computed:{
		// 	...mapState('login',['token'])
		// },
		// watch:{
		// 	token(n,o){
		// 		if(n){
		// 			this.$router.replace('/')
		// 		}
		// 	}
		// }
	}
</script>
<style lang="scss">
	@import '@/styles/login.scss'
</style>
