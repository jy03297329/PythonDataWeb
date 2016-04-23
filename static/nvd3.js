d3.json("/json_data", function (error, data) {
	data = data['children'][0];
	data = data.map(function(n) {return {"x" : n.registered, "y" : n.age}});
	data = [{"key":"stream1",
        "values": data}];
    console.log(data);
	nv.addGraph(function() {
	  var chart = nv.models.lineChart()
	  				.options({
	  					//transitionDuration: 350,  //how fast do you want the lines to transition?
	                	showLegend: true,      //Show the legend, allowing users to turn on/off line series.
	                	showYAxis: true,      //Show the y-axis
	                	showXAxis: true,   
	                	useInteractiveGuideline: true    //Show the x-axis
	  				});

	  chart.xAxis     //Chart x-axis settings
	      .tickFormat(function(d) {
	      	console.log("log::::")
	      	console.log(data[0].values[d]);
      return data[0].values[d];
    });

	  chart.yAxis     //Chart y-axis settings
	      .axisLabel('Age')
	      .tickFormat(d3.format('.2f'));

	  /* Done setting the chart up? Time to render it!*/
	  var myData = data;   //You need data...

	  d3.select('#sentiment_chart').append('svg')    //Select the <svg> element you want to render the chart in.   
	      .datum(myData)         //Populate the <svg> element with chart data...
	      .call(chart);          //Finally, render the chart!

	  //Update the chart when window resizes.
	  nv.utils.windowResize(function() { chart.update() });
	  return chart;
	});
});