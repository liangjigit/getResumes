<template>
	<div id="prompt">
		<main>
			<header>
				<p>{{title}}</p>
				<i class="el-icon-close" @click="cancel"></i>
			</header>
			<article>
				<input ref="input" maxlength="15" v-model="inputValue"/>
			</article>
			<footer>
				<el-button @click="cancel">{{cancelText}}</el-button>
				<el-button type="primary" @click="sureAdd">{{sureText}}</el-button>
			</footer>
		</main>
	</div>
</template>

<script>
	export default {
		name: 'prompt',
		props: {
			title: {
				type: String,
				default: ''
			},
			cancelText:{
				type:String,
				default:''
			},
			sureText:{
				type:String,
				default:''
			}
		},
		data(){
			return{
				inputValue:''
			}
		},
		created() {
			this.inputValue = ''
			this.$nextTick(()=>{
				// console.dir(this.$refs.input)
				this.$refs.input.focus()
			})
		},
		methods:{
			/**
			 * 取消添加
			 */
			cancel(){
				this.$emit('cancel')
				this.inputValue = ''
			},
			/**
			 * 确认添加
			 */
			sureAdd(){
				const _this = this
				_this.$emit('sureAdd',_this.inputValue)
			}
		}
	}
</script>

<style lang="scss" scoped>
	#prompt {
		position: fixed;
		left: 0;
		top: 0;
		width: 100%;
		height: 100%;
		background-color: rgba(0, 0, 0, 0.5);
		z-index: 999;
		line-height: 1;

		main {
			position: absolute;
			width: 8rem;
			background: white;
			height: 4rem;
			left: 50%;
			top: 50%;
			transform: translate(-50%, -50%);
			border-radius: 5px;
			padding-left: 0.3rem;
			padding-right: 0.3rem;

			header {
				display: flex;
				justify-content: space-between;
				height: 1.5rem;

				p {
					align-self: center;
					font-size: 0.3rem;
				}

				i {
					margin-top: 0.3rem;
					font-size: 0.3rem;
					cursor: pointer;
				}
			}

			article {
				height: 1rem;
				input{
					width: 100%;
					height: 0.6rem;
					border-color: azure;
					outline: none;
					border-style: solid;
				}
			}
			footer{
				height: 1.5rem;
				display: flex;
				justify-content: flex-end;
				align-items: center;
			}
		}
	}
</style>
