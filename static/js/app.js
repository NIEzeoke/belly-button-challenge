// Load in json using d3 and provided url
const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json"

const dataPromise = d3.json(url);
console.log(dataPromise) ;


d3.json(url).then((data) =>{
    console.log(data)
    let sampleValues = data.samples[0].sample_values
    console.log("sample val: ", sampleValues)
    let otuId = data.samples[0].otu_ids
    console.log("otuids :", otuId)
    
    let trace1 = {
        x:sampleValues,
        y: otuId,
        type: "bar",
        orientation: 'h' 
    }
    console.log("trace1 data : ", trace1)

    // Create data array
    let traceData = [trace1];

    // Apply a title to the layout
    let layout = {
        title: "Belly Button Biodiversity",
        // Include margins in the layout so the x-tick labels display correctly
        margin: {
            l: 50,
            r: 50,
            b: 200,
            t: 50,
            pad: 4
        }
    }

    //create the bar plot
    Plotly.newPlot("bar", traceData, layout);
});



