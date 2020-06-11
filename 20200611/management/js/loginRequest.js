function request(config) {
    const instance = axios.create({
        //生产环境域名
        baseURL: 'http://np.aimergroup.com:8081/api/',
        timeout: 5000
    })

    //请求拦截
    instance.interceptors.request.use(config => {
        return config
    }, err => {
        console.log(err)
    })

    //响应拦截
    instance.interceptors.response.use(res => {
        return res.data
    }, err => {
        console.log(err)
    })

    //发送真正的网络请求
    return instance(config)
}