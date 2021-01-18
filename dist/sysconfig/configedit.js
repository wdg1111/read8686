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
			execFunc("sysconfig.editconfig", params, function(result) {
				if (result.data == "1") {
					location.href = "configlist_init";
				} else {
					alert(result.msg);
				}
			})
		}
	})

	$("#cancelbtn").click(function() {
		location.href = "configlist_init";
	});

});