var $sourceImg = $('#sourceImg');
var xhr = new XMLHttpRequest(); // XMLHttpRequest 对象
function dealImg() {
	var $target = $("#result");
	var data = $sourceImg.cropper('getCroppedCanvas', {
		width : 400, // 裁剪后的长宽
		height : 200
	}).toBlob(function(blob) {
		$target.attr('src', URL.createObjectURL(blob));
	});
}
$(function() {
	$sourceImg.cropper({
		aspectRatio : 3 / 2,
		viewMode : 3,
		minCropBoxWidth : 100,
		preview : ".crop-preview",
		ready : function() {
			dealImg();
		},
		crop : function(e) {
			dealImg();
		}
	});

	$("#photo").on('change', function() {
		var objUrl = getObjectURL(this.files[0]);
		if (objUrl) {
			$("#sourceImg").attr("src", objUrl);
			$("#cutImg").attr("src", objUrl);
			$sourceImg.cropper('destroy').attr('src', objUrl).cropper(options);
		}
	});

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
		form.append("articleguid",getUrlParam("articleguid"));
		
		xhr.open("post", url, true); // po
		xhr.upload.onloadstart = function() {// 上传开始执行方法
			ot = new Date().getTime(); // 设置上传开始时间
			oloaded = 0;// 设置上传开始时，以上传的文件大小为0
		};
		xhr.send(form); // 开始上传，发送form数据
		xhr.responseText=function(res){
			console.log(res);
		}
		xhr.onreadystatechange=function(response){
			if(response.target.readyState=='4'){
				var result=JSON.parse(response.target.response);
				if(Number(result.data)==0){
					alert(result.msg);
				}else{
					location.href="articlelist_init";
				}
			}
		}
	});
	
	$("#cancelbtn").click(function(){
		location.href="articlelist_init";
	})
	
		
});

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

function processData(dataUrl) {
	var binaryString = window.atob(dataUrl.split(',')[1]);
	var arrayBuffer = new ArrayBuffer(binaryString.length);
	var intArray = new Uint8Array(arrayBuffer);
	for (var i = 0, j = binaryString.length; i < j; i++) {
		intArray[i] = binaryString.charCodeAt(i);
	}
	var data = [ intArray ], blob;
	try {
		blob = new Blob(data);
	} catch (e) {
		window.BlobBuilder = window.BlobBuilder || window.WebKitBlobBuilder
				|| window.MozBlobBuilder || window.MSBlobBuilder;
		if (e.name === 'TypeError' && window.BlobBuilder) {
			var builder = new BlobBuilder();
			builder.append(arrayBuffer);
			blob = builder.getBlob(imgType); // imgType为上传文件类型，即 file.type
		} else {
			console.log('版本过低，不支持上传图片');
		}
	}
	return blob;
}
