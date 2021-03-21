/**
 * Calculate analytics based on an input array of time objects
 */

function getAnalytics(input) {
  console.log('inp: ', input);
  console.log('input type: ', typeof(input));
  let result = 
  {
    "count" : 0,
    "avgSeconds" : 0
  };

  if (!Array.isArray(input)) {
    result["count"] = 1;
    result["avgSeconds"] = input.seconds;
  } else if (Array.isArray(input)) {
    let count = 0;
    let total = 0;
    input.forEach(element => {
      count++;
      total += element.seconds;
    })

    result["count"] = count;
    result["avgSeconds"] = Math.round(total / count);
  }
return result;
}

module.exports = {
  getAnalytics
}