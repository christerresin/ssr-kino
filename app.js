import express from 'express';
import { engine } from 'express-handlebars';
import currentDate from './public/src/modules/CurrentDate.js';

const app = express();

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
  res.render('home', {});
});

app.get('/contact', (req, res) => {
  res.render('contact');
});

app.get('/movies', (req, res) => {
  res.render('movies', { date: currentDate() });
});

app.get('/tickets', (req, res) => {
  res.render('tickets');
});

app.get('/about', (req, res) => {
  res.render('about');
});

app.get('/events', (req, res) => {
  res.render('events');
});

// Serve files
app.use('/', express.static('./public'));

// Server start/listening
app.listen(5500);
