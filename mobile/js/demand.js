//测试环境
axios.defaults.baseURL = 'http://192.168.52.25:7300'
//生产环境
// axios.defaults.baseURL = 'http://np.aimergroup.com:8081/api/'
new Vue({
	el: '#app',
	data: {
		//当前选中Tab
		active: 'a',
		//我有才华数据
		talent: {
			name: '',
			phone: '',
			idea: ''
		},
		//我有需求数据
		demand: {
			department: '',
			linkman: '',
			phone: '',
			need: ''
		}
	},
	methods: {
		//textarea改变的时候
		changeArea(type) {
			if (type == 'talent') {
				if (this.talent.idea.length > 200) {
					vant.Toast('您输入的字数不能超过200字！')
				}
			} else {
				if (this.demand.need.length > 200) {
					vant.Toast('您输入的字数不能超过200字！')
				}
			}
		},
		//初步判断必填数据是否为空
		submit(type) {
			const _this = this
			const a = 0
			if (type == 'talent') {
				switch (a) {
					case _this.talent.name.length:
						vant.Toast('姓名不能为空');
						break;
					case _this.talent.phone.length:
						vant.Toast('手机号码不能为空');
						break;
					case _this.talent.idea.length:
						vant.Toast('创意介绍不能为空');
						break;
					default:
						_this.checkPhone(_this.talent.phone, 'talent')
				}
			} else {
				switch (a) {
					case _this.demand.department.length:
						vant.Toast('部门不能为空');
						break;
					case _this.demand.linkman.length:
						vant.Toast('联系人不能为空');
						break;
					case _this.demand.phone.length:
						vant.Toast('手机号码不能为空');
						break;
					case _this.demand.need.length:
						vant.Toast('需求详情不能为空');
						break;
					default:
						_this.checkPhone(_this.demand.phone, 'demand')
				}
			}
		},
		//校验手机号
		checkPhone(phone, type) {
			let testphone = /^1(3|4|5|6|7|8|9)\d{9}$/.test(phone);
			// console.log(testphone)
			if (!testphone) {
				vant.Toast('请输入正确手机号码')
			} else {
				this.saveInfo(type)
			}
		},
		//保存数据
		saveInfo(type) {
			const _this = this
			vant.Dialog.confirm({
				title: '提交',
				message: '信息提交后无法修改，是否提交?'
			}).then(() => {
				vant.Toast.loading({
					message: '提交中...',
					forbidClick: true,
					loadingType: 'spinner',
					duration: 0
				});
				// _this.isSamename = _this.userInformation.name
				let sendType = ''
				let sendData = ''
				if (type == 'talent') {
					sendType = '/service/personnel/save'
					const data = {
						name: _this.talent.name,
						phone: _this.talent.phone,
						detail: _this.talent.idea
					}
					sendData = JSON.stringify(data, null, 2)
				} else {
					sendType = '/service/demand/save'
					const data = {
						name:_this.demand.linkman,
						department:_this.demand.department,
						phone:_this.demand.phone,
						detail:_this.demand.need
					}
					sendData = JSON.stringify(data, null, 2)
				}
				axios({
					method: 'post',
					url: sendType,
					data: sendData,
					headers: {
						'content-type': 'application/json'
					}
				}).then(res => {
					console.log(res)
					vant.Toast.clear()
					if (res.data.code == 200) {
						vant.Toast('提交成功！')
					} else {
						vant.Toast('提交失败！')
					}
				}, err => {
					console.log(err)
					vant.Toast.clear()
					vant.Toast('简历提交失败,请联系相关人员修复！')
				})
			}).catch(() => {
				vant.Toast('已取消提交')
			});
		},
	},
})
