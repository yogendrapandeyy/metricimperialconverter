const { init } = require("../server");

function ConvertHandler() {
  
  this.getNum = function(input) {
  let result;
  let numRegex = /^[\d\.\/]+/; // extract numeric part at start

  let match = input.match(numRegex);
  if (!match) return 1; // default value

  let numStr = match[0]; // e.g., "2" from "2L" or "1/2" from "1/2kg"

  if ((numStr.match(/\//g) || []).length > 1) return 'invalid number';

  if (numStr.includes('/')) {
    let parts = numStr.split('/');
    result = parseFloat(parts[0]) / parseFloat(parts[1]);
  } else {
    result = parseFloat(numStr);
  }

  if (isNaN(result)) {
    return 'invalid number';
  }
  return result; // return number with 5 decimal places
};

  
  this.getUnit = function(input) {
    let result;
    let unit= input.match(/[a-zA-Z]+$/); // extract unit part at end
    console.log(unit)
    let units=['L','l','gal','Gal','GAL','Kg','kg','KG','Lbs','lbs','LBS','Mi','mi','MI','Km','km','KM'];
    if (!unit || !units.includes(unit[0]) )
     {return 'invalid unit'} // no unit found
     else{
      if(unit[0] ==='l'|| unit[0] ==='L') {
     return result='L'; // keep 'L' as is for liters
    }
    else{
    result=unit[0].toLowerCase(); // convert to lowercase for consistency
   console.log(result)
    return result;
  }
}

}
  
  this.getReturnUnit = function(initUnit) {
    let result;
    if(initUnit === 'L' || initUnit === 'l' || initUnit === 'liters' || initUnit === 'Liters' || initUnit === 'LITERS') {
      result = 'gal';
    } else if(initUnit === 'gal' || initUnit === 'GAL'|| initUnit === 'gallons' || initUnit === 'Gallons' || initUnit === 'GALLONS') { 
      result = 'L';
    } else if(initUnit === 'kg' || initUnit === 'KG' || initUnit === 'kilograms' || initUnit === 'Kilograms' || initUnit === 'KILOGRAMS') {
      result = 'lbs'; 
    } else if(initUnit === 'lbs' || initUnit === 'LBS' || initUnit === 'pounds' || initUnit === 'Pounds' || initUnit === 'POUNDS') {
      result = 'kg';
    } else if(initUnit === 'mi' || initUnit === 'MI' || initUnit === 'miles' || initUnit === 'Miles' || initUnit === 'MILES') {
      result = 'km';
    } else if(initUnit === 'km' || initUnit === 'KM' || initUnit === 'kilometers' || initUnit === 'Kilometers' || initUnit === 'KILOMETERS') {
      result = 'mi';
    }
    
    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    if(unit === 'L' || unit === 'l') {
      result = 'liters';
    } else if(unit === 'gal' || unit === 'GAL') {
      result = 'gallons';
    } else if(unit === 'kg'  || unit === 'KG') {
      result = 'kilograms';
    } else if(unit === 'lbs' || unit === 'LBS') {
      result = 'pounds';
    } else if(unit === 'mi' || unit === 'MI') {
      result = 'miles';
    } else if(unit === 'km' || unit === 'KM') {
      result = 'kilometers';
    }
    
    return result;
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
     if(initUnit === 'L' || initUnit === 'l') {
      result = 
      (initNum / galToL).toFixed(5); // convert liters to gallons
    } else if(initUnit === 'gal' || initUnit === 'GAL') {
      result = (initNum * galToL).toFixed(5); // convert gallons to liters
    } else if(initUnit === 'kg' || initUnit === 'KG') {
      result = (initNum / lbsToKg).toFixed(5); // convert kilograms to pounds
    } else if(initUnit === 'lbs' || initUnit === 'LBS') {
      result = (initNum * lbsToKg).toFixed(5);
    } else if(initUnit === 'mi' || initUnit === 'MI') {    
      
      result = (initNum * miToKm).toFixed(5); // convert miles to kilometers
    } else if(initUnit === 'km' || initUnit === 'KM') {
      result = (initNum / miToKm).toFixed(5); // convert kilometers to miles
    }
    return Number(result);
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;
    const initUnitSpelled = this.spellOutUnit(initUnit);
    const returnUnitSpelled = this.spellOutUnit(returnUnit);
    result = `${initNum} ${initUnitSpelled} converts to ${returnNum} ${returnUnitSpelled}`;
      
    
    return result;
  };
  
}

module.exports = ConvertHandler;
