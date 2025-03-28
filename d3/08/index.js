/* axes showed up but still 
trying to make it look
good. so this is pending notes.
resume: make it look good, add to notes
*/

/* Add Axes */

// make sure all DOM content loaded before running this function
document.addEventListener("DOMContentLoaded", function (e) {
  // const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];
  const dataset = [1, 2, 3, 4, 5];

  // define barchart container dimension
  const svgWidth = 600;
  const svgHeight = 200;
  const barPadding = 5;
  const barWidth = svgWidth / dataset.length;

  // query svg element and set width and height
  const chart1 = d3
    .select(".chart1")
    .attr("width", svgWidth)
    .attr("height", svgHeight)
    .style("background-color", "gainsboro");

  // create function to scale data
  const yScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([svgHeight, 0]);

  const xScale = d3
    .scaleLinear()
    .domain([0, d3.max(dataset)])
    .range([0, svgWidth]);

  // create axes
  const xAxis = d3.axisBottom().scale(xScale);
  const yAxis = d3.axisLeft().scale(yScale);

  // append axes to svg element
  chart1.append("g").attr("transform", "translate(50, 10)").call(yAxis);

  const xAxisTranslate = svgHeight - 100;
  chart1
    .append("g")
    .attr("transform", `translate(50, ${xAxisTranslate})`)
    .call(xAxis);

  // create barchart
  const barchart = chart1
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return svgHeight - yScale(d);
    })
    .attr("height", function (d) {
      return yScale(d);
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
      const translate = [barWidth * i, 0];
      return `translate(${translate})`;
    })
    .style("fill", "salmon");

  console.log("chart1", chart1);
  console.log("barchart", barchart);

  const textAnnos = chart1
    .selectAll("text")
    .data(dataset)
    .enter()
    .append("text")
    .text(function (d) {
      return d;
    })
    .attr("y", function (d, i) {
      return svgHeight - yScale(d) - 2;
    })
    .attr("x", function (d, i) {
      return barWidth * i;
    });
});
