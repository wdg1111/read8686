$(function() {
	/**
	 * 新增视图
	 */
	$("#subbtn").click(function() {
		var params = getParams();
		if (params == "") {
			return;
		} else {
			execFunc("task.addtask", params, function(result) {
				if (result.data == "1") {
					location.href = "task_init";
				} else {
					alert(result.msg);
				}
			})
		}
	})
	$("#cancelbtn").click(function() {
		location.href = "task_init";
	})
});