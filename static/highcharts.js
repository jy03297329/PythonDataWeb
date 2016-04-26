$(function () {
    $(document).ready(function() {

        var options = {
            xAxis: {
                type: 'datetime',
                minPadding: 0.05,
                maxPadding: 0.05
            },
            yAxis: {
                plotLines:[{
                    value:0,
                    color: '#0E5707',
                    width:2,
                    zIndex:4,
                }]
            },
            chart: {
                renderTo: 'sentiment_chart',
                type: 'spline'
            },
            title: {
                text: "Sentiment Score and Sales for All Movies"
            },
            series: [{name: "Sentiment Score"}, {name: "Sales"}]
        };

          var table = $('#main_table').DataTable();
          $('#main_table tbody').on( 'click', 'tr', function () {
            if ( $(this).hasClass('selected') ) {
                $(this).removeClass('selected');

            }
            else {
                table.$('tr.selected').removeClass('selected');
                $(this).addClass('selected');
                $.getJSON($SCRIPT_ROOT + '/json_data', {
                  movie: (table.row(this).data()[0])
              }, function(data) {
                  options.series[0].data = data['series'][0][1];
                  // options.chart.renderTo = 'sale_chart'
                  title = "X"
                  title = "Sentiment Score and Sales for " + title
                  options.title.text = title;
                  var chart = new Highcharts.Chart(options);
              });
            }
        } );
          

        $.getJSON('/json_data', function(data) {
            options.series[0].data = data['series'][0][1];
            console.log(data['series'][0]['data'])
            var chart = new Highcharts.Chart(options);
        });
    });
});