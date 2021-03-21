/**
 * Calculate analytics based on an input array of times
 */

function getAnalytics(input) {
  let result = 
  {
    "count" : 0
  };
  input.forEach(element => {
    result["count"]++
  });
  return result;
}

module.exports = {
  getAnalytics
}