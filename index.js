import express, { request, response } from 'express';
import fs from 'fs/promises';

const app = express();

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
  try {
    const fileBuff = await fs.readFile('./public/index.html');
    const content = fileBuff.toString().replace('$TODAYSDATE$', currentDate());
    response.type('html');
    response.send(content);
  } catch (err) {
    console.log(err);
  }
});

app.get('/*', async (request, response) => {
  try {
    const fileName = request.path;
    console.log(fileName);
    if (fileName.includes('index.html')) {
      const fileBuff = await fs.readFile('./public/index.html');
      const content = fileBuff
        .toString()
        .replace('$TODAYSDATE$', currentDate());
      response.type('html');
      response.send(content);
    }
    const dataBuff = await fs.readFile(`./public/${fileName}`);
    response.type(fileName.split('.')[1]);
    response.send(dataBuff);
  } catch (err) {
    console.log(err);
  }
});

app.listen(5500);
