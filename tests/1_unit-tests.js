const chai = require('chai');
let assert = chai.assert;
const ConvertHandler = require('../controllers/convertHandler.js');

let convertHandler = new ConvertHandler();

suite('Unit Tests', function(){

  test('read a whole number input', function(done) {
    assert.equal(convertHandler.getNum('32L'), 32);
    done();
  });

  test('read a decimal number input', function(done) {
    assert.equal(convertHandler.getNum('3.1mi'), 3.1);
    done();
  });

  test('read a fractional input', function(done) {
    assert.equal(convertHandler.getNum('1/2km'), 0.5);
    done();
  });

  test('read a fractional input with a decimal', function(done) {
    assert.equal(convertHandler.getNum('5.4/3lbs'), 1.8);
    done();
  });

  test('error on a double-fraction', function(done) {
    assert.equal(convertHandler.getNum('3/2/3kg'), 'invalid number');
    done();
  });

  test('default to a numerical input of 1 when no numerical input is provided', function(done) {
    assert.equal(convertHandler.getNum('kg'), 1);
    done();
  });

  test('read each valid input unit', function(done) {
    const validUnits = ['gal','L','mi','km','lbs','kg'];
    validUnits.forEach(function(unit) {
      assert.equal(convertHandler.getUnit('32' + unit), unit);
    });
    done();
  });

  test('return an error for an invalid input unit', function(done) {
    assert.equal(convertHandler.getUnit('32g'), 'invalid unit');
    done();
  });

  test('return the correct return unit for each valid input unit', function(done) {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expected = ['L','gal','km','mi','kg','lbs'];
    input.forEach(function(unit, i) {
      assert.equal(convertHandler.getReturnUnit(unit), expected[i]);
    });
    done();
  });

  test('correctly return the spelled-out string unit for each valid input unit', function(done) {
    const input = ['gal','L','mi','km','lbs','kg'];
    const expected = ['gallons','liters','miles','kilometers','pounds','kilograms'];
    input.forEach(function(unit, i) {
      assert.equal(convertHandler.spellOutUnit(unit), expected[i]);
    });
    done();
  });

  test('correctly convert gal to L', function(done) {
    assert.approximately(convertHandler.convert(1, 'gal'), 3.78541, 0.1);
    done();
  });

  test('correctly convert L to gal', function(done) {
    assert.approximately(convertHandler.convert(1, 'L'), 0.26417, 0.1);
    done();
  });

  test('correctly convert mi to km', function(done) {
    assert.approximately(convertHandler.convert(1, 'mi'), 1.60934, 0.1);
    done();
  });

  test('correctly convert km to mi', function(done) {
    assert.approximately(convertHandler.convert(1, 'km'), 0.62137, 0.1);
    done();
  });

  test('correctly convert lbs to kg', function(done) {
    assert.approximately(convertHandler.convert(1, 'lbs'), 0.45359, 0.1);
    done();
  });

  test('correctly convert kg to lbs', function(done) {
    assert.approximately(convertHandler.convert(1, 'kg'), 2.20462, 0.1);
    done();
  });

});
