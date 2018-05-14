

/**
 * 
 * @param {Date} date 
 */
export function firstDayinMonth(date){
  const result = new Date(date)
  result.setDate(1);
  result.setHours(0);
  result.setMinutes(0);
  result.setSeconds(0);
  result.setMilliseconds(0);
  return result
} 

/**
 * 
 * @param {Date} date 
 */
export function lastDayinMonth(date){
  const result = firstDayinMonth(date)
  
  result.setMonth(result.getMonth() + 1);
  result.setSeconds(result.getSeconds() - 1);
  
  return result;
}


