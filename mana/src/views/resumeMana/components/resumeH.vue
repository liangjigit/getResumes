<template>
	<div id="resumeH">
		<div class="resume-management">
			<el-row :gutter="20" style="line-height: 45px;border-top: 1px solid #edecec;margin: 0;font-size: 'Arial Normal', 'Arial';">
				<el-col :span="2">
					<div class="grid-content bg-purple" style="float: right;">学历</div>
				</el-col>
				<el-col :span="16">
					<ul id="edu" style="display: flex;flex-wrap: wrap;margin: 0;padding: 0;cursor: pointer;">
						<li ref="edu" v-for="(item,index) in education" :class="{'change':index == clickEindex}" style="list-style:none;margin-right:30px;"
						 @click="getEducation($event,index)">
							{{item}}
						</li>
					</ul>
				</el-col>
				<el-col :span="6">
					<el-input v-model="searchInput.phone" placeholder="请输入手机号/姓名/工号" style="width: 80%;" @keyup.enter.native="searchPnc"></el-input>
					<span @click="searchPnc" style="cursor: pointer;">搜索</span>
				</el-col>
			</el-row>
			<el-row :gutter="20" style="line-height: 45px;border-top: 1px solid #edecec;margin: 0;font-size: 'Arial Normal', 'Arial';">
				<el-col :span="2">
					<div class="grid-content bg-purple" style="float: right;">性别</div>
				</el-col>
				<el-col :span="22">
					<ul id="sex" style="display: flex;flex-wrap: wrap;margin: 0;padding: 0;">
						<li v-for="(item,index) in sex" :class="{'change':index == clickSindex}" style=" list-style: none;margin-right: 30px;cursor: pointer; "
						 @click="getSex(index)">
							{{item}}
						</li>
					</ul>
				</el-col>
			</el-row>
			<el-row :gutter="20 " style="line-height: 45px;border-top: 1px solid #edecec;margin: 0;font-size: 'Arial Normal', 'Arial';">
				<el-col :span="2">
					<div class="grid-content bg-purple" style="float: right;">技能标签</div>
				</el-col>
				<el-col :span="22">
					<ul id="lable" style="display: flex;flex-wrap: wrap;margin: 0;padding: 0;cursor: pointer; ">
						<li v-for="(item,index) in allLabel " :class="{'change':index==clickLindex}" @click="getLabel($event,item,index)"
						 style="list-style:none;margin-right:30px;">
							{{item.lableName}}
						</li>
					</ul>
				</el-col>
			</el-row>
			<el-row :gutter="20 " style="line-height: 45px;border-top: 1px solid #edecec;margin: 0;font-size: 'Arial Normal', 'Arial';">
				<el-col :span="2">
					<div class="grid-content bg-purple" style="float: right;">竞聘岗位</div>
				</el-col>
				<el-col :span="22">
					<div style="display: flex;position: relative;top: 8px;">
						<input type="text" v-model="searchCan.intention" style="width: 250px;height: 25px;">
					</div>
				</el-col>
			</el-row>
			<el-row :gutter="20" style="line-height: 45px;border-top: 1px solid #edecec;margin: 0;font-size: 'Arial Normal', 'Arial';border-bottom: 2px solid #656565;padding-bottom: 7px;">
				<el-col :span="2">
					<div class="grid-content bg-purple" style="float: right;">发布时间</div>
				</el-col>
				<el-col :span="22">
					<ul style="display: flex;flex-wrap: wrap;margin: 0;padding: 0;">
						<li style="list-style: none;margin-right: 30px;">
							<div class="block">
								<el-date-picker @change="getSeTimeStart" v-model="timeValueStart" value-format="yyyy/MM/dd" align="left" type="date"
								 placeholder="开始日期" :picker-options="pickerOptions">
								</el-date-picker>
								<el-date-picker @change="getSeTimeEnd" v-model="timeValueEnd" value-format="yyyy/MM/dd" type="date" placeholder="至今">
								</el-date-picker>
							</div>
						</li>
						<li style="list-style: none;margin-left:300px;">
							<el-button type="primary" @click="filterInfo">筛选</el-button>
							<el-button type="info" @click="emptyInfo">清空选择</el-button>
						</li>
					</ul>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		getLabel
	} from '@/network/api/index.js'
	export default {
		name: 'resumeH',
		data() {
			return {
				//学历初始数据
				education: ['全部', '博士', '硕士', '本科', '专科', '高中', '中专/中技', '初中及以下'],
				//性别初始数据
				sex: ['全部', '男', '女'],
				//标签初始数据
				allLabel: [],
				//点击学历的index
				clickEindex: '0',
				//点击性别的index
				clickSindex: '0',
				//点击标签的index
				clickLindex: '0',
				//保存学历的数组
				educationArr: [],
				//保存选取的标签数组
				labelArr: [],
				// 保存选择的日期
				timeValueStart: '',
				timeValueEnd: '',
				//时间选择器
				pickerOptions: {
					disabledDate(time) {
						return time.getTime() > Date.now();
					},
					shortcuts: [{
						text: '一周内',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
							picker.$emit('pick', date);
						}
					}, {
						text: '一个月内',
						onClick(picker) {
							const date = new Date();
							date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
							picker.$emit('pick', date);
						}
					}]
				},
				//筛选查询条件的参数
				searchCan: {
					page: '1',
					size: '10',
					post: '',
					gender: '',
					lable: '',
					intention: ''
				},
				//模糊查询
				searchInput: {
					page: '1',
					size: '10',
					phone: ''
				},
			}
		},
		created() {
			const _this = this
			_this.getAllLabel()
		},
		methods: {
			/**
			 * 获取到查询的学历数组
			 */
			getEducation(e, i) {
				// console.log(e, i)
				let lis = document.querySelector('#edu').children
				if (i == 0) {
					for (let j = 0; j < lis.length; j++) {
						if (j == 0) {
							lis[j].style.color = '#37c2b9'
						} else {
							lis[j].style.color = 'black'
						}
					}
					this.clickEindex = '0'
					//清空保存学历的数组
					this.educationArr = []
					// console.log(this.educationArr)
				} else {
					//先把全部变成黑色
					lis[0].style.color = 'black'
					//将初始控制颜色的clickEindex停止使用
					this.clickEindex = '-1'
					let click_item = this.education[i]
					//判断为0可以直接变色，如果不为0则需要判断变黑色
					if (this.educationArr.length == 0) {
						//变掉当前颜色
						e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
						//将点击的名称保存到数组
						this.educationArr.push(click_item)
						// console.log(this.educationArr)
					} else {
						//循环当前已经选中的学历
						for (let i in this.educationArr) {
							if (this.educationArr[i] == click_item) {
								//如果相等说明当前已经点击变色了，需要点击变黑色并在数组中删除
								e.srcElement.style = 'list-style:none;margin-right:30px'
								this.educationArr.splice(i, 1)
								if (this.educationArr.length == 0) {
									lis[0].style.color = '#37c2b9'
									this.educationArr = []
								}
								// console.log(this.educationArr)
							} else {
								// 如果不相等说明未添加
								e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
								//解决for循环带来的数据重复问题
								this.educationArr = this.educationArr.filter(function(item) {
									return item != click_item
								})
								this.educationArr.push(click_item)
								// console.log(this.educationArr)
							}
						}
					}
				}
				this.searchCan.post = this.educationArr.join(',')
				console.log(this.searchCan.post)
			},
			/**
			 * 获取查询的性别
			 */
			getSex(i) {
				this.clickSindex = i
				if (i == 0) {
					this.searchCan.gender = ''
				} else {
					if (i == 1) {
						this.searchCan.gender = '1'
					} else {
						this.searchCan.gender = '0'
					}
				}
				console.log(this.searchCan.gender)
			},
			/**
			 * 获取查询的标签
			 */
			getLabel(e, item, i) {
				// console.log(item, i)
				if (i == 0) {
					this.clickLindex = '0'
					this.labelArr = []
					this.getAllLabel()
				} else {
					this.clickLindex = '-1'
					let click_item = item.id
					if (this.labelArr.length == 0) {
						e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
						this.labelArr.push(click_item)
					} else {
						for (let i in this.labelArr) {
							if (this.labelArr[i] == click_item) {
								e.srcElement.style = 'list-style:none;margin-right:30px'
								this.labelArr.splice(i, 1)
								if (this.labelArr.length == 0) {
									this.clickLindex = '0'
									this.labelArr = []
								}
							} else {
								e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
								this.labelArr = this.labelArr.filter(function(item) {
									return item != click_item
								})
								this.labelArr.push(click_item)
							}
						}
					}
				}
				this.searchCan.lable = this.labelArr.join(',')
				console.log(this.searchCan.lable)
			},
			/**
			 * 获取开始的时间
			 */
			getSeTimeStart(data) {
				// console.log(data)
				this.searchCan.start = data
				console.log(this.searchCan.start)
				this.getSeTimeEnd()
			},
			/**
			 * 获取结束的时间
			 */
			getSeTimeEnd(data) {
				// console.log(data)
				if (data == undefined) {
					const date = new Date();
					let nowTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
					// console.log(nowTime)
					this.searchCan.end = nowTime
				} else {
					this.searchCan.end = data
				}
				console.log(this.searchCan.end)
			},
			/**
			 * 筛选简历信息
			 */
			filterInfo() {
				const _this = this
				_this.searchInput.phone = ''
				_this.$bus.$emit('delSearchCan', JSON.stringify(_this.searchCan))
			},
			/**
			 * 搜索简历数据
			 */
			searchPnc() {
				const _this = this
				_this.$bus.$emit('delInputCan',JSON.stringify(_this.searchInput))
			},
			/**
			 * 清空简历信息
			 */
			emptyInfo() {
				window.location.reload()
				// const _this = this
				// Object.assign(_this.$data, _this.$options.data())
				// _this.getAllLabel()
			},
			/**
			 * 获取当前展示标签
			 */
			getAllLabel() {
				const _this = this
				_this.allLabel = [{
					lableName: '全部'
				}]
				getLabel({}, res => {
					// console.log(res)
					if (res.code == 200) {
						//将所有标签拼接在全部最后，用于简历页面展示
						_this.allLabel = [..._this.allLabel, ...res.data]
					}
				}, err => {
					console.log(err)
				})
			},
		}
	}
</script>

<style>
</style>
