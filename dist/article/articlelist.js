var key = "";
var atype = "";
var belongtype="";
var currentPage = 1;
var pageSize = 15;
var vu = new Vue({
	el : '.timeline',
	data : {
		data : []
	},
	methods : {
		imgerror : function(img) {
			img.target.style.display='none';
		}

	}

});
$(function() {
	render(currentPage, pageSize, key, atype);
	$("#addbtn").click(function() {
		location.href = "articleadd_init";
	});
	$("#searchbtn").click(function() {
		key = $("#key").val();
		atype = $("#articletype option:selected").attr('data-id');
		belongtype = $("#belongtype option:selected").attr('data-id');
		render(currentPage, pageSize, key, atype,belongtype);
	})
	/**
	 * 回车的事件
	 */
	$("#table_search").keyup(function(event) {
		if (event.keyCode == 13) {
			key = $("#key").val();
			atype = $("#articletype option:selected").attr('data-id');
			belongtype = $("#belongtype option:selected").attr('data-id');
			render(currentPage, pageSize, key, atype,belongtype);
		}
	});

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

	function loaditembyorder(itemorder) {
		var itemTemp = $("#itemTemp").html();
		var M = Mustache;
		var params = {
			"itemorder" : itemorder
		}
		execFunc("code.getitemlist", params, function(result) {
			var rendered = M.render(itemTemp, result);
			$("#articletype").html(rendered);
			$("#articletype").trigger("chosen:updated");
			// 初始化选择控件
			$("#articletype").chosen(); // 通过id
		})
	}
	setTimeout(loaditembyorder("1001001"), 1000);
	
	
	
	function loaditembyorder2(itemorder) {
		var itemTemp = $("#itemTemp2").html();
		var M = Mustache;
		var params = {
			"itemorder" : itemorder
		}
		execFunc("code.getitemlist", params, function(result) {
			var rendered = M.render(itemTemp, result);
			$("#belongtype").html(rendered);
			$("#belongtype").trigger("chosen:updated");
			// 初始化选择控件
			$("#belongtype").chosen(); // 通过id
		})
	}
	setTimeout(loaditembyorder2("1001006"), 1000);
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
			render(currentPage, pageSize,key,atype,belongtype);
		}
	})
}

function render(currentPage, pageSize, key, atype,btype) {
	execFunc("article.getpagelist", {
		"type" : atype,
		"key" : key,
		"pagenum" : currentPage,
		"pagesize" : pageSize,
		"belongtype":btype
	}, function(result) {
		vu.data = result.data;
		setPage(currentPage, Math.ceil(result.totalcount / pageSize)=='0'?1:Math.ceil(result.totalcount / pageSize), render);
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

function edit(rowguid) {
	location.href = "articleedit.html?rowguid=" + rowguid;
}

function view(rowguid) {
	location.href = "articleview.html?rowguid=" + rowguid;
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
