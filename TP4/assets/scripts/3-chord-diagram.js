"use strict";

/**
 * File allowing to draw the chord diagram.
 */


/**
 * Creates the groups for the chord diagram.
 *
 * @param g               The SVG group in which the bar chart has to be drawn.
 * @param data            Data from JSON file.
 * @param layout          The layout used by the chord diagram.
 * @param arc             Function that draws acrcs.
 * @param color           The color scale that associates a distinct color to a BIXI station.
 * @param total           The total number of trips made for the month of August 2015.
 * @param formatPercent   Function allowing to correctly format a percentage from a number.
 *
 * @see https://bl.ocks.org/mbostock/4062006
 */
function createGroups(g, data, layout, arc, color, total, formatPercent) {
  var group = g.selectAll("g")
              .data(layout.groups)
              .enter();

  group.append("path")
      .attr("class", "group")
      .attr("fill", d => color(d.index))
      .attr("id", d => "arc" + d.index)
      .attr("d", arc);

  group.append("text")
       .attr("x", 6)
       .attr("dy", 15)
       .append("textPath")
       .attr("href",d => "#arc" + d.index)
       .style("fill", "white")
       .text(d => {
         var name = data[d.index].name
         if (name === "Métro Mont-Royal (Rivard/Mont-Royal)"){
            return "Métro Mont-Royal"
         }
         else if (name === "Pontiac / Gilford") {
           return "Pontiac"
         }
        return name
       })
       .style("text-anchor","start") 
       .style("font-size","12px")

       .append("title")
       .text(d => {

         return d.value + ": " + formatPercent(d.value/total) + " des départs";
       });
}

/**
 * Creates the chords for the chord diagram.
 *
 * @param g               The SVG group in which the bar chart has to be drawn.
 * @param data            Data from JSON file.
 * @param layout          The layout used by the chord diagram.
 * @param path            Function that draws acrcs.
 * @param color           The color scale that associates a distinct color to a BIXI station.
 * @param total           The total number of trips made for the month of August 2015.
 * @param formatPercent   Function allowing to correctly format a percentage from a number.
 *
 * @see https://beta.observablehq.com/@mbostock/d3-chord-dependency-diagram
 */
function createChords(g, data, layout, path, color, total, formatPercent) {
  var chords = g.selectAll("chord")
                .data(layout)
                .enter();

  chords.append("path")
        .attr("class", "chord")
        .attr("fill", d => color(d.source.index))
        .attr("id", d => "chord" + d.source.index + d.target.index)
        .attr("d", path)
        .append("title")
        .text(d => {
          return data[d.source.index].name + " -> " + data[d.target.index].name + ": " 
                  + formatPercent(d.source.value/total) + "\n" 
                  + data[d.target.index].name + " -> " + data[d.source.index].name + ": " 
                  + formatPercent(d.target.value/total);
        });
}

function fade(opacity) {
  return function(g, i) {
      svg.selectAll("path")
          .attr("class", "chord")
          .filter(function(d) { return d.source.index != i && d.target.index != i; })
          .transition()
          .style("opacity", opacity);
  };
}

/**
 * initializes the logic when a chord from the chord diagram is hovered.
 *
 * @param g     The SVG group in which the bar chart is drawn.
 */
function initializeGroupsHovered(g) {

  g.selectAll(".group")
    .on("mouseover", d => {
      d3.selectAll(".chord")
        .attr("class", dChord => {
          if(!(dChord.source.index === d.index || dChord.target.index === d.index)){
            return "chord fade";
          } else{
            return "chord";
          }
        });
    })

}
