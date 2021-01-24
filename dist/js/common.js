var curPath = window.document.location.href;
var pathName = window.document.location.pathname;
var pos = curPath.indexOf(pathName);
var localhostPaht = curPath.substring(0, pos);
var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
function initHeadAndFoot() {
	var Include = function(cfg) {
		this.cfg = cfg;
		this._init();
	};
	Include.prototype = {
		constructor : Include,
		_init : function() {
			var c = this.cfg;
			if (c.async !== false)
				c.async = true;
			this.$container = $('#' + c.id);
		},

		fetch : function() {
			var c = this.cfg, self = this;
			return $.ajax({
				url : c.src,
				type : 'GET',
				dataType : 'html',
				async : c.async,
				success : function(html) {
					self.$container.html(html);
					c.onload && c.onload(html);
				}
			});
		}
	};
	// 需要引入的代码片段
	var includes = [ {
		id : 'header',
		src : '../../common/headerframe.inc.html',
		onload : function() {
			// console.log('...header loaded...');
		}
	}, {
		id : 'footer',
		src : '../../common/footer.inc.html',
		onload : function() {

		}
	} ];

	$.each(includes, function(i, cfg) {
		if ($('#' + cfg.id).length) {
			new Include(cfg).fetch();
		}
	});
}
function initHeadAndFoot1(header, footer) {
	var Include = function(cfg) {
		this.cfg = cfg;

		this._init();
	};

	Include.prototype = {
		constructor : Include,

		_init : function() {
			var c = this.cfg;

			if (c.async !== false)
				c.async = true;

			this.$container = $('#' + c.id);
		},

		fetch : function() {
			var c = this.cfg, self = this;

			return $.ajax({
				url : c.src,
				type : 'GET',
				dataType : 'html',
				async : c.async,
				success : function(html) {
					self.$container.html(html);
					c.onload && c.onload(html);
				}
			});
		}
	};
	// 需要引入的代码片段
	var includes = [ {
		id : 'header',
		src : header,
		onload : function() {
			// console.log('...header loaded...');
		}
	}, {
		id : 'footer',
		src : footer,
		onload : function() {
			// console.log('...footer loaded...');
		}
	} ];

	$.each(includes, function(i, cfg) {
		if ($('#' + cfg.id).length) {
			new Include(cfg).fetch();
		}
	});
}

function initHeadAndFootFrame1() {
	var Include = function(cfg) {
		this.cfg = cfg;

		this._init();
	};

	Include.prototype = {
		constructor : Include,

		_init : function() {
			var c = this.cfg;

			if (c.async !== false)
				c.async = true;

			this.$container = $('#' + c.id);
		},

		fetch : function() {
			var c = this.cfg, self = this;

			return $.ajax({
				url : c.src,
				type : 'GET',
				dataType : 'html',
				async : c.async,
				success : function(html) {
					self.$container.html(html);
					c.onload && c.onload(html);
				}
			});
		}
	};
	// 需要引入的代码片段
	var includes = [ {
		id : 'header',
		src : '../common/headerframe.inc.html',
		onload : function() {
			// console.log('...header loaded...');
		}
	}, {
		id : 'footer',
		src : '../common/footerframe.inc.html',
		onload : function() {
			// console.log('...footer loaded...');
		}
	} ];

	$.each(includes, function(i, cfg) {
		if ($('#' + cfg.id).length) {
			new Include(cfg).fetch();
		}
	});

}

function initHeadAndFootFrame() {
	var Include = function(cfg) {
		this.cfg = cfg;
		this._init();
	};
	Include.prototype = {
		constructor : Include,
		_init : function() {
			var c = this.cfg;
			if (c.async !== false)
				c.async = true;
			this.$container = $('#' + c.id);
		},
		fetch : function() {
			var c = this.cfg, self = this;
			return $.ajax({
				url : c.src,
				type : 'GET',
				dataType : 'html',
				async : c.async,
				success : function(html) {
					self.$container.html(html);
					c.onload && c.onload(html);
				}
			});
		}
	};
	// 需要引入的代码片段
	var includes = [ {
		id : 'header',
		src : 'views/common/header.inc.html',
		onload : function() {
			// console.log('...header loaded...');
		}
	}, {
		id : 'footer',
		src : 'views/common/footer.inc.html',
		onload : function() {
			// console.log('...footer loaded...');
		}
	} ];

	$.each(includes, function(i, cfg) {
		if ($('#' + cfg.id).length) {
			new Include(cfg).fetch();
		}
	});

}


function getUrlParam(name) {
	var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)");
	var url = decodeURI(window.location.search);
	var r = url.substr(1).match(reg);
	if (r != null)
		return (r[2]);
	return '';
}
function clearHTML(html) {
	return html.replace(/(\r\n|\n|\r)/g, "").replace(/[\t ]+\</g, "<").replace(
			/\>[\t ]+\</g, "><").replace(/\>[\t ]+$/g, ">");
}

function setCookie(c_name, value, expiredays) {
	var exdate = new Date()
	exdate.setDate(exdate.getTime() + expiredays)
	document.cookie = c_name + "=" + escape(value)
			+ ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}
function getCookie(c_name) {
	if (document.cookie.length > 0) {
		c_start = document.cookie.indexOf(c_name + "=")
		if (c_start != -1) {
			c_start = c_start + c_name.length + 1
			c_end = document.cookie.indexOf(";", c_start)
			if (c_end == -1)
				c_end = document.cookie.length
			return unescape(document.cookie.substring(c_start, c_end))
		}
	}
	return ""
}


// 解决底部自动导航的问题
function autoNav() {
	// 获取内容的高度
	var bodyHeight = $("body").height();
	// 获取底部导航的高度
	var navHeight = $(".navbar").height();
	// 获取显示屏的高度
	var iHeight = document.documentElement.clientHeight
			|| document.body.clientHeight;
	// 如果内容的高度大于（窗口的高度 - 导航的高度）,z则需要添加一个div，设置其高度
	if (bodyHeight > (iHeight - navHeight)) {
		$("body").append('<div style="height: ' + navHeight + 'px"></div>');
	}
}

function initPage(actionname, param, callback) {
	var serviceUrl = getProjectURL();
	var json = null;
	param = JSON.stringify(param);// 这个是将参数转换为json
	$.ajax({
		url : serviceUrl + actionname + "/pageload",
		type : 'post',
		data : param,
		success : function(data) {
			$(".fui_form .inputtext").each(function(index, elemnt) {
				var id = $(this).attr('id');
				$(this).val(data[id]);
			});
			callback(data);
		},
		error : function(json) {
			callback(json);
		}
	});

}

function execFunc(methodname, param, callback) {
	var strs = [];
	if (methodname.indexOf('/') > 0) {
		strs = methodname.split('/');
	} else {
		strs = methodname.split('.');
	}
	var actionname = strs[0];
	var funcname = strs[1];
	var serviceUrl = getProjectURL();
	var json = null;
	params = JSON.stringify(param);// 这个是将参数转换为json
	$.ajax({
		url : serviceUrl + actionname + '\/' + funcname,
		contentType : "application/json;charset=UTF-8",
		type : 'post',
		data : params,
		success : function(data) {
			callback(data);
		},
		error : function(data) {
			callback(json);
			console.log('接口不通' + methodname + data);
		}
	});

}

function execFuncAsync(methodname, param, callback) {
	var strs = [];
	if (methodname.indexOf('/') > 0) {
		strs = methodname.split('/');
	} else {
		strs = methodname.split('.');
	}
	var actionname = strs[0];
	var funcname = strs[1];
	var serviceUrl = getProjectURL();
	var json = null;
	params = JSON.stringify(param);// 这个是将参数转换为json
	$.ajax({
		url : serviceUrl + actionname + '\/' + funcname,
		contentType : "application/json;charset=UTF-8",
		type : 'post',
		async : true,
		data : params,
		success : function(data) {
			callback(data);
		},
		error : function(error) {
			json = null;
			callback(json);
			console.log('接口不通' + methodname + error);
		}
	});

}

function clearHtml(html) {
	return html.replace(/(\r\n|\n|\r)/g, "").replace(/[\t ]+\</g, "<").replace(
			/\>[\t ]+\</g, "><").replace(/\>[\t ]+$/g, ">");
}

function getProjectURL() {
	var curPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curPath.indexOf(pathName);
	var localhostPaht = curPath.substring(0, pos);
	var projectName = pathName.substring(0, pathName.substr(1).indexOf('/') + 1);
	var urlpath = localhostPaht + projectName;
	return "https://81.70.85.14:8443/";
}

function initEditor() {
	var editor = new wangEditor('#txtDiv');
	editor.customConfig.uploadImgServer = getProjectURL
			+ '/filecontroller/uploadImg';
	editor.customConfig.uploadImgShowBase64 = true;
	editor.customConfig.uploadImgFileName = 'myFileName';
	editor.customConfig.uploadFileName = 'myFileName';
	editor.customConfig.showLinkImg = false;
	editor.customConfig.debug = true;
	editor.customConfig.uploadImgHooks = {
		success : function(xhr, editor, result) {

		}
	}
	$(".w-e-text-container").css("height", "200px");
	editor.create();
	return editor;

}

var getParams = function() {
	var obj = {};
	var b = 0;
	$(".box-body .form-control").each(function(index, elemnt) {
		var required = $(this).attr("required");
		var value = $(this).val();
		if (required == true || required == "required") {
			if (value.trim() == "") {
				$(this).css({
					'border-color' : 'rgba(255, 0, 0, 0.8)'
				});
				b = 1;
				return "";
			}
		}
		var id = $(this).attr('id');
		obj[id] = value;
	});
	if (b == 1) {
		return "";
	} else {
		return obj;
	}
};

var getParamsByClass = function(classbox, classname) {
	var obj = {};
	var b = 0;
	$("." + classbox + " ." + classname).each(function(index, elemnt) {
		var required = $(this).attr("required");
		var value = $(this).val();
		if (required == true || required == "required") {
			if (value.trim() == "") {
				$(this).css({
					'border-color' : 'rgba(255, 0, 0, 0.8)'
				});
				b = 1;
				return "";
			}
		}
		var id = $(this).attr('id');
		obj[id] = value;
	});
	if (b == 1) {
		return "";
	} else {
		return obj;
	}
};

// 判断字符串非空
function isEmpty(obj) {
	if (typeof obj == "undefined" || obj == null || obj == ""
			|| obj.trim() == "" || obj == "null") {
		return true;
	} else {
		return false;
	}
}
function createUpload(cliengguid, callback) {
	var $list = $("#thelist");
	var $btn = $("#ctlBtn");
	var state = 'pending'; // 上传文件初始化
	var curPath = window.document.location.href;
	var pathName = window.document.location.pathname;
	var pos = curPath.indexOf(pathName);
	var localhostPaht = curPath.substring(0, pos);
	var projectName = pathName
			.substring(0, pathName.substr(1).indexOf('/') + 1);
	var urlpath = localhostPaht + projectName;
	var uploader = WebUploader.create({
		swf : 'webuploader/Uploader.swf',
		server : urlpath + '/filecontroller/savimg',
		name : 'myFileName',
		formData : {
			"cliengguid" : cliengguid
		},
		pick : '#picker',
		resize : false,
		fileSingleSizeLimit : 4 * 1024 * 1024,
		fileNumLimit : 5,
		accept : {
			title : 'HTML5组态文件',
			extensions : 'jpg,png,xls'
		}
	});
	uploader.on('fileQueued', function(file) {
		$list.append('<div id="' + file.id + '" class="item">'
				+ '<h4 class="info">' + file.name + '</h4>'
				+ '<p class="state">等待上传...</p>' + '</div>');
	});

	uploader
			.on(
					'uploadProgress',
					function(file, percentage) {
						var $li = $('#' + file.id), $percent = $li
								.find('.progress .progress-bar');
						// 避免重复创建
						if (!$percent.length) {
							$percent = $(
									'<div class="progress progress-striped active">'
											+ '<div class="progress-bar" role="progressbar" style="width: 0%">'
											+ '</div>' + '</div>')
									.appendTo($li).find('.progress-bar');
						}
						$li.find('p.state').text('上传中');
						$percent.css('width', percentage * 100 + '%');
					});

	uploader.on('uploadSuccess', function(file, response) {
		var $li = $('#' + file.id);
		$('#' + file.id).find('p.state').text('已上传');
		$li.find('p.state').text('上传成功');
		setCookie("clienguid", response.picguid, 3600);
		callback(response.picguid);
	});

	uploader.on('uploadError', function(type) {

	});
	uploader.on('error', function(type) {
		if (type == "Q_TYPE_DENIED") {
			alert("myModal", "messageP", "请上传JPG、PNG格式文件");
		}
	});

	uploader.on('uploadComplete', function(file) {
		$('#' + file.id).find('.progress').fadeOut();
	});
	$btn.on('click', function() {
		if (state === 'uploading') {
			uploader.stop();
		} else {
			uploader.upload();
		}
	});

}
var UtilDate = {
	formateDate : function(date, str) {
		if (str.indexOf('yyyy') >= 0) {
			str = str.replace('yyyy', date.getFullYear());
		}
		if (str.indexOf('MM') >= 0) {
			str = str.replace('MM', date.getMonth() + 1);
		}
		if (str.indexOf('dd') >= 0) {
			str = str.replace('dd', date.getDate());
		}
		if (str.indexOf('HH') >= 0) {
			str = str.replace('HH', date.getHours());
		}
		if (str.indexOf('mm') >= 0) {
			str = str.replace('mm', date.getMinutes());
		}
		if (str.indexOf('ss') >= 0) {
			str = str.replace('ss', date.getSeconds());
		}
		return str;
	}
}
var uploadFile = {
	createUploader : function(btnid, clienguid) {
		var uploader = WebUploader.create({
			swf : 'webuploader/Uploader.swf',
			server : urlpath + '/filecontroller/savimg',
			name : 'myFileName',
			formData : {
				"cliengguid" : cliengguid
			},
			pick : '#picker',
			resize : false,
			fileSingleSizeLimit : 4 * 1024 * 1024,
			fileNumLimit : 5,
			accept : {
				title : 'HTML5组态文件',
				extensions : 'jpg,png',
				mimeTypes : 'image/*'
			}
		});

	}
}

function guid() {
	function S4() {
		return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
	}
	return (S4() + S4() + "-" + S4() + "-" + S4() + "-" + S4() + "-" + S4()
			+ S4() + S4());
}
var UtilJs = {
	getLocalPath : function() {
		var path = location.pathname;
		if (path.indexOf('/') === 0) {
			path = path.substring(1);
		}
		return '/' + path.split('/')[0];
	},
	getPath : function(path) {
		// 全路径
		if (/^(http|https|ftp)/g.test(path)) {
			return path;
		}
		// 用于测试本地mockjs测试用例js，约定以_test最为前缀，debug为false时不在页面输出
		if (path.indexOf('_test') != -1 && !this.debug) {
			return false;
		}
		// 是否是相对路径
		var isRelative = path.indexOf('./') === 0 || path.indexOf('../') === 0;
		path = (isRelative ? '' : (_rootPath + '/')) + path;
		return path;
	},
	getExt : function(path) {
		if (path.indexOf('?') != -1) {
			path = path.split('?')[0];
		}

		var dotPos = path.lastIndexOf('.'), ext = path.substring(dotPos + 1);

		return ext;
	},
	// 批量输出css|js
	loadJsCss : function(arr) {
		var i = 0, len = arr.length, path, ext;
		for (; i < len; i++) {
			path = this.getPath(arr[i]);
			if (path) {
				ext = this.getExt(path);
				if (ext == 'js') {
					document.writeln('<script src="' + path + '"></sc'
							+ 'ript>');
				} else {
					document.writeln('<link rel="stylesheet" href="' + path
							+ '">');
				}
			}
		}
	}

}

function uuid() {
	var s = [];
	var hexDigits = "0123456789abcdef";
	for (var i = 0; i < 36; i++) {
		s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1);
	}
	s[14] = "4"; // bits 12-15 of the time_hi_and_version field to 0010
	s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1); // bits 6-7 of the
														// clock_seq_hi_and_reserved
														// to 01
	s[8] = s[13] = s[18] = s[23] = "-";

	var uuid = s.join("");
	return uuid;
}
