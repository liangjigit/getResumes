<template>
	<div id="talentList">
		<div class="list">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="date" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="name" label="手机号码" width="180">
				</el-table-column>
				<el-table-column prop="address" label="创意介绍">
				</el-table-column>
			</el-table>
			<!-- <el-row>
				<el-col :span="24" style="display: flex;justify-content: center;">
					<el-pagination layout="total,prev, pager, next, jumper" :total="totalNumber" :current-page="pageSizes.page"
					 @prev-click="changePage" @next-click="changePage" @current-change="changePage">
					</el-pagination>
					<el-button style="line-height: 5px;margin-left: 10px;" type="primary">确定
					</el-button>
				</el-col>
			</el-row> -->
		</div>
	</div>
</template>

<script>
	import {
		getAllTalent
	} from '@/network/api/talent.js'
	export default {
		name: 'talentList',
		data() {
			return {
				param: {
					page:1,
					size:10
				},
				tableData: [{
					date: '2016-05-02',
					name: '王小虎',
					address: '上海市普陀区金沙江路 1518 弄'
				}]
			}
		},
		created() {
			this.getAllData()
		},
		methods: {
			/**
			 * 获取所有人才数据
			 */
			getAllData() {
				const _this = this
				getAllTalent({}, res => {
					console.log(res)
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	#talentList {
		display: flex;
		justify-content: center;
		margin-top: 30px;

		.list {
			width: 80%;
		}
	}
</style>
