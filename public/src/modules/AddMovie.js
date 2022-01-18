import fs from 'fs/promises';
import fetch from 'node-fetch';

const addMovie = async (movieId, dataArray) => {
  const movieFoundInDb = dataArray.movies.filter(
    (movie) => movie.imdbId === movieId
  );

  if (movieFoundInDb.length < 1) {
    const imdbId = movieId;
    const APIurl = `http://www.omdbapi.com/?i=${imdbId}&apikey=9e0ad095`;

    // const newMovieId = dbData[dbData.length].movieId + 1;
    // console.log(dataArray.movies[dataArray.movies.length - 1]);

    const newMovieId =
      dataArray.movies[dataArray.movies.length - 1].movieID + 1;

    const data = await fetch(APIurl);
    const body = await data.json();

    const movieDurationText = (durationData) => {
      const movieDurationMinutes = durationData.split(' ')[0];
      const durationHours = Math.floor(movieDurationMinutes / 60);
      const durationMinutes = movieDurationMinutes % 60;
      return `${durationHours}h ${durationMinutes}min`;
    };

    const movieImdbRating = (ratingString) => {
      const firstDigit = body.imdbRating.split('.')[0];
      const secondDigit = body.imdbRating.split('.')[1];

      return `${firstDigit}.${secondDigit}`;
    };

    const movieAgeLimit = (ratedString) => {
      let movieAge = '';

      if (ratedString === 'G') {
        movieAge = 'barntillåten';
      } else if (ratedString === 'PG') {
        movieAge = '7 år';
      } else {
        movieAge = '15 år';
      }

      return movieAge;
    };

    const newMovie = {
      movieID: newMovieId,
      movieTitle: body.Title,
      genre: body.Genre.split(','),
      description: body.Plot,
      duration: movieDurationText(body.Runtime),
      release: body.Released,
      coverImg: body.Poster,
      imdbRating: movieImdbRating(body.imdbRating),
      director: body.Director,
      writers: body.Writer.split(','),
      actors: body.Actors.split(','),
      age: movieAgeLimit(body.Rated),
      imdbId: imdbId,
      imdbUrl: `https://www.imdb.com/title/${imdbId}/`,
      bannerImg: 'https://picsum.photos/1920/1080',
    };
    dataArray.movies.push(newMovie);
    fs.writeFile(
      './public/src/data.json',
      JSON.stringify(dataArray, null, 2),
      (err) => {
        if (err) {
          console.log(err);
        } else {
          console.log('File written successfully\n');
          console.log('The written has the following contents:');
          // console.log(fs.readFileSync('db.js', 'utf8'));
        }
      }
    );
  } else {
    console.log('MOVIE ALREADY IN DB!');
  }
};

export default addMovie;
