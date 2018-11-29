const {
  createObject,
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells } = require('./lib.js');


const nextGeneration = function(currGeneration,bounds) {
  let {side, livePositionValue } = convertCoordinateToValue(currGeneration,bounds);
  let inputValueArray = produceNextGenAliveCells(side,createObject(side),livePositionValue);
  return convertValueToCoordinate(inputValueArray,side);
}

module.exports = { nextGeneration };
