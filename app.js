import express from 'express';
import { engine } from 'express-handlebars';
import currentDate from './public/src/modules/CurrentDate.js';
import DataRetriever from './public/src/modules/DataRetriever.js';
import renderEvents from './public/src/modules/Events.js';

const app = express();

// Data
const dataLoader = new DataRetriever();
const moviesData = await dataLoader.loadMovies();
const eventsData = await dataLoader.loadEvents();

// Helpers
const helpers = {
  todaysDate: currentDate(),
};

// View engine setup
app.engine('handlebars', engine({ helpers: helpers }));
app.set('view engine', 'handlebars');
app.set('views', './views');

// Routing
app.get('/', (req, res) => {
  res.render('home', { events: renderEvents(eventsData).slice(-4) });
});

app.get('/kontakt', (req, res) => {
  res.render('contact');
});

app.get('/filmer', (req, res) => {
  res.render('movies');
});

app.get('/biljetter', (req, res) => {
  res.render('tickets');
});

app.get('/om', (req, res) => {
  res.render('about');
});

app.get('/events', (req, res) => {
  res.render('events');
});

app.get('/film/:name', (req, res) => {
  console.log(req.params.name);
  res.render('movie');
});

// Serve files
app.use('/', express.static('./public'));

// Server start/listening
app.listen(5500);
