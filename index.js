const express = require('express');
const bodyParser = require('body-parser');
const db = require('./db');

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

app.post('/balance', (req, res) => {
  const account_holder = req.body.account_holder;
  const password = req.body.password;
  const query = `SELECT * FROM bank_accounts WHERE account_holder = '${account_holder}' AND password = '${password}'`;
  db.all(query, (err, rows) => {
    if (err) {
      res.status(500).send("Database error");
      return;
    }
    if (rows.length > 0) {
      res.send(rows);
    } else {
      res.send('No results found');
    }
  });
});

const port = 3000 ;
app.listen(port, () => {
  console.log('the server is running');
});
