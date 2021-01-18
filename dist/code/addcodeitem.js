$(function() {
	//新增代码项
	
	$("#addcodeitem").on('click',function(){
		var params=getParams();
		execFunc(ajaxUrl.addcodeitem,params,function(result){
			if(result.msg){
				layer.alert(result.msg,function(){
					var index = parent.layer.getFrameIndex(window.name);
					parent.layer.close(index);
				});
			}
		})
	})
});