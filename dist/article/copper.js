window.onload = function() {
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
	$("#savebtn").click(function() {
		var content = editor.txt.html();
		var title = $("#title").val();
		var rowguid = $("#rowguid").val();
		execFunc('article.savearticle', {
			"content" : content,
			"title" : title,
			"rowguid" : rowguid
		}, function(result) {
			if (result.data == '1') {
				alert("文章添加成功")
			} else {
				alert(result.msg);
			}
		})
	});

	$("#uploadbtn").on('click', function() {
		var serviceUrl = getProjectURL();
		var url = serviceUrl + "/article/uploadfm";
		var form = new FormData();
		var img = $("#result").attr("src");
		var image = new Image();
		image.src = img;
		var base64 = getBase64Image(image);
		var file = dataURLtoBlob(base64);
		form.append("myfile", file);
		form.append("articleguid", getUrlParam("articleguid"));

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
					location.href = "articlelist_init";
				}
			}
		}
	});
}
