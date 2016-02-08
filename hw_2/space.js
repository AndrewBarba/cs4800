/**
 * HackerRank
 * andrewbarba
 */
'use strict';

/*----------------------------------------------------------------------------*
 * Space Colony
 *----------------------------------------------------------------------------*/

function processData(input) {
  let parts = input.split('\n').map(line => line.split(' ').map(num => parseInt(num)));

  let species = [];
  let discounts = [];

  // Parse species
  parts[1].forEach((count, i) => species.push({
    count: count,
    cost: parts[2][i]
  }));

  species.forEach((s, j) => {
    for (let i = 1; i <= s.count; i++) {
      let carry = [];
      for (let k = 0; k < species.length; k++) {
        carry.push(k === j ? i : 0);
      }
      let d = {
        cost: i * s.cost,
        carry: carry
      };
      discounts.push(d);
    }
  });

  // Parse discounts
  parts.slice(3).forEach(flight => discounts.push({
    cost: flight[0],
    carry: flight.slice(1)
  }));

  console.log(discounts);
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));
