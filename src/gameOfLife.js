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
  let {length,width,livePositionValue } = convertCoordinateToValue(modifiedCurrGen,bounds);
  let inputValueArray = produceNextGenAliveCells(length,width,createObject(length,width),livePositionValue);
  let nextGenCoordinates = convertValueToCoordinate(inputValueArray,length);
  return getModifiedNextGen(nextGenCoordinates,bounds);
}

module.exports = { nextGeneration };
