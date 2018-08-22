let state = {};
const facings = [ "NORTH", "EAST", "SOUTH", "WEST" ];
const xAxisLow = 0;
const xAxisHigh = 4;
const yAxisLow = 0;
const yAxisHigh = 4;

function _isUnSet() {
  return !Boolean(Reflect.ownKeys(state).length);
}

module.exports.place = function place(x, y, facing) {
  state.x = x;
  state.y = y;
  state.facingIndex = facings.indexOf(facing);
};

module.exports.report = function report() {
  return _isUnSet() ? {} : { "x": state.x, "y": state.y, "facing": facings[state.facingIndex] }
};

module.exports.left = function left() {
  return _isUnSet() ? false : (function () {
    let shiftedFacingIndex = state.facingIndex - 1;

    if (shiftedFacingIndex < 0) {
      shiftedFacingIndex = shiftedFacingIndex + facings.length;
    }

    state.facingIndex = shiftedFacingIndex;
    return true;
  }());
};

module.exports.right = function right() {
  return _isUnSet() ? false : (function () {
    let shiftedFacingIndex = state.facingIndex + 1;

    if (shiftedFacingIndex > (facings.length - 1)) {
      shiftedFacingIndex = shiftedFacingIndex - facings.length;
    }

    state.facingIndex = shiftedFacingIndex;
    return true;
  }());
};

module.exports.move = function move() {
  return _isUnSet() ? false : (function () {
    switch (state.facingIndex) {
      case 0: {
        const shiftedY = state.y + 1;

        if (shiftedY > yAxisHigh) {
          return false;
        }

        state.y = shiftedY;
        break;
      }
      case 1: {
        const shiftedX = state.x + 1;

        if (shiftedX > xAxisHigh) {
          return false;
        }

        state.x = shiftedX;
        break;
      }
      case 2: {
        const shiftedY = state.y - 1;

        if (shiftedY < yAxisLow) {
          return false;
        }

        state.y = shiftedY;
        break;
      }
      case 3: {
        const shiftedX = state.x - 1;

        if (shiftedX < xAxisLow) {
          return false;
        }

        state.x = shiftedX;
        break;
      }
    }
    return true;
  }());
};
