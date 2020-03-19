"use strict";

/**
 * File used for generating the legend and controlling the interactions with it.
 */


/**
 * Create a legend from the given source.
 *
 * @param svg       SVG element to use in order to create the legend.
 * @param sources   Data sorted by street name and by date.
 * @param color     The 10-color scale to use.
 */
function legend(svg, sources, color) {
  var size = 10
  
  svg.selectAll("mydots")
      .data(color.domain())
      .enter()
      .append("rect")
      .attr("x", 75)
      .attr("y", function(d,i){ return i*(size+5)})
      .attr("width", size)
      .attr("height", size)
      .style("font-size", "8px")
      .style('stroke', 'black')
      .style("fill", function(d){ if (d == "Moyenne") {return 'black'} return color(d)})
      .on('click', function() {
        if (d3.select(this).style('fill') == 'white'){
          d3.select(this).style("fill", function(d){ if (d == "Moyenne") {return 'black'} return color(d)})
        } else {
          d3.select(this).style("fill", 'white')
        }
        displayLine(d3.select(this), color)
      });

  svg.selectAll("mylabels")
      .data(color.domain())
      .enter()
      .append("text")
      .attr("x", 75 + size*1.2)
      .attr("y", function(d,i){ return 3+i*(size+5) + (size/2)})
      .style("fill", 'black')
      .text(function(d){ return d})
      .style("font-size", "9px")
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

}

function setOpacity(street, element){
  if (street == element){
    return 0
  }

  return 1
}

/**
 * Allows for show/hide whether the line that corresponding to the clicked square.
 *
 * By clicking on a square, we display/hide the corresponding line and the square's interior becomes white/goes back to its original color.
 *
 * @param element   The square that was clicked
 * @param color     The 10-color scale
 */
function displayLine(element, color) {
  var colors = color.range()
  var moyenneIndex = color.domain().indexOf("Moyenne")
  colors[moyenneIndex] = "black"
  color.range(colors)

  var street = element.data()[0];
  var indexColor = color(street);

  d3.select('svg')
    .selectAll('.line')
    .style('opacity', function(){
      if (d3.select(this).style('stroke') == indexColor && d3.select(this).style('opacity') == 0 ){
        return 1
      }

      if (d3.select(this).style('stroke') == indexColor || d3.select(this).style('opacity') == 0 ){
        return 0
      }

      return 1
    });  
}
