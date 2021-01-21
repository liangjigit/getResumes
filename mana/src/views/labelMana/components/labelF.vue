<template>
	<div id="labelF">
		<div class="block" style="position: relative;line-height: 30px;">
		    <el-row>
		        <el-col :span="24" style="display: flex;justify-content: center;">
		            <el-pagination :pager-count="1" layout="total,prev, pager, next, jumper"
		                :current-page="currentPage" :total="allLableMember" :page-size="params.size"
		                @prev-click="getPrevLable" @next-click="getNextLable"
		                @current-change="changeCurrent">
		            </el-pagination>
		            <el-button style="line-height: 5px;margin-left: 10px;" type="primary">确定
		            </el-button>
		        </el-col>
		    </el-row>
		    <el-row>
		        <el-col :span="24" style="display: flex;justify-content: center;">
		            <div style="font-size: 14px;color: #606266;">
		                共&nbsp;&nbsp;<!-- {{allLableMember | totalLablePage}} -->&nbsp;&nbsp;页</div>
		        </el-col>
		    </el-row>
		</div>
	</div>
</template>

<script>
	export default{
		name:'labelF',
		props:{
			lastPage:{
				type:Number,
				default:1
			}
		},
		watch:{
			lastPage(v){
				console.log(v)
			}
		},
		data(){
			return{
				currentPage:1,
				allLableMember:1,
				params:{
					size:1
				},
				a:10
			}
		},
		methods:{
			//标签管理获取上一页标签数据
			getPrevLable(page) {
			    const _this = this
			    _this.checkedLable = false
			    _this.currentPage = page
			    _this.params.page = page
			    _this.getHeadLabel()
			    _this.getAllLable()
			},
			
			//标签管理获取下一页标签数据
			getNextLable(page) {
			    const _this = this
			    _this.checkedLable = false
			    _this.currentPage = page
			    _this.params.page = page
			    _this.getHeadLabel()
			    _this.getAllLable()
			},
			//标签管理当前页数改变的时候
			changeCurrent(page) {
			    // const _this = this
			    // _this.checkedLable = false
			    // _this.currentPage = page
			    // _this.params.page = page
			    // _this.getAllLable()
			    // _this.getHeadLabel()
			},
		}
	}
</script>

<style>
</style>
