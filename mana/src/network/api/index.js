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