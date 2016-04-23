$(function() {
	google.charts.load('current', {'packages':['corechart']});
	google.charts.setOnLoadCallback(drawChart);
	function drawChart() {

		var jsonData = $.ajax({
          url: "/json_data",
          dataType: "json",
          async: false
          }).responseText;
		//console.log(jsonData['children'])
		// Create our data table out of JSON data loaded from server.
		console.log(jsonData);

      	var data = new google.visualization.DataTable(jsonData);
      	console.log(data);

        // var data = google.visualization.arrayToDataTable([
        //   ['Year', 'Sales', 'Expenses'],
        //   ['2004',  1000,      400],
        //   ['2005',  1170,      460],
        //   ['2006',  660,       1120],
        //   ['2007',  1030,      540]
        // ]);

        var options = {
          title: 'Company Performance',
          curveType: 'function',
          legend: { position: 'bottom' }
        };

        var chart = new google.visualization.LineChart(document.getElementById('sentiment_chart'));

        chart.draw(data, options);
      }

});