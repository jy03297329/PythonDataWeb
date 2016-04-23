$(function() {
	console.log('jquery is working!');
	var	margin = {top: 30, right: 40, bottom: 30, left: 40}, 
	width = 600 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

	var	parseDate = d3.time.format.iso.parse;

	var	svg = d3.select("#sentiment_chart")
		.append("svg")
			.attr("width", "100%")
			.attr("height", "100%")
			.attr("preserveAspectRatio", "xMinYMin meet")
   			.attr("viewBox", '0 0 600 300')
		.append("g")
			.attr("transform", 
			      "translate(" + margin.left + "," + margin.top + ")")
		.classed("svg-container", true)
		.classed("svg-content-responsive", true	);

	var tip1 = d3.tip()
  		.attr('class', 'd3-tip')
  		.offset([-10, 0])
  		.html(function(d) {
    	return "<strong>Date:</strong> <span style='color:blue'>" + d.Date + "</span>"
    	"<strong>Price:</strong> <span style='color:red'>" + d.Close + "</span>";
  	});
  	var tip2 = d3.tip()
  		.attr('class', 'd3-tip')
  		.offset([-10, 0])
  		.html(function(d) {
    	return "<strong>Date:</strong> <span style='color:red'>" + d.Date + "</span>"
    	"<strong>Price:</strong> <span style='color:red'>" + d.Open + "</span>";
  	});
  	svg.call(tip1);
  	svg.call(tip2);

	var	x = d3.time.scale().range([0, width]);
	var	y0 = d3.scale.linear().range([height, 0]);
	var	y1 = d3.scale.linear().range([height, 0]);	

	var	xAxis = d3.svg.axis()
		.scale(x)
		.orient("bottom")
		.ticks(d3.time.days, 30)
		.tickFormat(d3.time.format('%b/%d'))
		.tickSize(0)
		.tickPadding(8);

	var	yAxisLeft = d3.svg.axis().scale(y0)
		.orient("left").ticks(5).tickPadding(8);

	var	yAxisRight = d3.svg.axis().scale(y1)
		.orient("right").ticks(5);		

	var	valueline = d3.svg.line()
		.x(function(d) { return x(d.Date); })
		.y(function(d) { return y0(d.Close); });	
	    
	var	valueline2 = d3.svg.line()
		.x(function(d) { return x(d.Date); })
		.y(function(d) { return y1(d.Open); });

	// Get the data
	

	// Scale the range of the data
	

	d3.json("/json_data	", function(error, data) {
		data = data.children[0]
		data.forEach(function(d, i) {
		// d.date  = parseDate(d.\ufeffDate);
		d.Date= parseDate(d.Date);
	});

		x.domain(d3.extent(data, function(d) { return d.Date; }));
		y0.domain(d3.extent(data, function(d) { return d.Close; }));
		y1.domain(d3.extent(data, function(d) { return d.Open; }));

	svg.append("path")
		.attr("class", "line")
		.attr("id", "blueLine")
		.attr("d", valueline(data));

	svg.append("path")
		.attr("class", "line")
		.style("stroke", "red")
		.attr("id", "redLine")
		.attr("d", valueline2(data));

	svg.append("g")	
		.attr("class", "x axis")
		.attr("transform", "translate(0," + height + ")")
		.call(xAxis);

	// edit the Y Axis Left
	svg.append("g")	
		.attr("class", "y axis")
		.style("fill", "steelblue")
		.attr("id", "blueAxis")
		.call(yAxisLeft);

	svg.append("g")
		.attr("class", "y axis")
		.attr("transform", "translate(" + width + " ,0)")
		.style("fill", "red")
		.attr("id", "redAxis")
		.call(yAxisRight);

	d3.select("blueLine")
		.on('mouseover', tip1.show)
      	.on('mouseout', tip1.hide);
	d3.select("redLine")
		.on('mouseover', tip2.show)
      	.on('mouseout', tip2.hide);

	// Add the blue line title
	// svg.append("text")
	// 	.attr("x", 0)             
	// 	.attr("y", height + margin.top + 10)    
	// 	.attr("class", "legend")
	// 	.style("fill", "steelblue")  
	// 	.style("cursor", "pointer")       
	// 	.on("click", function(){
	// 		// Determine if current line is visible
	// 		var active   = blueLine.active ? false : true,
	// 		  newOpacity = active ? 0 : 1;
	// 		// Hide or show the elements
	// 		d3.select("#blueLine").style("opacity", newOpacity);
	// 		d3.select("#blueAxis").style("opacity", newOpacity);
	// 		// Update whether or not the elements are active
	// 		blueLine.active = active;
	// 	})
	// 	.text("Blue Line");

	// //Add the red line title
	// svg.append("text")
	// 	.attr("x", 0)             
	// 	.attr("y", height + margin.top + 30)    
	// 	.attr("class", "legend")
	// 	.style("fill", "red")
	// 	.style("cursor", "pointer")         
	// 	.on("click", function(){
	// 		// Determine if current line is visible
	// 		var active   = redLine.active ? false : true ,
	// 		  newOpacity = active ? 0 : 1;
	// 		// Hide or show the elements
	// 		d3.select("#redLine").style("opacity", newOpacity);
	// 		d3.select("#redAxis").style("opacity", newOpacity);
	// 		// Update whether or not the elements are active
	// 		redLine.active = active;
	// 	})
	// 	.text("Red Line");
	});
});
