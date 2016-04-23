$(function () {
    $(document).ready(function() {

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
              options.series[0].data = data['series'][0]['data'];
              console.log(data['series'][0]['data'])
              var chart = new Highcharts.Chart(options);
          });
            console.log($('td[name="movie"]'))
            console.log( table.row( this ).data()[0]);

            console.log($(this));
        }
    } );
      var options = {
        xAxis: {
            type: 'datetime',
            minPadding: 0.05,
            maxPadding: 0.05
        },
        chart: {
            renderTo: 'sentiment_chart',
            type: 'spline'
        },
        series: [{}]
    };

    $.getJSON('/json_data', function(data) {
        options.series[0].data = data['series'][0]['data'];
        console.log(data['series'][0]['data'])
        var chart = new Highcharts.Chart(options);
    });
    });
});