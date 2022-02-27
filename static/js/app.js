function initDashboard() {
  
  var dropdown = d3.select("#selDataset")
  
  d3.json("samples.json").then(data => {
  
  var sampleIDs = data.names;
  
  sampleIDs.forEach(sampleID => {
  
  dropdown.append("option").text(sampleID).property("value", sampleID)
 
  
  })
  
  buildCharts(sampleIDs[0]);
  
  demoInfo(sampleIDs[0]);
  
  });
  
  };
  
  
  
  initDashboard();
  

  
// option change function 
function optionChanged(userchoice) {
    console.log(userchoice);

    buildCharts(userchoice);

    demoInfo(userchoice);
  


}


function buildCharts(sampleID) {



// use the D3 library to read the samples.json
// create a promise by using d3.json("samples".json)
// and use .then() method to execute a callback funtion when data is loaded
  d3.json("samples.json").then((data => {
    
// create variables for samples and metadata arrays of objects

  var samples = data.samples
  
  var metadata = data.metadata
  
// filter the metadata array on the first element (ID) and store the patient ID in a variable
  var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == sampleID)[0]
  
// filter the sample array on the ID element and store the patient ID in a variable
  var filteredSample = samples.filter(bacteriaInfo => bacteriaInfo.id == sampleID)[0]
  
// use sample_values variable for the sample_values 
  var sample_values = filteredSample.sample_values

// create cariable for the otu_ids to be used as lables for the bar chart
  var otu_ids = filteredSample.otu_ids
  
// store otu_labels in a variable to be used as hover text of the chart
  var otu_labels = filteredSample.otu_labels
  
// create a bar chart
  var bar_data = [{
  
  
// use sample_values as the values for the bar chart 
  x: sample_values.slice(0, 10).reverse(),
  
  
// use otu_ids as labels for the bar chart
  y: otu_ids.slice(0, 10).map(otu_id => `OTU ${otu_id}`).reverse(),
  
  
 
  text: otu_labels.slice(0, 10).reverse(),
  
  type: 'bar',
  
  orientation: 'h',
  
  marker: {
  
  color: 'cornflowerblue'
  
  },
  
  }]
  
// bar chart layout
  
  var bar_layout = {
  
  title: "<b>Top 10 Microbs <br> found in Belly Buttons<b>",
  
  xaxis: { title: "Bacteria Sample Values" },
  
  yaxis: { title: "OTU IDs" }
  
  };
  
  
  
  Plotly.newPlot('bar', bar_data, bar_layout)
  
  
// Bubble Chart 
  
  var bubble_data = [{
  
  
// x values
  x: otu_ids,
  
  
// y values
  y: sample_values,
  
  
// text values 
  text: otu_labels,
// markers 
  mode: 'markers',
  
  marker: {
  
  color: otu_ids,
   
  size: sample_values,
  
  colorscale: 'turbo'
  
  }
  
  }];
  
  
  
  var layout = {
  
  title: "<b>Belly Button Samples<b>",
  
  xaxis: { title: "OTU IDs" },
  
  yaxis: { title: "Sample Values" }
  
  };
  
  
  
  
  
  Plotly.newPlot('bubble', bubble_data, layout)
  
  
  
// Washing frequency Gauge chart
  var washFreq = filteredMetadata.wfreq
  
  
  
  var gauge_data = [
  
  {
  
  domain: { x: [0, 1], y: [0, 1] },
  
  value: washFreq,
  
  title: { text: "<b>Belly Button Washing Frequency</b> <br> Scrubs per Week" },
  
  type: "indicator",
  
  mode: "gauge+number",
  
  gauge: {
  
  bar: {color: 'snow'},
  
  axis: { range: [null, 9] },
  
  steps: [
  
  
  { range: [0, 1], color: 'lightcyan' },
  
  { range: [1, 2], color: 'lightblue' },
  
  { range: [2, 3], color: 'mediumaquamarine' },
  
  { range: [3, 4], color: 'mediumseagreen' },
  
  { range: [4, 5], color: 'lightseagreen' },

  { range: [5, 6], color: 'cadetblue' },
  
  { range: [6, 7], color: 'steelblue' },
  
  { range: [7, 8], color: 'royalblue' },
  
  { range: [8, 9], color: 'mediumblue' },

  ],
  
  

  }
  
  }
  
  ];
  
  
  
  var gauge_layout = { width: 500, height: 400, margin: { t: 0, b: 0 } };
  
   
  
  Plotly.newPlot('gauge', gauge_data, gauge_layout);
  
  }))
  
    
  
  };
  
  
// demographic information

  function demoInfo(sampleID) {

    
      var demographicInfo = d3.select("#sample-metadata");


    // clear any existing data by using '.html("")

      demographicInfo.html("")

 
      d3.json("samples.json").then(data => {
      
      var metadata = data.metadata
      
      var filteredMetadata = metadata.filter(bacteriaInfo => bacteriaInfo.id == sampleID)[0]
      
        
      console.log(filteredMetadata)
      
      Object.entries(filteredMetadata).forEach(([key, value]) => {
      
      demographicInfo.append("h6").text(`${key.toUpperCase()}: ${value}`);

  
  })
  
  
  
  })
  
  }
 
  
   
  
  