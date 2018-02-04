"use strict";
var expect = require("chai").expect;
var index = require("../dist/index.js");
describe("createObservable function test", () => {
  it("should return Boys", () => {
    var result = index.createObservable("Boys");
    expect(result).to.equal("Boys");
  });
});
