import express from 'express';
import OfferService from './service/offer-service'
const app = express();

app.get('/v2/criteria', function (req, res) {
  OfferService.handle();
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

app.listen(process.env.PORT || 3000, () => console.log('webhook is listening'));
