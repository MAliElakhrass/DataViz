"use strict";

/**
 * File preprocessing the data from the CSV file.
 */


/**
 * 
 * Specifies the color domain for each BIXI station.
 *
 * @param color   Color scale.
 * @param data    Data from JSON file.
 */
function domainColor(color, data) {
  var stations = data.map(row => row.name);

  color.domain(stations);
}

/**
 * Specifies the scale for the X axis of the bar chart.
 *
 * @param x       X scale to use.
 * @param data    Data from JSON file.
 */
function domainX(x, data) {
  var stations = data.map(row => row.name);

  x.domain(stations)
}

/**
 * Specifies the Y axis for the bar chart.
 *
 * @param y             Y scale.
 * @param currentData   Data currently used by the bar chart.
 */
function domainY(y, currentData) {
  var valueArray = currentData.destinations.map(d => d.count);

  y.domain([d3.min(valueArray), d3.max(valueArray)]);
}

/**
 * Returns an adjacency matrix from the data in order to create the cord diagram.
 *
 * @param data        Data frlom JSON file.
 * @return {Array}    A 10x10 matrix indicating the number of trips from a station to another.
 */
function getMatrix(data) {
  var adjacencyMatrix = []; 

  data.forEach(row => {
    var dest = [];
    row.destinations.forEach(station => {
      dest.push(station.count);
    });

    adjacencyMatrix.push(dest);
  });

  return adjacencyMatrix;
}

/**
 * Get the total number of trips during August 2015.
 *
 * @param data    Data from JSON file.
 */
function getTotal(data) {
  var total = 0;

  data.forEach(row => {
    total += d3.sum(row.destinations, d => d.count);
  });

  return total;
}
