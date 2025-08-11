// convertHandler.js

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result;
    let numStr = input.replace(/[a-zA-Z]+/, '');
    if (numStr === '') return 1;
    
    // Check for fraction
    if (numStr.includes('/')) {
      let parts = numStr.split('/');
      if (parts.length !== 2) return 'invalid number';
      let num1 = parseFloat(parts[0]);
      let num2 = parseFloat(parts[1]);
      if (isNaN(num1) || isNaN(num2) || num2 === 0) return 'invalid number';
      result = num1 / num2;
    } else {
      result = parseFloat(numStr);
      if (isNaN(result)) return 'invalid number';
    }
    
    return result;
  };
  
  this.getUnit = function(input) {
    let unitStr = input.replace(/[^a-zA-Z]/g, '').toLowerCase();
    let validUnits = ['gal', 'l', 'mi', 'km', 'lbs', 'kg'];
    if (!validUnits.includes(unitStr)) return 'invalid unit';
    return unitStr === 'l' ? 'L' : unitStr;
  };
  
  this.getReturnUnit = function(initUnit) {
    let unitMap = {
      'gal': 'L',
      'L': 'gal',
      'mi': 'km',
      'km': 'mi',
      'lbs': 'kg',
      'kg': 'lbs'
    };
    return unitMap[initUnit];
  };

  this.spellOutUnit = function(unit) {
    let spellMap = {
      'gal': 'gallons',
      'L': 'liters',
      'mi': 'miles',
      'km': 'kilometers',
      'lbs': 'pounds',
      'kg': 'kilograms'
    };
    return spellMap[unit];
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;
    
    switch(initUnit) {
      case 'gal':
        result = initNum * galToL;
        break;
      case 'L':
        result = initNum / galToL;
        break;
      case 'lbs':
        result = initNum * lbsToKg;
        break;
      case 'kg':
        result = initNum / lbsToKg;
        break;
      case 'mi':
        result = initNum * miToKm;
        break;
      case 'km':
        result = initNum / miToKm;
        break;
      default:
        return 'invalid unit';
    }
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
