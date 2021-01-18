
$(function() {
	var rowguid=getUrlParam("rowguid");
	execFunc('article.getarticlebyguid',{'rowguid':rowguid},function(result){
		if(result.code=='0000'){
			$("#articlecontent").html(result.data.content);
			$("#author").html(result.data.author);
			$("#addtime").html(result.data.addtime);
		}else{
			console.log("接口调用失败");
		}
	})
});
