"use strict";

/**
 * File allowing to preprocess data in the CSV files.
 */


/**
 * Initializes data from the CSV files by transforming strings that represent
 * numbers to the Javascript type "number".
 *
 * @param data    Data that comes from a CSV file
 */
function initializeData(data) {
  // TODO: Convert the properties "income", "lifeExpectancy" and "population" to the "number" type for each entry.
  data.forEach(row => {
    row.income = parseFloat(row.income);
    row.lifeExpectancy = parseFloat(row.lifeExpectancy);
    row.population = parseInt(row.population);
  });
}

/**
 * Set the domain scale for the X axis of the bubble chart.
 *
 * @param x     X scale to use.
 */
function domainX(x) {
  x.domain([35,90])
}

/**
 * Set the domain scale for the Y axis of the bubble chart.
 *
 * @param y     Y scale to use.
 */
function domainY(y) {
  y.domain([0,140000])
}

/**
 * Set the color scale domain for the colors. Each value of the scale is used to distinguish each world region.
 *
 * @param color   Color scale.
 * @param data    Data that comes from a CSV file
 */
function domainColor(color, data) {
  var zones = data.map(row => row.zone)
  zones = new Set(zones)

  color.domain(zones.values());
}

/**
 * Set the domain scale for the circles' radiuses that are used to represent the countries' population.
 *
 * @param r       Scale of the circles radiuses.
 * @param data    Data that comes from a CSV file
 */
function domainRadius(r, data) {
  var popMin = d3.min(data.map(row => row.population));
  var popMax = d3.max(data.map(row => row.population));
  
  r.domain([popMin, popMax]);
}
