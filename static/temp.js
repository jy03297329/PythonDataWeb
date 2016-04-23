$(function() {

	var	margin = {top: 30, right: 20, bottom: 30, left: 20}, 
	width = 600 - margin.left - margin.right,
	height = 300 - margin.top - margin.bottom;

	var formatDate = d3.time.format.utc('%Y-%m-%dT%H:%M:%S');

	var x = d3.time.scale().range([0, width]);
	var y = d3.scale.linear().range([height, 0]);

	var xAxis = d3.svg.axis().scale(x).orient("bottom");
	var yAxis = d3.svg.axis().scale(y).orient("left");

	var line = d3.svg.line()
		.x(function(d) {return x(d.registered);})
		.y(function(d) {return y(d.age);});

	var	svg = d3.select("#sentiment_chart")
		.append("svg")
			.attr("width", width + margin.left + margin.right)
			.attr("height", height + margin.top + margin.bottom)
			.attr("preserveAspectRatio", "xMinYMin meet")
   			.attr("viewBox", '0 0 600 300')
		.append("g")
			.attr("transform", 
			      "translate(" + margin.left + "," + margin.top + ")")
		.classed("svg-container", true)
		.classed("svg-content-responsive", true	);

	d3.json("/json_data", function (error, data) {
		data = data['children'][0]
		data.forEach(function(d){
			d.registered = formatDate.parse(d.registered);
			d.age = +d.age;
		});
		x.domain(d3.extent(data, function(d) { return d.registered;}));
  		y.domain(d3.extent(data, function(d) { return d.age;}));

  		svg.append("g")
      		.attr("class", "x axis")
      		.attr("transform", "translate(0," + height + ")")
      		.call(xAxis);

      	svg.append("g")
      		.attr("class", "y axis")
      		.call(yAxis)
    		.append("text")
      		.attr("transform", "rotate(-90)")
      		.attr("y", 6)
      		.attr("dy", ".71em")
      		.style("text-anchor", "end")
      		.text("Price ($)");

      	svg.append("line")
      		.datum(data)
      		.attr("class", "line")
      		.attr("d", line);
	});
	function type(d) {
  	d.registered = formatDate.parse(d.registered);
  	d.age = +d.age;
  	return d;
}
});