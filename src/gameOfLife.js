const {
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells,
  deductUpperBounds,
  addUpperBounds
} = require("./lib.js");

const nextGeneration = function(currGeneration, bounds) {
  let modifiedCurrGen = deductUpperBounds(currGeneration, bounds);
  let { length, width, livePositionValue } = convertCoordinateToValue(
    modifiedCurrGen,
    bounds
  );

  let nextGenValues = produceNextGenAliveCells(
    length,
    width,
    livePositionValue
  ).sort((a, b) => a - b);
  let nextGenCoordinates = convertValueToCoordinate(nextGenValues, length);
  return addUpperBounds(nextGenCoordinates, bounds);
};

module.exports = { nextGeneration };