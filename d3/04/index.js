/* Iterate dataset and create HTML element */

const dataset = [1,2,3];

d3.select('body')
    .selectAll('p')
    .data(dataset) // pass the dataset
    .enter()
    .append('p') // add new p element
    .text(function(d) { // for each dataset item
        console.log('d', d)
        return `This is paragraph ${d}` // include text
    })

console.log(d3.selectAll('p'))
