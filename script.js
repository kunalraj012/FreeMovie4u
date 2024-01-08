const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main = document.getElementById('main')
const form = document.getElementById('form')
const search = document.getElementById('search')
const popularButton = document.getElementById('popular');
const topRatedButton = document.getElementById('top-rated');
const upcomingButton = document.getElementById('upcoming');
const hollywoodButton = document.getElementById('hollywood');
const bollywoodButton = document.getElementById('bollywood');
const adultButton = document.getElementById('adult');
const southIndianButton = document.getElementById('south-indian');
const chineseButton = document.getElementById('chinese');
const webSeriesButton = document.getElementById('web-series');
const horrorButton = document.getElementById('horror');
const comedyButton = document.getElementById('comedy');


// Get initial movies
getMovies(API_URL)

async function getMovies(url) {
    const res = await fetch(url)
    const data = await res.json()
    showMovies(data.results)
}

function showMovies(movies) {
    main.innerHTML = ''

    movies.forEach((movie) => {
        const { title, poster_path, vote_average, overview } = movie

        const movieEl = document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML = `
            <img src="${IMG_PATH + poster_path}" alt="${title}">
            <div class="movie-info">
          <h3>${title}</h3>
          <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
          <h3>Overview</h3>
          ${overview}
        </div>
        `
        main.appendChild(movieEl)
    })
}

function getClassByRate(vote) {
    if(vote >= 8) {
        return 'green'
    } else if(vote >= 5) {
        return 'orange'
    } else {
        return 'red'
    }
}

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        getMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})
popularButton.addEventListener('click', () => getMovies(API_URL + '&page=1'));
topRatedButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/movie/top_rated?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'));
upcomingButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/movie/upcoming?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'));
hollywoodButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&with_genres=35&page=1')); // Genre ID 35 represents Comedy
bollywoodButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&with_genres=28&page=1')); // Genre ID 28 represents Drama (Bollywood)
adultButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&certification=R&page=1')); // 'R' rating represents Adult
southIndianButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&with_genres=10770&page=1')); // Genre ID 10770 represents South Indian
chineseButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&with_genres=1475&page=1')); // Genre ID 1475 represents Chinese Movie
webSeriesButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/tv?api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1')); // Fetching TV series for Web Series
horrorButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&with_genres=27&page=1')); // Genre ID 27 represents Horror
comedyButton.addEventListener('click', () => getMovies('https://api.themoviedb.org/3/discover/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&with_genres=35&page=1')); // Genre ID 35 represents Comedy Movie

