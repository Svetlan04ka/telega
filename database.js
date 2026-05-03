const fs = require('fs');
const sqlite3 = require('sqlite3').verbose();
const dbWrapper = require('sqlite');

const dbFile = "./chat.db";
const exists = fs.existsSync(dbFile);

let db;

dbWrapper
  .open({
    filename: dbFile,
    driver: sqlite3.Database
  })
  .then(async (dBase) => {
    db = dBase;

    try {
      if (!exists) {
        await db.run(`
          CREATE TABLE user (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT,
            password TEXT
          )
        `);

      } else {
        console.log(await db.all('SELECT * FROM user'));
      }

    } catch (dbError) {
      console.error(dbError);
    }
    if(!exists) {
        await db.run(`CREATE...`);
        await db.run(`INSERT INTO...`);
        await db.run(`CREATE...`);   
    } else {
        console.log(await db.all('SELECT * FROM user'));
    }
  });