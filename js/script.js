var dates = [];
prev1 = 0;
prev2 = 0;
amount = 0;
full_water_count = 0;
over_100 = false;
over = false;
for (var i = 0; i < dataSeries.length; i++) {
  curr1 = Math.trunc(dataSeries[i].value1) * 100;
  curr2 = Math.round(dataSeries[i].value2 * 10);

  if (prev1 > 900 && curr1 < 100) {
    over = true;
  }
  if (over) {
    full_water_count += 1000;
    over = false;
  }

  curr1 += full_water_count;

  if (curr2 < prev2 && curr1 < prev1)
    curr1 += 100;

  else if (curr2 > prev2 && curr1 > prev1)
    curr1 -= 100;

  else if (curr2 >= prev2 && curr1 < prev1)
    curr1 += 100;


  prev1 = curr1;
  prev2 = curr2;
  
  value = curr1 + curr2;
  if (value > 1000)
    console.log(value);

  // Ignore bad readings: the water amount can't go back down
  //if (value < amount)
  //  continue;
  amount = value

  if (amount > 100)
    over_100 = true;
  if (over_100 && (amount > 999 || amount < 100)) {
    over_100 = false;
  //  full_water_count += 1000;
  }

  var innerArr = [dataSeries[i].date, value + full_water_count];
  dates.push(innerArr)
}

var options = {
  chart: {
    type: 'area',
    stacked: false,
    height: 800,
    zoom: {
      type: 'x',
      enabled: true
    },
    toolbar: {
      autoSelected: 'zoom'
    }
  },
  dataLabels: {
    enabled: false
  },
  series: [{
    name: 'Water Consumption',
    data: dates
  }],
  markers: {
    size: 3,
  },
  title: {
    text: 'Water Consumption',
    align: 'left'
  },
  fill: {
    type: 'gradient',
    gradient: {
      shadeIntensity: 1,
      inverseColors: false,
      opacityFrom: 0.5,
      opacityTo: 0,
      stops: [0, 90, 100]
    },
  },
  stroke: {
    curve: 'straight'
  },
  yaxis: {
    min: 0,
    labels: {
      formatter: function (val) {
        return (val).toFixed(0);
      },
    },
    title: {
      text: 'liters'
    },
  },
  xaxis: {
    type: "datetime",
  },

  tooltip: {
    shared: false,
    x: {
        formatter: function (val) {
          return (new Date(val)).toLocaleString('it-IT', {year: 'numeric', month: 'numeric', day: 'numeric', hour: '2-digit', minute:'2-digit'})
      }
    },

      y: {
        formatter: function (val) {
          return val;
        }
      }
  }
}

var chart = new ApexCharts(
  document.querySelector("#chart"),
  options
);

chart.render();

/*
liters = 0;
interval = setInterval(function(){
chart.appendData([{
    data: [[new Date(), liters++]]
}]);  
}, 1000);
*/
