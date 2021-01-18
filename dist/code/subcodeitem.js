$(function() {

	initItem();
	$("#addcodeitem").click(function() {
		var params = getParams();
		params.guid = $("#itemguid").val();
		params.isupdate = $("#isupdate").val();
		execFunc(ajaxUrl.addsubcodeitem, params, function(data) {
			if (data.msg) {
				layer.alert(data.msg, function(index) {
					layer.close(index);
					$("#itemtext").val("");
					$("#itemvalue").val("")
					$("#isupdate").val("0");
					$("itemguid").val(guid);
					initItem();
				});
			}
		})
	})
});
var vutable = new Vue({
	el : ".subtable",
	data : {
		data : []
	}
})
function initItem() {
	var guid = getUrlParam("guid");
	var param = {
		"guid" : guid
	};
	$("#itemguid").val(guid);
	execFunc("code.getcodeitembyguid", param, function(result) {
		$("#itemname").html(result.msg);
		vutable.data = result.data;
	})
}
function mod(rowguid) {
	var param = {
		"guid" : rowguid
	}
	$("#itemguid").val(rowguid);
	$("#isupdate").val("1");
	execFunc(ajaxUrl.getiteminfobyguid, param, function(data) {
		$("#itemtext").val(data.itemtext);
		$("#itemvalue").val(data.itemvalue);
	});
}
function del(rowguid) {

	var parame = {
		"guid" : rowguid
	}
	layer.confirm('确定删除吗？', {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		execFunc(ajaxUrl.delsubitem, parame, function(data) {
			if (data.msg) {
				layer.msg(data.msg, {
					icon : 1
				});
			}
			initItem();
		});
	}, function() {
	});

}