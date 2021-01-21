<template>
	<div id="label">
		<labelH @showLastPage = "showLastPage"></labelH>
		<labelM></labelM>
		<labelF :lastPage = "lastPage"></labelF>
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
				lastPage:0
			}
		},
		methods:{
			/**
			 * 添加标签后跳至最后一页
			 */
			showLastPage(page){
				this.lastPage = page
			}
		}
	}
</script>

<style>
</style>
