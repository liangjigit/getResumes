<template>
	<div id="label">
		<labelH @showLastPage="showLastPage"></labelH>
		<labelM ref="labelM" :pageSizes="pageSizes"></labelM>
		<labelF :lastPage="lastPage" @pageChange="pageChange"></labelF>
	</div>
</template>

<script>
	import labelH from './components/labelH.vue'
	import labelM from './components/labelM.vue'
	import labelF from './components/labelF.vue'
	export default{
		name:'labelMana',
		components:{
			labelH,
			labelM,
			labelF
		},
		data(){
			return{
				lastPage:{},
				pageSizes:{
					page:1,
					size:10
				}
			}
		},
		methods:{
			/**
			 * 添加标签后跳至最后一页
			 */
			showLastPage(last){
				// console.log(this.$refs.labelM)
				let {lastPage} = last
				if(this.pageSizes.page == lastPage){
					this.$refs.labelM.showLabel({page:lastPage,size:10})
				}else{
					this.lastPage = last
				}
			},
			/**
			 * 改变当前数据页数
			 */
			pageChange(page){
				// console.log(pageSizes)
				this.pageSizes.page = page
			}
		}
	}
</script>

<style>
</style>
