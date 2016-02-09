/**
 * HackerRank
 * andrewbarba
 */
'use strict';

/*----------------------------------------------------------------------------*
 * Space Colony
 *----------------------------------------------------------------------------*/

function processData(input) {
  let start = Date.now();

  let parts = input.split('\n').map(line => line.split(' ').map(num => parseInt(num)));

  let species = [];
  let discounts = [];

  // Parse species
  parts[1].forEach((count, i) => species.push({
    count: count,
    cost: parts[2][i]
  }));

  // Parse discounts
  parts.slice(3).forEach(flight => discounts.push({
    cost: flight[0],
    carry: flight.slice(1)
  }));

  // Calculate price without a discount
  let answer = species.reduce((prev, cur) => prev + (cur.cost * cur.count), 0);

  // Duplicate discounts
  let len = discounts.length;
  for (let i = 0; i < len; i++) {
    try {
      priceWithDiscount(combinedDiscount([discounts[i], discounts[i]]));
    } catch(err) { continue; }
    discounts.push(discounts[i]);
  }

  // Sort discounts
  discounts = discounts.sort((a, b) => a.cost > b.cost);

  // Calculate all prices with a discount
  var ps = [[]];
  for (let i=0; i < discounts.length; i++) {
    for (let j = 0, len = ps.length; j < len; j++) {
      if (Date.now() - start > 8 * 1000) {
        console.log(answer);
        return;
      }
      let ds = ps[j].concat(discounts[i]);
      let d = combinedDiscount(ds);
      if (answer <= d.cost) continue;
      if (d.carry === parts[1]) {
        console.log(d.cost);
        return;
      }
      let p;
      try {
        p = priceWithDiscount(d);
      } catch(err) {
        continue;
      }
      answer = p < answer ? p : answer;
      ps.push(ds);
    }
  }

  console.log(answer);

  function priceWithDiscount(discount) {
    return species.reduce((prev, cur, i) => {
      if (cur.count < discount.carry[i]) throw new Error('Invalid discount');
      return prev + (cur.cost * (cur.count - discount.carry[i]));
    }, discount.cost);
  }

  function combinedDiscount(discounts) {
    return discounts.reduce((prev, cur) => {
      return {
        cost: prev.cost + cur.cost,
        carry: prev.carry.map((num, i) => num + cur.carry[i])
      };
    }, {
      cost: 0,
      carry: species.map(() => 0)
    });
  }
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));
