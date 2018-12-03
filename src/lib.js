const createObject = function(length,width){
  let sampleObject = {};
  for(let index=1; index <= length*width; index++){
    sampleObject[index] = ' ';
  }
  return sampleObject;
}

const filterNeighbours = function(length,width,inputArray){
  let totalArray =  Object.keys(createObject(length,width)).map(x => +x)
  return inputArray.filter(x => totalArray.includes(x));
}

const getNeighboursFirstColumn = function(length,width,position){
  let p = position, l = length;
  let neighbours = new Array(0).concat(p-l,p-l+1,p+1,p+l,p+l+1);
  return filterNeighbours(length,width,neighbours);
}

const getNeighboursLastColumn = function(length,width,position){
  let p = position, l = length;
  let neighbours = new Array(0).concat(p-l-1,p-l,p-1,p+l-1,p+l);
  return filterNeighbours(length,width,neighbours);
}

const getNeighboursMiddleColumn = function(length,width,position){
  let p = position, l = length;
  let neighbours = new Array(0).concat(p-l-1,p-l,p-l+1,p-1,p+1,p+l-1,p+l,p+l+1);
  return filterNeighbours(length,width,neighbours);
}

const getAllNeighbours = function(length,width,position){
  if((position-1)%length == 0) return getNeighboursFirstColumn(length,width,position);
  if(position % length == 0) return getNeighboursLastColumn(length,width,position);
  return getNeighboursMiddleColumn(length,width,position);
}

const getLiveNeighboursLength = function(aliveArray,length,width,position){
  let allNeighbourArray = getAllNeighbours(length,width,position);
  return allNeighbourArray.filter(x => aliveArray.includes(x)).length;
}
const convertCoordinateToValue = function(inputArray,bounds){
  let length = bounds.bottomRight[1]-bounds.topLeft[1]+1;
  let width = bounds.bottomRight[0]-bounds.topLeft[0]+1;
  inputArray = inputArray.map(x => x.filter(y => y<length));
  let inputArrayOfValue = inputArray.map(x => x[0]*length+x[1]+1);
  return {length: length, width: width, livePositionValue: inputArrayOfValue}
}

const convertValueToCoordinate = function(input,length){
  return input.map(x => [Math.floor((x-1)/length),(x-1)%length]);
}

const produceNextGenAliveCells = function(length,width,object,aliveArray){
  let deadCells = Object.keys(object).map(x => +x).filter(x => !aliveArray.includes(x));
  const aliveNeighbourLength = getLiveNeighboursLength.bind(null,aliveArray,length,width);
  let aliveCells = aliveArray.filter(x => aliveNeighbourLength(x)==2 || aliveNeighbourLength(x)==3);
  return aliveCells.concat(deadCells.filter(x => aliveNeighbourLength(x) == 3));
}

const getModifiedCurrGen = function (currGeneration,bounds){
  return currGeneration.map(function(x){
    x[0] = x[0] - bounds.topLeft[0];
    x[1] = x[1] - bounds.topLeft[1];
    return x;
  })
}

const getModifiedNextGen = function (currGeneration,bounds){
  return currGeneration.map(function(x){
    x[0] = x[0] + bounds.topLeft[0];
    x[1] = x[1] + bounds.topLeft[1];
    return x;
  })
}

module.exports = {
  createObject,
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells,
  getModifiedCurrGen,
  getModifiedNextGen,
filterNeighbours,
getNeighboursFirstColumn,
getNeighboursMiddleColumn,
getNeighboursLastColumn,
getAllNeighbours,
getLiveNeighboursLength }

