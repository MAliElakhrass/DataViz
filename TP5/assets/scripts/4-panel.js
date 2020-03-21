"use strict";

/**
 * File to deal with the display of the information panel for a district
 */


/**
 * Update the X and Y domains used by the horizontal bar chart when the data is modified. 
 *
 * @param districtSource    The data associated to a district
 * @param x                 The X scale
 * @param y                 The Y scale
 */
function updateDomains(districtSource, x, y) {
  var results = districtSource.results;

  x.domain([d3.min(results, d => d.votes), d3.max(results, d => d.votes)])
  y.domain(results.map(d => d.party))  
}

/**
 * Update the textual information in the information panel based on the new data
 *
 * @param panel             The D3 element corresponding to the information panel.
 * @param districtSource    The data associated to a district.
 * @param formatNumber      Function to correctly format numbers. 
 */
function updatePanelInfo(panel, districtSource, formatNumber) {
  var winner = districtSource.results[0];

  panel.select("#district-name").text(districtSource.name + " [" + districtSource.id + "]");
  panel.select("#elected-candidate").text(winner.candidate + " (" + winner.party + ")");
  panel.select("#votes-count").text(formatNumber(d3.sum(districtSource.results, d => d.votes)) + " votes");
}

/**
 * Met à jour le diagramme à bandes horizontales à partir des nouvelles données de la circonscription sélectionnée.
 * Updates the horizontal bar chart based on the new data from the selected district. 
 *
 * @param gBars             The group where the bars should be created. 
 * @param gAxis             The group where the Y axis of the graph should be created. 
 * @param districtSource    The data associated to a riding. 
 * @param x                 The X scale. 
 * @param y                 The Y scale. 
 * @param yAxis             The Y axis. 
 * @param color             The color scale associated to each political party. 
 * @param parties           The information to use on the different parties. 
 *
 * @see https://bl.ocks.org/hrecht/f84012ee860cb4da66331f18d588eee3
 */
function updatePanelBarChart(gBars, gAxis, districtSource, x, y, yAxis, color, parties) {
  yAxis.tickFormat(function(d) {
    var party = parties.find(function(element) {
      return element.name == d;
    });

    if (party == undefined) {
      return "Autre";
    } else {
      return party.abbreviation;
    }
  });

  gAxis.attr("class", "y axis").call(yAxis)

  gBars.selectAll(".bar").remove();
  var bars = gBars.selectAll(".bar")
                  .data(districtSource.results)
                  .enter()
                  .append("g")
                  .attr("class", "bar");

  bars.append("rect")
      .attr("y", function(d) {
        return y(d.party);
      })
      .attr("width", function(d) {
        return x(d.votes);
      })
      .attr("height", function(d) {
        return y.bandwidth();
      })
      .attr("fill", function(d) {
        return color.domain().includes(d.party) ? color(d.party) : "gray";
      });

  bars.append("text")
      .attr("x", function(d) {
        return x(d.votes) + 5
      })
      .attr("y", function(d) {
        return y(d.party) + y.bandwidth()/2
      })
      .style("text-anchor", "start")
      .style("alignment-baseline","middle")
      .text(d => d.percent)
  
}

/**
 * Reinitialize the map display when the information panel is closed. 
 *
 * @param g     The group in which the traces for the circumsciptions is created. 
 */
function reset(g) {
  g.selectAll(".selected").classed("selected",false)
}
