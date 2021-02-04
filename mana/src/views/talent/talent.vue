<template>
	<div id="talent">
		<div class="uploadImage">
			<div class="addImage">
				<el-upload class="upload-demo" :before-upload="beforeAvatarUpload" :action="actionUrl" :data="param" :headers="headers"
				 :on-change="changeImage" :file-list="fileList" list-type="picture" :on-success="successUpload">
					<el-button size="small" type="success">点击上传海报</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg或png文件，且文件大小不超过2MB</div>
				</el-upload>
			</div>
			<div class="preview">
				<div class="box">
					<img :src="imageUrl" />
					<div class="show">
						<div class="simulate">
							<span>*</span>
							<span>姓名:</span>
							<div></div>
						</div>
						<div class="simulate">
							<span>*</span>
							<span>手机号码:</span>
							<div></div>
						</div>
						<div class="simulate">
							<span>*</span>
							<span>创意介绍:</span>
							<div class="box"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<talentList></talentList>
	</div>
</template>

<script>
	import {
		GLOBAL_URL
	} from '@/utils/GLOBAL.js'
	import talentList from './components/talentList.vue'
	import {
		savePosterImage
	} from '@/network/api/talent.js'
	export default {
		name: 'talentMana',
		components: {
			talentList
		},
		data() {
			return {
				actionUrl: '',
				param: {
					file: ''
				},
				headers: {
					token: '',
					type: '2'
				},
				saveImageParam: {
					type: 'Personnel',
					url: ''
				},
				imageUrl:'',
				fileList: [],
			};
		},
		created() {
			this.actionUrl = GLOBAL_URL + 'resume/saveImage'
			this.headers.token = window.localStorage.getItem('manager-token')
		},
		methods: {
			/**
			 * 测试文件类型
			 */
			beforeAvatarUpload(file) {
				// console.log(file)
				const isPNG = file.type === 'image/png';
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG && !isPNG) {
					this.$message.error('上传头像图片只能是 JPG 或 PNG 格式 !');
				} else if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB !');
				}
				return (isJPG || isPNG) && isLt2M;
			},
			/**
			 * 图片状态改变时 获取最新blob
			 */
			changeImage(file, fileList) {
				// console.log(file)
				this.param.file = file.url
			},
			/**
			 * 成功上传
			 */
			successUpload(response, file, fileList) {
				// console.log(response)
				this.saveImageParam.url = response
				this.saveImage()
			},
			/**
			 * 保存图片请求
			 */
			saveImage() {
				const _this = this
				savePosterImage(_this.saveImageParam, res => {
					console.log(res)
					if (res.code == 200) {
						this.imageUrl = res.data.name
					}
				}, err => {
					console.log(err)
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import '@/styles/talent.scss'
</style>
