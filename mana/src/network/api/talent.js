import request from '../index.js'

/**
 * 获取所有才华的接口
 */
export function getAllTalent(params, success, failure,configuration) {
	return request.post('reserve/personnel/findAll', params, success, failure,configuration)
}

/**
 * 获取所有需求的接口
 */
export function getAllDemand(params, success, failure,configuration) {
	return request.post('reserve/demand/findAll', params, success, failure,configuration)
}
