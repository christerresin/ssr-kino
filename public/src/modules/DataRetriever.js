import fs from 'fs/promises';

export default class DataRetriever {
  constructor() {
    this.movies = null;
    this.events = null;
  }
  async loadMovies() {
    if (!this.movies) {
      try {
        const dataBuff = await fs.readFile('./public/src/data.json');
        const data = JSON.parse(dataBuff);
        this.movies = data.movies;
      } catch (error) {
        console.log(error);
      }
    }
    return this.movies;
  }

  async loadEvents() {
    if (!this.events) {
      try {
        const dataBuff = await fs.readFile('./public/src/data.json');
        const data = JSON.parse(dataBuff);
        this.events = data.events;
      } catch (error) {
        console.log(error);
      }
    }
    return this.events;
  }
}
