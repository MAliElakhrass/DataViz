"use strict";

/**
 * File that generates a search result's display.
 */


/**
 * 
 * Allows the highlight the country that was selected via the search bar.
 *
 * @param countrySelected     Name of the selected country.
 * @param g                   The SVG group in which the bubble chart will be drawn.
 */
function search(countrySelected, g) {
  g.selectAll("circle").attr("class", d => d.name == countrySelected ? 'selected' : 'hide');
}

/**
 * Resets the display to its default state.
 *
 * @param g   The SVG group in which the bubble chart will be drawn.
 */
function reset(g) {
  
  g.selectAll("circle").attr("class", '');

}
