const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./bankdb.sqlite', (err) => {
  if (err) {
    console.error('Error opening database:', err.message);
  } else {
    console.log('Connected to the database');
  }
});

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS bank_accounts (id INTEGER PRIMARY KEY AUTOINCREMENT, account_holder TEXT, password TEXT, balance REAL)");
});

module.exports = db;
