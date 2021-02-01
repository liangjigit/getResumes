<template>
	<div id="talent">
		<p>海报上传</p>
		<div class="uploadImage">
			<div class="addImage">
				<el-upload class="upload-demo" :before-upload="beforeAvatarUpload" :action="actionUrl" :data="param" :on-change="changeImage"
				 :file-list="fileList" list-type="picture" :on-success="successUpload" :on-remove="handleRemove">
					<el-button size="small" type="primary">点击上传海报</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg文件，且文件大小不超过2MB</div>
				</el-upload>
			</div>
			<div class="preview">
				<div class="box">
					<img :src="imageData.name" />
					<div class="show">
						<div class="simulate">
							<span>*</span>
							<span>部门:</span>
							<div></div>
						</div>
						<div class="simulate">
							<span>*</span>
							<span>联系人:</span>
							<div></div>
						</div>
						<div class="simulate">
							<span>*</span>
							<span>手机号码:</span>
							<div></div>
						</div>
						<div class="simulate">
							<span>*</span>
							<span>需求详情:(内容、要求、时间)</span>
							<div class="box"></div>
						</div>
					</div>
				</div>
			</div>
		</div>
		<demandList></demandList>
	</div>
</template>

<script>
	import {
		GLOBAL_URL
	} from '@/utils/GLOBAL.js'
	import demandList from './components/demandList.vue'
	import {
		getAllImage
	} from '@/network/api/talent.js'
	export default {
		name: 'demand',
		components: {
			demandList
		},
		data() {
			return {
				actionUrl: '',
				param: {
					type: 'Personnel',
					url: ''
				},
				imageData: {},
				fileList: []
			};
		},
		created() {
			this.actionUrl = GLOBAL_URL + 'service/data/save'
			this.getCurrentImage()
		},
		methods: {
			/**
			 * 获取默认展示图片
			 */
			getCurrentImage() {
				const _this = this
				getAllImage({}, res => {
					console.log(res)
					if (res.code == 200) {
						_this.imageData = res.data.filter((item, index, arr) => {
							return item.type == 'Personnel'
						})[0]
						// console.log(_this.imageData)
					}
				}, err => {
					console.log(err)
				})
			},
			/**
			 * 上传新的图片 获取blob
			 */
			changeImage(file, fileList) {
				// console.log(file)
				this.param.url = file.url
			},
			/**
			 * 提交前测试文件
			 */
			beforeAvatarUpload(file) {
				// console.log(file)
				const isJPG = file.type === 'image/jpeg';
				const isLt2M = file.size / 1024 / 1024 < 2;
				if (!isJPG) {
					this.$message.error('上传头像图片只能是 JPG 格式!');
				}
				if (!isLt2M) {
					this.$message.error('上传头像图片大小不能超过 2MB!');
				}
				return isJPG && isLt2M;
			},
			/**
			 * 成功上传
			 */
			successUpload(response, file, fileList) {
				console.log(response)
				if (response.code == 200) {
					this.imageData = response.data
				}
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},

		}
	}
</script>

<style lang="scss" scoped>
	@import '@/styles/talent.scss'
</style>
