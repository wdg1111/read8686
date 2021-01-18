$(function() {

	var hrowguid = $("#hrowguid").val();

	/**
	 * 新增公司
	 */
	$("#subbtn").click(function() {
		var params = getParams();
		if (params == "") {
			return;
		} else {
			params.rowguid = hrowguid;
			execFunc("task.edittask", params, function(result) {
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
	});

});