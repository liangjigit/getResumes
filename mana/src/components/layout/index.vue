<template>
	<div id="index">
		<el-container style="height: 100vh; border: 1px solid #eee">
			<Aside />

			<el-container>
				<Elheader />

			<!-- 	<el-main>
					<el-table :data="tableData">
						<el-table-column prop="date" label="日期" width="140">
						</el-table-column>
						<el-table-column prop="name" label="姓名" width="120">
						</el-table-column>
						<el-table-column prop="address" label="地址">
						</el-table-column>
					</el-table>
				</el-main> -->
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
			const item = {
				date: '2016-05-02',
				name: '王小虎',
				address: '上海市普陀区金沙江路 1518 弄'
			};
			return {
				tableData: Array(20).fill(item)
			}
		},
		methods: {
			...mapActions(['getUserPermissions']),
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
