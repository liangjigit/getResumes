// //测试环境
// axios.defaults.baseURL = 'http://10.2.200.70/api/'
//本地
// axios.defaults.baseURL = 'http://10.1.7.60:8080/api/'
//生产环境
axios.defaults.baseURL = 'http://np.aimergroup.com:8081/api/'
new Vue({
    el: '#app',
    data: {
        //判断提示框师傅出现
        isResume: true,
        isWork: true,
        //阻止当前页面数据反复提交时的姓名保存
        isSamename: 'lj',
        imgposition: 'img/pull-down.png',
        helptext: '更多',
        healthy: '更多',
        healthyimg: 'img/pull-down.png',
        //男女摁扭的类型
        buttonTypeM: 'default',
        buttonTypeW: 'default',
        //是否需要更多身体数据
        isMoreBodyInfo: true,
        //学历的数据
        eduBackground: ['点击选择', '博士', '硕士', '本科', '专科', '高中', '中专/中技', '初中及以下'],
        //判断用户的skilltextarea框是否为空
        isSkillTextarea: true,
        //判断用户worktextarea是否为空
        isWorkTextarea: true,
        //获取用户本地头像
        localImage: '',
        //所有特长标签数组
        allHeadLabel: [],
        //初始展示6个标签数组
        initHeadLabel: [],
        //剩余标签数组
        residueHeadLabel: [],
        //控制获取全部标签的布尔
        isAllLabel: true,
        //存储labelID的数组
        labelId: [],
        //判断手机号码是否通过
        isPhoneMember: false,
        //判断邮箱格式是否正确
        isEmail: false,
        //判断工号位数
        isCode: false,
        //用户数据对象
        userInformation: {
            //用户Id
            id: '',
            //姓名
            name: '',
            //性别
            gender: '',
            //头像图片地址
            pageUrl: '',
            //身高
            height: '',
            //体重
            weight: '',
            //胸围
            chest: '',
            //腰围
            waist: '',
            //臀围
            hips: '',
            //学历
            education: '',
            //工号
            code: '',
            //手机号
            phone: '',
            //邮箱
            email: '',
            //标签
            lableid: '',
            //部门
            department: '',
            //岗位
            post: '',
            //曾经岗位
            formerPost: '',
            //岗位意向
            intention: '',
            //技能
            skill: '',
            //履历
            experience: ''
        },
        //展示用户选择的5个标签
        showLableName: []
    },
    methods: {
        // test() {
        //     this.$toast('Hello world!')
        // }
        //删除用户选择的标签
        closeLableName(i, item) {
            console.log(i, item)
                // console.log(this.initHeadLabel)
                // console.log(this.residueHeadLabel)
            for (let index in this.initHeadLabel) {
                if (this.initHeadLabel[index].lableName == item) {
                    // console.log(index)
                    // console.log(document.querySelector('.initclass').children[index])
                    document.querySelector('.initclass').children[index].style = ''
                        // this.$nextTick(function() {
                        //     console.log(this.$refs)
                        // })
                }
            }
            for (let index in this.residueHeadLabel) {
                if (this.residueHeadLabel[index].lableName == item) {
                    document.querySelector('.resclass').children[index].style = ''
                }
            }
            this.showLableName.splice(i, 1)
            this.labelId.splice(i, 1)
        },
        //获取用户标签
        getUserLabel(e, item) {
            // console.log(item.lableName)
            let click_item = item.id
            let itemShow = item.lableName
            if (this.labelId.length == 0) {
                console.log(e)
                e.srcElement.style = 'color:#37c2b9;border-color:#37c2b9'
                this.labelId.push(click_item)
                this.showLableName.push(itemShow)
                    // console.log(this.labelId)
            } else if (this.labelId.length < 5) {
                for (let i in this.labelId) {
                    // console.log(this.labelId[i])
                    if (this.labelId[i] == click_item) {
                        e.srcElement.style = ''
                        this.labelId.splice(i, 1)
                        this.showLableName.splice(i, 1)
                            // console.log(this.labelId)
                    } else {
                        e.srcElement.style = 'color:#37c2b9;border-color:#37c2b9'
                        this.labelId = this.labelId.filter(function(item) {
                            return item != click_item
                        })
                        this.showLableName = this.showLableName.filter(function(item) {
                                return item != itemShow
                            })
                            // console.log(this.labelId)
                        this.labelId.push(click_item)
                        this.showLableName.push(itemShow)
                    }
                }
            } else {
                console.log("进错了")
                let str = this.userInformation.lableid
                console.log(str.indexOf(click_item))
                if (str.indexOf(click_item) == -1) {
                    this.$toast('最多选择5个')
                } else {
                    for (let i in this.labelId) {
                        // console.log(this.labelId[i])
                        if (this.labelId[i] == click_item) {
                            e.srcElement.style = ''
                            this.labelId.splice(i, 1)
                            this.showLableName.splice(i, 1)
                                // console.log(this.labelId)
                        }
                    }
                }
            }
            this.userInformation.lableid = this.labelId.join(',')
                // console.log(this.userInformation.lableid)
                // console.log(this.labelId.length)

        },
        //获取全部的标签
        getAllLabels() {
            if (this.helptext == '更多') {
                this.helptext = '收起'
                this.imgposition = 'img/pull-up.png'
                this.isAllLabel = false
            } else {
                this.helptext = '更多'
                this.isAllLabel = true
                this.imgposition = 'img/pull-down.png'
            }
        },
        //男女摁扭切换
        isBoy() {
            this.buttonTypeM = 'primary'
            this.buttonTypeW = 'default'
            this.userInformation.gender = 1
        },
        isGirl() {
            this.buttonTypeW = 'danger'
            this.buttonTypeM = 'default'
            this.userInformation.gender = 0
        },
        //点击加载更多身体数据信息
        getMoreBodyInfo() {

            if (this.healthy == '更多') {
                this.healthy = '收起'
                this.healthyimg = 'img/pull-up.png'
                this.isMoreBodyInfo = false
            } else {
                this.healthy = '更多'
                this.isMoreBodyInfo = true
                this.healthyimg = 'img/pull-down.png'
            }
        },
        //检查输入手机号
        checkPhone() {
            let testphone = /^1(3|4|5|6|7|8|9)\d{9}$/.test(this.userInformation.phone);
            // console.log(testphone)
            if (!testphone) {
                this.$toast('请输入正确手机号码')
                this.isPhoneMember = false
            } else {
                this.isPhoneMember = true
            }
        },
        // 检查输入的邮箱地址
        checkEmail() {
            let testemail = /^[A-Za-z0-9]+([_\.][A-Za-z0-9]+)*@([A-Za-z0-9\-]+\.)+[A-Za-z]{2,6}$/.test(this.userInformation.email);
            if (!testemail) {
                this.$toast('请输入正确的邮箱')
                this.isEmail = false
            } else {
                this.isEmail = true
            }
        },
        //检查工号
        checkCode() {
            if (this.userInformation.code.length < 8) {
                this.$toast('工号应为8位')
                this.isCode = false
            } else {
                this.isCode = true
            }
        },
        //用户聚焦skilltextarea之后清空
        clearTextareaSkill() {
            // console.log(111)
            this.isResume = false
                // console.log(document.querySelector('#resume'))
        },
        //用户失焦skilltextarea
        getTextareaSkill() {
            // console.log(this.textareaPlaceholder)
            if (this.userInformation.skill == '') {
                // console.log(111)
                this.isResume = true
            }
        },
        //点击提示聚焦
        resumeFocus() {
            this.isResume = false
            document.querySelector('#resume').focus()
        },
        //用户聚焦worktextarea
        clearTextareaWork() {
            this.isWork = false
        },
        //用户失去焦点worktextarea
        getTextareaWork() {
            // console.log(this.userInformation.experience)
            if (this.userInformation.experience == '') {
                this.isWork = true
            }
        },
        //点击提示聚焦
        workFocus() {
            this.isWork = false
            document.querySelector('#work').focus()
        },
        //初步判断必填数据是否为空
        submitInformation() {
            const _this = this
            if (_this.userInformation.education == '点击选择') {
                _this.userInformation.education = ''
            }
            // console.log(_this.userInformation.education)
            if (_this.isSamename != _this.userInformation.name) {
                let x = 0
                switch (x) {
                    case _this.localImage.length:
                        _this.$toast('请上传您的头像');
                        break;
                    case _this.userInformation.name.length:
                        _this.$toast('姓名不能为空');
                        break;
                    case _this.userInformation.gender.length:
                        _this.$toast('请选择性别');
                        break;
                    case _this.userInformation.height.length:
                        _this.$toast('身高不能为空');
                        break;
                    case _this.userInformation.weight.length:
                        _this.$toast('体重不能为空');
                        break;
                    case _this.userInformation.education.length:
                        _this.$toast('请选择您的学历');
                        break;
                    case _this.userInformation.phone.length:
                        _this.$toast('手机号码不能为空');
                        break;
                    case _this.userInformation.email.length:
                        _this.$toast('电子邮箱不能为空');
                        break;
                    case _this.userInformation.code.length:
                        _this.$toast('工号不能为空');
                        break;
                    case _this.userInformation.department.length:
                        _this.$toast('部门不能为空');
                        break;
                    case _this.userInformation.post.length:
                        _this.$toast('目前所在岗位不能为空');
                        break;
                    case _this.userInformation.intention.length:
                        _this.$toast('岗位意向不能为空');
                        break;
                    case _this.userInformation.skill.length:
                        _this.$toast('技能介绍不能为空');
                        break;
                    case _this.userInformation.experience.length:
                        _this.$toast('工作履历不能为空');
                        break;
                    default:
                        _this.postAllInformation()
                }
            } else {
                _this.$toast('请勿重复提交数据')
            }
        },

        //再次判断不是空的数据格式是否有错误
        postAllInformation() {
            const _this = this
                //判断手机号不为空时格式是否有问题
            if (_this.isPhoneMember) {
                //判断邮箱不为空时格式是否有问题
                if (_this.isEmail) {
                    //判断工号不为空时格式是否有问题
                    if (_this.isCode) {
                        //开始处理头像以及数据
                        _this.postImage()
                    } else {
                        _this.$toast('输入工号应为8位')
                    }
                } else {
                    _this.$toast('您输入的邮箱格式有误！')
                }
            } else {
                _this.$toast('您输入的手机号码格式有误！')
            }
        },
        //将用户上传的头像进行网络请求
        postImage() {
            const _this = this
            _this.$messagebox.confirm('简历信息提交后无法修改，是否提交?').then(action => {
                _this.$indicator.open('正在提交简历')
                let formData = new FormData()
                formData.append('file', _this.localImage)
                axios.post('resume/saveImage', formData, {
                    // withCredentials: true
                }).then(function(res) {
                    // console.log(res);
                    _this.userInformation.pageUrl = res.data;
                    if (_this.userInformation.pageUrl) {
                        _this.lastPost()
                    } else {
                        _this.$indicator.close()
                        _this.$toast('头像传输失败!')
                    }
                }).catch(function(error) {
                    _this.$indicator.close()
                    _this.$toast('头像传输失败，请联系相关人员修复!')
                })
            }, err => {
                console.log(err)
                _this.$toast('已取消提交！')
            });
        },
        //最后一步判断用户是否确认提交
        lastPost() {
            const _this = this
            _this.isSamename = _this.userInformation.name
            axios({
                method: 'post',
                url: 'resume/save',
                params: {
                    data: JSON.stringify(_this.userInformation)
                },
                headers: {
                    'content-type': 'application/json'
                }
            }).then(res => {
                // console.log(res)
                if (res.data.code == 200) {
                    _this.$indicator.close()
                    _this.$toast('简历提交成功！')
                } else {
                    _this.$indicator.close()
                    _this.$toast('简历提交失败！')
                }
            }).catch(error => {
                console.log(error)
                _this.$indicator.close()
                _this.$toast('简历提交失败,请联系相关人员修复！')
            })

        },
        //提交头像
        changepic(e) {
            // console.log(e)
            // console.log(this.$refs.file)
            const _this = this
                // console.log(this)
            let reads = new FileReader()
            let f = e.target.files[0]
            _this.localImage = e.target.files[0]
            console.log(_this.localImage)
            reads.readAsDataURL(f)
            reads.onload = function(e) {
                document.getElementById('show').src = this.result;
                document.getElementById('photoBg').style.opacity = '0'
                    // _this.localImage = this.result
                    // console.log(this)
            };
        },
        //请求特长标签
        async getHeadLabel() {
            // console.log(this)
            const _this = this
            await axios.get('lable/findAllLable').then(function(res) {
                    // console.log(this)
                    if (res.data.code == 200) {
                        // console.log(111)
                        _this.allHeadLabel = res.data.data
                            // console.log(this)
                        _this.initHeadLabel = _this.allHeadLabel.filter(function(item, i) {
                            return i < 6
                        })
                        _this.residueHeadLabel = _this.allHeadLabel.filter(function(item, i) {
                            return i >= 6
                        })
                    }
                })
                // await console.log(_this.residueHeadLabel)
        },
        //textarea改变的时候
        changeTextArea() {
            // console.log(this.userInformation.skill.length)
            if (this.userInformation.skill.length > 200) {
                this.$toast('您输入的字数不能超过200字！')
            }
        },
        changeTextAreaMore() {
            if (this.userInformation.experience.length > 400) {
                this.$toast('您输入的字数不能超过400字！')
            }
        }
    },
    created() {
        this.getHeadLabel()
        this.userInformation.education = this.eduBackground[0];
    },
})