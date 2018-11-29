const createObject = function(side){
  let sampleObject = {};
  for(index=1; index <= Math.pow(side,2); index++){
    sampleObject[index] = ' ';
  }
  return sampleObject;
}

const filterNeighbours = function(side,inputArray){
  totalArray =  Object.keys(createObject(side)).map(x => +x)
  return inputArray.filter(x => totalArray.includes(x));
}

const getNeighboursFirstColumn = function(side,position){
  let p = position, s = side;
  let neighbours = new Array(0).concat(p-s,p-s+1,p+1,p+s,p+s+1);
  return filterNeighbours(side,neighbours);
}

const getNeighboursLastColumn = function(side,position){
  let p = position, s = side;
  let neighbours = new Array(0).concat(p-s-1,p-s,p-1,p+s-1,p+s);
  return filterNeighbours(side,neighbours);
}

const getNeighboursMiddleColumn = function(side,position){
  let p = position, s = side;
  let neighbours = new Array(0).concat(p-s-1,p-s,p-s+1,p-1,p+1,p+s-1,p+s,p+s+1);
  return filterNeighbours(side,neighbours);
}

const convertCoordinateToValue = function(inputArray,bounds){
  let side = bounds.bottomRight[1]-bounds.topLeft[1]+1;
  inputArray = inputArray.map(x => x.filter(y => y<side));
  let inputArrayOfValue = inputArray.map(x => x[0]*side+x[1]+1);
  return {side: side, livePositionValue: inputArrayOfValue}
}

const convertValueToCoordinate = function(input,side){
  return input.map(x => [Math.floor((x-1)/side),(x-1)%side]);
}

const produceAlive = function(object,array){
  for(let element of array){
    object[element] = '*';
  }
  return object;
}

const getAllNeighbours = function(side,position){
  if((position-1)%side == 0) return getNeighboursFirstColumn(side,position);
  if(position % side == 0) return getNeighboursLastColumn(side,position);
  return getNeighboursMiddleColumn(side,position);
}


const getLiveNeighboursLength = function(aliveArray,lengthOfSide,position){
  let allNeighbourArray = getAllNeighbours(lengthOfSide,position);
  return allNeighbourArray.filter(x => aliveArray.includes(x)).length;
}

const produceNextGenAliveCells = function(side,object,aliveArray){
  let deadCells = Object.keys(object).map(x => +x).filter(x => !aliveArray.includes(x));
  const aliveNeighbourLength = getLiveNeighboursLength.bind(null,aliveArray,side);
  let aliveCells = aliveArray.filter(x => aliveNeighbourLength(x)==2 || aliveNeighbourLength(x)==3);
  return aliveCells.concat(deadCells.filter(x => aliveNeighbourLength(x) == 3));
}

const logSampleSpace = function(side,aliveArray){
  let emptyObject = createObject(side);
  let presentObject = produceAlive(emptyObject,aliveArray);
  console.log(outlineGenerator(side,presentObject));
}

const filterCellsWithinBound = function(bounds){
  let side = bounds.bottomRight[0]+1;
  let sampleArray = [];
  for (let i= 1; i<= Math.pow(side,2); i++){
    let value = convertValueToCoordinate([i],side);
    if(value[0][0] >= bounds.topLeft[0] && value[0][1] >= bounds.topLeft[1]){
      sampleArray.push(value[0]);
    }
  }
  return sampleArray;
}


module.exports = {
  createObject,
  convertCoordinateToValue,
  convertValueToCoordinate,
  produceNextGenAliveCells }

