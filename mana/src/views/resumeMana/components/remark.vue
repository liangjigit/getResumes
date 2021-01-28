<template>
	<div id="remark">
		<div class="remarks" v-if="addRemark">
			<div class="remarks-add">
				<span style="font-size: 18px;position: relative;left: 10px;">备注信息</span>
				<i class="el-icon-close" style="font-size: 20px;" @click="closeRemark"></i>
			</div>
			<div class="add-remarks">
				<textarea v-model="remarkText"></textarea>
			</div>
			<div style="display: flex;justify-content: space-around">
				<el-button type="primary" @click="postRemark">确定添加</el-button>
				<el-button type="info" @click="closeRemark">取消</el-button>
			</div>
		</div>
		<template v-if="seeRemark">
			<div class="remarks">
				<div class="top">
					<p>备注信息</p>
					<i class="el-icon-close" style="font-size: 20px;" @click="closeRemark"></i>
				</div>
				<div class="remark-box">
					<div style="width: 30%;">时间</div>
					<div style="width: 70%;">备注内容</div>
				</div>
				<ul>
					<li v-for="item in remarkArr" style="display: flex; margin: 10px 0;">
						<div style="width: 30%">{{item.createDate | changeTime}}</div>
						<div style="width: 70%;">{{item.content}}</div>
					</li>
				</ul>
			</div>
			<div class="remarks" style="margin-top:110px;border:0;background-color: white;height: 40px;text-align: center;z-index: 99999;">
				<el-button type="primary" @click="postMoreRemarks">添加备注</el-button>
			</div>
		</template>
	</div>
</template>

<script>
	import {
		saveRemark
	} from '@/network/api/index.js'
	export default {
		name: 'remark',
		data() {
			return {
				remarkArr: [],
				remarkText: '',
				seeRemark: false,
				addRemark: false,
				remarkId: ''
			}
		},
		mounted() {
			const _this = this
			_this.listenRemark()
		},
		methods: {
			/**
			 * 监听备注
			 */
			listenRemark() {
				const _this = this
				_this.$bus.$on('delRemark', (data, id) => {
					//为0时表示为添加过
					_this.remarkId = id
					if (data == 0) {
						_this.addRemark = true
						_this.seeRemark = false
						_this.remarkText = ''
					} else {
						_this.seeRemark = true
						_this.addRemark = false
						_this.remarkArr = data
					}
				})
			},
			/**
			 * 关掉当前备注框
			 */
			closeRemark() {
				this.seeRemark = false
				this.addRemark = false
				this.remarkText = ''
			},
			/**
			 * 添加更多备注
			 */
			postMoreRemarks() {
				this.seeRemark = false
				this.addRemark = true
				this.remarkText = ''
			},
			/**
			 * 保存当前备注
			 */
			postRemark() {
				const _this = this
				// console.log(_this.remarkId)
				saveRemark({
					resumeId: _this.remarkId,
					content: _this.remarkText
				}, res => {
					console.log(res)
					if (res.code == 200) {
						_this.$message({
							type: 'success',
							message: '添加成功!'
						});
						_this.seeRemark = false
						_this.addRemark = false
						//重新请求当前页
						_this.$bus.$emit('remarkFinish')
					}
				}, err => {
					console.log(err)
				})
			},
		},
		filters: {
			changeTime(item) {
				return item.substr(0, 10)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.remarks {

		line-height: 1;

		.top {
			height: 30px;
			padding: 10px 10px;
			display: flex;
			justify-content: space-between;
			align-items: center;

			p {
				font-size: 18px;
			}
		}

		.remark-box {
			display: flex;
			top: 30px;
			text-align: center;
			width: 100%;
			padding-bottom: 10px;
			border-bottom: 1px solid #bee7ff;
			top: 0;
		}

		ul {
			padding: 0;
			list-style: none;
			position: relative;
			top: 30px;
			text-align: center;
		}

		.remarks-add {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 0 10px;
		}
	}
</style>
