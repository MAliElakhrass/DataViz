"use strict";

/**
 * File to draw the "focus" and "context" line charts.
 */


/**

 * Creates an SVG line using the specified X and Y domains
 * This function is used by the "focus" and "context" line charts
 *
 * @param x               X domain
 * @param y               Y domain
 * @return d3.svg.line    SVG line
 *
 * @see https://bl.ocks.org/gordlea/27370d1eea8464b04538e6d8ced39e89      (see line generator)
 */
function createLine(x, y) {
  return d3.line()
    .x(function(d) { return x(d.date); })
    .y(function(d) { return y(d.count); })
    .curve(d3.curveBasisOpen)

function setStrokeColor(name, color){
  if (name == "Moyenne"){
    return 'black';
  }

  return color(name)
}

/**
 * Creates the "focus" line chart
 *
 * @param g         The SVG group where you draw the graphic. 
 * @param sources   The data to use. 
 * @param line      The function to draw the lines of the graphic. 
 * @param color     Color scale with street names associated to colors
 */
function createFocusLineChart(g, sources, line, color) {
  sources.forEach(element => {
    var width = 1;
    if (element.name == "Moyenne") {
      width = 2;
    }

    g.append("path")
    .datum(element.values)
    .attr("class", "line")
    .attr("d", line)
    .attr("clip-path", "url(#clip)")
    .style('stroke', setStrokeColor(element.name, color))
    .style('stroke-width', width)
  });

}

/**
 * Creates the "context" line chart
 *
 * @param g         The SVG group where you draw the graphic. 
 * @param sources   The data to use. 
 * @param line      The function to draw the lines of the graphic. 
 * @param color     Color scale with street names associated to colors
 */
function createContextLineChart(g, sources, line, color) {
  sources.forEach(element => {
    var width = 1;
    if (element.name == "Moyenne") {
      width = 2;
    }
    
    g.append("path")
    .datum(element.values)
    .attr("class", "line")
    .attr("d", line)
    .style('stroke', setStrokeColor(element.name, color))
    .style('stroke-width', width)
  });
}
