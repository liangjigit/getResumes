new Vue({
    el: '#app',
    data: {
        //用户名
        username: '',
        //登录密码
        password: '',
    },
    methods: {
        //通过点击登陆
        login() {
            const _this = this
            request({
                method: 'post',
                url: 'user/sub',
                params: {
                    username: _this.username,
                    password: _this.password
                }
            }).then(function (res) {
                // console.log(res)
                if (res.code == 200) {
                    window.localStorage.setItem('token', res.data)
                    window.location.href = 'index.html?username=' + res.msg
                } else {
                    window.alert('用户名称和登录密码错误,请检查!')
                }
            })
        },
        //在输入用户名密码时通过回车登陆
        submit() {
            const _this = this
            _this.login()
        },
        //登陆input聚焦
        inputFocus() {
            const _this = this
            const input = _this.$refs.login
            input.focus()
        }
    }
})