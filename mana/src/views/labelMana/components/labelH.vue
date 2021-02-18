<template>
	<div id="labelH">
		<!-- <el-row :gutter="20" style="line-height: 60px;border-top: 1px solid #edecec;margin: 0;font-size: 'Arial Normal', 'Arial';">
			<el-col :span="6">
				<div class="grid-content bg-purple" style="margin-left:-150px;font-size: 0.3rem;font-weight: bolder;">标签管理</div>
			</el-col>
		</el-row> -->
		<div>
			<el-row :gutter="20" style="line-height: 60px;border-top: 1px solid #edecec;border-bottom: 1px solid #edecec;margin: 0;">
				<el-col :span="6">
					<div class="grid-content bg-purple" style="margin-left:-120px">
						<el-button type="success" @click="showPrompt = true">添加标签</el-button>
					</div>
				</el-col>
			</el-row>
		</div>
		<prompt :title="'标签名称'" :cancelText="'取消'" :sureText="'确认添加'" @cancel="cancel" @sureAdd="addLabel" v-if="showPrompt"></prompt>
	</div>
</template>

<script>
	import {
		saveLabel,
		getLabel
	} from '@/network/api/index.js'
	import prompt from '@/components/common/prompt.vue'
	export default {
		name: 'labelH',
		components: {
			prompt
		},
		data() {
			return {
				showPrompt: false
			}
		},
		mounted() {
			const _this = this
			_this.$bus.$on('finishDele', () => {
				_this.toNewLabel()
			})
		},
		methods: {
			/**
			 * 取消添加标签
			 */
			cancel() {
				this.$message({
					type: 'info',
					message: '取消输入'
				})
				this.showPrompt = false
			},
			/**
			 * 添加标签
			 */
			addLabel(value) {
				// console.log(value)
				const _this = this
				if (value == '') {
					_this.$message({
						type: 'error',
						message: '标签名称不能为空！'
					})
				} else {
					saveLabel({
						lableName: value
					}, res => {
						if (res.code == 200) {
							_this.$message({
								type: 'success',
								message: res.data
							})
							_this.showPrompt = false
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
				}
			},
			/**
			 * 添加标签后跳转最后一页
			 */
			toNewLabel() {
				const _this = this
				getLabel({}, res => {
					if (res.code == 200) {
						let lastPage = Math.ceil(res.data.length / 10)
						let totalNumber = res.data.length
						const last = {
							lastPage,
							totalNumber
						}
						_this.$emit('showLastPage', last)
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>

</style>
