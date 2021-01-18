$(function() {
	var $sourceImg = $('#sourceImg');
	var xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
	function dealImg() {
		var $target = $("#result");
		var data = $sourceImg.cropper('getCroppedCanvas', {
			width : 400, // 裁剪后的长宽
			height : 200
		}).toBlob(function(blob) {
			$target.attr('src', getObjectURL(blob));
		});
	}

	var options = {
		aspectRatio : 3 / 2,
		viewMode : 1,
		responsive : true,
		minContainerWidth : 800,
		minContainerHeight : 600,
		maxCanvasHeight : 800,
		maxCanvasWidth : 600,
		ready : function() {
			dealImg();
		},
		crop : function(e) {
			dealImg();
		}
	}
	$("#chooseImg").on('change', function() {
		var objUrl = getObjectURL(this.files[0]);
		console.log(objUrl);
		if (objUrl) {
			$("#sourceImg").attr("src", objUrl);
			$sourceImg.cropper('destroy').attr('src', objUrl).cropper(options);
			$sourceImg.css({
				"width" : "800px",
				"height" : "600px"
			})
		}
	});
	$sourceImg.cropper(options);

	$("#showmodal").on('click', function() {
		$("#cropperModel").modal('show');
		$sourceImg.cropper(options);
	})

	/**
	 * 开始文章页面的渲染
	 * 
	 */
	var serviceUrl = getProjectURL();
	var editor = new wangEditor('#txtDiv');
	editor.customConfig.uploadImgServer = serviceUrl + '/file/uploadimg';
	editor.customConfig.uploadImgShowBase64 = true;
	editor.customConfig.uploadFileName = 'myFileName';
	editor.customConfig.showLinkImg = false;
	editor.customConfig.uploadImgHooks = {
		success : function(xhr, editor, result) {

		}
	}
	editor.create();
	$(".w-e-text-container").css({
		"height" : "600px",
		"z-index" : 90
	});
	$(".w-e-text").css({
		'background' : "#fce1aebf",
		"z-index" : 90
	});
	var $textarea = $('#textarea'), $titletxt = $('#titletxt'), $btnHtml = $('#btnHtml'), $btnText = $('#btnText'), $btnHide = $('#btnHide'), $btnPublish = $('#btnPublish');
	$textarea.hide();

	var content = $("#hiddencontent").val();
	var rowguid = $("#hdrowguid").val();
	setTimeout(function() {
		editor.txt.html(content);
	}, 500);
	/**
	 * 保存文章
	 */
	$("#savebtn").click(function() {
		var content = editor.txt.html();
		var title = $("#title").val();
		var articletype =  $("#articletype option:selected").attr('data-id');
		var belongtype =  $("#articletype2 option:selected").attr('data-id');
		var keywords = $("#keywords").val();
		execFunc('article.savearticle', {
			"content" : content,
			"title" : title,
			"rowguid" : rowguid,
			"type":articletype,
			"keywords":keywords,
			"belongtype":belongtype
		}, function(result) {
			if (result.data == '1') {
				alert("保存成功")
			} else {
				alert(result.msg);
			}
		})
	});

	/**
	 * 发布文章
	 */
	$("#publishbtn").click(function() {
		var content = editor.txt.html();
		var title = $("#title").val();
		var articletype =  $("#articletype option:selected").attr('data-id');
		var belongtype =  $("#articletype2 option:selected").attr('data-id');
		var keywords = $("#keywords").val();
		execFunc('article.publisharticle', {
			"content" : content,
			"title" : title,
			"rowguid" : rowguid,
			"type":articletype,
			"keywords":keywords,
			"belongtype":belongtype
		}, function(result) {
			if (result.data == '1') {
				alert("发布成功");
				location.href = "view_init?rowguid=" + rowguid;
			} else {
				alert(result.msg);
			}
		})
	});

	/**
	 * 上传封面
	 */

	$("#uploadbtn").on('click', function() {
		var serviceUrl = getProjectURL();
		var articleguid = $("#hdrowguid").val();
		var url = serviceUrl + "/article/uploadfm";
		var form = new FormData();
		var img = $("#result").attr("src");
		var image = new Image();
		image.src = img;
		var base64 = getBase64Image(image);
		var file = dataURLtoBlob(base64);
		form.append("myfile", file);
		form.append("articleguid", articleguid);

		xhr.open("post", url, true); // po
		xhr.upload.onloadstart = function() {// 上传开始执行方法
			ot = new Date().getTime(); // 设置上传开始时间
			oloaded = 0;// 设置上传开始时，以上传的文件大小为0
		};
		xhr.send(form); // 开始上传，发送form数据
		xhr.responseText = function(res) {
			console.log(res);
		}
		xhr.onreadystatechange = function(response) {
			if (response.target.readyState == '4') {
				var result = JSON.parse(response.target.response);
				if (Number(result.data) == 0) {
					alert(result.msg);
				} else {
					alert("封面上传成功");
					$("#cropperModel").modal('hide');
				}
			}
		}

	});
	/**
	 * 下拉选项
	 */
	$(".chosen-select").chosen({
		no_results_text : "没有找到结果！",// 搜索无结果时显示的提示
		search_contains : true, // 关键字模糊搜索，设置为false，则只从开头开始匹配
		allow_single_deselect : true, // 是否允许取消选择
		max_selected_options : 4,
		single_text : "请选择" // 当select为多选时，最多选择个数
	});
	$(".chosen-select").focus(function() {
		$(".chosen-select").attr("size", "5");
	})
	$('.chosen-container-single').css({
		"width" : "200px",
		"z-index" : 19999
	});

	function loaditembyorder(itemorder) {
		var itemTemp = $("#itemTemp").html();
		var M = Mustache;
		var params = {
			"itemorder" : itemorder
		}
		execFunc("code.getitemlist", params, function(result) {
			var rendered = M.render(itemTemp, result);
			$("#articletype").html(rendered);
			$("#articletype").trigger("chosen:updated");
			// 初始化选择控件
			$("#articletype").chosen(); // 通过id
		})
	}
	setTimeout(loaditembyorder("1001001"), 1000);
	
	
	function loaditembyorder2(itemorder) {
		var itemTemp = $("#itemTemp2").html();
		var M = Mustache;
		var params = {
			"itemorder" : itemorder
		}
		execFunc("code.getitemlist", params, function(result) {
			var rendered = M.render(itemTemp, result);
			$("#articletype2").html(rendered);
			$("#articletype2").trigger("chosen:updated");
			// 初始化选择控件
			$("#articletype2").chosen(); // 通过id
		})
	}
	setTimeout(loaditembyorder2("1001006"), 1000);
	
	setTimeout(function(){
		
		 $("#articletype option[data-id='"+articlet+"']").attr("selected","selected");
	     $("#articletype").trigger("chosen:updated");
	     
	     $("#articletype2 option[data-id='"+belongtype+"']").attr("selected","selected");
	     $("#articletype2").trigger("chosen:updated");
	}, 2000);
	
	

});
/**
 * 图像转Base64
 */
function getBase64Image(img) {
	var canvas = document.createElement("canvas");
	canvas.width = img.width;
	canvas.height = img.height;
	var ctx = canvas.getContext("2d");
	ctx.drawImage(img, 0, 0, img.width, img.height);
	var ext = img.src.substring(img.src.lastIndexOf(".") + 1).toLowerCase();
	var dataURL = canvas.toDataURL("image/" + ext);
	return dataURL;
}
function dataURLtoBlob(dataurl) {
	var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1], bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(
			n);
	while (n--) {
		u8arr[n] = bstr.charCodeAt(n);
	}
	return new Blob([ u8arr ], {
		type : mime
	});
}
function getObjectURL(file) {
	var url = null;
	if (window.createObjectURL != undefined) { // basic
		url = window.createObjectURL(file);
	} else if (window.URL != undefined) { // mozilla(firefox)
		url = window.URL.createObjectURL(file);
	} else if (window.webkitURL != undefined) { // webkit or chrome
		url = window.webkitURL.createObjectURL(file);
	}
	return url;
}