const assert = require('chai').assert;
const dao = require('../dbConfig').timeDao;
const SetupHelper = require('./testDbSetup/testDbSetupHelper');
const setupQueries = require('./testDbSetup/timeTestQueries').setupQueries;
const teardownQueries = require('./testDbSetup/timeTestQueries').teardownQueries;

const helper = new SetupHelper(setupQueries, teardownQueries);

describe('timesPgDao', () => {
  before(async () => {
    await helper.setUpData();
  })

  after(async () => {
    await helper.tearDownData();
  })

  describe('getAllTimes', () => {
    it('should return array of 3 times', async () => {
      const res = await dao.getAllTimes();
      assert(Array.isArray(res));
      assert(res.length === 3);
    })
  })

  describe('getTimeById', () => {
    it('should return a time object with a given ID', async () => {
      const id = 'b21f33cb-c58e-4d2c-8085-6a2382610728'
      const res = await dao.getTimeById(id);
      assert(res.id === id);
      assert(res.hasOwnProperty('title'));
      assert(res.hasOwnProperty('seconds'));
      assert(res.hasOwnProperty('workspace'));
      assert(res.hasOwnProperty('user'));
    })
  })

  describe('getTimesByUserId', () => {
    it('should return array of two times with user id', async () => {
      const userId = 'f48036ef-ba9a-4f71-9af7-008c0782217c';
      const res = await dao.getTimesByUserId(userId);
      assert(res.length === 2);
      assert(res[0].user === userId);
      assert(res[1].user === userId);
    })
  })
})
