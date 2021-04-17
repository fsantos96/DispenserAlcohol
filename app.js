const express = require('express');
const router = express();
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000; 

// MySql
// const connection = mysql.createConnection({
//   host: 'localhost',
//   user: 'root',
//   password: 'rootpass',
//   database: 'node20_mysql'
// });

router.use(bodyParser.json());

router.get('/', function(req, res) {
  res.sendFile(__dirname + '/views/index.html')
});

//require('./routes/client')(router);

router.listen(PORT, function() {
  console.log(`Server running on port ${PORT}`);
});