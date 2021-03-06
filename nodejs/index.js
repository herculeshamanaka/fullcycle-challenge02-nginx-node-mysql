const express = require('express');
const fakeName = require('faker');
const mysql = require('mysql');

const app = express();
const port = 3000;

const dbConfig = {
  host: "db",
  user: 'root',
  password: 'root',
  database: 'challenge02db'
};

const connection = mysql.createConnection(dbConfig);
const sqlCommand = `INSERT INTO people(name) VALUES ('${fakeName.name.findName()}')`;
connection.query(sqlCommand);
connection.end();

app.get('/', (request, response) => {
  response.statusCode = 200
  response.setHeader('Content-type', 'text/html')
  response.write('<h1>Full Cycle Rocks!</h1>')

  const connection = mysql.createConnection(dbConfig);

  connection.query("select * from people", function (err, rows, fields) {
    for (i = 0; i < rows.length; i++) {
      response.write('- ' + rows[i].name + '<br/>')
    }

    connection.end();
    response.end()
  });

});

app.listen(port, () => {
  console.log('🚀 Running on port ' + port);
});