const assert = require("assert").deepEqual;

const {
  // createObject,
  filterNeighbours,
  getNeighboursFirstColumn,
  getNeighboursMiddleColumn,
  getNeighboursLastColumn,
  getAllNeighbours,
  getLiveNeighboursLength,
  convertCoordinateToValue
} = require("../src/lib.js");

describe("test for lib", function() {
  describe("test for filterNeighbours", function() {
    it("for empty array should return empty array", function() {
      assert(filterNeighbours(2, 2, []), []);
    });
    it("for one or multielements array should return array of same or less length", function() {
      assert(filterNeighbours(3, 3, [2, -1, 5, 6, 0]), [2, 5, 6]);
    });
  });
  describe("test for getNeighboursFirstColumn", function() {
    it("for side 0 should return empty array", function() {
      assert(getNeighboursFirstColumn(0, 0, 1), []);
    });
    it("for different size an position array length will depend on the position", function() {
      assert(getNeighboursFirstColumn(4, 4, 1), [2, 5, 6]);
      assert(getNeighboursFirstColumn(4, 4, 9), [5, 6, 10, 13, 14]);
    });
  });
  describe("test for getNeighboursLastColumn", function() {
    it("for side 0 should return empty array", function() {
      assert(getNeighboursLastColumn(0, 0, 1), []);
    });
    it("for different size an position array length will depend on the position", function() {
      assert(getNeighboursLastColumn(4, 4, 4), [3, 7, 8]);
      assert(getNeighboursLastColumn(4, 4, 12), [7, 8, 11, 15, 16]);
    });
  });
  describe("test for getNeighboursMiddleColumn", function() {
    it("for side 0 should return empty array", function() {
      assert(getNeighboursMiddleColumn(0, 0, 1), []);
    });
    it("for different sizes array length will depend on the position", function() {
      assert(getNeighboursMiddleColumn(4, 4, 6), [1, 2, 3, 5, 7, 9, 10, 11]);
      assert(getNeighboursMiddleColumn(4, 4, 11), [
        6,
        7,
        8,
        10,
        12,
        14,
        15,
        16
      ]);
    });
  });
  describe("test for getAllNeighbours", function() {
    it("for side 0 should return empty array", function() {
      assert(getAllNeighbours(0, 0, 1), []);
    });
    it("for different sizes array length will depend on the position", function() {
      assert(getAllNeighbours(4, 4, 6), [1, 2, 3, 5, 7, 9, 10, 11]);
      assert(getAllNeighbours(4, 4, 11), [6, 7, 8, 10, 12, 14, 15, 16]);
      assert(getAllNeighbours(3, 3, 3), [2, 5, 6]);
      assert(getAllNeighbours(3, 3, 4), [1, 2, 5, 7, 8]);
      assert(getAllNeighbours(3, 3, 5), [1, 2, 3, 4, 6, 7, 8, 9]);
    });
  });
  describe("test for getLiveNeighboursLength", function() {
    it("for empty alive array should return 0 length", function() {
      assert(getLiveNeighboursLength([], 3, 3, 1), 0);
    });
    it("for different sizes of alive array, length will be less or equal", function() {
      assert(getLiveNeighboursLength([1, 2, 3, 4], 3, 3, 1), 2);
      assert(getLiveNeighboursLength([1, 2, 3], 3, 3, 4), 2);
      assert(getLiveNeighboursLength([3, 4, 5, 6], 4, 4, 7), 3);
      assert(getLiveNeighboursLength([4, 8, 12], 4, 4, 16), 1);
    });
  });
  describe("test for convertCoordinateToValue", function() {
    it("for empty input array should return empty array", function() {
      assert(
        convertCoordinateToValue([], { topLeft: [0, 0], bottomRight: [3, 3] }),
        { length: 4, width: 4, alivePositions: [] }
      );
    });
    it("for bounds 0,0 should return side length 1", function() {
      assert(
        convertCoordinateToValue([], { topLeft: [0, 0], bottomRight: [0, 0] }),
        { length: 1, width: 1, alivePositions: [] }
      );
    });
    it("for non-empty array should preserve the length of array", function() {
      assert(
        convertCoordinateToValue([[0, 1], [1, 1]], {
          topLeft: [0, 0],
          bottomRight: [2, 2]
        }),
        { length: 3, width: 3, alivePositions: [2, 5] }
      );
    });
  });
});
