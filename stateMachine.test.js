const assert = require('assert');
const {
  place,
  report,
  left,
  right,
  move
} = require("./stateMachine");

// THE report method
// WHEN the state is not set
// SHOULD return false
assert.deepEqual(report(), {});

// THE left method
// WHEN the state is not set
// SHOULD return false
assert.equal(left(), false);

// THE right method
// WHEN the state is not set
// SHOULD return false
assert.equal(right(), false);

// THE move method
// WHEN the state is not set
// SHOULD return false
assert.deepEqual(move(), {success: false, isSet: false});

// THE report method
// WHEN the state is set
place(0, 0, "NORTH");
// SHOULD return the current state
assert.deepEqual(report(), { "x": 0, "y": 0, "facing": "NORTH"});

// THE left method
// WHEN the state is set
place(0, 0, "NORTH");
// SHOULD return true
assert.equal(left(), true);
// AND rotate the facing 45 degree anti-clockwise
assert.deepEqual(report(), { "x": 0, "y": 0, "facing": "WEST"});

// THE right method
// WHEN the state is set
place(0, 0, "WEST");
// SHOULD return true
assert.equal(right(), true);
// AND rotate the facing 45 degree clockwise
assert.deepEqual(report(), { "x": 0, "y": 0, "facing": "NORTH"});

// THE move method
// WHEN the state is set
place(0, 0, "NORTH");
// SHOULD return true
assert.deepEqual(move(), {success: true, isSet: true});
// AND shift the placing with one unit in the direction of facing
assert.deepEqual(report(), { "x": 0, "y": 1, "facing": "NORTH"});

// THE move method
// WHEN the state is set
place(0, 0, "EAST");
// SHOULD return true
assert.deepEqual(move(), {success: true, isSet: true});
// AND shift the placing with one unit in the direction of facing
assert.deepEqual(report(), { "x": 1, "y": 0, "facing": "EAST"});

// THE move method
// WHEN the state is set
place(4, 4, "SOUTH");
// SHOULD return true
assert.deepEqual(move(), {success: true, isSet: true});
// AND shift the placing with one unit in the direction of facing
assert.deepEqual(report(), { "x": 4, "y": 3, "facing": "SOUTH"});

// THE move method
// WHEN the state is set
place(4, 4, "WEST");
// SHOULD return true
assert.deepEqual(move(), {success: true, isSet: true});
// AND shift the placing with one unit in the direction of facing
assert.deepEqual(report(), { "x": 3, "y": 4, "facing": "WEST"});

// THE move method
// WHEN the state is set
// AND the position is facing down the grid
place(0, 0, "WEST");
// SHOULD return false
assert.deepEqual(move(), {success: false, isSet: true});
// AND the placing should not change
assert.deepEqual(report(), { "x": 0, "y": 0, "facing": "WEST"});

// THE move method
// WHEN the state is set
// AND the position is facing down the grid
place(0, 0, "SOUTH");
// SHOULD return false
assert.deepEqual(move(), {success: false, isSet: true});
// AND the placing should not change
assert.deepEqual(report(), { "x": 0, "y": 0, "facing": "SOUTH"});

// THE move method
// WHEN the state is set
// AND the position is facing down the grid
place(4, 4, "NORTH");
// SHOULD return false
assert.deepEqual(move(), {success: false, isSet: true});
// AND the placing should not change
assert.deepEqual(report(), { "x": 4, "y": 4, "facing": "NORTH"});

// THE move method
// WHEN the state is set
// AND the position is facing down the grid
place(4, 4, "EAST");
// SHOULD return false
assert.deepEqual(move(), {success: false, isSet: true});
// AND the placing should not change
assert.deepEqual(report(), { "x": 4, "y": 4, "facing": "EAST"});