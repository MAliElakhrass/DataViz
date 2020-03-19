"use strict";

/**
 * File allowing to define the text to be shown in the tooltip.
 */


/**
 * Retrieves the text associated with the tooltip.
 *
 * @param d               Data associated to the currently hovered circle.
 * @param formatNumber    Function that allows you to correctly format numbers.
 * @return {string}       The text to show in the tooltip.
 */
function getToolTipText(d, formatNumber) {

  return "Pays: <b>" + d.name + "</b>"
          + "<br /> Esperance de vie : <b>" + formatNumber(d.lifeExpectancy) + "</b> ans"
          + "<br />Revenu : <b>" + formatNumber(d.income) + "</b> USD"
          + "<br />Population : <b>" + formatNumber(d.population) + "</b> </b> habitants"
          + "<br />Zone du monde : <b>" + d.zone + "</b>";

}
