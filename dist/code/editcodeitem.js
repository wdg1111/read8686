$(function() {
	// 新增代码项

	$("#addcodeitem").on('click', function() {
		var params = getParams();
		execFunc(ajaxUrl.editcodeitem, params, function(result) {
			if (result.data == "0") {
				layer.alert(result.msg, function() {
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
				});
			} else {
				var index = parent.layer.getFrameIndex(window.name);
				parent.layer.close(index);
			}
		})
	})
});