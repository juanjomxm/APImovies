const api = axios.create({
    baseURL: 'https://api.themoviedb.org/3',
    headers: {
        'Content-Type': 'application/json;charset=utf-8'
    },
    params: {
        'api_key': '53574b5a2a01901fcd5a04b11aced379'
    }
})

async function getTrendingMoviesPreview(){
    const {data} = await api.get('/trending/movie/day')

    const movies = data.results
    movies.forEach(movie => {
        const trendingPreviewMoviesContainer = document.querySelector('#trendingPreview .trendingPreview-movieList')
        const movieContainer = document.createElement('div')
        movieContainer.classList.add('movie-container')

        const movieImg = document.createElement('img')
        movieContainer.classList.add('movie-img')
        movieImg.setAttribute('alt', movie.title)
        movieImg.setAttribute('src', 'https://image.tmdb.org/t/p/w300' + movie['backdrop_path'])

        movieContainer.appendChild(movieImg)
        trendingPreviewMoviesContainer.appendChild(movieContainer)
        
    });
}
getTrendingMoviesPreview()

async function getCategoriesPreview(){
    const {data} = await api.get('/genre/movie/list?language=es')
    const categories = data.genres
    categories.forEach(category =>{
        const previewCategoriesContainer = document.querySelector('#categoriesPreview .categoriesPreview-list')
        const categoryContainer = document.createElement('div')
        categoryContainer.classList.add('cayegory-container')

        const cayegoryTitle = document.createElement('h3')
        cayegoryTitle.classList.add('category-title')
        cayegoryTitle.setAttribute('id', 'id' + category.id)
        const categoryTitlteText = document.createTextNode(category.name)

        cayegoryTitle.appendChild(categoryTitlteText)
        categoryContainer.appendChild(cayegoryTitle)
        previewCategoriesContainer.appendChild(categoryContainer)
    })
}
getCategoriesPreview()

// Para agregar axios con npm desde la terminal debo ingresar a la carptea que cotengan los archivos para agregar el package.json
