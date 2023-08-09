let mysql      = require('mysql');
let pool = mysql.createPool({
  host     : 'localhost',
  user     : 'root',
  password : 'usbw',
  database : 'Video_library',
  port: "3309"
});
 
/* connection.connect();
 
connection.query('INSERT INTO todos (id, user_email, title, date) VALUES ("125", "pekny.email@gmail.com", "Todo", "01.08.2023")', function (error, results, fields) {
  if (error) throw error;
  console.log('The solution is: ', results);
});

connection.query('SELECT * FROM todos', function (error, results, fields) {
    if (error) throw error;
    console.log('The solution is: ', results);
  });
 
connection.end(); */
module.exports = pool