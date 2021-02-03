<template>
	<div id="labelF">
		<div class="block" style="position: relative;line-height: 30px;">
			<el-row>
				<el-col :span="24" style="display: flex;justify-content: center;">
					<el-pagination layout="total,prev, pager, next, jumper" :total="totalNumber" :current-page="pageSizes.page"
					 @prev-click="changePage" @next-click="changePage" @current-change="changePage">
					</el-pagination>
					<el-button style="line-height: 5px;margin-left: 10px;" type="success">确定
					</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" style="display: flex;justify-content: center;">
					<div style="font-size: 14px;color: #606266;">
						共&nbsp;&nbsp;{{totalNumber | totalPage}}&nbsp;&nbsp;页</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		getLabel,
		deleLabel
	} from '@/network/api/index.js'
	export default {
		name: 'labelF',
		props: {
			lastPage: {
				type: Object,
				default(){
					return {}
				}
			}
		},
		watch: {
			lastPage(v) {
				console.log(v)
				const _this = this
				let {lastPage,totalNumber} = v
				_this.totalNumber = totalNumber
				_this.$set(_this.pageSizes, 'page', lastPage)
			},
			pageChange(v, o) {
				// console.log(v)
				this.$emit('pageChange', this.pageSizes.page)
			}
		},
		data() {
			return {
				//总数据条数
				totalNumber: 0,
				pageSizes: {
					page: 1,
					size: 10
				},
			}
		},
		created() {
			const _this = this
			_this.getAllNumber()
		},
		methods: {
			/**
			 * 获取标签所有条数
			 */
			getAllNumber() {
				const _this = this
				return new Promise((resolve,reject)=>{
					getLabel({}, res => {
						// console.log(res)
						if (res.code == 200) {
							_this.totalNumber = res.data.length
						}
					}, err => {
						console.log(err)
					})
				})
			},
			/**
			 * 标签管理当前页数改变的时候
			 */
			changePage(page) {
				const _this = this
				_this.$set(_this.pageSizes, 'page', page)
			},
		},
		computed: {
			pageChange() {
				return this.pageSizes.page
			}
		},
		filters: {
			totalPage(item) {
				return Math.ceil(item / 10)
			},
		}
	}
</script>

<style lang="scss" scoped>
	#labelF {
		margin-top: 30px;
		margin-bottom: 50px;
	}
</style>
