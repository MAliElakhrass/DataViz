"use strict";

/**
 * File used to draw the bubble chart.
 */


/**
 * Creates the bubble graph axis.
 *
 * @param g       The SVG group in which the bubble chart will be drawn.
 * @param xAxis   The X axis. 
 * @param yAxis   The Y axis.
 * @param height  The graphic's height.
 * @param width   The graphic's width.
 */
function createAxes(g, xAxis, yAxis, height, width) {
  // TODO: Draw the X and Y axes.
  
  g.append("g")
    .attr("class", "axis x")
    .attr("transform", "translate(" + 0 + "," + height + ")")
    .call(xAxis);

  g.append("g")
    .attr("class", "axis y")
    .call(yAxis);

  g.append("text")
    .attr("class", "axis x legend")
    .attr("text-anchor", "middle")
    .text('Espérance de vie (annees)')
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("transform", "translate(" + (width - 80) + "," + (height - 10) + ")");

  g.append("text")
    .attr("class", "axis y legend")
    .attr("text-anchor", "middle")
    .text('Revenu (USD)')
    .attr("font-family",  "Gill Sans", "Gill Sans MT")
    .attr("transform", "rotate(" + 270 + ") translate(" + -50 + ", " + 20 + ")");
}

/**
 * Crée le graphique à bulles.
 *
 * @param g       The SVG group in which the bubble chart will be drawn.
 * @param data    Data to use.
 * @param x       Scale for the X axis.
 * @param y       Scale for the Y axis.
 * @param r       Scale for the circles' radiuses.
 * @param color   Scale for the circles' color.
 * @param tip     Tooltip to show when a circle is hovered.
 */
function createBubbleChart(g, data, x, y, r, color, tip) {
  // TODO: Draw the graph's circles by using the specified scales.
  //       Make sure you add the tooltip when a circle is hovered.

  g.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => x(d.lifeExpectancy))
    .attr("cy", d => y(d.income))
    .attr("r", d => r(d.population))
    .attr("fill", d => color(d.zone))
    .on('mouseover', tip.show)
    .on('mouseout', tip.hide);
}
