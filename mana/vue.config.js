module.exports = {
	publicPath: './',
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
				//生产环境
				target: 'http://np.aimergroup.com:8081/api/',
				// target:'http://10.2.7.160:7300/',
				//测试环境
				// target: 'http://192.168.52.25:7300/',
				changeOrigin: true,
				secure: false,
				pathRewrite: {
					'^/api': ''
				}
			}
		}
	},
	configureWebpack: {
		performance: {
			hints: 'warning',
			//入口起点的最大体积 整数类型（以字节为单位）
			maxEntrypointSize: 50000000,
			//生成文件的最大体积 整数类型（以字节为单位 300k）
			maxAssetSize: 30000000,
			//只给出 js 文件的性能提示
			assetFilter: function(assetFilename) {
				return assetFilename.endsWith('.js');
			}
		}
	}
}
