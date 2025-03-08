/* Create Shapes Using SVG Elements */

const svgWdith = 400;
const svgHeight = 400;

const svg = d3
  .select("svg")
  .attr("width", svgWdith)
  .attr("height", svgHeight)
  .style("background-color", "gainsboro");

const leftEye = svg
  .append("circle")
  .attr("cx", 100)
  .attr("cy", 100)
  .attr("r", 80)
  .attr("fill", "pink");

const rightEye = svg
  .append("circle")
  .attr("cx", 300)
  .attr("cy", 120)
  .attr("r", 40)
  .attr("fill", "lightblue");

const rightPupil = svg
  .append("circle")
  .attr("cx", 280)
  .attr("cy", 125)
  .attr("r", 20)
  .attr("fill", "green");

const nose = svg
  .append("rect")
  .attr("x", 200)
  .attr("y", 100)
  .attr("width", 30)
  .attr("height", 150)
  .attr("fill", "purple");

const mouth = svg
  .append("path")
  .attr("d", "M 100,350 h 100")
  .attr("stroke", "blue")
  .attr("stroke-width", 8);
