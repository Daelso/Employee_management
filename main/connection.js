//Normal SQL connection with dummy pw until I figure out env files
const mysql = require('mysql2');

const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'Ganbatte23!',
      database: 'employee_management'
    },
    console.log(`Connected to the employee_management database.`)
  );



  module.exports = db