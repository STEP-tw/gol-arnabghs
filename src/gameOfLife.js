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
  let nextGenValues = produceNextGenAliveCells(length,width,createObject(length,width),livePositionValue).sort((a,b) => a-b);
  let nextGenCoordinates = convertValueToCoordinate(nextGenValues,length);
  return getModifiedNextGen(nextGenCoordinates,bounds);
}

module.exports = { nextGeneration };
