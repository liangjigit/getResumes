<template>
	<div id="resumeF">
		<div class="block " style="position: relative;line-height: 30px;">
			<el-row>
				<el-col :span="24" style="display: flex;justify-content: center;">
					<el-pagination layout="total,prev, pager, next, jumper" :total="resumeMember" :page-size="10" @prev-click="changeResumePage"
					 @next-click="changeResumePage" @current-change="changeResumePage" :current-page.sync="currentPage">
					</el-pagination>
					<el-button style="line-height: 5px;margin-left: 15px;" type="primary">确定
					</el-button>
				</el-col>
			</el-row>
			<el-row>
				<el-col :span="24" style="display: flex;justify-content: center;">
					<div style="font-size: 14px;color: #606266;">
						共&nbsp;&nbsp;{{resumeMember | totalPage}}&nbsp;&nbsp;页</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		getResume
	} from '@/network/api/index.js'
	export default {
		name: 'resumeF',
		data() {
			return {
				//默认状态与筛选状态参数
				searchCan: {
					page: '1',
					size: '10',
					post: '',
					gender: '',
					lable: '',
					intention: ''
				},
				//记录当前搜索参数
				searchInput: {
					page: '1',
					size: '10',
					phone: ''
				},
				//当前页数据总条数
				resumeMember: 0,
				//记录当前数据所处的查询状态
				status: 'filter',
				//记录当前页数
				currentPage: 1,
			}
		},
		watch: {
			searchCan: {
				handler(v) {
					const _this = this
					// console.log('我刷新了状态')
					_this.getResume(_this.searchCan)
				},
				deep: true
			},
			searchInput: {
				handler(v) {
					const _this = this
					// console.log('我是搜索框的')
					_this.getResume(_this.searchInput)
				},
				deep: true
			}
		},
		created() {
			const _this = this
			_this.getResume(_this.searchCan)
		},
		mounted() {
			const _this = this
			_this.getSearchCan()
			_this.getInputCan()
			_this.deleResumeFinish()
		},
		methods: {
			/**
			 * 获取最新筛选参数
			 */
			getSearchCan() {
				const _this = this
				_this.$bus.$on('delSearchCan', (obj) => {
					_this.searchCan = JSON.parse(obj)
					_this.status = 'filter'
					_this.currentPage = 1
					_this.$bus.$emit('currentPage', 1)
				})
			},
			/**
			 * 获取最新搜索参数
			 */
			getInputCan() {
				const _this = this
				_this.$bus.$on('delInputCan', (obj) => {
					_this.searchInput = JSON.parse(obj)
					_this.status = 'search'
					_this.currentPage = 1
					_this.$bus.$emit('currentPage', 1)
				})
			},
			/**
			 * 筛选和默认简历信息
			 */
			getResume(param) {
				const _this = this
				getResume(param, res => {
					console.log(res)
					if (res.code == 200) {
						_this.resumeMember = parseInt(res.msg)
						const resumeData = res.data
						resumeData.map(function(item) {
							item.gender == 0 ? item.gender = '女' : item.gender = '男'
						})
						_this.$bus.$emit('filterList', resumeData)
					}
				}, err => {
					console.log(err)
				})
			},
			/**
			 * 删除简历成功后调用
			 */
			deleResumeFinish() {
				const _this = this
				_this.$bus.$on('deleFinish', page => {
					_this.changeResumePage(page)
				})
			},
			/**
			 * 切换页数时调用
			 */
			changeResumePage(page) {
				// console.log(page)
				const _this = this
				if (_this.status == 'filter') {
					if (_this.searchCan.page == page) {
						_this.getResume(_this.searchCan)
					} else {
						_this.searchCan.page = page
					}
				} else {
					if (_this.searchInput.page == page) {
						_this.getResume(_this.searchInput)
					} else {
						_this.searchInput.page = page
					}
				}
				_this.$bus.$emit('currentPage', page)
			},
		},
		filters: {
			totalPage(item) {
				return Math.ceil(item / 10)
			},
		}
	}
</script>

<style>
</style>
