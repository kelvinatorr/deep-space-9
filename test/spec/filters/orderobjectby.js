'use strict';

describe('Filter: orderObjectBy', function () {

  // load the filter's module
  beforeEach(module('deepspace9App'));

  // initialize a new instance of the filter before each test
  var orderObjectBy;
  beforeEach(inject(function ($filter) {
    orderObjectBy = $filter('orderObjectBy');
  }));

  it('should return an array', function () {
    var data = {
        kelvin: {name: 'Kelvin'},
        tiffany: {name: 'Tiffany'},
        mandeep: {name: 'Mandeep'}
    };
    expect(orderObjectBy(data)).toEqual([
        {name: 'Mandeep'},
        {name: 'Tiffany'},
        {name: 'Kelvin'}
    ]);
  });

});
