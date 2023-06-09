const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': '53574b5a2a01901fcd5a04b11aced379'
    }
})

// HELLPERS

function createMovies(movies, container){
    container.innerHTML = ''
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieContainer.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path)
        //['backdrop_path']

        movieContainer.appendChild(movieImg)
        container.appendChild(movieContainer)
        
    })
}

function createCategories(categories, container){
    container.innerHTML = ''
    categories.forEach(category =>{
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('cayegory-container')

        const cayegoryTitle = document.createElement('h3')
        cayegoryTitle.classList.add('category-title')
        cayegoryTitle.setAttribute('id', 'id' + category.id)
        cayegoryTitle.addEventListener('click', ()=>{
            location.hash = `#category=${category.id}-${category.name}`
        })
        const categoryTitlteText = document.createTextNode(category.name)

        cayegoryTitle.appendChild(categoryTitlteText)
        categoryContainer.appendChild(cayegoryTitle)
        container.appendChild(categoryContainer)
    })
}

// FUNCIONES ASINCRONAS

async function getTrendingMoviesPreview(){
    const {data} = await api.get('/trending/movie/day')
    const movies = data.results
    createMovies(movies, trendingMoviesPreviewList)
}

async function getCategoriesPreview(){
    const {data} = await api.get('/genre/movie/list?language=es')
    const categories = data.genres
    createCategories(categories, categoriesPreviewList)
}
// Para agregar axios con npm desde la terminal debo ingresar a la carptea que cotengan los archivos para agregar el package.json

async function getMoviesByCategory(id){
    const {data} = await api.get('/discover/movie', {
        params: {
            with_genres: id
        }
    })
    const movies = data.results
    createMovies(movies, genericSection)
}

async function getMoviesBySearch(query){
    const {data} = await api.get('/search/movie', {
        params: {
            query
        }
    })
    const movies = data.results
    createMovies(movies, genericSection)
}

async function getTrendingMovies(){
    const {data} = await api.get('/trending/movie/day')
    const movies = data.results
    createMovies(movies, genericSection)
}