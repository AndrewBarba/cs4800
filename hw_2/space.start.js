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
 * @param {Int} initialPrice - initial price of bringing all species without applying any discounts
 * @param {[Species]} species
 * @param {[Discount]} discounts
 * @return Int
 */
function colonize(initialPrice, species, discounts) {
  let cheapestPrice = initialPrice;

  //
  // Your implementation here
  //

  return cheapestPrice;
}

/*----------------------------------------------------------------------------*
 * Helper functions
 *----------------------------------------------------------------------------*/

/**
 * Returns the price of applying a set of discounts to a set of species
 *
 * @param {[Species]} species
 * @param {[Discounts]} discounts
 * @return Int
 */
function priceWithDiscounts(species, discounts) {
  return priceWithDiscount(species, combineDiscounts(discounts));
}

/**
 * Returns the price of applying a single discount to a set of species
 *
 * @param {[Species]} species
 * @param {Discounts} discount
 * @return Int
 */
function priceWithDiscount(species, discount) {
  try {
    return species.reduce((answer, species, i) => {
      if (species.needToBring < discount.package[i]) throw new Error('Invalid discount');
      return answer + (species.cost * (species.needToBring - discount.package[i]));
    }, discount.price);
  } catch(err) {
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
function combineDiscounts(discounts) {
  return discounts.reduce((answer, discount) => {
    if (!answer) return discount;
    return {
      price: answer.price + discount.price,
      package: answer.package.map((num, i) => num + discount.package[i])
    };
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

  // This is the price without applying any discounts.
  // Any price >= this can be immediately rejected.
  const initialPrice = species.reduce((answer, species) => {
    return answer + (species.cost * species.needToBring);
  }, 0);

  // Run algorithm
  let minPrice = colonize(initialPrice, species, discounts);

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
