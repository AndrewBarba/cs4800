'use strict';

/**
 * Returns the cheapest way to colonize the given species
 * The first argument is an Array of species, and the second argument
 * is an array of discounts.
 *
 * A single species in the array, accesed like species[0], has 2 properties:
 * - cost: Int - the cost to bring 1 of these species without a discount
 * - needToBring: Int - the number of species I need to bring
 *
 * A single discount in the array, accesed like discounts[0], has 2 properties:
 * - price: Int - the total price of this discount after applying it
 * - package: [Int] - the number of species this discount includes. For example:
 *                    if discounts[2] == 4, that means this discount can bring 4
 *                    of the same type of species at species[2]
 *
 * @param {[Species]} species
 * @param {[Discount]} discounts
 * @return Int
 */
function colonize(species, discounts) {

  // This is the price without applying any discounts.
  // Any price >= this can be immediately rejected.
  const initialPrice = species.reduce((answer, species) => {
    return answer + (species.cost * species.needToBring);
  }, 0);

  // Variable to store our current answer
  let cheapestPrice = initialPrice;

  //
  // Your implementation here
  //

  return cheapestPrice;
}

/**
 * Returns the price of applying a single discount to a set of species
 *
 * @param {[Species]} species
 * @param {[Discounts]} discounts
 * @return Int
 */
function priceWithDiscount(species, discounts) {

  // Combine the discounts first
  const discount = combineDiscounts(species, discounts);

  try {
    // Calculate price when applied to list of species
    return species.reduce((answer, species, i) => {
      if (species.needToBring < discount.package[i]) throw new Error('Invalid discount');
      return answer + (species.cost * (species.needToBring - discount.package[i]));
    }, discount.price);
  } catch(err) {
    // -1 indicates an invalid discount
    return -1;
  }
}

/**
 * Combines a list of discounts into a single discount
 *
 * @param {[Species]} species
 * @param {[Discounts]} discounts
 * @return Discount
 */
function combineDiscounts(species, discounts) {
  return discounts.reduce((prev, cur) => {
    return {
      price: prev.price + cur.price,
      package: prev.package.map((num, i) => num + cur.package[i])
    };
  }, {
    price: 0,
    package: species.map(() => 0)
  });
}

/*----------------------------------------------------------------------------*
 *
 *
 *
 *
 * IGNORE BELOW THIS POINT
 *
 *
 *
 *
 *----------------------------------------------------------------------------*/

function processData(input) {

  // Parse lines
  const parts = input.split('\n').map(line => line.split(' ').map(num => parseInt(num)));

  // Parse species
  const species = parts[1].map((count, i) => {
    return {
      needToBring: count,
      cost: parts[2][i]
    };
  });

  // Parse discounts
  const discounts = parts.slice(3).map(flight => {
    return {
      price: flight[0],
      package: flight.slice(1)
    };
  });

  // Run algorithm
  let minPrice = colonize(species, discounts);

  // Print to stdout
  console.log(minPrice);
}

/*----------------------------------------------------------------------------*
 * Read Data
 *----------------------------------------------------------------------------*/

let input = "";
process.stdin.resume();
process.stdin.setEncoding('ascii');
process.stdin.on('data', data => input += data);
process.stdin.on('end', () => processData(input.trim()));
