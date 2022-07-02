module.exports = {
	publicPath: './',
	productionSourceMap: false,
	//changeOrigin:true,
	devServer: {
		host: 'localhost',
		port: 8200,
		open: true,
		proxy: {
			//配置跨域
			'/api': {
				target: "tva1.sinaimg.cn",
				changOrigin: true,
				pathRewrite: {
					'^/api': '/'
				}
			}
		},

	},



}
