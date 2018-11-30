const {
  createObject,
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells,
  getModifiedCurrGen,
  getModifiedNextGen } = require('./lib.js');


const nextGeneration = function(currGeneration,bounds) {
  let modifiedCurrGen =  getModifiedCurrGen(currGeneration,bounds);
  let {length,width,livePositionValue } = convertCoordinateToValue(modifiedCurrGen,bounds);
  let inputValueArray = produceNextGenAliveCells(length,width,createObject(length,width),livePositionValue);
  let nextGenCoordinates = convertValueToCoordinate(inputValueArray,length);
  return getModifiedNextGen(nextGenCoordinates,bounds);
}

module.exports = { nextGeneration };
