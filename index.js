import express, { request, response } from 'express';
import fs from 'fs/promises';

const app = express();

// updates date in footer
const updateFooterDate = async () => {
  try {
    const fileBuff = await fs.readFile('./public/index.html');
    const content = fileBuff.toString().replace('$TODAYSDATE$', currentDate());
    fs.writeFile('./public/index.html', content);
  } catch (err) {
    console.log(err);
  }
};

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

// Serving static files
// app.use('/', express.static('./public'));

app.get('/', async (request, response) => {
  updateFooterDate();
  try {
    const fileBuff = await fs.readFile('./public/index.html');
    response.type('html');
    response.send(fileBuff);
  } catch (err) {
    console.log(err);
  }
});

app.get('/*', async (request, response) => {
  updateFooterDate();
  try {
    const fileName = request.path;
    console.log(fileName);
    const dataBuff = await fs.readFile(`./public/${fileName}`);
    response.type(fileName.split('.')[1]);
    response.send(dataBuff);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5500);
