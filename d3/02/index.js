/* Selecting and manipulating DOM element */

// select dom element and edit style
d3.select('h1').style('color', 'red')

// add new element to body
d3.select('body').append('h2').text('my h2 heading')
// add class to existing element
.attr('class', 'heading2');

console.log('h2:', d3.select('h2'))

d3.select('body').append('p').text('First paragraph');
d3.select('body').append('p').text('Second paragraph');
d3.select('body').append('p').text('Third paragraph');

// select multiple elements
d3.selectAll('p').style('color', 'blue')