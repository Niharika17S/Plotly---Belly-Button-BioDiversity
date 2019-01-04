function buildMetadata(sample) {

    // @TODO: Complete the following function that builds the metadata panel
    // Use `d3.json` to fetch the metadata for a sample
    var url = '/metadata/' + sample;
    d3.json(url).then(function(response) {
      console.log(response);
      var data = [response]
      // Used d3 to select the panel with id of `#sample-metadata`
      var sample_metadata = d3.select("#sample-metadata")
      // Used `.html("") to clear any existing metadata
      .html('')
      data.forEach(function(data) {
          Object.entries(data).forEach(function([key, value]) {
          console.log(key,value);
          var row = sample_metadata.append("tr");
          row.append("td").html(`<strong><font size = '1'>${key}</font></strong>:`);
          row.append('td').html(`<font size ='1'>${value}</font>`);
          
      });
    });
  }); 
  } 
      // BONUS: Build the Gauge Chart
      // buildGauge(data.WFREQ);
   
  function init() {
  //   // Grab a reference to the dropdown select element
    var selector = d3.select("#selDataset");
  
  //   // Use the list of sample names to populate the select options
    d3.json("/names").then((sampleNames) => {
      sampleNames.forEach((sample) => {
        selector
          .append("option")
          .text(sample)
          .property("value", sample);
      });
  
  //     // Use the first sample from the list to build the initial plots
      const firstSample = sampleNames[0];
      buildCharts(firstSample);
      buildMetadata(firstSample);
    });
  }
  
  function optionChanged(newSample) {
    // Fetch new data each time a new sample is selected
    buildCharts(newSample);
    buildMetadata(newSample);
  }
  
  // // Initialize the dashboard
  init();
//   ******************


function buildGauge(sample){
var url = '/wfreq/' + sample;   
d3.json(url).then(function(response){
    console.log(response);
// Enter a speed between 0 and 180
var level = 175;

// Trig to calc meter point
var degrees = 180 - level,
     radius = .5;
var radians = degrees * Math.PI / 180;
var x = radius * Math.cos(radians);
var y = radius * Math.sin(radians);

// Path: may have to change to create a better triangle
var mainPath = 'M -.0 -0.025 L .0 0.025 L ',
     pathX = String(x),
     space = ' ',
     pathY = String(y),
     pathEnd = ' Z';
var path = mainPath.concat(pathX,space,pathY,pathEnd);

var data = [{ type: 'scatter',
//    x: [0], y:[0],
    x : response.sample,
    y : response.WFREQ,
    marker: {size: 28, color:'850000'},
    showlegend: false,
    name: 'speed',
    text: level,
    hoverinfo: 'text+name'},
  { values: [50/6, 50/6, 50/6, 50/6, 50/6, 50/6, 50],
  rotation: 90,
  text: ['0-1', '1-2', '2-3', '3-4',
            '4-5', '5-6', '6-7','7-8','8-9'],
  textinfo: 'text',
  textposition:'inside',
  marker: {colors:['rgba(14, 127, 0, .5)', 'rgba(110, 154, 22, .5)',
                         'rgba(170, 202, 42, .5)', 'rgba(202, 209, 95, .5)',
                         'rgba(210, 206, 145, .5)', 'rgba(232, 226, 202, .5)',
                         'rgba(255, 255, 255, 0)']},
  labels: ['151-180', '121-150', '91-120', '61-90', '31-60', '0-30', ''],
  hoverinfo: 'label',
  hole: .5,
  type: 'pie',
  showlegend: false
}];


var layout = {
  shapes:[{
      type: 'path',
      path: path,
      fillcolor: '850000',
      line: {
        color: '850000'
      }
    }],
  title: 'Belly Button Washing Frequency Scrubs per Week',
  height: 1000,
  width: 1000,
  xaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]},
  yaxis: {zeroline:false, showticklabels:false,
             showgrid: false, range: [-1, 1]}
};

Plotly.newPlot('myDiv', data, layout);
});
}
