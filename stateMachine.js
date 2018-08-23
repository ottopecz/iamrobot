let state = {};
const facings = [ "NORTH", "EAST", "SOUTH", "WEST" ];
const xAxisLow = 0;
const xAxisHigh = 4;
const yAxisLow = 0;
const yAxisHigh = 4;

function _isUnSet() {
  return !Boolean(Reflect.ownKeys(state).length);
}

function _putInCarousel(facingIndex, direction) {
  let shiftedFacingIndex = (direction === "anti-clockwise") ? facingIndex - 1 : facingIndex + 1;
  const condition = (direction === "anti-clockwise") ? shiftedFacingIndex < 0 : shiftedFacingIndex > (facings.length - 1);
  const correction = (direction === "anti-clockwise") ? facings.length : 0 - facings.length;

  if (condition) {
    shiftedFacingIndex = shiftedFacingIndex + correction;
  }

  return shiftedFacingIndex;
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
  if (_isUnSet()) {
    return false;
  }

  state.facingIndex = _putInCarousel(state.facingIndex, "anti-clockwise");
  return true;
};

module.exports.right = function right() {
  if (_isUnSet()) {
    return false;
  }

  state.facingIndex = _putInCarousel(state.facingIndex, "clockwise");
  return true;
};

module.exports.move = function move() {
  if (_isUnSet()) {
    return {success: false, isSet: false};
  }

  switch (state.facingIndex) {
    case 0: {
      const shiftedY = state.y + 1;

      if (shiftedY > yAxisHigh) {
        return {success: false, isSet: true};
      }

      state.y = shiftedY;
      break;
    }
    case 1: {
      const shiftedX = state.x + 1;

      if (shiftedX > xAxisHigh) {
        return {success: false, isSet: true};
      }

      state.x = shiftedX;
      break;
    }
    case 2: {
      const shiftedY = state.y - 1;

      if (shiftedY < yAxisLow) {
        return {success: false, isSet: true};
      }

      state.y = shiftedY;
      break;
    }
    case 3: {
      const shiftedX = state.x - 1;

      if (shiftedX < xAxisLow) {
        return {success: false, isSet: true};
      }

      state.x = shiftedX;
      break;
    }
  }
  return {success: true, isSet: true};
};
