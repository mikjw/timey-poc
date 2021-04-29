-- install uuid generation extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp"

-- times table with UUID keys
CREATE TABLE times(
   id uuid DEFAULT uuid_generate_v4(),
   title VARCHAR NOT NULL,
   seconds BIGINT NOT NULL,
   workspace VARCHAR,
   userid VARCHAR,
   PRIMARY KEY (id)
);

-- workspaces table with UUID keys
CREATE TABLE workspaces(
   id uuid DEFAULT uuid_generate_v4(),
   name VARCHAR NOT NULL,
   PRIMARY KEY (id)
);

-- users table with UUID keys
CREATE TABLE users(
   id uuid DEFAULT uuid_generate_v4(),
   email VARCHAR NOT NULL,
   password VARCHAR NOT NULL,
   PRIMARY KEY (id)
);