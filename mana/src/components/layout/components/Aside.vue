<template>
	<div id='aside'>
		<el-aside width="80px" height="100%">
			<el-menu :default-active="activeMenu" class="el-menu-vertical-demo" router @select="changeActive">
				<el-menu-item v-for="item in activeAsync" :index="item.path" @click="changePath(item.meta.title)">
					<span slot="title">{{item.meta.title}}</span>
				</el-menu-item>
			</el-menu>
		</el-aside>
	</div>
</template>

<script>
	import {
		asyncRouter
	} from '@/router/asyncRouter.js'
	import {
		mapActions
	} from 'vuex'
	export default {
		name: 'Aside',
		created() {
			let userRole = window.sessionStorage.getItem('user-role')
			this.activeAsync = asyncRouter.filter(item => {
				return item.meta.role.includes(userRole)
			})
			// console.log(this.$route.path)
			if(this.$route.path == '/'){
				this.$router.push('/' + this.activeAsync[0].path)
				this.activeMenu = this.activeAsync[0].path
			}else{
				this.$router.push(this.$route.path)
				this.activeMenu = this.$route.path.substr(1)
			}
		},
		data() {
			return {
				activeAsync: [],
				activeMenu:''
			}
		},
		methods:{
			/**
			 * 切换菜单时回调
			 */
			changePath(title){
				// this.$bus.$emit('delTitle',title)
				// console.log(title)
				this.$emit('delTitle',title)
			},
			/**
			 * 切换活跃
			 */
			changeActive(index){
				this.activeMenu = index
			}
		}
	}
</script>

<style lang="scss" scoped>
	#aside {
		background-color: rgba(63, 63, 63, 1);
		display: flex;
		flex-direction: column;
		justify-content: center;

		.el-menu-item {
			background-color: #3f3f3f;
			color: #FFFFFF;
		}

		.is-active {
			color: #409EFF;
		}
	}
</style>
