new Vue({
    el: '#app',
    data: {
        //判断用户当前所选择的状态
        status: {
            //普通状态
            a: true,
            //进行了模糊摁扭查询的搜索摁扭
            b: false,
            //进行了少选摁扭查询
            c: false
        },
        //任何状态的变更都将数据定位为第一页
        currentPage1: 1,
        //简历页初始页页数页数 true false false
        currentPages: 1,
        //搜索页的页数
        currentPages1: 1,
        //筛选页的页数
        currentPages2: 1,
        //简历页初始页不同页面请求简历数据参数 true false false
        resumePageSize: {
            page: 1,
            size: 10
        },
        //筛选查询条件的参数
        searchCan: {
            page: '1',
            size: '10',
            post: '',
            gender: '',
            lable: '',
            intention: ''
        },
        //模糊查询的参数
        searchInput: {
            page: '1',
            size: '10',
            phone: ''
        },
        //岗位模糊查询使用
        postInput: '',
        //用于判断全选删除是否选中
        checkedLable: false,
        checked: false,
        selectIndex: true,
        // 标签样式控制
        clickEstyle: 'list-style:none;margin-right:30px;',
        clickLstyle: 'list-style:none;margin-right:30px;',
        //保存当前用户备注的数组
        remarksArr: [],
        //发送的备注Id
        postRemarksId: '',
        //备注框的选择
        needAddRemarks: false,
        needSeeRemarks: false,
        //添加的备注
        remarksText: '',
        //按是否全选摁扭
        isAllSelect: true,
        //用于判断搜索数据为0时隐藏
        showDeleDown: true,
        showPage: true,
        //默认时间
        defaultTime: ['00:00:00', '23:59:59'],
        //当前用户姓名
        usernametop: '',
        //对筛选信息索引进行保存
        //保存学历的变量
        clickEindex: '0',
        clickSindex: '0',
        clickLindex: '0',
        //判断姓名能否传输
        isNumber: false,
        //判断手机号是否输入正确
        isPhoneMember: false,
        //获取初始页面
        initPage: true,
        //控制简历页面
        resumePage: false,
        //获取单人简历
        soleData: {},
        //全部的简历信息
        allResume: [],
        //学历初始化
        education: ['全部', '博士', '硕士', '本科', '专科', '高中', '中专/中技', '初中及以下'],
        //性别初始化
        sex: ['全部', '男', '女'],
        //获取全部标签的数据数组
        allLables: [{
            lableName: '全部'
        }],
        //默认当前标题
        title: '简历管理',
        //保存单页标签的数组初始页数1数量10
        tableData: [],
        multipleSelection: [],
        //用户选择要删除的标签
        selectId: '',
        //简历管理页面用户选择的id数组
        resumeSelectId: [],
        //返回标签的所有条数
        allLableMember: 0,
        allResumeMember: 0,
        //每次请求新一页标签的参数
        params: {
            page: 1,
            size: 10
        },
        //标签管理当前页数
        currentPage: 1,
        //获取当前登录用户的username
        username: '',
        //时间选择器
        pickerOptions: {
            disabledDate(time) {
                return time.getTime() > Date.now();
            },
            shortcuts: [{
                text: '一周内',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                    picker.$emit('pick', date);
                }
            }, {
                text: '一个月内',
                onClick(picker) {
                    const date = new Date();
                    date.setTime(date.getTime() - 3600 * 1000 * 24 * 30);
                    picker.$emit('pick', date);
                }
            }]
        },
        timeValueStart: '',
        timeValueEnd: '',
        //用于保存用户筛选时选择的标签数组
        labelArr: [],
        //删除简历时候的个人id
        deleteResumeId: '',
        //用于保存学历数组筛选
        educationArr: [],
        //发送5个或以上简历
        sendFive: [],
        sendFiveString: '',
        sendMoreFive: [],
        moreData: [],
        //保存批量下载的数组
        resumeMoreArr: [],
        //保存批量下载的字符
        resumeMoreString: '',
        //保存返回的简历图片
        getAllResumePicArr: [],
        getAllResumePic: '',
        //获取选中下载的循环索引
        forEachIndex: 0,
        moreDataIndex: 0,
        moreDataLength: 0,
        //在下载简历时用户的标签储存数组
        downloadLableId: [],
        //设置高亮时用到的数据
        tableDataSecond: [],
        //下载简历时候的时间
        resumeTime: ''
    },
    methods: {
        //获取上一个页面传来的姓名参数
        getRequest() {
            let url = window.location.search;
            let theRequest = new Object();
            if (url.indexOf("?") != -1) {
                let str = url.substr(1);
                strs = str.split("&");
                for (let i = 0; i < strs.length; i++) {
                    theRequest[strs[i].split("=")[0]] = decodeURI(strs[i].split("=")[1]);
                }
            }
            return theRequest;
        },

        //退出登录
        logOut() {
            signOut().then(function (res) {
                if (res.code == 200) {
                    if (window.localStorage.getItem('token')) {
                        window.localStorage.removeItem('token')
                        window.location.href = 'login.html'
                    }
                }
            })
        },

        //点击简历管理进行刷新
        changeInit() {
            window.location.reload();
        },

        //点击标签管理进行初始化
        changeInitFalse() {
            this.initPage = false
            this.changeCurrent(1)
            this.getAllLable()
        },

        //请求单页面的标签,初始页数1，初始数量10
        getHeadLabel() {
            const _this = this
            getLables(_this.params).then(function (res) {
                // console.log(res)
                if (res.code == 200) {
                    _this.tableData = res.data
                }
            })
        },

        //请求所有的标签记录返回条数
        getAllLable() {
            const _this = this
            _this.allLables = [{
                lableName: '全部'
            }]
            getLables().then(function (res) {
                // console.log(res)
                if (res.code == 200) {
                    //获取标签总数
                    _this.allLableMember = res.data.length
                    //将所有标签拼接在全部最后，用于简历页面展示
                    _this.allLables = _this.allLables.concat(res.data)
                }
            })
        },

        //标签管理页添加标签
        addLabel() {
            const _this = this
            this.$prompt('标签名称', '', {
                confirmButtonText: '确认添加',
                cancelButtonText: '取消'
            }).then(({
                value
            }) => {
                saveLable({
                    lableName: value
                }).then(function (res) {
                    // console.log(res)
                    if (res.code == 200) {
                        _this.$message({
                            type: 'success',
                            message: res.data
                        })
                        getLables().then(function (res) {
                            console.log(res)
                            if (res.code == 200) {
                                _this.allLableMember = res.data.length
                                let lastPage = Math.ceil(_this.allLableMember / 10)
                                // console.log(lastPage)
                                _this.changeCurrent(lastPage)
                            }
                        })
                    } else if (res.code == 500) {
                        _this.$message({
                            type: 'error',
                            message: res.msg
                        })
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '取消输入'
                })
            })
        },

        //标签管理当前页数改变的时候
        changeCurrent(page) {
            const _this = this
            _this.checkedLable = false
            _this.currentPage = page
            _this.params.page = page
            _this.getAllLable()
            _this.getHeadLabel()
        },

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

        //标签管理页删除单个标签
        deleteLable(index, table) {
            // console.log(table[index].id)
            const _this = this
            let deleteId = table[index].id
            this.$confirm('此操作将永久删除标签, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                //先获取当前页的数据条数，如果只有1条单独判断
                getLables({
                    page: _this.currentPage,
                    size: 10
                }).then(function (res) {
                    // console.log(res)
                    if (res.code == 200) {
                        //console.log(res.data.data.length)
                        if (res.data.length == 1) {
                            deleteLable({
                                lableIds: deleteId
                            }).then(function (res) {
                                // console.log(res)
                                if (res.code == 200) {
                                    _this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                    _this.changeCurrent(_this.currentPage - 1)
                                }
                            })
                        } else {
                            deleteLable({
                                lableIds: deleteId
                            }).then(function (res) {
                                // console.log(res)
                                if (res.code == 200) {
                                    _this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    })
                                    _this.changeCurrent(_this.currentPage)
                                }
                            })
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });

        },

        //标签管理页记录用户选择的标签id
        deleteChoice(selection, row) {
            // console.log(selection, row)
            let selectArr = []
            for (let item of selection) {
                selectArr.push(item.id)
            }
            if (selectArr.length == 10) {
                this.checkedLable = true
            } else {
                this.checkedLable = false
            }
            this.selectId = selectArr.join(',')
            // console.log(this.selectId)
        },

        //标签管理页全选
        toggleSelectionLable() {
            if (this.checkedLable) {
                this.$refs.multipleTable.toggleAllSelection();
            } else {
                this.$refs.multipleTable.clearSelection();
                this.selectId = ''
            }
        },

        //标签管理页点击删除用户选择的标签
        deleteChoiceLable() {
            const _this = this
            console.log(this.selectId)
            //当前页面全选删除
            if (_this.checkedLable) {
                this.$confirm('此操作将永久删除当前所有标签, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    // console.log(this.selectId)
                    deleteLable({
                        lableIds: this.selectId
                    }).then(function (res) {
                        //console.log(res)
                        if (res.code == 200) {
                            _this.$message({
                                type: 'success',
                                message: '删除成功!'
                            })
                        }
                        _this.changeCurrent(1)
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                if (this.selectId == '') {
                    this.$alert('请选择您要删除的标签', '', {
                        confirmButtonText: '确定'
                    })
                } else {
                    // console.log(_this.currentPage)
                    this.$confirm('此操作将永久删除您选中的标签, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        deleteLable({
                            lableIds: _this.selectId
                        }).then(function (res) {
                            // console.log(res)
                            if (res.code == 200) {
                                _this.$message({
                                    type: 'success',
                                    message: '删除成功!'
                                })
                                getLables().then(function (res) {
                                    if (res.code == 200) {
                                        _this.allLableMember = res.data.length
                                    }
                                })
                                _this.changeCurrent(_this.currentPage)
                            }
                        })
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        },

        //标签管理页处理序号
        indexMethods(index) {
            return (this.currentPage - 1) * 10 + index + 1;
        },




        //简历管理页面，获取单页简历信息，初始页页数1数量10
        getAllResume() {
            const _this = this
            getAllResumes(_this.resumePageSize).then(function (res) {
                // console.log(res)
                if (res.code == 200) {
                    //从新获单页数据取进行渲染
                    _this.allResume = res.data
                    //获取全部信息条数供分页数据使用
                    _this.allResumeMember = parseInt(res.msg)
                    //将男女改变
                    _this.allResume.map(function (item) {
                        item.gender == 0 ? item.gender = '女' : item.gender = '男'
                    })
                }
            })
        },

        //将简历信息初始化
        async resumeInit() {
            const _this = this
            _this.checked = false
            _this.status.a = true
            _this.status.b = false
            _this.status.c = false
            await _this.changeCurrentResume(1)
        },

        //简历管理 搜索手机号，姓名，工号 false true false
        async searchPnc() {
            const _this = this
            // await _this.resumeInit()
            //改变为搜索状态
            _this.checked = false
            _this.status.a = false
            _this.status.b = true
            _this.status.c = false
            _this.currentPage1 = 1
            //初始化，从第1页开始请求模糊查询
            await _this.changeCurrentResume(1)
        },

        //简历管理页面点击筛选
        async filterInfo() {
            const _this = this
            // 初始化简历信息
            // await _this.resumeInit()
            _this.checked = false
            _this.status.a = false
            _this.status.b = false
            _this.status.c = true
            _this.searchInput.phone = ''
            _this.currentPage1 = 1
            //初始化，从第1页开始请求筛选查询
            await _this.changeCurrentResume(1)
        },

        //简历管理清空选择的数据
        emptyInfo() {
            window.location.reload()
        },

        //简历管理页面当前页数改变的时候
        changeCurrentResume(page) {
            const _this = this
            if (_this.status.a == true && _this.status.b == false && _this.status.c == false) {
                _this.checked = false
                _this.currentPages = page
                _this.resumePageSize.page = page
                _this.getAllResume()
            } else if (_this.status.a == false && _this.status.b == true && _this.status.c == false) {
                _this.searchInput.page = page
                _this.currentPages1 = page
                getAllResumes(_this.searchInput).then(function (res) {
                    //console.log(res)
                    if (res.code == 200) {
                        if (res.data.length == 0) {
                            _this.showDeleDown = false
                            _this.showPage = false
                            _this.allResume = res.data
                        } else {
                            _this.showDeleDown = true
                            _this.showPage = true
                            _this.allResume = res.data
                            _this.allResume.map(function (item) {
                                item.gender == 0 ? item.gender = '女' : item.gender = '男'
                            })
                            _this.allResumeMember = parseInt(res.msg)
                        }
                    }
                })
            } else if (_this.status.a == false && _this.status.b == false && _this.status.c == true) {
                _this.searchCan.page = page
                _this.currentPages2 = page
                getAllResumes(_this.searchCan).then(function (res) {
                    // console.log(res)
                    if (res.code == 200) {
                        if (res.data.length == 0) {
                            _this.showDeleDown = false
                            _this.showPage = false
                            _this.allResume = res.data
                        } else {
                            _this.showDeleDown = true
                            _this.showPage = true
                            _this.allResume = res.data
                            _this.allResume.map(function (item) {
                                item.gender == 0 ? item.gender = '女' : item.gender = '男'
                            })
                            _this.allResumeMember = parseInt(res.msg)
                        }
                    }
                })
            }
        },

        //简历管理获取上一页简历数据
        getPrevResume(page) {
            const _this = this
            if (_this.status.a == true && _this.status.b == false && _this.status.c == false) {
                _this.checked = false
                _this.currentPages = page
                _this.resumePageSize.page = page
                _this.getAllResume()
            } else if (_this.status.a == false && _this.status.b == true && _this.status.c == false) {
                _this.searchInput.page = page
                _this.currentPages1 = page
                getAllResumes(_this.searchInput).then(function (res) {
                    //console.log(res)
                    if (res.code == 200) {
                        if (res.data.length == 0) {
                            _this.showDeleDown = false
                            _this.showPage = false
                            _this.allResume = res.data
                        } else {
                            _this.showDeleDown = true
                            _this.showPage = true
                            _this.allResume = res.data
                            _this.allResume.map(function (item) {
                                item.gender == 0 ? item.gender = '女' : item.gender = '男'
                            })
                            _this.allResumeMember = parseInt(res.msg)
                        }
                    }
                })
            } else if (_this.status.a == false && _this.status.b == false && _this.status.c == true) {
                _this.searchCan.page = page
                _this.currentPages2 = page
                getAllResumes(_this.searchCan).then(function (res) {
                    // console.log(res)
                    if (res.code == 200) {
                        if (res.data.length == 0) {
                            _this.showDeleDown = false
                            _this.showPage = false
                            _this.allResume = res.data
                        } else {
                            _this.showDeleDown = true
                            _this.showPage = true
                            _this.allResume = res.data
                            _this.allResume.map(function (item) {
                                item.gender == 0 ? item.gender = '女' : item.gender = '男'
                            })
                            _this.allResumeMember = parseInt(res.msg)
                        }
                    }
                })
            }
        },

        //简历管理获取下一页标签数据
        getNextResume(page) {
            const _this = this
            if (_this.status.a == true && _this.status.b == false && _this.status.c == false) {
                _this.checked = false
                _this.currentPages = page
                _this.resumePageSize.page = page
                _this.getAllResume()
            } else if (_this.status.a == false && _this.status.b == true && _this.status.c == false) {
                _this.searchInput.page = page
                _this.currentPages1 = page
                getAllResumes(_this.searchInput).then(function (res) {
                    //console.log(res)
                    if (res.code == 200) {
                        if (res.data.length == 0) {
                            _this.showDeleDown = false
                            _this.showPage = false
                            _this.allResume = res.data
                        } else {
                            _this.showDeleDown = true
                            _this.showPage = true
                            _this.allResume = res.data
                            _this.allResume.map(function (item) {
                                item.gender == 0 ? item.gender = '女' : item.gender = '男'
                            })
                            _this.allResumeMember = parseInt(res.msg)
                        }
                    }
                })
            } else if (_this.status.a == false && _this.status.b == false && _this.status.c == true) {
                _this.searchCan.page = page
                _this.currentPages2 = page
                getAllResumes(_this.searchCan).then(function (res) {
                    // console.log(res)
                    if (res.code == 200) {
                        if (res.data.length == 0) {
                            _this.showDeleDown = false
                            _this.showPage = false
                            _this.allResume = res.data
                        } else {
                            _this.showDeleDown = true
                            _this.showPage = true
                            _this.allResume = res.data
                            _this.allResume.map(function (item) {
                                item.gender == 0 ? item.gender = '女' : item.gender = '男'
                            })
                            _this.allResumeMember = parseInt(res.msg)
                        }
                    }
                })
            }
        },

        //简历管理处理序号的方法
        indexMethod(index) {
            if (this.status.a == true && this.status.b == false && this.status.c == false) {
                return (this.currentPages - 1) * 10 + index + 1;
            } else if (this.status.a == false && this.status.b == true && this.status.c == false) {
                return (this.currentPages1 - 1) * 10 + index + 1;
            } else if (this.status.a == false && this.status.b == false && this.status.c == true) {
                return (this.currentPages2 - 1) * 10 + index + 1;
            }
        },

        //简历管理全选删除设置
        toggleSelection() {
            if (this.checked) {
                for (let item of this.allResume) {
                    this.resumeSelectId.push(item.id)
                }
                this.$refs.multipleTableResume.toggleAllSelection();
                // console.log(this.resumeSelectId)
            } else {
                this.resumeSelectId = []
                this.$refs.multipleTableResume.clearSelection();
                // console.log(this.resumeSelectId)
            }
        },

        //简历管理删除用户当前选择的简历
        deleteThisResume(selection, row) {
            // console.log(selection, row)
            // console.log(this.allResume.length)
            if (selection.length == this.allResume.length) {
                this.checked = true
            } else {
                this.checked = false
            }
            let selectArr = []
            for (let item of selection) {
                selectArr.push(item.id)
            }
            this.resumeSelectId = selectArr
            // console.log(this.resumeSelectId)
        },

        //简历管理点击全选删除，用户选择的简历
        deleteChoiceResume() {
            const _this = this
            //console.log(this.resumeSelectId)
            if (_this.checked) {
                this.$confirm('此操作将永久删除当前所有简历, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    for (let i in _this.resumeSelectId) {
                        // console.log(_this.resumeSelectId.length)
                        deleteResumeById({
                            resumeId: _this.resumeSelectId[i]
                        }).then(function (res) {
                            // console.log(res)
                            if (res.code == 200) {
                                if (i == _this.resumeSelectId.length - 1) {
                                    // console.log('到最后了')
                                    _this.$message({
                                        type: 'success',
                                        message: '删除成功!'
                                    });
                                    // _this.currentPage1 = 1
                                    // _this.changeCurrentResume(1)
                                    window.location.reload();
                                }
                            }
                        })
                    }
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            } else {
                if (this.resumeSelectId.length == 0) {
                    this.$alert('请选择您要删除的简历', '', {
                        confirmButtonText: '确定'
                    });
                } else {
                    this.$confirm('此操作将永久删除您选中的简历, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                    }).then(() => {
                        for (let i in _this.resumeSelectId) {
                            // console.log(_this.resumeSelectId.length)
                            deleteResumeById({
                                resumeId: _this.resumeSelectId[i]
                            }).then(function (res) {
                                // console.log(res)
                                if (res.code == 200) {
                                    if (i == _this.resumeSelectId.length - 1) {
                                        // console.log('到最后了')
                                        _this.$message({
                                            type: 'success',
                                            message: '删除成功!'
                                        });
                                        if (_this.status.a == true && _this.status.b == false && _this.status.c == false) {
                                            _this.changeCurrentResume(_this.currentPages)
                                        } else if (_this.status.a == false && _this.status.b == true && _this.status.c == false) {
                                            _this.changeCurrentResume(_this.currentPages1)
                                        } else if (_this.status.a == false && _this.status.b == false && _this.status.c == true) {
                                            _this.changeCurrentResume(_this.currentPages2)
                                        }
                                    }
                                }
                            })
                        }
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            message: '已取消删除'
                        });
                    });
                }
            }
        },

        //简历管理删除单个简历
        deleteResume(index, table) {
            console.log(table[index].id)
            let deleteId = table[index].id
            const _this = this
            this.$confirm('此操作将永久删除个人简历, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                deleteResumeById({
                    resumeId: deleteId
                }).then(function (res) {
                    // console.log(res)
                    if (res.code == 200) {
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        if (_this.status.a == true && _this.status.b == false && _this.status.c == false) {
                            _this.changeCurrentResume(_this.currentPages)
                        } else if (_this.status.a == false && _this.status.b == true && _this.status.c == false) {
                            _this.changeCurrentResume(_this.currentPages1)
                        } else if (_this.status.a == false && _this.status.b == false && _this.status.c == true) {
                            _this.changeCurrentResume(_this.currentPages2)
                        }
                    }
                })
            }).catch(() => {
                this.$message({
                    type: 'info',
                    message: '已取消删除'
                });
            });
        },

        //添加备注 a==0 未添加过备注 a!=0
        addRemarks(a, arr) {
            const _this = this
            _this.postRemarksId = arr.id
            if (a == 0) {
                _this.needAddRemarks = true
                _this.remarksText = ''
            } else {
                showRemarks({
                    resumeId: arr.id
                }).then(function (res) {
                    // console.log(res)
                    if (res.code == 200) {
                        _this.remarksArr = res.data
                    }
                })
                _this.needSeeRemarks = true
            }
        },

        //关闭备注弹框
        closeRemarks() {
            this.needAddRemarks = false
            this.needSeeRemarks = false
            this.remarksText = ''
        },

        //多次添加备注
        postMoreRemarks() {
            const _this = this
            _this.needSeeRemarks = false
            _this.needAddRemarks = true
            _this.remarksText = ''
            _this.postRemarks()
        },

        //发送当前要添加的备注，对当前状态进行判断
        postRemarks() {
            const _this = this
            saveRemarks({
                resumeId: _this.postRemarksId,
                content: _this.remarksText
            }).then(function (res) {
                // console.log(res)
                if (res.code == 200) {
                    _this.$message({
                        type: 'success',
                        message: '添加成功!'
                    });
                    if (_this.status.a == true && _this.status.b == false && _this.status.c == false) {
                        _this.getAllResume()
                        _this.closeRemarks()
                    } else if (_this.status.a == false && _this.status.b == true && _this.status.c == false) {
                        _this.changeCurrentResume(_this.currentPages1)
                        _this.closeRemarks()
                    } else if (_this.status.a == false && _this.status.b == false && _this.status.c == true) {
                        _this.changeCurrentResume(_this.currentPages2)
                        _this.closeRemarks()
                    }
                }
            })
        },



        //获取开始的时间
        getSeTimeStart(data) {
            // console.log(data)
            this.searchCan.start = data
            this.getSeTimeEnd()
        },

        //获取结束的时间
        getSeTimeEnd(data) {
            // console.log(data)
            if (data == undefined) {
                const date = new Date();
                let nowTime = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate()
                // console.log(nowTime)
                this.searchCan.end = nowTime
            } else {
                this.searchCan.end = data
            }
        },

        //获取到查询的学历
        getEducation(e, i) {
            // console.log(e, i)
            let lis = document.querySelector('#edu').children
            // console.log(lis)
            if (i == 0) {
                for (let j = 0; j < lis.length; j++) {
                    if (j == 0) {
                        lis[j].style.color = '#37c2b9'
                    } else {
                        lis[j].style.color = 'black'
                    }
                }
                this.clickEindex = '0'
                //清空保存学历的数组
                this.educationArr = []
                // console.log(this.educationArr)
            } else {
                //先把全部变成黑色
                lis[0].style.color = 'black'
                //将初始控制颜色的clickEindex停止使用
                this.clickEindex = '-1'
                let click_item = this.education[i]
                //判断为0可以直接变色，如果不为0则需要判断变黑色
                if (this.educationArr.length == 0) {
                    //变掉当前颜色
                    e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
                    //将点击的名称保存到数组
                    this.educationArr.push(click_item)
                    // console.log(this.educationArr)
                } else {
                    //循环当前已经选中的学历
                    for (let i in this.educationArr) {
                        if (this.educationArr[i] == click_item) {
                            //如果相等说明当前已经点击变色了，需要点击变黑色并在数组中删除
                            e.srcElement.style = 'list-style:none;margin-right:30px'
                            this.educationArr.splice(i, 1)
                            if (this.educationArr.length == 0) {
                                lis[0].style.color = '#37c2b9'
                                this.educationArr = []
                            }
                            // console.log(this.educationArr)
                        } else {
                            // 如果不相等说明未添加
                            e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
                            //解决for循环带来的数据重复问题
                            this.educationArr = this.educationArr.filter(function (item) {
                                return item != click_item
                            })
                            this.educationArr.push(click_item)
                            // console.log(this.educationArr)
                        }
                    }
                }
            }
            this.searchCan.post = this.educationArr.join(',')
            // console.log(this.searchCan.post)
        },

        //获取查询的性别
        getSex(i) {
            this.clickSindex = i
            if (i == 0) {
                this.searchCan.gender = ''
            } else {
                if (i == 1) {
                    this.searchCan.gender = '1'
                } else {
                    this.searchCan.gender = '0'
                }
            }
        },

        //获取查询的标签
        getLable(e, item, i) {
            // console.log(item, i)
            if (i == 0) {
                this.clickLindex = '0'
                this.labelArr = []
                this.getAllLable()
            } else {
                this.clickLindex = '-1'
                let click_item = item.id
                if (this.labelArr.length == 0) {
                    e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
                    this.labelArr.push(click_item)
                } else {
                    for (let i in this.labelArr) {
                        if (this.labelArr[i] == click_item) {
                            e.srcElement.style = 'list-style:none;margin-right:30px'
                            this.labelArr.splice(i, 1)
                            if (this.labelArr.length == 0) {
                                this.clickLindex = '0'
                                this.labelArr = []
                            }
                        } else {
                            e.srcElement.style = 'color:#37c2b9;list-style:none;margin-right:30px'
                            this.labelArr = this.labelArr.filter(function (item) {
                                return item != click_item
                            })
                            this.labelArr.push(click_item)
                        }
                    }
                }
            }
            this.searchCan.lable = this.labelArr.join(',')
            // console.log(this.searchCan.lable)
        },


        //下载个人简历 获取个人简历的id
        async downloadResume(i, arr) {
            //console.log(i, arr, arr[i].id)
            const _this = this
            _this.deleteResumeId = arr[i].id
            await _this.getSoleResume()
            await _this.getCanvas()
        },
        //获取指定单人的简历信息
        async getSoleResume() {
            const _this = this
            await resumeDownload({
                resumeId: _this.deleteResumeId
            }).then(function (res) {
                // console.log(res)
                // console.log(JSON.parse(res.data.data))
                if (res.code == 200) {
                    _this.soleData = JSON.parse(res.data.data)[0]
                    // console.log(_this.soleData)
                    if (_this.soleData.lableid) {
                        let lableLength = _this.soleData.lableid.split(',').length
                        //console.log(_this.soleData.lableid.split(','))
                        //console.log(_this.soleData.lableid.split(',').splice(0, lableLength - 1))
                        _this.downloadLableId = _this.soleData.lableid.split(',').splice(0, lableLength - 1)
                    }
                    _this.soleData.gender == 0 ? _this.soleData.gender = '女' : _this.soleData.gender = '男'
                    // _this.soleData.experience = _this.soleData.experience.replace(/↵/g, "/n");
                    _this.soleData.skill = "<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" + _this.soleData.skill + '</pre>'
                    _this.soleData.experience = "<pre style='white-space: pre-wrap;white-space: -moz-pre-wrap;white-space: -pre-wrap;white-space: -o-pre-wrap;word-wrap: break-word;font-size: 12px;font-family: Arial, Helvetica, sans-serif;'>" + _this.soleData.experience + '</pre>'
                    // console.log(_this.soleData)
                }
            })
        },
        //获取当前简历的canvas
        getCanvas() {
            const _this = this
            //console.log(_this.soleData)
            // let test = $(".test").get(0);
            //用原生方法解决
            let test = document.getElementById('test')
            // console.log(test)
            html2canvas(test, {
                allowTaint: true,
                logging: false,
                width: 595,
                height: 842
            }).then(function (canvas) {
                _this.downLoad(_this.saveAsPNG(canvas));
            })
        },
        //转为png
        saveAsPNG(canvas) {
            return canvas.toDataURL("image/png");
        },
        //自动下载到本地
        downLoad(url) {
            const _this = this
            var oA = document.createElement("a");
            oA.download = _this.soleData.name; // 设置下载的文件名，默认是'下载'
            oA.href = url;
            document.body.appendChild(oA);
            oA.click();
            oA.remove(); // 下载之后把创建的元素删除
        },


        //简历管理页面，批量下载简历
        downloadMoreResume() {
            const _this = this
            // console.log(_this.resumeSelectId.length)
            if (_this.resumeSelectId.length == 0) {
                _this.$alert('请选择您要下载的简历', '', {
                    confirmButtonText: '确定'
                })
            } else {
                _this.$loading({
                    lock: true,
                    text: '努力下载打包中，请耐心等待',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.7)'
                })
                //将选择的用户id拼接成为字符串
                _this.sendFive = _this.resumeSelectId
                _this.sendFiveString = _this.sendFive.join(',')
                _this.getFiveBase()
            }
        },
        //获取到个人的数据
        getFiveBase() {
            const _this = this
            resumeDownload({
                resumeId: _this.sendFiveString
            }).then(function (res) {
                // 准备打印出来的简历数据
                // console.log(JSON.parse(res.data.data))
                if (res.code == 200) {
                    _this.moreData = JSON.parse(res.data.data)
                    for (let item of _this.moreData) {
                        item.gender == 0 ? item.gender = '女' : item.gender = '男'
                    }
                    _this.moreDataLength = _this.moreData.length
                    _this.nanDownload()
                }
            })
        },
        //对简历逐个循环下载
        nanDownload() {
            const _this = this
            _this.soleData = {}
            //_this.moreDataIndex初始为0，从第一个开始取值
            _this.soleData = _this.moreData[_this.moreDataIndex]
            //console.log(_this.soleData)
            //对个人数据中标签进行转化
            if (_this.soleData.lableid) {
                let lableLength = _this.soleData.lableid.split(',').length
                _this.downloadLableId = _this.soleData.lableid.split(',').splice(0, lableLength - 1)
            }
            //将时间传入打包姓名
            if (_this.soleData.createDate) {
                let date = new Date(_this.soleData.createDate)
                let year = date.getFullYear()
                let month = date.getMonth() + 1
                let day = date.getDate()
                let hours = date.getHours()
                let minutes = date.getMinutes()
                let second = date.getSeconds()
                _this.resumeTime = year + "-" + month + "-" + day + " " + hours + ":" + minutes
                //console.log(_this.resumeTime)
            }
            setTimeout(() => {
                // let test = $(".test").get(0);
                let test = document.getElementById('test')
                //console.log(test)
                html2canvas(test, {
                    allowTaint: true,
                    logging: false,
                    width: 595,
                    height: 842
                }).then(function (canvas) {
                    //转化参数
                    let params = new URLSearchParams()
                    params.append('imgStr', _this.saveAsPNG(canvas))
                    saveResumeImage(params).then(function (data) {
                        // console.log(data)
                        //保证简历的唯一性
                        _this.getAllResumePicArr.push(data.data[0] + 'AIMERPERSONNEL' + _this.resumeTime + _this.soleData.name)
                        _this.getAllResumePic = _this.getAllResumePicArr.join(',')
                        //索引+1
                        _this.moreDataIndex++
                        //当索引与数据相同时代表到最后了
                        if (_this.moreDataIndex == _this.moreDataLength) {
                            window.open('http://np.aimergroup.com:8081/api/resume/uploadResume?resumeStr=' + _this.getAllResumePic)
                            // this.loading.close();
                            setTimeout(function () {
                                window.location.reload()
                            }, 2000)
                        }
                        //延迟之后进行下一轮循环
                        setTimeout(() => {
                            _this.nanDownload()
                        }, 500)
                    })
                })
            }, 3000)
        }
    },
    created() {
        this.getAllResume()
        this.getHeadLabel()
        this.getAllLable()
        this.usernametop = this.getRequest().username
        // if (this.allResume.length == 0) {
        //     this.showDeleDown = false
        //     this.showPage = false
        // } else {
        //     this.showDeleDown = true
        //     this.showPage = true
        // }
    },
    filters: {
        changeTime(item) {
            return item.substr(0, 10)
        },
        totalLablePage(item) {
            return Math.ceil(item / 10)
        },
        filterTime(item) {
            // item.createDate = item.createDate.substr(5, 5) + '  ' + item.createDate.substr(11, 5)
            return item.substr(5, 5) + '  ' + item.substr(11, 5)
        }
    }
})