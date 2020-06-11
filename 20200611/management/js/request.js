//获取简历页面的接口   resume/resumePage post请求
function getAllResumes(data) {
    return request({
        method: 'post',
        url: 'resume/resumePage',
        params: data
    })
};

//获取标签的接口  lable/findAllLable  get请求
function getLables(data) {
    return request({
        method: 'get',
        url: 'lable/findAllLable',
        params: data
    })
}

//退出登录的接口 user/signOut post请求
function signOut() {
    return request({
        method: 'post',
        url: 'user/signOut'
    })
}

//添加标签的接口 lable/saveLable  post请求
function saveLable(data) {
    return request({
        method: 'post',
        url: 'lable/saveLable',
        params: data
    })
}

//删除标签的接口 lable/deleteLable post请求
function deleteLable(data) {
    return request({
        method: 'post',
        url: 'lable/deleteLable',
        params: data
    })
}

//批量删除简历  resume/deleteResumeById  post请求
function deleteResumeById(data) {
    return request({
        method: 'post',
        url: 'resume/deleteResumeById',
        params: data
    })
}

//下载简历  resume/resumeDownload  post请求
function resumeDownload(data) {
    return request({
        method: 'post',
        url: 'resume/resumeDownload',
        params: data
    })
}

//用于显示已经上传的备注  remarks/findId  post请求
function showRemarks(data) {
    return request({
        method: 'post',
        url: 'remarks/findId',
        params: data
    })
}

//多次保存备注  remarks/save  post请求
function saveRemarks(data) {
    return request({
        method: 'post',
        url: 'remarks/save',
        params: data
    })
}

//保存简历图片  resume/saveResumeImage post请求
function saveResumeImage(params) {
    return request({
        method: 'post',
        url: 'resume/saveResumeImage',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        data: params
    })
}