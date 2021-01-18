$(function() {
	var hisroot = $("#hisroot").val();
	var hrolesid = $("#hrolesid").val();
	var hrowguid = $("#hrowguid").val();
	var hparentguid=$("#hparentguid").val();
	var hissub=$("#hissub").val();
	
	$("input[name='optionsRadios']").eq(hisroot - 1).prop("checked", "checked");
	
	if (hisroot == '1') {
		$("#parentroot").hide();
		if(hissub=='1'){
			$("input[name='optionsRadios']").eq(1).prop("disabled", "true");
		}
	}
	/**
	 * 新增公司
	 */
	$("#subbtn").click(function() {
		var params = getParams();
		if (params == "") {
			return;
		} else {
			params.isroot = $("input[name='optionsRadios']:checked").val();
			params.rolesid = getRolesid();
			params.rolesname = getRolesname();
			params.rowguid=hrowguid;
			params.parentname = $('#parentguid option:selected').text();
			
			execFunc("view.editview", params, function(result) {
				if (result.data == "1") {
					location.href = "viewlist_init";
				} else {
					alert(result.msg);
				}
			})
		}
	})

	function getRolesid() {
		var arr = new Array();
		$("#rolelist :checkbox:checked").each(function(index) {
			arr[index] = $(this).attr("value");
		})
		var vals = arr.join(";");
		return vals;
	}

	function getRolesname() {
		var arr = new Array();
		$("#rolelist :checkbox:checked").each(function(index) {
			arr[index] = $(this).attr("data");
		})
		var vals = arr.join(";");
		return vals;
	}

	$("#cancelbtn").click(function() {
		location.href = "viewlist_init";
	});
	/**
	 * 获取到对应的可选角色
	 */
	execFunc("role.getlist", {}, function(result) {
		var vu = new Vue({
			el : '#rolelist',
			data : {
				checkedIds : [],
				data : []
			}
		});
		var strs = new Array(); // 定义一数组
		strs = hrolesid.split(";");
		vu.data = result.data;
		vu.checkedIds = strs;
	})

	/**
	 * 获取到根模块
	 */
	execFunc("view.getrootview", {}, function(result) {
		var vucom = new Vue({
			el : '#pviewlist',
			created(){
		        this.couponSelected = hparentguid;
		    },
			data : {
				data : []
			}

		});
		for (var i = 0; i < result.data.length; ++i) {
			if (result.data[i].rowguid == hrowguid) {
				result.data.splice(i,1);
			}
		}
		vucom.data = result.data;
	})

	/**
	 * 检测单选按钮的值的变动
	 */

	$("input[name='optionsRadios']").on('change', function() {
		if ($("input[name='optionsRadios']:checked").val() == 2) {
			$("#parentroot").show();
		} else {
			$("#parentroot").hide();
		}

	})
});