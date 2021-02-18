import request from '../index.js'
/**
 * 添加标签
 */
export function saveLabel(params, success, failure) {
	return request.post('lable/saveLable', params, success, failure)
}

/**
 * 获取标签
 */
export function getLabel(params, success, failure) {
	return request.get('lable/findAllLable', params, success, failure)
}

/**
 * 删除标签
 */
export function deleLabel(params, success, failure) {
	return request.post('lable/deleteLable', params, success, failure)
}

/**
 * 获取简历
 */
export function getResume(params, success, failure) {
	return request.post('resume/resumePage', params, success, failure)
}

/**
 * 删除简历
 */
export function deleResume(params, success, failure) {
	return request.post('resume/deleteResumeById', params, success, failure)
}

/**
 * 显示已经上传的备注
 */
export function showRemark(params, success, failure) {
	return request.post('remarks/findId', params, success, failure)
}

/**
 * 上传备注
 */
export function saveRemark(params, success, failure) {
	return request.post('remarks/save', params, success, failure)
}

/**
 * 下载简历
 */
export function resumeDownload(params, success, failure) {
	return request.post('resume/resumeDownload', params, success, failure)
}

/**
 * 保存简历图片
 */
export function saveResumeImage(params, success, failure) {
	return request.post('resume/saveResumeImage', params, success, failure)
}

/**
 * 退出登录
 */
export function signOut(success, failure) {
	return request.post('user/signOut', success, failure)
}

/**
 * 下载简历压缩包
 */
export function downloadZip(params, success, failure) {
	return request.get('resume/uploadResume', params, success, failure)
}
