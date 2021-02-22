<template>
	<div id="resume">
		<div v-if="soleData.name" class="show-resume" style="position: fixed;z-index: -9999999; width: 595px;height:842px;margin-left: 20%;overflow: auto;line-height: 1.8;text-align: left;">
			<div class="test" id="test" ref="test">
				<div style="font-size: 20px;color: red;margin-left: 3%;">AIMER<br>
				</div>
				<hr>
				<div style="display: flex;justify-content: center;">
					<div style="width: 5%;"></div>
					<div class="left" style="width: 25%;">
						<div style="font-size: 25px;margin-bottom: 15px;">{{soleData.name}}</div>
						<div style="font-size: 15px;margin-bottom: 30px;">内聘岗位：{{soleData.intention}}</div>
						<div style="font-size: 14px;margin-bottom: 5px;">{{soleData.phone}}</div>
						<div style="font-size: 14px;margin-bottom: 30px;">{{soleData.email}}</div>
						<div style="width:100%;margin-bottom: 30px;">
							<img :src="soleData.pageUrl" alt="" width="80%">
						</div>
						<div style="font-size: 14px;margin-bottom: 5px;">身高：{{soleData.height}}</div>
						<div style="font-size: 14px;margin-bottom: 5px;">体重：{{soleData.weight}}</div>
						<div style="font-size: 14px;margin-bottom: 5px;" v-if="soleData.chest">
							胸围：{{soleData.chest}}</div>
						<div style="font-size: 14px;margin-bottom: 5px;" v-if="soleData.waist">
							腰围：{{soleData.waist}}</div>
						<div style="font-size: 14px;margin-bottom: 100px;" v-if="soleData.hips">
							臀围：{{soleData.hips}}</div>
						<div style="font-size: 12px;">
							<p>技能标签:</p>
							<ul style="list-style: none;">
								<li v-for="item in labelName" style="color:#808080;border: 1px solid;border-radius: 2px;margin: 10px 0;text-align: center;">
									{{item}}</li>
							</ul>
						</div>
					</div>
					<div style="width: 10%;"></div>
					<div class="right" style="width: 55%;">
						<div style="border-bottom: 1px solid;margin-bottom: 10px;">
							<div style="font-size: 21px;margin-bottom: 5px;"> <span style="font-size: 15px;">|</span> 基本信息</div>
							<div style="font-size: 12px;margin-bottom: 5px;">
								<span>性别：{{soleData.gender}}</span>
								<span>学历：{{soleData.education}}</span>
								<span>工号：{{soleData.code}}</span>
							</div>
							<div style="font-size: 12px;margin-bottom: 5px;">部门：{{soleData.department}}</div>
							<div style="font-size: 12px;margin-bottom: 5px;">目前所在岗位：{{soleData.post}}</div>
							<div style="font-size: 12px;margin-bottom: 30px;">曾任职岗位：{{soleData.formerPost}}
							</div>
						</div>
						<div style="border-bottom: 1px solid;">
							<div style="font-size: 21px;margin-bottom: 5px;"><span style="font-size: 15px;">|</span>竞聘信息</div>
							<div style="margin-bottom: 5px;">①相关技能介绍
								<!-- <div style="font-size: 12px;">{{soleData.skill}}</div> -->
								<div v-html="soleData.skill"></div>
							</div>
							<div style="margin-bottom: 30px;">②工作履历
								<!-- <div style="font-size: 12px;">{{soleData.experience}}</div> -->
								<div v-html="soleData.experience"></div>
							</div>
						</div>
					</div>
					<div style="width: 5%;"></div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import html2canvas from 'html2canvas'
	import {
		saveResumeImage,
		downloadZip
	} from '@/network/api/index.js'
	export default {
		name: 'resume',
		data() {
			return {
				soleData: {},
				labelName: [],
				moreData: [],
				moreDataIndex: 0,
				moreDataLength: 0,
				//打包下载时的名称时间
				resumeTime: '',
				//获取所有建立图片得数组
				getAllResumePicArr: [],
				downloadLoading: {},
				downloadTime: false
			}
		},
		mounted() {
			const _this = this
			_this.$bus.$on('resumeShow', (data, label) => {
				_this.soleData = data
				_this.labelName = label
				_this.downloadLoading = _this.$loading({
					lock: true,
					text: '努力下载简历中，请耐心等待',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				_this.getCanvas()
			})
			_this.$bus.$on('moreResumeDownload', resumeArr => {
				// console.log(resumeArr)
				_this.downloadLoading = _this.$loading({
					lock: true,
					text: '努力下载打包中，请耐心等待',
					spinner: 'el-icon-loading',
					background: 'rgba(0, 0, 0, 0.7)'
				})
				_this.moreData = resumeArr
				_this.moreDataLength = resumeArr.length
				_this.moreResume()
			})
		},
		methods: {
			//对简历逐个循环下载
			moreResume() {
				const _this = this
				_this.soleData = {}
				//_this.moreDataIndex初始为0，从第一个开始取值
				console.log(_this.moreData)
				_this.soleData = _this.moreData[_this.moreDataIndex]
				//对个人数据中标签进行转化
				if (_this.soleData.lableid) {
					_this.labelName = _this.soleData.lableid.split(',')
					_this.labelName.pop()
				}
				//将时间传入打包姓名
				if (_this.soleData.createDate) {
					let date = new Date(_this.soleData.createDate)
					let year = date.getFullYear()
					let month = date.getMonth() + 1
					let day = date.getDate()
					let hours = date.getHours()
					let minutes = date.getMinutes()
					let second = date.getSeconds()
					_this.resumeTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes
					//console.log(_this.resumeTime)
				}
				_this.getMoreCanvas()
			},
			//批量下载简历时获取的canvas
			getMoreCanvas() {
				const _this = this
				_this.$nextTick(() => {
					let test = _this.$refs.test
					// console.log(test)
					html2canvas(test, {
						allowTaint: true,
						logging: false,
						width: 595,
						height: 842
					}).then(function(canvas) {
						//转化参数
						// let params = new URLSearchParams()
						// params.append('imgStr', _this.saveAsPNG(canvas))
						const params = {}
						params.imgStr = _this.saveAsPNG(canvas)
						_this.saveImage(params)
					})
				})
			},
			//批量下载的方法
			saveImage(params) {
				const _this = this
				saveResumeImage(params, res => {
					// console.log(res)
					_this.getAllResumePicArr.push(res.data[0] + 'AIMERPERSONNEL' + _this.resumeTime + _this.soleData.name)
					if ((_this.moreDataIndex + 1) == _this.moreDataLength) {
						let getAllResumePicString = _this.getAllResumePicArr.join(',')
						let downUrl = 'http://np.aimergroup.com:8081/api/resume/uploadResume?resumeStr=' + getAllResumePicString
						_this.downloadTime = true
						_this.moreDataIndex = 0
						_this.downLoad(downUrl)
					} else {
						_this.moreDataIndex++
						_this.moreResume()
					}
				}, err => {
					console.log(err)
				})
			},
			//获取当前简历的canvas
			getCanvas() {
				const _this = this
				_this.$nextTick(() => {
					let test = _this.$refs.test
					// console.log(test)
					html2canvas(test, {
						allowTaint: true,
						logging: false,
						width: 595,
						height: 842
					}).then(function(canvas) {
						// console.dir(canvas)
						_this.downLoad(_this.saveAsPNG(canvas));
					})
				})
			},
			//转为png
			saveAsPNG(canvas) {
				return canvas.toDataURL("image/png");
			},
			//自动下载到本地
			downLoad(url) {
				const _this = this
				let oA = document.createElement("a");
				oA.download = _this.soleData.name; // 设置下载的文件名，默认是'下载'
				oA.href = url;
				document.body.appendChild(oA);
				oA.click();
				oA.remove(); // 下载之后把创建的元素删除
				if (_this.downloadTime == true) {
					_this.downloadTime = false
					window.setTimeout(() => {
						_this.downloadLoading.close()
						_this.$message({
							type: 'success',
							message: '下载简历成功！'
						});
					}, 3000)
				} else {
					window.setTimeout(() => {
						_this.downloadLoading.close()
						_this.$message({
							type: 'success',
							message: '下载简历成功！'
						});
					}, 1000)
				}
			},
		}
	}
</script>

<style>
</style>
