// 引用
const axios = require('axios');
const Qs = require('qs');
import {
	Message,
	MessageBox
} from 'element-ui';
import router from '../router/index.js'

//配置接口的域名
const root = '/api'

// 自定义判断元素类型JS
function toType(obj) {
	return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}

// 参数过滤函数
function filterNull(o) {
	for (let key in o) {
		if (o[key] === null) {
			delete o[key]
		}
		if (toType(o[key]) === 'string') {
			o[key] = o[key].trim()
		} else if (toType(o[key]) === 'object') {
			o[key] = filterNull(o[key])
		} else if (toType(o[key]) === 'array') {
			o[key] = filterNull(o[key])
		}
	}
	return o
};

//封装提示函数
function message(title, sure, next) {
	MessageBox.confirm(title, '提示', {
		confirmButtonText: sure,
		cancelButtonText: '取消',
		type: 'warning'
	}).then(() => {
		router.replace({
			path: next
		})
	}).catch(() => {
		Message.warning({
			message: '已取消'
		})
	});
}

//设置请求拦截
axios.interceptors.request.use(
	config => {
		const token = window.localStorage.getItem("token");
		if (token) {
			// 判断是否存在token，如果存在的话，则每个http header都加上token
			config.headers.token = token; //Authorization是登录接口返回
		}
		return config;
	},
	err => {
		return Promise.reject(err);
	}
);

//设置响应拦截
axios.interceptors.response.use(
	response => {
		let code = response.data.code.toString()
		// console.log(code)
		switch (code) {
			//登录超时
			case '505':
				window.open('http://np.aimergroup.com:8081/api/user/signOut', '_self')
				window.localStorage.removeItem('token')
				message('登录超时, 是否重新登录?', '重新登录', '/login', );
				break;
		}
		return response;
	},
	//接口错误状态处理
	error => {
		const {
			response: {
				status
			}
		} = error;
		return Promise.reject(error); // 返回接口返回的错误信息
	}
);

//处理接口函数
function apiAxios(method, url, params, success, failure, configuration) {
	if (params) {
		params = filterNull(params)
	}

	axios({
			method: method,
			url: url,
			data: method === 'POST' || method === 'PUT' ? Qs.stringify(params) : null,
			params: method === 'GET' || method === 'DELETE' ? params : null,
			baseURL: root,
			withCredentials: true,
			timeout: 30000,
			headers: {
				'resource_token': configuration
			}
		})
		.then(function(res) {
			// console.log(res)
			if (res.status == 200) {
				success(res.data)
			} else {
				failure(res.data);
				window.alert('errCode:' + res.status)
			}
		})
		.catch(function(error) {
			// console.log(error);
			if (error.response) {
				window.alert('errCode' + error.response.status)
			}
		})
}

// 返回在vue模板中的调用接口
export default {
	get: function(url, params, success, failure, configuration) {
		return apiAxios('GET', url, params, success, failure, configuration)
	},
	post: function(url, params, success, failure, configuration = 'order-list') {
		return apiAxios('POST', url, params, success, failure, configuration)
	},
	put: function(url, params, success, failure, configuration) {
		return apiAxios('PUT', url, params, success, failure, configuration)
	},
	delete: function(url, params, success, failure, configuration) {
		return apiAxios('DELETE', url, params, success, failure, configuration)
	}
}
