$(function() {
	/**
	 * 新增公司
	 */
	$("#subbtn").click(function() {
		var params = getParams();
		params.rolesid=$("input[type='radio'][name='checkRaidos']:checked").val();
		if (params == "") {
			return;
		} else {
			execFunc("user.adduser", params, function(result) {
			    if(result.data=="1"){
			    	location.href="userlist_init";
			    }
			    else{
			    	alert(result.msg);
			    }
			})
		}
	})
	
	$("#cancelbtn").click(function(){
		location.href="userlist_init"
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
	/**
	 * 获取到对应的可选角色
	 */
	execFunc("role.getlist",{},function(result){
		var vu = new Vue({
			el : '#rolelist',
			data : {
				data : []
			}
		});
		vu.data = result.data;
	})
	
	
	
	execFunc("ouinfo.getoulist", {}, function(result) {
		var vucom = new Vue({
			el : '#oulist',
			data : {
				data : []
			}

		});
		vucom.data = result.data;
	})
	
	
	
});