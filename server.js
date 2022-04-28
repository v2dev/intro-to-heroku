var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var pg = require('pg');

var app = express();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var port = process.env.PORT || 5432;

app.listen(port);

console.log('Vineet :: Listening at: ' + port);

var connectionString = process.env.DATABASE_URL || 'postgres://sqswklfxrepflp:faf953a77e258671c0c32c90a40900c207fe2489f42b0783e4e70483c1fbfcd2@ec2-18-215-8-186.compute-1.amazonaws.com:5432/df1vjjcla4od5f';

if (process.env.DATABASE_URL !== undefined) {
  console.log('VINEET DB reference ' + process.env.DATABASE_URL)
  pg.defaults.ssl = true;
}else{
  pg.defaults.ssl = true;
  console.log('VINEET DB reference undefined')
}

//connect to db
var client = new pg.Client(connectionString);

//v2testpoc-2403
client.host = 'ec2-18-215-8-186.compute-1.amazonaws.com';
client.database = 'abcd7777abcd';
client.user = 'jjjjlfxrepflp';
client.password = 'faf953a77e258671c0c32207fe2489f42b0783e4e70483c1fbfcd2';

 client.connect();

//table name
var accountTable = 'salesforce.account';

// app.post('/adddata', function(req, res) {
//   client.query('INSERT INTO salesforce.account (name) VALUES ($1)', ['Vineet Kumar'], function(error, data) {
//     res.json(data);
//   });
// });

//post request
app.post('/adddata', function(req, res) {
  client.query('INSERT INTO ' + accountTable + ' (name) VALUES ($1)', [req.body.username], function(error, data) {
    res.json(data);
  });
});

app.delete('/deletedata/', function(req, res) {
  //console.log('Delete query_2 ' + req.body.username)

  //Query to delete a record  
  client.query('DELETE FROM ' + accountTable + ' WHERE name = $1', [req.body.username], function(error, data) {
    res.json(data);
  });
});

// app.delete('/deletedata/', function(req, res) {
//   //console.log('Delete query_2 ' + req.body.username)

//   //Query to delete a record  
//   client.query('DELETE FROM ' + accountTable + ' WHERE name is null', function(error, data) {
//     res.json(data);
//   });
// });


app.put('/updatedata/', function(req, res) {
    //  console.log('update query_2 Old name ==> ' + req.body.oldname) 
    //Query to update a record
    client.query('UPDATE ' + accountTable + ' SET name = $1 WHERE name = $2', [req.body.newname, req.body.oldname ], function(error, data) {
    res.json(data);
  });
});


//Get request
app.get( '/accountsdata', function(req, res) {
  client.query('SELECT name FROM ' + accountTable ,  function(error, data) {
    if(error != null){
      console.log(data)
      res.json(data);
  }else{
    res.json({data})
  }
  });    
});


// app.get( '/accounts', function(req, res) {
//   client.query('SELECT * FROM salesforce.account' ,  function(error, data) {
//     if(error != null){
//       console.log('Vineet :: Data retrieved from server' + data)
//       res.json(data);
//       //res.json({"Hello" : "World"})
//   }else{
//     console.log("Server :: Error " + error + " Data =>  " + data )
//     res.json({"Vineet :: Data Value => " : data })
//   }
//   });    
// });




