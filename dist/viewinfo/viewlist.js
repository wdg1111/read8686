
$(function() {
	var key = "";
	$("#addbtn").click(function() {
		location.href = "viewadd.html";
	});
	var vu = new Vue({
		el : '.table',
		data : {
			data : []
		}
	});
	/**
	 * 点击搜索的功能
	 */
	$("#searchbtn").click(function() {
		key = $("#table_search").val();
		render(currentPage, pageSize, key);
	})
	/**
	 * 回车的事件
	 */
	$("#table_search").keyup(function(event) {
		if (event.keyCode == 13) {
			key = $("#table_search").val();
			render(currentPage, pageSize, key);
		}
	});
	var currentPage = 1;
	var pageSize = 15;
	render(currentPage, pageSize, key);
	function render(currentPage, pageSize, key) {
		execFunc("view.getpagelist", {
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

	$("#selectsize").on('change', function() {
		pageSize = $(this).val();
		render(currentPage, pageSize, key);
	})

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

});
function del(rowguid,isroot) {
	var msg="";
	if(isroot=='1'){
		msg="此目录为根目录,其下面的子模块也会删除,确定删除吗?";
	}else{
		msg="确定删除?";
	}
	if (confirm(msg)) {
		execFunc("view.delview", {"rowguid" : rowguid,"isroot":isroot}, function(result) {
			if (result.data == "1") {
				alert("删除成功");
				location.href="viewlist.html";
			} else {
				alert("删除失败");
			}
		})
	}
}

/**
 * 修改
 * 
 * @param id
 * @returns
 */
function mod(rowguid) {
	location.href = "viewedit.html?rowguid=" + rowguid;
}
