var commonObj = {
	type : 2,
	title : '新增代码项',
	closeBtn : 1,
	scrollbar : false
};
var keyword = "";
var pageSize = 10;
var pageIndex = 1;
var vu = new Vue({
	el : ".table",
	data : {
		data : []
	}
});
$(function() {

	$("#addbtn").on('click', function() {
		layer.open($.extend(commonObj, {
			area : [ '600px', '250px' ],
			content : 'addcode_init',
			end : function() {
				buildList(pageIndex, pageSize, keyword);
			}
		}));
	})

	buildList(pageIndex, pageSize, keyword);

	$(".searchbtn").on('click', function() {
		keyword = $(".searchinput").val();
		buildList(pageIndex, pageSize, keyword);
	});
	$("#beaninfo").on('click', '#btn1', function() {
		var rowguid = $(this).attr("value");
		layer.open($.extend(commonObj, {
			area : [ '1000px', '600px' ],
			content : 'subcodeitem_init?guid=' + rowguid
		}));
	})

});

function addsub(guid) {
	layer.open($.extend(commonObj, {
		area : [ '700px', '450px' ],
		content : 'subcodeitem_init?guid=' + guid,
		end : function() {
			buildList(pageIndex, pageSize, keyword);
		}
	}));
}
function del(itemorder) {
	var parame = {
		"itemorder" : itemorder
	}
	layer.confirm('确定删除吗？', {
		btn : [ '确定', '取消' ]
	// 按钮
	}, function() {
		execFunc(ajaxUrl.delsubitembyitemorder, parame, function(data) {
			if (data.msg) {
				layer.msg(data.msg, {
					icon : 1
				});
			}
			buildList(pageIndex, pageSize, keyword);
		});

	}, function() {
		layer.msg("已经取消", {
			icon : 1
		});
	});
}
function buildList(pageIndex, pageSize, keywords) {
	var params = {
		"keyword" : keywords,
		"pagesize" : pageSize,
		"pagenum" : pageIndex
	};
	execFunc(ajaxUrl.getcodeitemlist, params, function(result) {
		vu.data = result.data;
		setPage(pageIndex, Math.ceil(result.totalcount / pageSize), buildList);

	});
}
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
		onPageClicked : function(event, originalEvent, s, page) {
			// 把当前点击的页码赋值给currentPage, 调用ajax,渲染页面
			currentPage = page
			buildList(currentPage, pageSize, keyword);
		}
	})
}
function mod(itemorder){
	layer.open($.extend(commonObj, {
		area : [ '600px', '250px' ],
		content : 'editcode_init?itemorder='+itemorder,
		end : function() {
			buildList(pageIndex, pageSize, keyword);
		}
	}));
}