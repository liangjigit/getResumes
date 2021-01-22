<template>
	<div id="labelM">
		<div class="label-content">
			<el-table ref="multipleTable" stripe :data="tableData" tooltip-effect="dark" style="width: 100%" @select="deleteChoice">
				<el-table-column type="selection" width="110">
				</el-table-column>
				<el-table-column type="index" :index="indexMethods" label="序号" width="240">
				</el-table-column>
				<el-table-column prop="lableName" label="标签名称" width="240">
				</el-table-column>
				<el-table-column label="操作" width="240">
					<template slot-scope="scope">
						<el-button @click.native.prevent="deleLabel(scope.$index, tableData)" type="text" size="small">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="display: flex;justify-content: left;margin-top: 20px;cursor: pointer;margin-left: 48px;">
				<el-checkbox style="line-height: 40px;margin-right: 20px;" v-model="allSele" @change="toggleSelection">全选</el-checkbox>
				<el-button @click="deleAll" style="cursor: pointer;">删除</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		getLabel,
		deleLabel
	} from '@/network/api/index.js'
	export default {
		name: 'labelM',
		props: {
			//初始1页10条
			pageSizes: {
				type: Object,
				default () {
					return {
						page: 1,
						size: 10
					}
				}
			},
		},
		watch: {
			currentPage(v, o) {
				// console.log(v)
				this.allSele = false
				this.seleId = ''
				this.showLabel({
					page: v,
					size: 10
				})
			}
		},
		data() {
			return {
				// 保存当前页的数据数组
				tableData: [],
				//当前页条数
				currentLength: 0,
				//是否全选
				allSele: false,
				//选择要删除的标签ID字符串
				seleId: ''
			}
		},
		created() {
			const _this = this
			//初始展示数据page1 size10
			_this.showLabel(_this.pageSizes)
		},
		computed: {
			currentPage() {
				return this.pageSizes.page
			}
		},
		methods: {
			/**
			 * 获取标签
			 */
			showLabel(pageSizes = {}) {
				return new Promise((resolve, reject) => {
					getLabel(pageSizes, res => {
						// console.log(res)
						if (res.code == 200) {
							this.tableData = res.data
							this.currentLength = res.data.length
							resolve()
						}
					}, err => {
						console.log(err)
						reject()
					})
				})
			},
			/**
			 * 处理标签序号
			 */
			indexMethods(index) {
				// console.log(index)
				return (this.pageSizes.page - 1) * 10 + index + 1;
			},
			/**
			 * 删除标签,获取要删除的Id字符串
			 */
			deleteChoice(selection, row) {
				// console.log(selection, row)
				const selectArr = []
				for (let item of selection) {
					selectArr.push(item.id)
				}
				if (selectArr.length == this.currentLength) {
					this.allSele = true
				} else {
					this.allSele = false
				}
				this.seleId = selectArr.toString()
			},
			/**
			 * 标签管理页全选获取Id字符串
			 */
			toggleSelection() {
				if (this.allSele) {
					this.$refs.multipleTable.toggleAllSelection();
					const allId = []
					this.tableData.forEach(item => {
						allId.push(item.id)
					})
					this.seleId = allId.toString()
				} else {
					this.$refs.multipleTable.clearSelection();
					this.seleId = ''
				}
			},
			/**
			 * 删除当前单独标签
			 */
			deleLabel(index, table) {
				// console.log(table[index].id)
				const _this = this
				let deleteId = table[index].id
				_this.$confirm('此操作将永久删除标签, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					//先获取当前页的数据条数，如果只有1条单独判断
					getLabel(_this.pageSizes, res => {
						// console.log(res)
						if (res.code == 200) {
							//console.log(res.data.data.length)
							if (res.data.length == 1) {
								_this.deleSingle(deleteId, 0)
							} else {
								_this.deleSingle(deleteId, 1)
							}
						}
					}, err => {
						console.log(err)
					})
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			},
			/**
			 * 单独删除方法
			 */
			deleSingle(idString, page) {
				const _this = this
				deleLabel({
					lableIds: idString
				}, res => {
					// console.log(res)
					if (res.code == 200) {
						_this.$message({
							type: 'success',
							message: '删除成功!'
						})
						if (page) {
							_this.showLabel({
								page: _this.pageSizes.page,
								size: 10
							})
						} else {
							_this.showLabel({
								page: (_this.pageSizes.page - 1),
								size: 10
							}).then(() => {
								_this.$bus.$emit('finishDele')
							})
						}
					}
				}, err => {
					console.log(err)
				})
			},
			/**
			 * 所有删除摁扭
			 */
			deleAll() {
				const _this = this
				// 当前页面全选删除
				if (_this.allSele) {
					_this.$confirm('此操作将永久删除当前所有标签, 是否继续?', '提示', {
						confirmButtonText: '确定',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						_this.deleSingle(_this.seleId, 0)
					}).catch(() => {
						_this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					if (_this.seleId == '') {
						_this.$alert('请选择您要删除的标签', '', {
							confirmButtonText: '确定'
						})
					} else {
						// console.log(_this.currentPage)
						_this.$confirm('此操作将永久删除您选中的标签, 是否继续?', '提示', {
							confirmButtonText: '确定',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							getLabel(_this.pageSizes, res => {
								// console.log(res)
								if (res.code == 200) {
									_this.deleSingle(_this.seleId, 1)
								}
							}, err => {
								console.log(err)
							})
						}).catch(() => {
							_this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					}
				}
			},
		},
	}
</script>

<style lang="scss" scoped>
	#labelM {
		display: flex;
		justify-content: center;

		.label-content {
			width: fit-content;
		}
	}
</style>
