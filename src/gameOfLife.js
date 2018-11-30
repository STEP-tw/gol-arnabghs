const {
  createObject,
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells,
  selectAliveWithinBound,
  getModifiedCurrGen,
  getModifiedNextGen } = require('./lib.js');


const nextGeneration = function(currGeneration,bounds) {
  let liveCellsInBound = selectAliveWithinBound(currGeneration,bounds);
  let modifiedCurrGen =  getModifiedCurrGen(liveCellsInBound,bounds);
  let {side, livePositionValue } = convertCoordinateToValue(modifiedCurrGen,bounds);
  let inputValueArray = produceNextGenAliveCells(side,createObject(side),livePositionValue);
  let nextGenCoordinates = convertValueToCoordinate(inputValueArray,side);
  return getModifiedNextGen(nextGenCoordinates,bounds);
}

module.exports = { nextGeneration };
