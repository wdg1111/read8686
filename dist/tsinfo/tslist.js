var key = "";
var currentPage = 1;
var pageSize = 15;
var vu = new Vue({
	el : '.table',
	data : {
		data : []
	}
});
$(function() {

	/**
	 * 点击搜索的功能
	 */
	$("#searchbtn").click(function() {
		key = $("#tsstatus option:selected").attr('data-id');
		render(currentPage, pageSize, key);
	})
	/**
	 * 回车的事件
	 */
	$("#table_search").keyup(function(event) {
		if (event.keyCode == 13) {
			key = $("#tsstatus option:selected").attr('data-id');
			render(currentPage, pageSize, key);
		}
	});

	render(currentPage, pageSize, key);

	$("#selectsize").on('change', function() {
		pageSize = $(this).val();
		render(currentPage, pageSize, key);
	})

	/**
	 * 下拉选项
	 */
	$(".chosen-select").chosen({
		no_results_text : "没有找到结果！",// 搜索无结果时显示的提示
		search_contains : true, // 关键字模糊搜索，设置为false，则只从开头开始匹配
		allow_single_deselect : true, // 是否允许取消选择
		max_selected_options : 4,
		single_text : "请选择" // 当select为多选时，最多选择个数
	});
	$(".chosen-select").focus(function() {
		$(".chosen-select").attr("size", "5");
	})
	$('.chosen-container-single').css({
		"width" : "200px",
		"z-index" : 19999
	});
	$('.chosen-single').css({
		"height" : "30px",
		"border-radius" : "0px"
	});

	function loaditembyorder(itemorder) {
		var itemTemp = $("#itemTemp").html();
		var M = Mustache;
		var params = {
			"itemorder" : itemorder
		}
		execFunc("code.getitemlist", params, function(result) {
			console.log(result)
			var rendered = M.render(itemTemp, result);
			$(".chosen-select").html(rendered);
			$(".chosen-select").trigger("chosen:updated");
			// 初始化选择控件
			$(".chosen-select").chosen(); // 通过id
		})
	}
	setTimeout(loaditembyorder("1001004"), 1000);

});
function del(rowguid) {
	if (confirm("确定删除?")) {
		execFunc("tsinfo.deltsinfo", {
			"rowguid" : rowguid
		}, function(result) {
			if (result.data == "1") {
				alert("删除成功");
				render(currentPage, pageSize, key);
			} else {
				alert("删除失败");
			}
		})
	}
}
function tsbaidu(rowguid) {
	if (confirm("确定推送吗?")) {
		execFunc("tsinfo.tstobaidu", {
			"rowguid" : rowguid
		}, function(result) {
			alert(result.msg);
			render(currentPage, pageSize, key);
		})
	}

}

/**
 * 
 * @param pageCurrent
 *            当前所在页
 * @param pageSum
 *            总页数
 * @param callback
 *            调用ajax
 */
function setPage(pageCurrent, pageSum, callback) {
	$("#page").bootstrapPaginator({
		// 设置版本号
		bootstrapMajorVersion : 1,
		// 显示第几页
		currentPage : pageCurrent,
		numberOfPages : 6, // 最多显示Page页
		// 总页数
		totalPages : pageSum,
		// 当单击操作按钮的时候, 执行该函数, 调用ajax渲染页面
		onPageClicked : function(event, originalEvent, type, page) {
			// 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
			currentPage = page
			render(currentPage, pageSize, key);
		}
	})
}

function render(currentPage, pageSize, key) {
	execFunc("tsinfo.getpagelist", {
		"tsstatus" : key,
		"pageno" : currentPage,
		"pagesize" : pageSize
	}, function(result) {
		vu.data = result.data;
		setPage(currentPage, Math.ceil(result.totalcount / pageSize), render);
		$("#pagesize").html(pageSize);
		$("#totalnum").html(result.totalcount);
	})
}
