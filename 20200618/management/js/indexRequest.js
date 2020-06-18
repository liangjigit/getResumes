function request(config) {
    const instance = axios.create({
        //生产环境域名
        baseURL: 'http://np.aimergroup.com:8081/api/',
        timeout: 5000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        if (window.localStorage.getItem('token')) {
            Object.assign(config.headers, { 'token': window.localStorage.getItem('token') })
                // console.log(config)
        } else {
            alert('您还未登陆，请进行登陆！')
            window.location.href = 'login.html'
        }
        return config
    }, err => {
        console.log(err)
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        // console.log(res.data)
        if (res.data.code == 505) {
            alert('登录超时，请您重新登录！')
            if (window.localStorage.getItem('token')) {
                window.open('http://np.aimergroup.com:8081/api/user/signOut', '_self')
                window.localStorage.removeItem('token')
                window.location.href = 'login.html'
            } else {
                window.open('http://np.aimergroup.com:8081/api/user/signOut', '_self')
                window.location.href = 'login.html'
            }
        } else {
            return res.data
        }
    }, err => {
        console.log(err)
    })

    //发送真正的网络请求
    return instance(config)
}