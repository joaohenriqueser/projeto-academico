const mysql = require('mysql2/promise');
require('dotenv').config();

async function main() {
  const connection = await mysql.createConnection({
    host: process.env.DATABASE_HOST,
    user: process.env.DATABASE_USERNAME,
    database: process.env.DATABASE_DATABASE,
  });

  const [result] = await connection.execute('DELETE FROM usuario WHERE email = "joao.servelatti@hotmail.com" OR username = "dasd"');
  console.log(`Deleted ${result.affectedRows} users.`);
  await connection.end();
}

main();
