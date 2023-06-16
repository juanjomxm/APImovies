searchFormBtn.addEventListener('click', () =>{
    trendsPage()
    location.hash = `#search=${searchFormInput.value}` // location.hash = es la manera de navegar en las diferentes ventanas que se pueden crear en una misma pagina
})

trendingBtn.addEventListener('click', () =>{
    location.hash = '#trends='
})

arrowBtn.addEventListener('click', () =>{
    history.back() // Esta es la manera para hacer que un boton no se devuelva hasta el home sino que ejecuta como un historial de busqueda
    // location.hash = '#home'
})

window.addEventListener('load', navigator) 
window.addEventListener('hashchange', navigator) // La manera como se va a ejecutar el hash porque es una propiedad de window
function navigator(){
    
    if(location.hash.startsWith('#trends=')){
        trendsPage()
    } else if(location.hash.startsWith('#search=')){
        searchPage()
    } else if(location.hash.startsWith('#movie=')){
        movieDetailsPage()
    } else if(location.hash.startsWith('#category=')){
        categoriesPage()
    } else {
        homePage()
    }
    document.body.scrollTop = 0
    document.documentElement.scrollTop = 0
}

function homePage(){
    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.add('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.remove('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.remove('inactive')
    categoriesPreviewSection.classList.remove('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.add('inactive')

    getTrendingMoviesPreview()
    getCategoriesPreview()
}

function categoriesPage(){
    console.log('categories')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    const [_, categoryData] = location.hash.split('=')
    const [categoryId,categoryName] = categoryData.split('-')
    headerCategoryTitle.innerHTML = categoryName
    getMoviesByCategory(categoryId)
}

function movieDetailsPage(){
    console.log('movie')

    headerSection.classList.add('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.add('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.add('inactive')
    movieDetailSection.classList.remove('inactive')

    // ['#movie', 'id]
    const [_,movieId] = location.hash.split('=')
    getMoviesById(movieId)
}

function trendsPage(){
    console.log('trends')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.remove('inactive')
    searchForm.classList.add('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    headerCategoryTitle.innerHTML = 'Tendencias'
    getTrendingMovies() // Estamos llamando la funcion que hicimos en movies para obtener las tendencias
}

function searchPage(){
    console.log('search')

    headerSection.classList.remove('header-container--long')
    headerSection.style.background = ''
    arrowBtn.classList.remove('inactive')
    arrowBtn.classList.remove('header-arrow--white')
    headerTitle.classList.add('inactive')
    headerCategoryTitle.classList.add('inactive')
    searchForm.classList.remove('inactive')

    trendingPreviewSection.classList.add('inactive')
    categoriesPreviewSection.classList.add('inactive')
    genericSection.classList.remove('inactive')
    movieDetailSection.classList.add('inactive')

    // ['#search', 'busqueda]
    const [_,query] = location.hash.split('=')
    getMoviesBySearch(query)
}