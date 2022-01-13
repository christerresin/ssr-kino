console.log('Running..');

// Load data from API/DB
const load = async () => {
  const url = './src/data.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const movies = data.movies;
    return movies;
  } catch (error) {
    console.log(error);
  }
};

const loadEvents = async () => {
  const url = './src/data.json';
  try {
    const response = await fetch(url);
    const data = await response.json();
    const events = data.events;
    return events;
  } catch (error) {
    console.log(error);
  }
};

const heroSlider = async () => {
  // From HTML
  const movies = await load();
  const prev = document.querySelector('.heroPicPrev');
  const next = document.querySelector('.heroPicNext');
  const heroContainer = document.querySelector('.heroContainer');

  // Get all banners from API
  const heroMovieBanner = [];
  for (let i = 0, j = movies.length; i < j; i++) {
    heroMovieBanner.push(movies[i].bannerImg);
  }

  //Functions for next and previous slide
  const heroNextSlide = () => {
    slideIndex =
      slideIndex < movies.length - 1 ? (slideIndex += 1) : (slideIndex = 0);
    heroContainer.style.backgroundImage = `url(${heroMovieBanner[slideIndex]})`;
  };
  const heroPrevSlide = () => {
    slideIndex = slideIndex
      ? (slideIndex -= 1)
      : (slideIndex = movies.length - 1);
    heroContainer.style.backgroundImage = `url(${heroMovieBanner[slideIndex]})`;
  };

  // Set hero to first banner loaded from API
  let slideIndex = 0;
  heroContainer.style.backgroundImage = `url(${heroMovieBanner[slideIndex]})`;

  // Click on previous and next to change banner
  next.addEventListener('click', () => {
    heroNextSlide();
  });
  prev.addEventListener('click', () => {
    heroPrevSlide();
  });

  // Autoslider
  setInterval(heroNextSlide, 10000);
};

heroSlider();
