const express = require('express')
const bodyParser = require('body-parser');
const app = express()
const port = 3000

const SearchServiceFactory = require('./infrastructure/factories/search-service');

app.use(bodyParser.json());

app.get('/route/:from/:to', SearchServiceFactory.create('search'));

app.post('/route', SearchServiceFactory.create('save'));

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
})