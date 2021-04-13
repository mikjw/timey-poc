/**
 * Calculate count and average seconds for time records
 */

getAnalytics = (input) => {
  let result = 
  {
    "count" : 0,
    "avgSeconds" : 0
  };

  // Handle case where input is single object
  if (!Array.isArray(input)) {
    result["count"] = 1;
    result["avgSeconds"] = input.seconds;
  } 
  
  // Iterate through array input 
  else if (Array.isArray(input)) {
    let count = 0;
    let totalSeconds = 0;
    input.forEach(element => {
      count++;
      totalSeconds += element.seconds;
    })

    result["count"] = count;
    result["avgSeconds"] = Math.round(totalSeconds / count);
  }
return result;
}

module.exports = {
  getAnalytics
}