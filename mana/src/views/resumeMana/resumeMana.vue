<template>
	<div id="resumeMana">
		<remark></remark>
		<resumeH></resumeH>
		<resumeM></resumeM>
		<resumeF></resumeF>
	</div>
</template>

<script>
	import resumeH from './components/resumeH.vue'
	import resumeM from './components/resumeM.vue'
	import resumeF from './components/resumeF.vue'
	import remark from './components/remark.vue'
	export default{
		name:'resumeMana',
		components:{
			resumeH,
			resumeM,
			resumeF,
			remark
		},
		data(){
			return {
				
			}
		},
		methods:{
			/**
			 * @param {Object} data
			 * 点击筛选时的数据
			 */
		},
		beforeDestroy() {
			this.$bus.$off()
		}
	}
</script>

<style>
	
</style>
