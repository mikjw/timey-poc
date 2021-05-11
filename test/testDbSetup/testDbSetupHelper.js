const { Client } = require('pg');

class TestDbHelper {
  constructor(setupQueries, teardownQueries) {
    this.setupQueries = setupQueries;
    this.teardownQueries = teardownQueries;
    
    this.client = new Client({
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      user: process.env.PG_USER,
      database: process.env.PG_TEST_DATABASE,
      password: process.env.PG_PASSWORD,
    })
  }

  async setUpData() {
    this.client.connect();
    for (const query of this.setupQueries) {
      await this.client.query(query.text, query.values);
    }
  }

  async tearDownData() {
    for (const query of this.teardownQueries) {
      await this.client.query(query);
    }
    this.client.end();
  }
}

module.exports = TestDbHelper;
