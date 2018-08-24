let state = {};
const facings = ["NORTH", "EAST", "SOUTH", "WEST"];
const xAxisLow = 0;
const xAxisHigh = 4;
const yAxisLow = 0;
const yAxisHigh = 4;

const allowedStates = ['0', '1', '2', '3', '4'].reduce((accu1, curr1) => {
  ['0', '1', '2', '3', '4'].forEach((curr2) => {
    ['0', '1', '2', '3'].forEach((curr3) => {
      accu1.push(`${curr1}${curr2}${curr3}`);
    });
  });
  return accu1;
}, []);

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
  const {x, y, facingIndex} = state;

  return _isUnSet() ? {} : {x, y, "facing": facings[facingIndex]}
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
      const {x, y, facingIndex} = state;
      const provisionalState = `${x}${y + 1}${facingIndex}`;

      if (!allowedStates.includes(provisionalState)) {
        return {success: false, isSet: true};
      }

      state.y = y + 1;
      break;
    }
    case 1: {
      const {x, y, facingIndex} = state;
      const provisionalState = `${x + 1}${y}${facingIndex}`;

      if (!allowedStates.includes(provisionalState)) {
        return {success: false, isSet: true};
      }

      state.x = x + 1;
      break;
    }
    case 2: {
      const {x, y, facingIndex} = state;
      const provisionalState = `${x}${y - 1}${facingIndex}`;

      if (!allowedStates.includes(provisionalState)) {
        return {success: false, isSet: true};
      }

      state.y = y - 1;
      break;
    }
    case 3: {
      const {x, y, facingIndex} = state;
      const provisionalState = `${x - 1}${y}${facingIndex}`;

      if (!allowedStates.includes(provisionalState)) {
        return {success: false, isSet: true};
      }

      state.x = x - 1;
      break;
    }
  }
  return {success: true, isSet: true};
};
