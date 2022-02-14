var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');

var pg = require('pg');

var app = express();

app.use(express.static('www'));
app.use(express.static(path.join('www', 'build')));

app.use(bodyParser.json());


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
//console.log('connected' , client)
//table name
var accountTable = 'salesforce.account';

/*
var propertyTable = 'property__c';
var favoriteTable = 'favorite__c';
var brokerTable = 'broker__c';
*/


// setup the demo data if needed
/*
client.query('SELECT * FROM salesforce.broker__c', function(error, data) {
  if (error !== null) {
    client.query('SELECT * FROM broker__c', function(error, data) {
      if (error !== null) {
        console.log('Loading Demo Data...');
        require('./db/demo.js')(client);
        console.log('Done Loading Demo Data!');
      }
    });
  }
  else {
    var schema = 'salesforce.';
    propertyTable = schema + 'property__c';
    favoriteTable = schema + 'favorite__c';
    brokerTable = schema + 'broker__c';
  }
});
*/

/*
app.get('/property', function(req, res) {
  client.query('SELECT * FROM ' + propertyTable, function(error, data) {
    res.json(data.rows);
  });
});

app.get('/property/:id', function(req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + brokerTable + '.sfid AS broker__c_sfid, ' + brokerTable + '.name AS broker__c_name, ' + brokerTable + '.email__c AS broker__c_email__c, ' + brokerTable + '.phone__c AS broker__c_phone__c, ' + brokerTable + '.mobile_phone__c AS broker__c_mobile_phone__c, ' + brokerTable + '.title__c AS broker__c_title__c, ' + brokerTable + '.picture__c AS broker__c_picture__c FROM ' + propertyTable + ' INNER JOIN ' + brokerTable + ' ON ' + propertyTable + '.broker__c = ' + brokerTable + '.sfid WHERE ' + propertyTable + '.sfid = $1', [req.params.id], function(error, data) {
    res.json(data.rows[0]);
  });
});


app.get('/favorite', function(req, res) {
  client.query('SELECT ' + propertyTable + '.*, ' + favoriteTable + '.sfid AS favorite__c_sfid FROM ' + propertyTable + ', ' + favoriteTable + ' WHERE ' + propertyTable + '.sfid = ' + favoriteTable + '.property__c', function(error, data) {
    res.json(data.rows);
  });
});

app.post('/favorite', function(req, res) {
  client.query('INSERT INTO ' + favoriteTable + ' (property__c) VALUES ($1)', [req.body.property__c], function(error, data) {
    res.json(data);
  });
});

app.delete('/favorite/:sfid', function(req, res) {
  client.query('DELETE FROM ' + favoriteTable + ' WHERE sfid = $1', [req.params.sfid], function(error, data) {
    res.json(data);
  });
});


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

app.get( '/accounts', function(req, res) {
  client.query('SELECT * FROM ' + accountTable +  function(error, data) {
    console.log('Vineet :: Data retrieved from server' + data)
    res.json(data);
  });
//  res.json({"Hello" : "World"})
});


var port = process.env.PORT || 8300;
//var port = process.env.PORT || 8200;

app.listen(port);

console.log('Listening at: ' + port);
