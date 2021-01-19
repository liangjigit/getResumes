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
	</div>
</template>

<script>
	import {
		mapActions
	} from 'vuex'
	export default {
		name: 'Aside',
		async created() {
			const userPermissions = await this.getUserPermissions()
			this.detailPermissions(userPermissions)
		},
		data(){
			return {
				firstMenu:[],
				secondMenu:[]
			}
		},
		methods: {
			...mapActions(['getUserPermissions']),
			/**
			 * 处理返回权限
			 */
			detailPermissions({roles}){
				console.log(roles)
				// this.firstMenu = objData.
			}
		}
	}
</script>

<style>
</style>
