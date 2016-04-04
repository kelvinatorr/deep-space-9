'use strict';

describe('Filter: tel', function () {

  // load the filter's module
  beforeEach(module('deepspace9App'));

  // initialize a new instance of the filter before each test
  var tel;
  beforeEach(inject(function ($filter) {
    tel = $filter('tel');
  }));

  it('should return the input prefixed with "tel filter:"', function () {
    var text = '7028892792';
    expect(tel(text)).toBe('(702) 889-2792');
  });

});
