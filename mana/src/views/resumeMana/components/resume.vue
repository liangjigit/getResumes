<template>
	<div id="resume">
		<div class="show-resume"
		    style="position: fixed;z-index: -9999999; width: 595px;height:842px;margin-left: 20%;overflow: auto;">
		    <div class="test" id="test">
		        <div style="font-size: 20px;color: red;margin-left: 3%;">AIMER<br>
		        </div>
		        <hr>
		        <div style="display: flex;justify-content: center;">
		            <div style="width: 5%;"></div>
		            <div class="left" style="width: 25%;">
		                <div style="font-size: 25px;margin-bottom: 15px;">{{soleData.name}}</div>
		                <div style="font-size: 15px;margin-bottom: 30px;">内聘岗位：{{soleData.intention}}</div>
		                <div style="font-size: 14px;margin-bottom: 5px;">{{soleData.phone}}</div>
		                <div style="font-size: 14px;margin-bottom: 30px;">{{soleData.email}}</div>
		                <div style="width:100%;margin-bottom: 30px;">
		                    <img :src="soleData.pageUrl" alt="" width="80%">
		                </div>
		                <div style="font-size: 14px;margin-bottom: 5px;">身高：{{soleData.height}}</div>
		                <div style="font-size: 14px;margin-bottom: 5px;">体重：{{soleData.weight}}</div>
		                <div style="font-size: 14px;margin-bottom: 5px;" v-if="soleData.chest">
		                    胸围：{{soleData.chest}}</div>
		                <div style="font-size: 14px;margin-bottom: 5px;" v-if="soleData.waist">
		                    腰围：{{soleData.waist}}</div>
		                <div style="font-size: 14px;margin-bottom: 100px;" v-if="soleData.hips">
		                    臀围：{{soleData.hips}}</div>
		                <div style="font-size: 12px;">
		                    <p>技能标签:</p>
		                    <ul style="list-style: none;">
		                        <li v-for="item in downloadLableId"
		                            style="color:#808080;border: 1px solid;border-radius: 2px;margin-bottom: 10px;text-align: center;">
		                            {{item}}</li>
		                    </ul>
		                </div>
		            </div>
		            <div style="width: 10%;"></div>
		            <div class="right" style="width: 55%;">
		                <div style="border-bottom: 1px solid;margin-bottom: 10px;">
		                    <div style="font-size: 21px;margin-bottom: 5px;"> <span
		                            style="font-size: 15px;">|</span> 基本信息</div>
		                    <div style="font-size: 12px;margin-bottom: 5px;">
		                        <span>性别：{{soleData.gender}}</span>
		                        <span>学历：{{soleData.education}}</span>
		                        <span>工号：{{soleData.code}}</span>
		                    </div>
		                    <div style="font-size: 12px;margin-bottom: 5px;">部门：{{soleData.department}}</div>
		                    <div style="font-size: 12px;margin-bottom: 5px;">目前所在岗位：{{soleData.post}}</div>
		                    <div style="font-size: 12px;margin-bottom: 30px;">曾任职岗位：{{soleData.formerPost}}
		                    </div>
		                </div>
		                <div style="border-bottom: 1px solid;">
		                    <div style="font-size: 21px;margin-bottom: 5px;"><span
		                            style="font-size: 15px;">|</span>竞聘信息</div>
		                    <div style="margin-bottom: 5px;">①相关技能介绍
		                        <!-- <div style="font-size: 12px;">{{soleData.skill}}</div> -->
		                        <div v-html="soleData.skill"></div>
		                    </div>
		                    <div style="margin-bottom: 30px;">②工作履历
		                        <!-- <div style="font-size: 12px;">{{soleData.experience}}</div> -->
		                        <div v-html="soleData.experience"></div>
		                    </div>
		                </div>
		            </div>
		            <div style="width: 5%;"></div>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	export default{
		name:'resume'
	}
</script>

<style>
</style>
