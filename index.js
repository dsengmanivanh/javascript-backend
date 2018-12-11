const express = require('express');
const app = express();
const { findOffersWithCriteria } = require('./offer-service');

app.get('/v2/criteria', function (req, res) {
  findOffersWithCriteria();
  res.send('Hello World!')
})

app.post('/', function (req, res) {
  res.send('Got a POST request');
});

app.put('/user', function (req, res) {
  res.send('Got a PUT request at /user');
});

app.delete('/user', function (req, res) {
  res.send('Got a DELETE request at /user');
});

app.listen(3000, function () {
  console.log('Example app listening on port 3000!')
}) 