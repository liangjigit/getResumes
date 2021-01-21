<template>
	<div id="labelH">
		<el-row :gutter="20" style="line-height: 60px;border-top: 1px solid #edecec;margin: 0;font-size: 'Arial Normal', 'Arial';">
			<el-col :span="6">
				<div class="grid-content bg-purple" style="margin-left:-150px;font-size: 0.3rem;font-weight: bolder;">标签管理</div>
			</el-col>
		</el-row>
		<div>
			<el-row :gutter="20" style="line-height: 60px;border-top: 1px solid #edecec;border-bottom: 1px solid #edecec;margin: 0;">
				<el-col :span="6">
					<div class="grid-content bg-purple" style="margin-left:-120px">
						<el-button type="primary" @click="addLabel">添加标签</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
	</div>
</template>

<script>
	import {
		saveLabel,
		getLabel
	} from '@/network/api/index.js'
	export default {
		name: 'labelH',
		methods: {
			/**
			 * 添加标签
			 */
			addLabel() {
				const _this = this
				_this.$prompt('标签名称', '', {
					confirmButtonText: '确认添加',
					cancelButtonText: '取消'
				}).then(({
					value
				}) => {
					saveLabel({
						lableName: value
					}, res => {
						if (res.code == 200) {
							_this.$message({
								type: 'success',
								message: res.data
							})
							_this.toNewLabel()
						} else if (res.code == 500) {
							_this.$message({
								type: 'error',
								message: res.msg
							})
						}
					}, err => {
						console.log(err)
					})
				}).catch(() => {
					_this.$message({
						type: 'info',
						message: '取消输入'
					})
				})
			},
			/**
			 * 添加标签后跳转最后一页
			 */
			toNewLabel() {
				const _this = this
				getLabel({}, res => {
					if (res.code == 200) {
						let lastPage = Math.ceil(res.data.length / 10)
						_this.$emit('showLastPage', lastPage)
					}
				})
			}
		}
	}
</script>

<style>
</style>
