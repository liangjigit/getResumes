<template>
	<div id="talentList">
		<div class="list">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="department" label="部门" width="180">
				</el-table-column>
				<el-table-column prop="name" label="联系人" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码" width="180">
				</el-table-column>
				<el-table-column prop="detail" label="需求详情">
				</el-table-column>
			</el-table>
			<el-row style="margin-top: 30px;">
				<el-col :span="24" style="display: flex;justify-content: center;">
					<el-pagination layout="total,prev, pager, next, jumper" :total="totalNumber" :current-page="param.page"
					 @prev-click="changePage" @next-click="changePage" @current-change="changePage">
					</el-pagination>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		GLOBAL_URL
	} from '@/utils/GLOBAL.js'
	const axios = require('axios')
	export default {
		name: 'demandList',
		data() {
			return {
				url: '',
				param: {
					page: 1,
					size: 10,
					demand: {
	
					}
				},
				tableData: [],
				totalNumber:1
			}
		},
		watch:{
			pageChange(v, o) {
				// console.log(v)
				this.getAllData()
			}
		},
		created() {
			this.url = GLOBAL_URL
			this.getAllData()
		},
		methods: {
			/**
			 * 获取所有人才数据
			 */
			getAllData() {
				const _this = this
				const param = _this.param
				const url = _this.url + 'service/demand/findAll'
				param.demand = JSON.stringify(_this.param.demand)
				axios.post(url, param, {
					headers: {
						'Content-Type': 'application/json'
					}
				}).then(res => {
					const {data} = res
					// console.log(data)
					if(data.code == 200){
						_this.tableData = JSON.parse(data.data)
						_this.totalNumber = JSON.parse(data.data).length
					}
				}).catch(err => {
					console.log(err)
				})
			},
			/**
			 * 切换页码时
			 */
			changePage(page) {
				const _this = this
				_this.$set(_this.param, 'page', page)
			},
		},
		computed: {
			pageChange() {
				return this.param.page
			}
		},
	}
</script>

<style lang="scss" scoped>
	#talentList {
		display: flex;
		justify-content: center;
		margin-top: 50px;

		.list {
			width: 80%;
		}
	}
</style>
