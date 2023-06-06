window.addEventListener('load', navigator)
window.addEventListener('hashchange', navigator)
function navigator(){
    
    if(location.hash.startsWith('#trends')){
        console.log('TRENDS')
    } else if(location.hash.startsWith('#search=')){
        console.log('SEARCH')
    } else if(location.hash.startsWith('#category=')){
        console.log('CATEGORIES')
    } else {
        homePage()
    }
    location.hash
}

function homePage(){
    console.log('home')
}