var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var pg = require('pg');

var app = express();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 1000;

app.listen(port);

var connectionString = process.env.DATABASE_URL || 'postgres://sqswklfxrepflc0c32c90a40900c207fe2489f42b0783e4e70483c1fcd2@ec2-18-215-8-142.compute-2.amazonaws.com:5432/df1vjjcla4od5f';

if (process.env.DATABASE_URL !== undefined) {
    pg.defaults.ssl = true;
}else{
  pg.defaults.ssl = true;
 }

//connect to db
var client = new pg.Client(connectionString);

//v2testpoc-2403
client.host = 'ec2-18-215-8-186.compute-3.amazonaws.com';
client.database = 'abcd7777abcd';
client.user = 'jjjjlfxrepflp';
client.password = 'gaf953a77e258671c0c32207fe2489f42b0783e4e70483c1fbfcd2';

 client.connect();

//table name
var emplTable = 'mydata.empl';

//post request
app.post('/adddata', function(req, res) {
  client.query('INSERT INTO ' + var emplTable = 'mydata.empl';
  + ' (name) VALUES ($1)', [req.user], function(error, data) {
    res.json(data);
  });
});

app.delete('/deletedata/', function(req, res) {
  //Query to delete a record  
  client.query('DELETE FROM ' + var emplTable = 'mydata.empl';
  + ' WHERE name = $1', [req.user], function(error, data) {
    res.json(data);
  });
});

app.put('/update/', function(req, res) {
    //  console.log('update query_2 Old name ==> ' + req.body.oldname) 
    //Query to update a record
    client.query('UPDATE ' + var emplTable = 'mydata.empl';
    + ' SET name = $1 WHERE name = $2', [req.body.newname, req.body.oldname ], function(error, data) {
    res.json(data);
  });
});


//Get request
app.get( '/empldata', function(req, res) {
  client.query('SELECT data FROM ' + var emplTable = 'mydata.empl';
  ,  function(error, data) {
    if(error != null){
      console.log(data)
      res.json(data);
  }else{
    res.json({data})
  }
  });    
});




