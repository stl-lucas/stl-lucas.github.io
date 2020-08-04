d3.json("samples.json").then(function(bioData) {
  // Create new arrays from sample data
  var names = bioData.names.map(d => d);
  var metadata = bioData.metadata.map(d => d);
  var samples = bioData.samples.map(d => d);

  // Populate Dropdown menu
  var idDrop = d3.select("#selDataset");
  names.forEach(id => {
      var option = idDrop.append("option")
      option.text(id);
  })

  // Initialize id from dropdown default value
  var id = names.indexOf("940");

  // Populate Sample Metadata
  var demographic = metadata[id];
  var demo_info = d3.select("#sample-metadata");
  Object.keys(demographic).forEach(function(key) {
    demo_info.append("div").text(`${key}: ${demographic[key]}`);
  })

  // Build Bar Chart
  var trace = {
      x: samples[id].otu_ids,
      y: samples[id].sample_values,
      text: samples[id].otu_labels,
      type: 'bar',
      orientation: 'h'
    };

  var data = [trace];

  Plotly.newPlot("bar", data);

  // Build Gauge Chart
  var data = [
    {
      domain: { x: [0, 1], y: [0, 1] },
      value: demographic["wfreq"],
      title: { text: "Belly Button Washing Frequency" },
      type: "indicator",
      mode: "gauge",
      gauge: {
        axis: { range: [0, 9] },
        steps: [
          { range: [0, 1], color: "#ffffff" },
          { range: [1, 2], color: "#ccffcc" },
          { range: [2, 3], color: "#cccccc" },
          { range: [3, 4], color: "#99cc99" },
          { range: [4, 5], color: "#009966" },
          { range: [5, 6], color: "#009933" },
          { range: [6, 7], color: "#006633" },
          { range: [7, 8], color: "#336633" },
          { range: [8, 9], color: "#333333" },
        ],
        threshold: {
          line: { color: "red", width: 4 },
          thickness: 0.75,
          value: demographic["wfreq"]
        }
      }
    }
  ];
  
  var layout = { width: 400, height: 300, margin: { t: 0, b: 0 } };
  Plotly.newPlot('gauge', data, layout);

  // Build Bubble Chart
  var trace = {
    x: samples[id].otu_ids,
    y: samples[id].sample_values,
    type: 'scatter',
    mode: 'markers',
    text: samples[id].otu_labels,
    marker: {
      size: samples[id].sample_values,
      color: samples[id].otu_ids
    }
  };
  
  var data = [trace];
  
  var layout = {
    height: 400,
    width: 1000
  };
  
  Plotly.newPlot('bubble', data, layout);

}).catch(error => console.log(error));

d3.selectAll("body").on("change", updatePage);

function updatePage() {
  var dropdownMenu = d3.selectAll("#selDataset").node();
  id = dropdownMenu.value;
  d3.json("samples.json").then(function(bioData) {
  
    var names = bioData.names.map(d => d);
    var metadata = bioData.metadata.map(d => d);
    var samples = bioData.samples.map(d => d);
    
    demographic = metadata[id];
    demo_info = d3.select("#sample-metadata");
    Object.keys(demographic).forEach(function(key) {
      demo_info.append("div").text(`${key}: ${demographic[key]}`);
    })

    Plotly.restyle("bar", "x", [samples[id].otu_ids]);
    Plotly.restyle("bar", "y", [samples[id].sample_values]);
    Plotly.restyle("bar", "text", [samples[id].otu_labels]);
  });
}