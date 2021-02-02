import request from '../index.js'

/**
 * 获取所有图片的接口
 */
export function getAllImage(params, success, failure) {
	return request.post('service/data/selectAll', params, success, failure)
}
