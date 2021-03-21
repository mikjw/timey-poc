/**
 * Calculate analytics based on an input array of times
 */

function getAnalytics(input) {
  let result = 
  {
    "count" : 0,
    "avgSeconds" : 0
  };

  let count = 0;
  let total = 0;
  input.forEach(element => {
    count++;
    total += element.seconds;
  })

  result["count"] = count;
  result["avgSeconds"] = total / count;
  return result;
}

module.exports = {
  getAnalytics
}