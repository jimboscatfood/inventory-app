const { Pool } = require("pg");

//the below properties should be read from env variables
//for simplicity, they will be hardcoded here

module.exports = new Pool({
  host: process.env.HOST,
  user: process.env.USER,
  database: process.env.DATABASE,
  password: process.env.PASSWORD,
  port: process.env.PORT,
});

//or if we are connecting with a hosted database service
//const { Pool } = require("pg");
// Again, this should be read from an environment variable
//module.exports = new Pool({
//   connectionString: "postgresql://<role_name>:<role_password>@localhost:5432/top_users"
// });
