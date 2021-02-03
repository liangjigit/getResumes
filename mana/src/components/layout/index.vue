<template>
	<div id="index">
		<el-container style="height: 100vh; border: 1px solid #eee">
			<Aside @delTitle="delTitle" />
			<el-container>
				<Elheader :title="title" />
				<el-main>
					<router-view></router-view>
				</el-main>
			</el-container>
		</el-container>
	</div>
</template>
<script>
	import {
		mapState,
		mapActions,
		mapMutations
	} from 'vuex'
	import Aside from './components/Aside.vue'
	import Elheader from './components/Elheader.vue'
	export default {
		name: 'index',
		components: {
			Aside,
			Elheader
		},
		data() {
			return {
				title:''
			}
		},
		methods: {
			...mapActions(['getUserPermissions']),
			delTitle(t){
				// console.log(t)
				this.title = t
			},
			/**
			 * 对二级列表进行处理
			 */
			handleSecondMenu(id) {
				return this.secondMenu.filter(function(item, index, arr) {
					return item.parentId === id
				})
			}
		},
		computed: {
			...mapState(['userPermissions', 'roles', 'firstMenu', 'secondMenu']),

		},
	};
</script>
<style lang="scss">
	@import '@/styles/index.scss';

	.el-aside {
		color: #333;
	}
	.el-main{
		margin-top: 70px;
		margin-left:-40px;
	}
</style>
