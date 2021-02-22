<template>
	<div id="talentList">
		<div class="list">
			<el-table :data="tableData" stripe style="width: 100%">
				<el-table-column prop="name" label="姓名" width="180">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码" width="180">
				</el-table-column>
				<el-table-column label="时间" width="180">
					<template slot-scope="scope">
						<div>
							{{scope.row.createTime | filterTime}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="detail" label="创意介绍">
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
		getAllTalent
	} from '@/network/api/talent.js'
	export default {
		name: 'talentList',
		data() {
			return {
				url: '',
				param: {
					page: 1,
					size: 10,
					personnel: {

					}
				},
				tableData: [],
				totalNumber: 1
			}
		},
		watch: {
			pageChange(v, o) {
				// console.log(v)
				this.getAllData()
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
				const param = _this.param
				param.personnel = JSON.stringify(_this.param.personnel)
				getAllTalent(param, res => {
					// console.log(res)
					if (res.code == 200) {
						_this.tableData = res.data
						_this.totalNumber = res.data.length
					}
				}, err => {
					console.log(err)
				}, 'application/json')
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
		filters: {
			filterTime(item) {
				// item.createDate = item.createDate.substr(5, 5) + '  ' + item.createDate.substr(11, 5)
				return item.substr(0, 10) + '  ' + item.substr(11, 8)
			}
		}
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
