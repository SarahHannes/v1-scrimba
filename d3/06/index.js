/* Add Text Annotations To Elements In The Chart */

// make sure all DOM content loaded before running this function
document.addEventListener("DOMContentLoaded", function (e) {
  const dataset = [80, 100, 56, 120, 180, 30, 40, 120, 160];

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

  // create barchart
  const barchart = chart1
    .selectAll("rect")
    .data(dataset)
    .enter()
    .append("rect")
    .attr("y", function (d) {
      return svgHeight - d;
    })
    .attr("height", function (d) {
      return d;
    })
    .attr("width", barWidth - barPadding)
    .attr("transform", function (d, i) {
      const translate = [barWidth * i, 0];

      console.log("y:", this.y, " | d:", d, " | translate:", translate);
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
      return svgHeight - d - 2;
    })
    .attr("x", function (d, i) {
      return barWidth * i;
    });
});
