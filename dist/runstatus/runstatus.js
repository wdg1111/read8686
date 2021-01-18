$(function() {
	/*
	 * ChartJS ------- Here we will create a few charts using ChartJS
	 */
	/**
	 * 调用后台的接口获取
	 */
	var lastdata = [];
	var thisdata = [];
	execFunc('runstatus.getvisiterdata', '', function(result) {
		lastdata = result.lst;
		thisdata = result.thi;
	})
	setTimeout(function() {
				var areaChartData = {
					// 最新7天
					labels : [ "周一", "周二", "周三", "周四", "周五", "周六", "周日" ],
					datasets : [ {
						label : "上周",
						fillColor : "rgba(210, 214, 222, 1)",
						strokeColor : "rgba(210, 214, 222, 1)",
						pointColor : "rgba(210, 214, 222, 1)",
						pointStrokeColor : "#c1c7d1",
						pointHighlightFill : "#fff",
						pointHighlightStroke : "rgba(220,220,220,1)",
						data : lastdata
					}, {
						label : "本周",
						fillColor : "rgba(60,141,188,0.9)",
						strokeColor : "rgba(60,141,188,0.8)",
						pointColor : "#3b8bba",
						pointStrokeColor : "rgba(60,141,188,1)",
						pointHighlightFill : "#fff",
						pointHighlightStroke : "rgba(60,141,188,1)",
						data : thisdata
					} ]
				};

				var areaChartOptions = {
					// Boolean - If we should show the scale at all
					showScale : true,
					// Boolean - Whether grid lines are shown across the chart
					scaleShowGridLines : false,
					// String - Colour of the grid lines
					scaleGridLineColor : "rgba(0,0,0,.05)",
					// Number - Width of the grid lines
					scaleGridLineWidth : 1,
					// Boolean - Whether to show horizontal lines (except X
					// axis)
					scaleShowHorizontalLines : true,
					// Boolean - Whether to show vertical lines (except Y axis)
					scaleShowVerticalLines : true,
					// Boolean - Whether the line is curved between points
					bezierCurve : true,
					// Number - Tension of the bezier curve between points
					bezierCurveTension : 0.3,
					// Boolean - Whether to show a dot for each point
					pointDot : false,
					// Number - Radius of each point dot in pixels
					pointDotRadius : 4,
					// Number - Pixel width of point dot stroke
					pointDotStrokeWidth : 1,
					// Number - amount extra to add to the radius to cater for
					// hit detection
					// outside the drawn point
					pointHitDetectionRadius : 20,
					// Boolean - Whether to show a stroke for datasets
					datasetStroke : true,
					// Number - Pixel width of dataset stroke
					datasetStrokeWidth : 2,
					// Boolean - Whether to fill the dataset with a color
					datasetFill : true,
					// String - A legend template
					legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>",
					// Boolean - whether to maintain the starting aspect ratio
					// or not when
					// responsive, if set to false, will take up entire
					// container
					maintainAspectRatio : false,
					// Boolean - whether to make the chart responsive to window
					// resizing
					responsive : true
				};

				var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
				var lineChart = new Chart(lineChartCanvas);
				var lineChartOptions = areaChartOptions;

				var lineChartCanvas = $("#lineChart").get(0).getContext("2d");
				var lineChart = new Chart(lineChartCanvas);

				lineChartOptions.datasetFill = false;

				lineChart.Line(areaChartData, lineChartOptions);
			}, 1000);
});