// Load in json using d3 and provided url
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log(dataPromise);



function createMetaData(params) {
    console.log(params)
}

function charts(x) {
    console.log(x)
    d3.json(url).then((data) => {
        console.log(data);

        let sampleValues = data.samples;
        let results = sampleValues.filter(dog => dog.id==x)
        let result = results[0]  
        // console.log("sample val: ", sampleValues)
        let otuId = result.otu_ids
          .slice(0, 10)
          .map((x) => `OTU ${x}`)
          .reverse();
        // console.log("otuids :", otuId)
        let labels = result.otu_labels;
        // console.log("labels :", labels)
        let xvalues = result.sample_values;
        let trace1 = {
          x: xvalues.slice(0, 10).reverse(),
          y: otuId,
          text: labels.slice(0, 10).reverse(),
          type: "bar",
          orientation: "h",
        };
        // console.log("trace1 data : ", trace1)
      
        // Create data array
        let traceData = [trace1];
      
        // Apply a title to the layout
        let layout = {
          title: "Belly Button Biodiversity",
          // Include margins in the layout so the x-tick labels display correctly
          // margin: {
          //     l: 50,
          //     r: 50,
          //     b: 200,
          //     t: 50,
          //     pad: 4
          // }
        };
      
        //create the bar plot
        Plotly.newPlot("bar", traceData, layout);
      });
};

function init() {
    dropdown = d3.select("#selDataset");
  d3.json(url).then((data) => {
    let names = data.names;
    console.log(names);
    for (let i = 0; i < names.length; i++) {
      dropdown
        .append("option")
        .text(names[i])
        .property("value", names[i]);
    }
    createMetaData(names[0]);
    charts(names[0]);
  });
}

function optionChanged(params) {
  createMetaData(params);
  charts(params);
}

init();
