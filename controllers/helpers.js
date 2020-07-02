// HELPER FUNCTIONS:


// Bungie has a ton of ErrorCode possibilities, 1 = success!
function checkStatus(res) {
  if (res.ErrorCode === 1) {
    return true
  } else {
    return false;
  }
}

// Hash converter for sqlite look ups
const convertHash = hash => {
  let x = parseInt(hash);
  if (x > 0xFFFFFFFF) {
    console.error('Too big, must have a wrong number');
  }
  if (x > 0x7FFFFFFF) {
    x = 0x100000000 - x;
    if (x < 2147483648) {
      return -x
    }
    else {
      return -2147483648
    }
  }
  return x;
}

module.exports = { checkStatus, convertHash };