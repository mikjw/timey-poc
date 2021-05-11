const setupQueries = [
  { 
    text: 'INSERT INTO users (id, email, password) VALUES ($1, $2, $3)',
    values: ['f48036ef-ba9a-4f71-9af7-008c0782217c', 'user@test.com', 'testpw'] 
  },
  { 
    text: 'INSERT INTO times (title, seconds, workspace, userid) VALUES ($1, $2, $3, $4)',
    values: ['TESTTIME', 51, 'testworkspaceId', 'f48036ef-ba9a-4f71-9af7-008c0782217c']
  },
  { 
    text: 'INSERT INTO times (title, seconds, workspace, userid) VALUES ($1, $2, $3, $4)',
    values: ['TESTTIME', 51, 'testworkspaceId', 'f48036ef-ba9a-4f71-9af7-008c0782217c'] 
  },
  { 
    text: 'INSERT INTO times (id, title, seconds, workspace, userid) VALUES ($1, $2, $3, $4, $5)',
    values: ['b21f33cb-c58e-4d2c-8085-6a2382610728', 'TESTTIME-2', 5, 'testworkspaceId', '8'] 
  }
]

const teardownQueries = [
  'TRUNCATE times', 
  'TRUNCATE users'
]

module.exports = { 
  setupQueries, 
  teardownQueries
};