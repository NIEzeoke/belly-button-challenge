// Load in json using d3 and provided url
const url =
  "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

const dataPromise = d3.json(url);
console.log(dataPromise);


function charts(x) {
    console.log(`x: ${x}`)
    d3.json(url).then((data) => {
        console.log(data);

        let sampleValues = data.samples;
        let results = sampleValues.filter(value => value.id==x);
        let result = results[0];  
        // console.log("sample val: ", sampleValues)
        let otuId = result.otu_ids
          .slice(0, 10)
          .map((x) => `OTU ${x}`)
          .reverse();
        // console.log("otuids :", otuId)
        let labels = result.otu_labels;
        // console.log("labels :", labels)
        let samplefig = result.sample_values;
        let trace1 = {
          x: samplefig.slice(0, 10).reverse(),
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
          title: "Top 10 OTU",
        };
      
        //create the bar plot
        Plotly.newPlot("bar", traceData, layout);

        //Bubble plot setup

        let trace2 = {
          x:result.otu_ids,
          y:samplefig,
          mode: 'markers',
          marker: {
            size: samplefig,
            color: result.otu_ids
          },
          text: labels
        };
        // Apply a title to the layout
        let bubbleData = [trace2];

        // Apply a title to the layout        
        let layout2 = {
          title: "Sample Values by OTU ID "
        };

        // create the bubble plot
        Plotly.newPlot("bubble", bubbleData, layout2);
      });
};

// Function to retrieve and append metadata
function createMetaData(params) {
  d3.json(url).then((data) => {
    let metadata = data.metadata;

    console.log(metadata);

    let result = metadata.filter(meta => meta.id.toString() === params)[0];

    let demographicInfo = d3.select("#sample-metadata");

    demographicInfo.html("");

    Object.entries(result).forEach((key)=>{
      demographicInfo.append("h5").text(key[0].toUpperCase() + ": " + key[1] + "\n");
    });
  });
};

// functin for changes to sample
function optionChanged(params) {
  createMetaData(params);
  charts(params);
};

//init function
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
    };
    createMetaData(names[0]);
    charts(names[0]);
  });
};



init();
