const api = axios.create({ // Creando la instancia para darle todos los parametros desde el principio
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': '53574b5a2a01901fcd5a04b11aced379',
       // 'language': 'es'
    }
})

// HELLPERS

function createMovies(movies, container){ // Esta funcion se debe crear para generar lo que va a aparecer en pantalla cuando se hagan las peticciones API. Mas adelante se debera utilizar para crear los contenedores de imagenes o secciones
    container.innerHTML = ''
    movies.forEach(movie => {
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')
        movieContainer.addEventListener('click', ()=>{
            location.hash = `#movie=${movie.id}`  
        })   
        const movieImg = document.createElement('img')     
        movieContainer.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie.poster_path )
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
    const {data} = await api.get('/discover/movie?language=es', {
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

async function getMoviesById(id){
    const { data: movie} = await api(`/movie/${id}`)

    const movieImgUrl = 'https://image.tmdb.org/t/p/w500' + movie.poster_path
    headerSection.style.background = `
    linear-gradient(
        180deg,
        rgba(0,0,0,0.35) 19.27%,
        rgba(0,0,0,0) 29.17%
    ),
    url(${movieImgUrl})`

    movieDetailTitle.textContent = movie.title
    movieDetailDescription.textContent = movie.overview
    movieDetailScore.textContent = movie.vote_average 

    createCategories(movie.genres, movieDetailCategoriesList)
    getRelatedMoviesId(id)
}

async function getRelatedMoviesId(id){
    const {data} = await api(`/movie/${id}/similar`)
    const relatedMovies = data.results
    createMovies(relatedMovies, relatedMoviesContainer )
}