<template>
	<div id='aside'>
		<!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
			<el-menu :default-openeds="['0']" background-color="#545c64" text-color="#fff" active-text-color="#ffd04b"
			 unique-opened>
				<el-submenu :index="index + ''" v-for="(item,index) in firstMenu">
					<template slot="title"><i class="el-icon-message"></i>{{item.name}}</template>
					<el-menu-item-group>
						<el-menu-item index="1-1" v-for="(itemS,indexS) in handleSecondMenu(item.id)">{{itemS.name}}</el-menu-item>
					</el-menu-item-group>
				</el-submenu>
			</el-menu>
		</el-aside> -->
		<el-aside width="80px" height="100%">
		    <!-- <div :class="{'aside-css':initPage}" style="cursor: pointer;margin-top: -380px;" @click="changeInit">
		        简历管理</div>
		    <div :class="{'aside-css':!initPage}" style="cursor: pointer;" @click="changeInitFalse">标签管理</div> -->
				<el-menu
				      default-active="1"
				      class="el-menu-vertical-demo">
				      <el-menu-item index="1">
				        <span slot="title">简历管理</span>
				      </el-menu-item>
				      <el-menu-item index="2">
				        <span slot="title">标签管理</span>
				      </el-menu-item>
				      <el-menu-item index="3">
				        <span slot="title">人才管理</span>
				      </el-menu-item>
				    </el-menu>
		</el-aside>
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		name: 'Aside',
		created() {
			// const userPermissions = await this.getUserPermissions()
			// this.detailPermissions(userPermissions)
		},
		data(){
			return {
				firstMenu:[],
				secondMenu:[]
			}
		},
		methods: {
		}
	}
</script>

<style lang="scss" scoped>
	#aside{
		background-color: rgba(63, 63, 63, 1);
		display: flex;
		flex-direction: column;
		justify-content: center;
		.el-menu-item{
			background-color: #3f3f3f;
			color: #FFFFFF;
		}
		
		.is-active {
		    color: #409EFF;
		}
	}
</style>
