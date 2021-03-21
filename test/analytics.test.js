
const expect = require("chai").expect;
const analyticsService = require("../services/analytics.service");
const mockResponses = require("./mockResponse");

describe("Analytics service", () => {
  describe("Counting times for logged-in user", () => {
    it("should return 3 for 3 records", () => {
      expect(analyticsService.getAnalytics(mockResponses.first())["count"]).to.equal(3);
    })

    it("should return 2 for 2 records", () => {
      expect(analyticsService.getAnalytics(mockResponses.second())["count"]).to.equal(2);
    })

    it("should return 1 for single record", () => {
      expect(analyticsService.getAnalytics(mockResponses.third())["count"]).to.equal(1);
    })
  });

  describe("Average time for logged-in user", () => {
    it("should return 266 for first set of records", () => {
      expect(analyticsService.getAnalytics(mockResponses.first())["avgSeconds"]).to.equal(266);
    })

    it("should return 226 for second set of records", () => {
      expect(analyticsService.getAnalytics(mockResponses.second())["avgSeconds"]).to.equal(226);
    })

    it("should return 125 single record with 125 seconds", () => {
      expect(analyticsService.getAnalytics(mockResponses.third())["avgSeconds"]).to.equal(125);
    })
  });
})
