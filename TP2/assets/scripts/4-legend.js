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
  // TODO: Create the legend that supplements the graphic.
  var size = 15
  
  svg.selectAll("mydots")
      .data(color.domain())
      .enter()
      .append("rect")
      .attr("x", 75)
      .attr("y", function(d,i){ return i*(size+5)})
      .attr("width", size)
      .attr("height", size)
      .style("fill", function(d){ if (d == "Moyenne") {return 'black'} return color(d)});

  // Add one dot in the legend for each name.
  svg.selectAll("mylabels")
      .data(color.domain())
      .enter()
      .append("text")
      .attr("x", 75 + size*1.2)
      .attr("y", function(d,i){ return 5 + i*(size+5) + (size/2)})
      .style("fill", function(d){ if (d == "Moyenne") {return 'black'} return color(d)})
      .text(function(d){ return d})
      .attr("text-anchor", "left")
      .style("alignment-baseline", "middle")

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
  // TODO: Complete the code to show or hide a line depending on the selected item

}
