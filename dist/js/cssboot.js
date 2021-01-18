var _rootPath = (function () {
    var path = location.pathname;

    if(path.indexOf('/') === 0) {
    	path = path.substring(1);
    }

    return '/' + path.split('/')[0];
}());


(function(win){
	var SrcBoot = {
		getPath: function(path) {
			// 全路径
	       	if (/^(http|https|ftp)/g.test(path)) {
	            return path;
	        }

	        // 用于测试本地mockjs测试用例js，约定以_test最为前缀，debug为false时不在页面输出
			if(path.indexOf('_test') != -1 && !this.debug) {
				return false;
			}

			// 是否是相对路径
			var isRelative = path.indexOf('./') === 0 || path.indexOf('../') === 0;

			path = (isRelative ? '' :  (_rootPath + '/')) + path;

			return path;
		},

		getExt: function(path) {
			if(path.indexOf('?') != -1) {
				path = path.split('?')[0];
			}

			var dotPos = path.lastIndexOf('.'),
				ext = path.substring(dotPos + 1);

			return ext;
		},

		// 批量输出css|js
		output: function(arr) {
			var i = 0,
				len = arr.length,
				path,
				ext;

			for(; i < len; i++) {
				path = this.getPath(arr[i]);

				if(path) {
					ext = this.getExt(path);

					if(ext == 'js') {
						document.writeln('<script src="' + path + '"></sc' + 'ript>');
					} else {
						document.writeln('<link rel="stylesheet" href="' + path + '">');
					}

				}
			}
		}
	};
	var arr = [
		'../bootstrap/css/bootstrap.min.css',
		'../dist/css/font-awesome.min.css',
		'../dist/css/ionicons.min.css',
		'../dist/css/AdminLTE.min.css',
		'../dist/css/skins/_all-skins.min.css'
	];
	SrcBoot.output(arr);
	win.SrcBoot = SrcBoot;
}(this));
