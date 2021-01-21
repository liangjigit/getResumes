<template>
	<div id="labelM">
		<template>
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
		</template>
	</div>
</template>

<script>
	import {
		getLabel,
		deleLabel
	} from '@/network/api/index.js'
	export default {
		name: 'labelM',
		data() {
			return {
				// 保存当前页的数据数组
				tableData: [],
				//当前页条数
				currentLength:0,
				//初始1页10条
				pageSizes: {
					page: 2,
					size: 10
				},
				//是否全选
				allSele: false,
				//选择要删除的标签ID字符串
				seleId:''
			}
		},
		created() {
			const _this = this
			_this.showLabel(_this.pageSizes)
		},
		methods: {
			/**
			 * 获取标签
			 */
			showLabel(pageSizes) {
				getLabel(pageSizes, res => {
					console.log(res)
					if (res.code == 200) {
						this.tableData = res.data
						this.currentLength = res.data.length
					}
				}, err => {
					console.log(err)
				})
			},
			/**
			 * 处理标签序号
			 */
			indexMethods(index) {
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
			 * 删除当前标签
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
						console.log(res)
						if (res.code == 200) {
							//console.log(res.data.data.length)
							if (res.data.length == 1) {
								deleLabel({
									lableIds: deleteId
								}, res => {
									console.log(res)
									if (res.code == 200) {
										_this.$message({
											type: 'success',
											message: '删除成功!'
										})
										// _this.changeCurrent(_this.currentPage - 1)
									}
								}, err => {
									console.log(err)
								})
							} else {
								deleLabel({
									lableIds: deleteId
								}, res => {
									console.log(res)
									if (res.code == 200) {
										_this.$message({
											type: 'success',
											message: '删除成功!'
										})
										// _this.changeCurrent(_this.currentPage)
									}
								}, err => {
									console.log(err)
								})
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
			 * 标签管理页全选
			 */
			toggleSelection() {
				if (this.allSele) {
					this.$refs.multipleTable.toggleAllSelection();
				} else {
					this.$refs.multipleTable.clearSelection();
					this.seleId = ''
				}
			},
			/**
			 * 所有删除摁扭
			 */
			deleAll() {
			    const _this = this
			    console.log(this.seleId)
			    //当前页面全选删除
			    // if (_this.checkedLable) {
			    //     this.$confirm('此操作将永久删除当前所有标签, 是否继续?', '提示', {
			    //         confirmButtonText: '确定',
			    //         cancelButtonText: '取消',
			    //         type: 'warning'
			    //     }).then(() => {
			    //         // console.log(this.selectId)
			    //         deleteLable({
			    //             lableIds: this.selectId
			    //         }).then(function (res) {
			    //             //console.log(res)
			    //             if (res.code == 200) {
			    //                 _this.$message({
			    //                     type: 'success',
			    //                     message: '删除成功!'
			    //                 })
			    //             }
			    //             _this.changeCurrent(1)
			    //         })
			    //     }).catch(() => {
			    //         this.$message({
			    //             type: 'info',
			    //             message: '已取消删除'
			    //         });
			    //     });
			    // } else {
			    //     if (this.selectId == '') {
			    //         this.$alert('请选择您要删除的标签', '', {
			    //             confirmButtonText: '确定'
			    //         })
			    //     } else {
			    //         // console.log(_this.currentPage)
			    //         this.$confirm('此操作将永久删除您选中的标签, 是否继续?', '提示', {
			    //             confirmButtonText: '确定',
			    //             cancelButtonText: '取消',
			    //             type: 'warning'
			    //         }).then(() => {
			    //             deleteLable({
			    //                 lableIds: _this.selectId
			    //             }).then(function (res) {
			    //                 // console.log(res)
			    //                 if (res.code == 200) {
			    //                     _this.$message({
			    //                         type: 'success',
			    //                         message: '删除成功!'
			    //                     })
			    //                     getLables().then(function (res) {
			    //                         if (res.code == 200) {
			    //                             _this.allLableMember = res.data.length
			    //                         }
			    //                     })
			    //                     _this.changeCurrent(_this.currentPage)
			    //                 }
			    //             })
			    //         }).catch(() => {
			    //             this.$message({
			    //                 type: 'info',
			    //                 message: '已取消删除'
			    //             });
			    //         });
			    //     }
			    // }
			},
		},
	}
</script>

<style>
</style>
