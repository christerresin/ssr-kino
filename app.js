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
  res.render('movies', { movies: moviesData });
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

app.get('/film/:id', (req, res) => {
  let movieData;
  const selectedMovieId = parseInt(req.params.id);
  movieData = moviesData.filter((movie) => movie.movieID === selectedMovieId);
  res.render('movie', {
    movie: movieData[0],
  });
});

app.get('/film/:name', (req, res) => {
  let movieData;
  if (!req.params.name.includes('.')) {
    const movieName = req.params.name;
    movieData = moviesData.filter((movie) => {
      movie.movieTitle.toLowerCase().includes(movieName);
    });
    res.render('movie', {
      movie: movieData[0],
    });
  }
  if (movieData == []) {
    console.log('No movie found');
    res.status(404).send('Not found!');
  }
});

// Serve files
app.use('/', express.static('./public'));
app.use('/film', express.static('./public'));

// Server start/listening
app.listen(5500);
