$(function() {

	$("#userlogo").lazyload({
		effect : "fadeIn"
	});

	var vu = new Vue({
		el : '.sidebar-menu',
		data : {
			data : []
		}
	});
	execFunc("view.getviewjson", {}, function(result) {
		vu.data = result.data;
	});

	$("#signoutbtn").on('click', function() {
		execFunc('login.signout', {}, function(result) {
			if (result.data == '1') {
				location.href = "login/login_init";
			}
		})
	})
	$("#rolebtn").on('click', function() {
		var url = $(this).attr('value');
		$(".iframec").attr('src', url);
	})
	$("#userbtn").on('click', function() {
		var url = $(this).attr('value');
		$(".iframec").attr('src', url);
	});

	$("#viewbtn").on('click', function() {
		var url = $(this).attr('value');
		$(".iframec").attr('src', url);
	});

});
function addClass(e, havesub, url, viewname) {
	$(e.currentTarget.parentNode.parentNode).children("li").not(
			e.currentTarget.parentNode).removeClass('active');
	$(e.currentTarget.parentNode).toggleClass('active');
	if (havesub != 1) {
		$("#moudlename").html(viewname);
		$(".iframec").attr('src', url);
	}
}
function changeIframe(url) {
	$(".iframec").attr('src', url);
}