var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var pg = require('pg');

var app = express();

app.use(bodyParser.json({ type: "application/json" }));
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('www'));
// app.use(express.static(path.join('www', 'build')));

app.use(bodyParser.json());

var port = process.env.PORT || 5432;
//var port = process.env.PORT || 8200;

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

//heroku-connect-v2demo

// client.host = 'ec2-54-209-221-231.compute-1.amazonaws.com';
// client.database = 'd1pk8l7t1q12s3';
// client.user = 'cyiwpjsmyaxjjx';
// client.password = '80f9aeaa6f47bf2890f447e7d52627532061ed8e662301fa8f9e47f723278ce7';

//v2testpoc-2403

client.host = 'ec2-18-215-8-186.compute-1.amazonaws.com';
client.database = 'df1vjjcla4od5f';
client.user = 'sqswklfxrepflp';
client.password = 'faf953a77e258671c0c32c90a40900c207fe2489f42b0783e4e70483c1fbfcd2';

 client.connect();
// console.log('connected' , client)

//table name
var accountTable = 'salesforce.account';


// ////////////////
// const config = {
//   host = 'ec2-18-215-8-186.compute-1.amazonaws.com',
//   database = 'df1vjjcla4od5f',
//   user = 'sqswklfxrepflp',
//   password = 'faf953a77e258671c0c32c90a40900c207fe2489f42b0783e4e70483c1fbfcd2'
// };

// var client = new pg.Client(config);

// client.connect();
// console.log('connected' , client)
// ///////////////



/*
var propertyTable = 'property__c';
var favoriteTable = 'favorite__c';
var brokerTable = 'broker__c';
*/


// setup the demo data if needed

// client.query('SELECT * FROM salesforce.broker__c', function(error, data) {
//   if (error !== null) {
//     client.query('SELECT * FROM broker__c', function(error, data) {
//       if (error !== null) {
//         console.log('Loading Demo Data...');
//         require('./db/demo.js')(client);
//         console.log('Done Loading Demo Data!');
//       }
//     });
//   }
//   else {
//     var schema = 'salesforce.';
//     propertyTable = schema + 'property__c';
//     favoriteTable = schema + 'favorite__c';
//     brokerTable = schema + 'broker__c';
//   }
// });

/*
app.get('/broker', function(req, res) {
  client.query('SELECT * FROM ' + brokerTable, function(error, data) {
    res.json(data.rows);
  });
});

app.get('/broker/:sfid', function(req, res) {
  client.query('SELECT * FROM ' + brokerTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data.rows[0]);
  });
});
*/

// app.get("/accounts", async (req, res) => {
//   const template = await client.query('SELECT * FROM salesforce.account');
//   res.json(template );
// })

// app.post( '/accounts', function(req, res) {
//   const template = 'insert into salesforce.account (name) values($1)';
//    client.query(template, ['Robert']);
// });

// app.post('/favorite', function(req, res) {
//   client.query('INSERT INTO ' + favoriteTable + ' (property__c) VALUES ($1)', [req.body.property__c], function(error, data) {
//     res.json(data);
//   });
// });


// app.post('/adddata', function(req, res) {
//   client.query('INSERT INTO salesforce.account (name) VALUES ($1)', ['Vineet Kumar'], function(error, data) {
//     res.json(data);
//   });
// });

app.post('/adddata', function(req, res) {
  client.query('INSERT INTO salesforce.account (name) VALUES ($1)', [req.username], function(error, data) {
    res.json(data);
  });
});


app.get( '/accountsdata', function(req, res) {
  client.query('SELECT name FROM salesforce.account' ,  function(error, data) {
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



