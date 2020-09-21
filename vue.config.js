module.exports = {
  runtimeCompiler: true,
  publicPath: '/dist/', // 设置打包文件相对路径
  outputDir: 'dist',
  indexPath: '../pages/app.html',
  lintOnSave: false,
  css: {
    loaderOptions: {
		  less: {
        modifyVars: {
			  'primary-color': '#3961cd',
			  'link-color': '#3961cd',
			  'border-radius-base': '5px',
        'warning-color': '#f29118',
        'disabled-color': '#cccccc',
        'success-color': '#52c41a'
        },
        javascriptEnabled: true
		  }
    }
  },
  devServer: {
    port: 8888,
    proxy: {
      '/api': {
        target: 'http://webcg.yiqiandai.com/',
        // target: 'http://192.168.35.225/',
        // target: 'http://192.168.35.66:8080/',
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    }
  }
}
