import express from "express";
import fs from 'fs/promises';

const app = express();

app.get('/', async (request, response) => {
  try {
    const dataBuff = await fs.readFile('index.html');
    response.type('html');
    response.send(dataBuff);
  } catch (err) {
    console.log(err);
  }
});

app.use('/', express.static('./'));

app.listen(5500);