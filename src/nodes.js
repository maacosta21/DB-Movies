//Call API PosterList
async function getMoviesPreview(link) {
    const {data} = await api(link.address, {
        params: {
            with_genres: link.id,
            query: link.query,
        }
      })
        const movies = data.results
        closePosterList()
        createDOM(movies, link.address, link.id, link.query)
        window.scrollTo(0,0)  
    }

//clear DOM
function clearDOM(name){
    name.innerHTML = ''
}

function getnavigationInfo() {
    return [site, userquery, usersearch] = location.hash.split('=')
}


//Create DOM
function createDOM(name){
    clearDOM(movieListContainer)
    name.forEach(movie => {
        if(movie.poster_path != null){
            const figureCOntainer = document.createElement('figure')
        figureCOntainer.classList.add('MoviePoster-img-Container', 'poster-toggle')

        const imgPoster = document.createElement('img')
        imgPoster.classList.add('MoviePoster-img')
        imgPoster.src = `https://image.tmdb.org/t/p/original/${movie.poster_path}`
        imgPoster.alt = movie.title
        imgPoster.id = movie.id
        
        const divMovieInfoContainer = document.createElement('div')
        divMovieInfoContainer.classList.add('div-container')
        
        const movieTitle = document.createElement('h4')
        movieTitle.classList.add('movie-title')
        movieTitle.textContent = movie.title

        movieListContainer.appendChild(divMovieInfoContainer)
        divMovieInfoContainer.appendChild(figureCOntainer)
        figureCOntainer.appendChild(imgPoster)
        divMovieInfoContainer.appendChild(movieTitle)
        //add Event Listener to each
        imgPoster.addEventListener('click', (event)=>{
            movieDetailsContainer.innerHTML = ''
                createProductInfo(event, {
                    id: movie.id,
                })
            setTimeout(() => {
                openPosterList()
            }, 10);
            
        })
        }
});
}

function openPosterList(){
    movieListContainer.classList.add('MoviePoster-SetList--long')
    movieListContainer.classList.remove('MoviePoster-SetList')
    movieDetailsContainer.classList.remove('inactive')
}

function closePosterList(){
    movieListContainer.classList.remove('MoviePoster-SetList--long')
    movieListContainer.classList.add('MoviePoster-SetList')
    movieDetailsContainer.classList.add('inactive')
}

//section information
function showSectionName(name) {
    sectionNavigator.classList.remove('inactive')
    sectionInformation.textContent = `${name}`
}

//load categories function
async function loadCategories() {
    const {data} = await api('genre/movie/list?language=es')
    const genres = data.genres
        genres.forEach(genre => {
            const liGenre = document.createElement('li')
            liGenre.setAttribute('id', genre.id)
            liGenre.textContent = genre.name
            categorisList.appendChild(liGenre)
            liGenre.addEventListener('click', ()=>{
                showSectionName(genre.name)
                closePosterList()
                viewCatogeriesButtonStatus[viewCategories.textContent]()
                location.hash = `category=${liGenre.id}=${genre.name}`
            })
        });
        location.hash = 'home'
        inicioButton.checked = true
        inicioButtonMobile.checked = true
}



//banner
async function createProductInfo(event, link) {
    const {data} = await api(`movie/${link.id}${'?language=es'}`)
    const movies = data
    console.log(data)
    if(event.target.classList.contains('MoviePoster-img')){

        const divMaincontainer = document.createElement('div')
        divMaincontainer.classList.add('MoviePoster-container--Long-Display')

        const divMaincontainerImg = document.createElement('div')
        divMaincontainerImg.classList.add('MoviePoster-container--Long-Display-Img')

        const imgClosePoster = document.createElement('img')
        imgClosePoster.classList.add('close-poster')
        imgClosePoster.setAttribute('src', './Styles/Media/icon_close.png')

        const imgPoster = document.createElement('img')
        imgPoster.classList.add('MoviePoster-container--Img')
        imgPoster.setAttribute('src', `https://image.tmdb.org/t/p/original/${movies.poster_path}`)

        const divMaincontainerInfo = document.createElement('div')
        divMaincontainerInfo.classList.add('MoviePoster-container--Info')

        const titlePoster = document.createElement('h2')
        titlePoster.classList.add('movie-information-title')
        titlePoster.textContent = movies.title

        const descriptionPoster = document.createElement('p')
        descriptionPoster.classList.add('movie-information-description')
        descriptionPoster.textContent = movies.overview

        const divCategoriesAndRate = document.createElement('div')
        divCategoriesAndRate.classList.add('categories-and-rate')

        //DOM Container
        movieDetailsContainer.appendChild(divMaincontainer)

        //Poster IMG
        divMaincontainer.appendChild(divMaincontainerImg)
        divMaincontainerImg.appendChild(imgClosePoster)
        divMaincontainerImg.appendChild(imgPoster)

        //Poster info
        divMaincontainer.appendChild(divMaincontainerInfo)
        divMaincontainerInfo.appendChild(titlePoster)
        divMaincontainerInfo.appendChild(descriptionPoster)

        //Categories and Rate

        if(movies.tagline != ''){
            const divTagline = document.createElement('div')
            const tagline = document.createElement('h3')
            tagline.classList.add('tagline')
            tagline.textContent = `"${movies.tagline}"`
            
            divCategoriesAndRate.appendChild(divTagline)
            divTagline.appendChild(tagline)
        }
        const divGenresMainContainer = document.createElement('div')
        const divGenres = document.createElement('div')
        const categoriesTitle = document.createElement('p')
        categoriesTitle.classList.add('titles')
        categoriesTitle.textContent = 'Categorías'
        const ulGenresList = document.createElement('ul')
        ulGenresList.classList.add('movie-categorie-list')
        movies.genres.forEach(genre => {
            const createGenre = document.createElement('li')
            createGenre.classList.add('li-movie-categorie')
            createGenre.textContent = genre.name
            ulGenresList.appendChild(createGenre)
            createGenre.addEventListener('click', ()=>{
                setTimeout(() => {
                    showSectionName(genre.name)
                closePosterList()
                location.hash = `category=${genre.id}=${genre.name}`
                }, 100);
            })
        });

        const divAverageRate = document.createElement('div')
        const AverageTitle = document.createElement('p')
        AverageTitle.classList.add('titles')
        AverageTitle.textContent = 'Puntuación'
        const spanAverage = document.createElement('span')
        spanAverage.classList.add('show-votes-average')
        spanAverage.textContent = movies.vote_average.toFixed(1)

        

        divCategoriesAndRate.appendChild(divGenresMainContainer)
        divGenresMainContainer.appendChild(divGenres)
        divGenres.appendChild(categoriesTitle)
        divGenres.appendChild(ulGenresList)

        divGenresMainContainer.appendChild(divAverageRate)
        divAverageRate.appendChild(AverageTitle)
        divAverageRate.appendChild(spanAverage)

        divMaincontainerInfo.appendChild(divCategoriesAndRate)
 
    
     //closer Poster
        const closePoster = document.querySelector('.close-poster')
        closePoster.addEventListener('click', ()=>{
            closePosterList()
        })
      }
      window.scrollTo(0,0)                          
}

//hide
function hideCategories() {
    categorisList.classList.add('inactive')
    viewCategories.textContent = 'Mostrar'
}

//show
function showCategories() {
    categorisList.classList.remove('inactive')
    viewCategories.textContent = 'Cerrar'
}

