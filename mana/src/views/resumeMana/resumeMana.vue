<template>
	<div id="resumeMana">
		<remark></remark>
		<resumeH></resumeH>
		<resumeM></resumeM>
		<resumeF></resumeF>
		<resume></resume>
	</div>
</template>

<script>
	import resumeH from './components/resumeH.vue'
	import resumeM from './components/resumeM.vue'
	import resumeF from './components/resumeF.vue'
	import remark from './components/remark.vue'
	import resume from './components/resume.vue'
	export default{
		name:'resumeMana',
		components:{
			resumeH,
			resumeM,
			resumeF,
			remark,
			resume
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
