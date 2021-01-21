<template>
	<el-header>
	    <div style="position: absolute;color: #656565;font-size: 18px;">简历管理</div>
	    <div
	        style="position: absolute;right: 150px;display: flex;justify-content: center;align-items: center;">
	        <span>{{usernametop}}</span>
	    </div>
	    <div style="position: absolute; cursor: pointer;right: 30px;" @click="logOut">退出登录</div>
	</el-header>
</template>

<script>
	export default{
		name:'Elheader',
		data(){
			return{
				usernametop:''
			}
		},
		created() {
			this.usernametop = window.localStorage.getItem('username')
		},
		methods:{
			/**
			 * 退出登录
			 */
			logOut(){}
		}
	}
</script>

<style>
</style>
