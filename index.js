const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const readers = require('./data/readers');
const health = require('./data/health');
const operations = require('./data/operations');

const app = express();
app.use(bodyParser.json());


app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

 

app.get('/readers', function (req, res) {
  res.json(readers);
});

app.get('/health', function (req, res) {
  res.json(health);
});

app.get('/operations', function (req, res) {
  res.json(operations);
});

app.post('/jobs', function (req, res) {
  if (!req.body) return res.status(400).send('Empty Request');

  const operation = req.body.operation;
  const readers = req.body.readers;

  if (!operation) return res.status(400).send('Missing Operation');
  if (!operations.includes(operation)) return res.status(400).send('Invalid Operation');
  if (!(readers && readers.length)) return res.status(400).send('Missing Readers');

  return res.sendStatus(200);
});

app.use(express.static(__dirname + '/src')); 
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'src/index.html'));
});

app.listen(3000, function() {  
  console.log('app running on port');
});