const {
  createObject,
  convertCoordinateToValue,
  produceNextGenAliveCells } = require('./lib.js');


const nextGeneration = function(currGeneration,bounds) {
  let {side, livePositionValue } = convertCoordinateToValue(currGeneration,bounds);
  return produceNextGenAliveCells(side,createObject(side),livePositionValue);
}

module.exports = { nextGeneration };
