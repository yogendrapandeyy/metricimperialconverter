'use strict';

const expect = require('chai').expect;
const ConvertHandler = require('../controllers/convertHandler.js');

module.exports = function (app) {
  
  let convertHandler = new ConvertHandler();

  app.route('/api/convert')
    .get(function (req, res){
      let input = req.query.input;
      let initNum = convertHandler.getNum(input);
      let initUnit = convertHandler.getUnit(input);

      // Check for both invalid number and unit first.
      if (initNum === 'invalid number' && initUnit === 'invalid unit') {
        return res.send('invalid number and unit');
      }
      // Check for invalid number.
      if (initNum === 'invalid number') {
        return res.send('invalid number');
      }
      // Check for invalid unit.
      if (initUnit === 'invalid unit') {
        return res.send('invalid unit');
      }
      
      let returnNum = convertHandler.convert(initNum, initUnit);
      let returnUnit = convertHandler.getReturnUnit(initUnit);
      let toString = convertHandler.getString(initNum, initUnit, returnNum, returnUnit);
      
      // Construct the final JSON response.
      res.json({
        initNum: initNum,
        initUnit: initUnit,
        returnNum: returnNum,
        returnUnit: returnUnit,
        string: toString
      });
    });
    
};