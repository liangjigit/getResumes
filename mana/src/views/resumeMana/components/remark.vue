<template>
	<div id="remark">
		<div class="remarks" v-if="needAddRemarks">
		    <div class="remarks-add">
		        <span style="font-size: 18px;position: relative;left: 10px;">备注信息</span>
		        <img src="img/click-x.png" @click="closeRemarks"
		            style="width: 40px;height: 40px;position: absolute;top: 1px;right: 1px;cursor: pointer;" alt="">
		    </div>
		    <div class="add-remarks">
		        <textarea v-model="remarksText"></textarea>
		    </div>
		    <div style="display: flex;justify-content: space-around">
		        <el-button type="primary" @click="postRemarks">确定添加</el-button>
		        <el-button type="info" @click="closeRemarks">取消</el-button>
		    </div>
		</div>
		<div class="remarks" v-if="needSeeRemarks">
		    <div>
		        <span style="font-size: 18px;position: relative;left: 10px;top: 10px;">备注信息</span>
		        <img @click="closeRemarks" src="img/click-x.png"
		            style="width: 40px;height: 40px;position: absolute;top: 1px;right: 1px;cursor: pointer;" alt="">
		    </div>
		    <div class="remark-box">
		        <div style="width: 30%;">时间</div>
		        <div style="width: 70%;">备注内容</div>
		    </div>
		    <ul style="padding: 0;list-style: none;position: relative;top: 30px;text-align: left;">
		        <li v-for="item in remarksArr" style="display: flex;margin: 20px 0;">
		            <div style="width: 30%;padding-left: 20px;">{{item.createDate | changeTime}}</div>
		            <div style="width: 70%;">{{item.content}}</div>
		        </li>
		    </ul>
		</div>
		<div class="remarks" v-if="needSeeRemarks"
		    style="margin-top:110px;border:0;background-color: white;height: 40px;text-align: center;z-index: 99999;">
		    <el-button type="primary" @click="postMoreRemarks">添加备注</el-button>
		</div>
	</div>
</template>

<script>
	export default{
		name:'remark'
	}
</script>

<style>
</style>
