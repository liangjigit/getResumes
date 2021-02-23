<template>
	<div id="resumeM">
		<div class="content" style="width: 100%;">
			<el-table ref="multipleTableResume" stripe :data="allResume" tooltip-effect="dark" style="width: 100%;" @select="deleteThisResume"
			 :indeterminate="true" v-model="selectIndex">
				<el-table-column type="selection" min-width="50">
				</el-table-column>
				<el-table-column type="index" label="序号" :index="indexMethod" min-width="50">
				</el-table-column>
				<el-table-column prop="name" label="姓名" min-width="60">
				</el-table-column>
				<!-- <el-table-column prop="createDate" label="时间" width="60">
		        </el-table-column> -->
				<el-table-column label="发布时间" min-width="60">
					<template slot-scope="scope">
						<div>
							{{scope.row.createDate | filterTime}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="gender" label="性别" min-width="50">
				</el-table-column>
				<el-table-column prop="code" label="工号" min-width="80">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码" min-width="100">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" min-width="160">
				</el-table-column>
				<el-table-column prop="education" label="学历" min-width="80">
				</el-table-column>
				<el-table-column prop="intention" label="竞聘岗位" min-width="100">
				</el-table-column>
				<el-table-column label="技能标签" min-width="200">
					<template slot-scope="scope">
						{{scope.row.lableid}}
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="100">
					<template slot-scope="scope">
						<el-button @click.native.prevent="downloadResume(scope.$index, allResume,'see')" type="text" size="small">
							查看
						</el-button>
						<el-button @click.native.prevent="downloadResume(scope.$index, allResume,'download')" type="text" size="small">
							下载
						</el-button>
						<el-button @click.native.prevent="deleteResume(scope.$index, allResume)" type="text" size="small">
							删除
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="备注" min-width="50">
					<template slot-scope="scope">
						<el-button type="text" @click="addRemarks(scope.row.isRemarks,scope.row)">
							{{scope.row.isRemarks == 0 ? '添加' : '查看'}}
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div style="display: flex;justify-content: left;margin-top: 20px;line-height: 40px;margin-left: 18px;">
				<el-checkbox style="line-height: 40px;margin-right: 20px;" v-model="checked" @change="toggleSelection()">全选</el-checkbox>
				<el-button @click="deleteChoiceResume">删除</el-button>
				<el-button @click="downloadMoreResume">下载</el-button>
			</div>
		</div>
	</div>
</template>

<script>
	import {
		deleResume,
		showRemark,
		resumeDownload
	} from '@/network/api/index.js'
	export default {
		name: 'resumeM',
		data() {
			return {
				// 当前简历数组
				allResume: [],
				// 当前页码
				currentPage: 1,
				//全选时为true
				checked: false,
				//选择的简历id
				resumeSelectId: [],
				//请求页码
				resumePageSize: {
					page: 1,
					size: 10
				},
				selectIndex: true,
				checked: false,
				//全局批量删除的索引
				deleI: 0,
				//保存备注的id
				postRemarksId: '',
				//要展示的标签名
				labelName: [],
			}
		},
		created() {
			const _this = this
		},
		mounted() {
			const _this = this
			_this.getFilterList()
			_this.getCurrentPage()
		},
		methods: {
			/**
			 * 筛选数据变化后传递过来重新渲染数据
			 */
			getFilterList() {
				const _this = this
				_this.$bus.$on('filterList', (data) => {
					// console.log(data)
					data.forEach(item => {
						// console.log(item.lableid)
						if (item.lableid != null) {
							item.lableid = item.lableid.substr(0, (item.lableid.length - 1))
						}
					})
					_this.allResume = data
					// console.log(data)
				})
			},
			/**
			 * 获取传递过来的当前page
			 */
			getCurrentPage() {
				const _this = this
				_this.$bus.$on('currentPage', (page) => {
					_this.currentPage = page
					_this.checked = false
				})
			},
			/**
			 * 选择的简历id
			 */
			deleteThisResume(selection, row) {
				// console.log(selection, row)
				// console.log(this.allResume.length)
				if (selection.length == this.allResume.length) {
					this.checked = true
				} else {
					this.checked = false
				}
				let selectArr = []
				for (let item of selection) {
					selectArr.push(item.id)
				}
				this.resumeSelectId = selectArr
				// console.log(this.resumeSelectId)
			},
			/**
			 * 全选简历
			 */
			toggleSelection() {
				if (this.checked) {
					this.resumeSelectId = []
					for (let item of this.allResume) {
						this.resumeSelectId.push(item.id)
					}
					this.$refs.multipleTableResume.toggleAllSelection();
					// console.log(this.resumeSelectId)
				} else {
					this.resumeSelectId = []
					this.$refs.multipleTableResume.clearSelection();
					// console.log(this.resumeSelectId)
				}
			},
			/**
			 * 处理序号问题
			 */
			indexMethod(index) {
				return (this.currentPage - 1) * 10 + index + 1
			},
			/**
			 * 删除个人简历
			 */
			deleteResume(index, table) {
				// console.log(table[index].id)
				let deleteId = table[index].id
				const _this = this
				_this.$confirm('此操作将永久删除个人简历, 是否继续?', '提示', {
					confirmButtonText: '确定删除',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					deleResume({
						resumeId: deleteId
					}, res => {
						console.log(res)
						if (res.code == 200) {
							_this.$message({
								type: 'success',
								message: '删除成功!'
							});
							_this.$bus.$emit('deleFinish', _this.currentPage)
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
			 * 批量删除简历
			 */
			deleteChoiceResume() {
				const _this = this
				//console.log(this.resumeSelectId)
				//全选情况下
				if (_this.checked) {
					_this.$confirm('此操作将永久删除当前所有简历, 是否继续?', '提示', {
						confirmButtonText: '确定删除',
						cancelButtonText: '取消',
						type: 'warning'
					}).then(() => {
						_this.deleMoreResume(_this.deleI)
					}).catch(() => {
						_this.$message({
							type: 'info',
							message: '已取消删除'
						});
					});
				} else {
					if (_this.resumeSelectId.length == 0) {
						_this.$alert('请选择您要删除的简历', '', {
							confirmButtonText: '确定'
						});
					} else {
						_this.$confirm('此操作将永久删除您选中的简历, 是否继续?', '提示', {
							confirmButtonText: '确定删除',
							cancelButtonText: '取消',
							type: 'warning'
						}).then(() => {
							_this.deleMoreResume(_this.deleI)
						}).catch(() => {
							_this.$message({
								type: 'info',
								message: '已取消删除'
							});
						});
					}
				}
			},
			/**
			 * 批量删除的方法
			 */
			deleMoreResume(deleI) {
				const _this = this
				// console.log(_this.resumeSelectId)
				deleResume({
					resumeId: _this.resumeSelectId[deleI]
				}, res => {
					console.log(res)
					if (res.code == 200) {
						if (deleI == _this.resumeSelectId.length - 1) {
							// console.log('到最后了')
							_this.$message({
								type: 'success',
								message: '删除成功!'
							});
							window.setTimeout(() => {
								window.location.reload();
							}, 1000)
						} else {
							_this.deleI++
							_this.deleMoreResume(_this.deleI)
						}
					}
				}, err => {
					console.log(err)
				})
			},
			/**
			 * 添加备注 a==0 未添加过备注 a!=0
			 */
			addRemarks(a, arr) {
				const _this = this
				// console.log(a,arr)
				_this.postRemarksId = arr.id
				if (a == 0) {
					_this.$bus.$emit('delRemark', a, arr.id)
				} else {
					showRemark({
						resumeId: arr.id
					}, res => {
						console.log(res)
						_this.$bus.$emit('delRemark', res.data, arr.id)
					}, err => {
						console.log(err)
					})
				}
			},
			/**
			 * 下载个人简历,获取id
			 */
			downloadResume(i, arr, type) {
				//console.log(i, arr, arr[i].id)
				let downloadId = arr[i].id
				this.getSoleResume(downloadId, type)
			},
			//获取指定单人的简历信息
			getSoleResume(resumeId, type) {
				const _this = this
				resumeDownload({
					resumeId
				}, res => {
					console.log(res)
					if (res.code == 200) {
						const soleData = JSON.parse(res.data.data)[0]
						if (soleData.lableid) {
							_this.labelName = soleData.lableid.split(',')
							_this.labelName.pop()
						}
						soleData.gender == 0 ? soleData.gender = '女' : soleData.gender = '男'
						// _this.soleData.experience = _this.soleData.experience.replace(/↵/g, "/n");
						soleData.skill =
							"<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" +
							soleData.skill + '</pre>'
						soleData.experience =
							"<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" +
							soleData.experience + '</pre>'
						// console.log(soleData)
						_this.$bus.$emit('resumeShow', soleData, _this.labelName, type)
					}
				}, err => {
					console.log(err)
				})
			},
			/**
			 * 简历批量下载
			 */
			downloadMoreResume() {
				const _this = this
				// console.log(_this.resumeSelectId.length)
				if (_this.resumeSelectId.length == 0) {
					_this.$alert('请选择您要下载的简历', '', {
						confirmButtonText: '确定'
					})
				} else {
					//将选择的用户id拼接成为字符串
					let idString = _this.resumeSelectId.join(',')
					_this.getMoreResume(idString)
				}
			},
			/**
			 * 获取批量下载所有人的数据
			 */
			getMoreResume(resumeId) {
				const _this = this
				resumeDownload({
					resumeId
				}, res => {
					// console.log(res)
					if (res.code == 200) {
						const moreData = JSON.parse(res.data.data)
						for (let item of moreData) {
							item.gender == 0 ? item.gender = '女' : item.gender = '男',
								item.skill =
								"<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" +
								item.skill + '</pre>'
							item.experience =
								"<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" +
								item.experience + '</pre>'
						}
						_this.$bus.$emit('moreResumeDownload', moreData)
					}
				}, err => {
					console.log(err)
				})
			},
		},
		filters: {
			filterTime(item) {
				// console.log(item)
				// item.createDate = item.createDate.substr(5, 5) + '  ' + item.createDate.substr(11, 5)
				return item.substr(0, 10) + '  ' + item.substr(11, 8)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#resumeM {
		display: flex;
		justify-content: center;

		.content {
			width: fit-content;
		}
	}
</style>
