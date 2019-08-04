
const express = require('express');
const hbs = require('hbs');
hbs.registerPartials(__dirname + '/views/partials')
const app = express();
const path = require('path');
const PunkAPIWrapper = require('punkapi-javascript-wrapper');
const punkAPI = new PunkAPIWrapper();

app.set('view engine', 'hbs');
app.set('views', __dirname + '/views');
app.use(express.static(path.join(__dirname, 'public')));




app.get('/', (req, res, next) => {
  res.render('index.hbs');
});


app.get('/beers', (req, res, next) => {
  punkAPI.getBeers()
    .then(beers => {
      console.log(beers[0])
      res.render('beers.hbs', { beers });
    })
    .catch(error => {
      console.log(error)
    })
})

app.get('/randomBeer', (req, res, next) => {
  punkAPI.getRandom()
    .then(beers => {
      res.render('beerPartials.hbs', beers[0])
    })
    .catch(error => {
      console.log(error)
    })
})


app.listen(3000, () => {
  console.log('running on port 3000')
});
