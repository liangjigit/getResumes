module.exports = {
	devServer: {
	        // open: process.platform === 'vue',
					// open:true,
					// hotOnly: false,
	        host: 'localhost',
	        port: 8080,
					overlay: {
					  warnings: false,
					  errors: true
					},
	        proxy: { // 设置代理
	            '/api': {
	                target: 'http://np.aimergroup.com:8081/api/',
	                changeOrigin: true,
									secure:false,
	                pathRewrite: {
	                    '^/api': ''
	                }
	            }
	        }
	    }
}