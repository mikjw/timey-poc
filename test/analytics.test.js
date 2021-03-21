
const expect = require("chai").expect;
const sinon = require("sinon");
const analyticsService = require("../services/analytics.service");
const mockResponses = require("./mockResponse");

describe("Counting times for logged-in user", () => {
  it("should return 3 for 3 records", () => {
    expect(analyticsService.getAnalytics(mockResponses.first())["count"]).to.equal(3)
  })

  it("should return 2 for 2 records", () => {
    expect(analyticsService.getAnalytics(mockResponses.second())["count"]).to.equal(2)
  })
});
