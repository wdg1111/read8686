$(function() {
　　/**
	 * 判断当前用户是否为登录的状态
	 */
	
	execFunc("login.isuserlogin", {}, function(result) {
		if (result.data == '1') {
			location.href = "../index";
		}
	})
	$("#loginBtn").click(function() {
		var username = $("#username").val();
		var password = $("#password").val();
		if (username.trim() == '') {
			alert('用户名不能未空');
			return;
		}
		if (password.trim() == '') {
			alert('密码不能为空');
			return;
		}
		var params = {
			"username" : username,
			"password" : password
		}
		execFunc("login.userlogin", params, function(result) {
			if (result.data == '1') {
				location.href = "../index";
			} else {
				alert(result.msg);
			}
		})
	})
});