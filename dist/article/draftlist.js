var key = "";
var type = "";
var currentPage = 1;
var pageSize = 15;
var vu = new Vue({
	el : '.timeline',
	data : {
		data : []
	}

});
$(function() {
	render(currentPage, pageSize, key, type);
	$("#addbtn").click(function() {
		location.href = "articleadd_init";
	});
	$("#searchbtn").click(function() {
		key = $("#key").val();
		type = $("#articletype").val();
		render(currentPage, pageSize, key, type);
	})
	/**
	 * 回车的事件
	 */
	$("#table_search").keyup(function(event) {
		if (event.keyCode == 13) {
			key = $("#key").val();
			type = $("#articletype").val();
			render(currentPage, pageSize, key, type);
		}
	});
});

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

function render(currentPage, pageSize, key, articletype) {
	execFunc("article.getdraftlist", {
		"type" : articletype,
		"key" : key,
		"pagenum" : currentPage,
		"pagesize" : pageSize
	}, function(result) {
		vu.data = result.data;
		setPage(currentPage, Math.ceil(result.totalcount / pageSize), render);
		$("#pagesize").html(pageSize);
		$("#totalnum").html(result.totalcount);
	})
}
/**
 * 删除公司
 * 
 * @param id
 * @returns
 */
function del(rowguid) {
	if (confirm("确定删除?")) {
		execFunc("article.delarticle", {
			"rowguid" : rowguid
		}, function(result) {
			if (result.data == "1") {
				alert("删除成功");
				render(currentPage, pageSize, key, type);
			} else {
				alert(result.msg);
			}
		})
	}
}
/**
 * 修改公司
 * 
 * @param id
 * @returns
 */
function edit(rowguid) {
	location.href = "edit_init?rowguid=" + rowguid;
}

function view(rowguid) {
	location.href = "view_init?rowguid=" + rowguid;
}
function nofindpic(event) {
	setTimeout(function() {
		var imgUrl = "../img/default.jpg";
		var img = new Image();
		img.src = imgUrl;
		// 判断图片大小是否大于0 或者 图片高度与宽度都大于0
		if (img.filesize > 0 || (img.width > 0 && img.height > 0)) {
			event.target.src = imgUrl;
		} else {
			// 默认图片也不存在的时候
		}
	}, 500);

}
