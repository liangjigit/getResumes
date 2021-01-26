<template>
	<div id="resumeM">
		<div class="content">
			<el-table ref="multipleTableResume" stripe :data="allResume" tooltip-effect="dark" style="width: 100%;" @select="deleteThisResume"
			 :indeterminate="true" v-model="selectIndex">
				<el-table-column type="selection" width="50">
				</el-table-column>
				<el-table-column type="index" label="序号" :index="indexMethod" width="50">
				</el-table-column>
				<el-table-column prop="name" label="姓名" width="60">
				</el-table-column>
				<!-- <el-table-column prop="createDate" label="时间" width="60">
		        </el-table-column> -->
				<el-table-column label="时间" width="60">
					<template slot-scope="scope">
						<div>
							{{scope.row.createDate | filterTime}}
						</div>
					</template>
				</el-table-column>
				<el-table-column prop="gender" label="性别" width="50">
				</el-table-column>
				<el-table-column prop="code" label="工号" width="80">
				</el-table-column>
				<el-table-column prop="phone" label="手机号码" width="100">
				</el-table-column>
				<el-table-column prop="email" label="邮箱" width="160">
				</el-table-column>
				<el-table-column prop="education" label="学历" width="80">
				</el-table-column>
				<el-table-column prop="intention" label="竞聘岗位" width="100">
				</el-table-column>
				<el-table-column label="技能标签" width="200">
					<template slot-scope="scope">
						{{scope.row.lableid}}
					</template>
				</el-table-column>
				<el-table-column label="操作" width="100">
					<template slot-scope="scope">
						<el-button @click.native.prevent="downloadResume(scope.$index, allResume)" type="text" size="small">
							下载
						</el-button>
						<el-button @click.native.prevent="deleteResume(scope.$index, allResume)" type="text" size="small">
							删除
						</el-button>
					</template>
				</el-table-column>
				<el-table-column label="备注" width="50">
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
		deleResume
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
				deleI: 0
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
					_this.allResume = data
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
					confirmButtonText: '确定',
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
						confirmButtonText: '确定',
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
							confirmButtonText: '确定',
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
			 * 下载个人简历
			 */
			//下载个人简历 获取个人简历的id
			async downloadResume(i, arr) {
				//console.log(i, arr, arr[i].id)
				const _this = this
				_this.deleteResumeId = arr[i].id
				await _this.getSoleResume()
				await _this.getCanvas()
			},
			//获取指定单人的简历信息
			async getSoleResume() {
				const _this = this
				await resumeDownload({
					resumeId: _this.deleteResumeId
				}).then(function(res) {
					// console.log(res)
					// console.log(JSON.parse(res.data.data))
					if (res.code == 200) {
						_this.soleData = JSON.parse(res.data.data)[0]
						// console.log(_this.soleData)
						if (_this.soleData.lableid) {
							let lableLength = _this.soleData.lableid.split(',').length
							//console.log(_this.soleData.lableid.split(','))
							//console.log(_this.soleData.lableid.split(',').splice(0, lableLength - 1))
							_this.downloadLableId = _this.soleData.lableid.split(',').splice(0, lableLength - 1)
						}
						_this.soleData.gender == 0 ? _this.soleData.gender = '女' : _this.soleData.gender = '男'
						// _this.soleData.experience = _this.soleData.experience.replace(/↵/g, "/n");
						_this.soleData.skill =
							"<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" +
							_this.soleData.skill + '</pre>'
						_this.soleData.experience =
							"<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" +
							_this.soleData.experience + '</pre>'
						// console.log(_this.soleData)
					}
				})
			},
			//获取当前简历的canvas
			getCanvas() {
				const _this = this
				//console.log(_this.soleData)
				// let test = $(".test").get(0);
				//用原生方法解决
				let test = document.getElementById('test')
				// console.log(test)
				html2canvas(test, {
					allowTaint: true,
					logging: false,
					width: 595,
					height: 842
				}).then(function(canvas) {
					_this.downLoad(_this.saveAsPNG(canvas));
				})
			},
			//转为png
			saveAsPNG(canvas) {
				return canvas.toDataURL("image/png");
			},
			//自动下载到本地
			downLoad(url) {
				const _this = this
				var oA = document.createElement("a");
				oA.download = _this.soleData.name; // 设置下载的文件名，默认是'下载'
				oA.href = url;
				document.body.appendChild(oA);
				oA.click();
				oA.remove(); // 下载之后把创建的元素删除
			},

			/**
			 * 添加备注
			 */
			//添加备注 a==0 未添加过备注 a!=0
			addRemarks(a, arr) {
				const _this = this
				_this.postRemarksId = arr.id
				if (a == 0) {
					_this.needAddRemarks = true
					_this.remarksText = ''
				} else {
					showRemarks({
						resumeId: arr.id
					}).then(function(res) {
						// console.log(res)
						if (res.code == 200) {
							_this.remarksArr = res.data
						}
					})
					_this.needSeeRemarks = true
				}
			},


			//简历管理页面，批量下载简历
			downloadMoreResume() {
				const _this = this
				// console.log(_this.resumeSelectId.length)
				if (_this.resumeSelectId.length == 0) {
					_this.$alert('请选择您要下载的简历', '', {
						confirmButtonText: '确定'
					})
				} else {
					_this.$loading({
						lock: true,
						text: '努力下载打包中，请耐心等待',
						spinner: 'el-icon-loading',
						background: 'rgba(0, 0, 0, 0.7)'
					})
					//将选择的用户id拼接成为字符串
					_this.sendFive = _this.resumeSelectId
					_this.sendFiveString = _this.sendFive.join(',')
					_this.getFiveBase()
				}
			},
		},
		filters: {
			filterTime(item) {
				// item.createDate = item.createDate.substr(5, 5) + '  ' + item.createDate.substr(11, 5)
				return item.substr(5, 5) + '  ' + item.substr(11, 5)
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
