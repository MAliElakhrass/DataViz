"use strict";

/**
 * File to process data from the CSV. 
 */


/**
 * Specifies the domain and the range of colors for the scale to distinguish the political parties. 
 *
 * @param color     Color scale.
 * @param parties   The information to use for the different parties. 
 */
function colorScale(color, parties) {
  color.domain(parties.map(d => d.name));
  color.range(parties.map(d => d.color));
}
  

/**
 * Converts each of the number from the CSV file to type "number"
 * @param data      Data from the CSV. 
 */
function convertNumbers(data) {
  data.forEach(element => {
    element.id = parseInt(element.id, 10)
    element.votes = parseInt(element.votes, 10)
  });
}

/**
 * Reorganizes the data to combine the results for a given district 
 *
 * @param data      Data from the CSV. 
 * @return {Array}  The reorganized data to usee. The return element must be a table of objects with 338 entries, meaning
 *                  one entry per riding. Each entry must present the results for each candidate in decreasing order (from
 *                  the candidate with the most votes to the one with the least votes). The returned object must look like: 
 *
 *                  [
 *                    {
 *                      id: number              // The number of the district 
 *                      name: string,           // The number of the district 
 *                      results: [              // the table with the results for the candidates
 *                                              // *** This table must be sorted in decreasing order of votes. ***
 *                        {
 *                          candidate: string,  // The name of the candidate
 *                          votes: number,      // The number of votes for the candidate
 *                          percent: string,    // The percentage of votes for the candidate
 *                          party: string       // The political party of the candidate
 *                        },
 *                        ...
 *                      ]
 *                    },
 *                    ...
 *                  ]
 */
function createSources(data) {
  var index = 0;
  var currentId = 0;
  var reorgonizedData = []
  data.forEach(element => {
    if (index > 0){ // Sort last riding
      reorgonizedData[index-1].results.sort((a, b) => d3.descending(a.votes, b.votes))
    }

    if (element.id != currentId) {
      currentId = element.id;
      reorgonizedData.push(
        {
          id: element.id,
          name: element.name,
          results: [
            {
              candidate: element.candidate,
              votes: element.votes,
              percent: element.percent,
              party: element.party
            }
          ]
        }
      );
      index++;
    } else {
      reorgonizedData[index-1].results.push(
        {
          candidate: element.candidate,
          votes: element.votes,
          percent: element.percent,
          party: element.party
        }
      );
    }

    // Sort last elem
    reorgonizedData[index-1].results.sort((a, b) => d3.descending(a.votes, b.votes))
    
  }); 

  return reorgonizedData;
}
