import express from 'express';
import { engine } from 'express-handlebars';

const app = express();

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

// Todays date formated XXXX-XX-XX
const currentDate = () => {
  let myDate = new Date();
  let myDateString;

  myDate.setDate(myDate.getDate());

  myDateString =
    myDate.getFullYear() +
    '-' +
    ('0' + (myDate.getMonth() + 1)).slice(-2) +
    '-' +
    ('0' + myDate.getDate()).slice(-2);

  return myDateString;
};

app.get('/', (req, res) => {
  res.render('home', { date: currentDate() });
});

app.get('/contact', (req, res) => {
  res.render('contact', { date: currentDate() });
});

app.get('/movies', (req, res) => {
  res.render('movies', { date: currentDate() });
});

app.get('/tickets', (req, res) => {
  res.render('tickets', { date: currentDate() });
});

app.get('/about', (req, res) => {
  res.render('about', { date: currentDate() });
});

app.get('/events', (req, res) => {
  res.render('events', { date: currentDate() });
});

app.use('/', express.static('./public'));

app.listen(5500);
