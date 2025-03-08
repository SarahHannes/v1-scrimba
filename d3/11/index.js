/* Read Data From Local File And Plot Line Chart */

const dataPath = "data.json";
let data;

async function getData() {
  const response = await fetch(dataPath);
  data = await response.json();
}

// get data
await getData();

// clean up data
const cleanData = [];
for (let i = 0; i < data.length; i++) {
  cleanData.push({
    date: new Date(data[i].date),
    price: Number(data[i].currency),
  });
}

console.log(cleanData);

// sort data by date
cleanData.sort((a, b) => {
  const dateA = a.date;
  const dateB = b.date;

  if (dateA < dateB) {
    return -1;
  }

  if (dateA > dateB) {
    return 1;
  }

  return 0;
});

console.log("after sort", cleanData);
plotLineChart(cleanData);

function plotLineChart(data) {
  const svgWidth = 1500;
  const svgHeight = 400;

  const margin = { top: 20, right: 20, bottom: 30, left: 50 };
  const width = svgWidth - margin.left - margin.right;
  const height = svgHeight - margin.top - margin.bottom;

  // set width and height of svg
  const svg = d3
    .select("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

  // create group
  const g = svg
    .append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

  // create scale for axes
  const x = d3.scaleTime().rangeRound([0, width]);
  const y = d3.scaleLinear().rangeRound([height, 0]);

  x.domain(
    d3.extent(data, function (d) {
      return d.date;
    })
  );

  y.domain(
    d3.extent(data, function (d) {
      return d.price;
    })
  );

  const line = d3
    .line()
    .x(function (d) {
      return x(d.date);
    })
    .y(function (d) {
      return y(d.price);
    });

  g.append("g")
    .attr("transform", `translate(0, ${height})`)
    .call(d3.axisBottom(x))
    .select(".domain")
    .remove();

  g.append("g")
    .call(d3.axisLeft(y))
    .append("text")
    .attr("fill", "black")
    .attr("transform", "rotate(-90)")
    .attr("y", 6)
    .attr("dy", "0.71em")
    .attr("text-anchor", "end")
    .text("Price ($)");

  g.append("path")
    .datum(data)
    .attr("fill", "none")
    .attr("stroke", "salmon")
    .attr("stroke-linejoin", "round")
    .attr("stroke-linecap", "round")
    .attr("stroke-width", 1.5)
    .attr("d", line);
}
