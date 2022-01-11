import express from 'express';
import fs from 'fs/promises';

const app = express();

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

currentDate();

app.get('/', async (request, response) => {
  try {
    const dataBuff = await fs.readFile('index.html');
    const data = dataBuff.toString().replace('$TODAYSDATE$', currentDate());
    response.type('html');
    response.send(data);
  } catch (err) {
    console.log(err);
  }
});

app.use('/', express.static('./'));

app.listen(5500);
