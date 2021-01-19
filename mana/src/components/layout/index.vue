<template>
	<div id="index">
		<el-container style="height: 100vh; border: 1px solid #eee">
			<Aside />

			<el-container>
				<el-header style="text-align: right; font-size: 12px">
					<el-dropdown>
						<i class="el-icon-setting" style="margin-right: 15px"></i>
						<el-dropdown-menu slot="dropdown">
							<el-dropdown-item>查看</el-dropdown-item>
							<el-dropdown-item>新增</el-dropdown-item>
							<el-dropdown-item>删除</el-dropdown-item>
						</el-dropdown-menu>
					</el-dropdown>
					<span>{{userPermissions.name}}</span>
				</el-header>

				<el-main>
					<el-table :data="tableData">
						<el-table-column prop="date" label="日期" width="140">
						</el-table-column>
						<el-table-column prop="name" label="姓名" width="120">
						</el-table-column>
						<el-table-column prop="address" label="地址">
						</el-table-column>
					</el-table>
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
	export default {
		name: 'index',
		components: {
			Aside
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
<style>
	.el-header {
		background-color: #B3C0D1;
		color: #333;
		line-height: 60px;
	}

	.el-aside {
		color: #333;
	}
</style>
