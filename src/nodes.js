//Call API PosterList
async function getMoviesPreview(link) {
    //Skeletons
    for (let index = 0; index < 12; index++) {
        const skeletonContainer = document.createElement('div')
        skeletonContainer.classList.add('div-container')
        const skeletonFigure = document.createElement('figure')
        skeletonFigure.classList.add('MoviePoster-img-Container')
        const skeletonIMG = document.createElement('img')
        skeletonIMG.classList.add('MoviePoster-img', 'skeleton-setlist')
        movieListContainer.appendChild(skeletonContainer)
        skeletonContainer.appendChild(skeletonFigure)
        skeletonFigure.appendChild(skeletonIMG)
    }
    //API
    const {data} = await api(link.address, {
        params: {
            with_genres: link.id,
            query: link.query,
            page: link.page,
        }
      })
        const movies = data.results
        closePosterList()

        //CreateDOM and infiniteScrolling
        pageCounter = 2 
        createDOM(movies, {lazyLoad: true, clean: true}, link)
        window.scrollTo(0,0)
        
}

//utils
const lazyLoader = new IntersectionObserver((entries) => {
    entries.forEach(element => {
        const imgURL = element.target.getAttribute('loading-URL')
        if(element.isIntersecting) {
            element.target.setAttribute('src', imgURL)
        }
    });
})

//clear DOM
function clearDOM(name){
    name.innerHTML = ''
}

//Navigation function
function getnavigationInfo() {
    return [site, userquery, usersearch] = location.hash.split('=')
}

//Infinite Scrolling Funtion
function infiniteScrilling(link){
    const cardObservedForInfiniteScrolling = document.createElement('div')
    cardObservedForInfiniteScrolling.classList.add('Observe')
    movieListContainer.appendChild(cardObservedForInfiniteScrolling)
    setTimeout(() => {
        const observerInfiniteScrolling = new IntersectionObserver(entries => {
            entries.forEach(element => {
                if(element.isIntersecting){
                    async function apiNewPage(linkdata, newpage) {
                     const {data} = await api(linkdata.address, {params: {
                            with_genres: link.id,
                            query: link.query,
                            page: newpage,
                        } })
                        
                        createDOM(data.results, {lazyLoad: true, clean: false}, link)
                        cardObservedForInfiniteScrolling.remove()
                    }
                    apiNewPage(link, pageCounter)
                    cardObservedForInfiniteScrolling.remove()
                }

         });
        })
        observerInfiniteScrolling.observe(cardObservedForInfiniteScrolling)
        pageCounter++

    }, 1000);
}

//Create DOM
function createDOM(name, {lazyLoad = false, clean = true}, link) {
    if(clean){
        clearDOM(movieListContainer)
    }
    name.forEach(movie => {
        if(movie.poster_path != null){
        const figureContainer = document.createElement('figure')
        figureContainer.classList.add('MoviePoster-img-Container', 'poster-toggle')

        const imgPoster = document.createElement('img')
        imgPoster.classList.add('MoviePoster-img')
        imgPoster.setAttribute( lazyLoad ? 'loading-URL' : 'src', `https://image.tmdb.org/t/p/w300/${movie.poster_path}`)
        //Lazy Load
        if(lazyLoad){
            lazyLoader.observe(imgPoster)
        }
        imgPoster.alt = movie.title
        imgPoster.id = movie.id
        const divMovieInfoContainer = document.createElement('div')
        divMovieInfoContainer.classList.add('div-container')
        
        const movieTitle = document.createElement('h4')
        movieTitle.classList.add('movie-title')
        movieTitle.textContent = movie.title

        movieListContainer.appendChild(divMovieInfoContainer)
        divMovieInfoContainer.appendChild(figureContainer)
        figureContainer.appendChild(imgPoster)
        divMovieInfoContainer.appendChild(movieTitle)
    
        //add Event Listener to each
        imgPoster.addEventListener('click', (event)=>{
            
        //Skeletons
        movieDetailsContainer.innerHTML = ''
        const skeletonMoviePoster = document.createElement('div');
        skeletonMoviePoster.classList.add('skeleton-movie-poster');
        const skeletonImagePoster = document.createElement('img');
        skeletonImagePoster.classList.add('skeleton-image-poster', 'skeleton-poster');
        skeletonMoviePoster.appendChild(skeletonImagePoster);
        const skeletonTitlePoster = document.createElement('div');
        skeletonTitlePoster.classList.add('skeleton-title-poster', 'skeleton-poster');
        skeletonMoviePoster.appendChild(skeletonTitlePoster);
        for (let i = 0; i < 3; i++) {
            const skeletonDetailsPoster = document.createElement('div');
            skeletonDetailsPoster.classList.add('skeleton-details-poster', 'skeleton-poster');
            skeletonMoviePoster.appendChild(skeletonDetailsPoster);
        }
        movieDetailsContainer.appendChild(skeletonMoviePoster);
        //Create Product Info from API
            createProductInfo(event, {
                    id: movie.id,
            })
            openPosterList()
        })
        }

        
});

//Run Infinite Scrolling
infiniteScrilling(link, pageCounter)
}



//toggle Long poster description
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
 //add to favorites function
 async function setLikedMovies(event, movieID) {
    const {data} = await api(`movie/${movieID}${'?language=es'}`)
    const movieData = data
    if(!localStorage.getItem(`${movieID}`)){
        movieJson = JSON.stringify(movieData)
        localStorage.setItem(`movies`, `${movieJson}`)
        event.target.setAttribute('src', './Styles/Media/AddedHeart.png')

        const target = JSON.parse(localStorage.getItem('movies'))
        targetObjet = target
        
        console.log({...data, ...target})
       
        
    }else{
        localStorage.removeItem(`${movieID}`)
        event.target.setAttribute('src', './Styles/Media/AddHeart.png')
    }
}

/* const target = localStorage.getItem('movies')
const returnedTarget = Object.assign(target, source);

console.log(target); */


async function createProductInfo(event, link) {
    try {
        const {data} = await api(`movie/${link.id}${'?language=es'}`)
        const movies = data
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

        //add to favorites
        const addToFavoriteDivContainer = document.createElement('div')
        addToFavoriteDivContainer.classList.add('add-to-favorite-container')
        const addToFavorieIMG = document.createElement('img')
        addToFavorieIMG.classList.add('add-to-favorite')
        addToFavorieIMG.setAttribute('src', './Styles/Media/AddHeart.png')
        addToFavorieIMG.setAttribute('id', `${movies.id}`)

        addToFavorieIMG.addEventListener('click', (event)=>{
            setLikedMovies(event, movies.id)
            addToFavorieIMG.setAttribute('src', './Styles/Media/AddedHeart.png')
        })
        addToFavoriteDivContainer.appendChild(addToFavorieIMG)

        if(localStorage.getItem(`${movies.id}`)){
            addToFavorieIMG.setAttribute('src', './Styles/Media/AddedHeart.png')
        }

        //DOM Container
        movieDetailsContainer.innerHTML = ''
        movieDetailsContainer.appendChild(divMaincontainer)

        //Poster IMG
        divMaincontainer.appendChild(divMaincontainerImg)
        divMaincontainerImg.appendChild(imgClosePoster)
        divMaincontainerImg.appendChild(imgPoster)
        divMaincontainerImg.appendChild(addToFavoriteDivContainer)

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
    } catch (error) {
        console.error('Error fetching movie details:', error)
        alert('Failed to load movie details. Please try again later.')
    }
}

async function setLikedMovies(event, movieID) {
    const { data } = await api(`movie/${movieID}${'?language=es'}`);
    const movieData = data;

    // Retrieve the existing movies object from localStorage or initialize it
    let likedMovies = JSON.parse(localStorage.getItem('movies')) || {};
    console.log(likedMovies); // Debugging: Log the existing likedMovies object
    if (!likedMovies[movieID]) {
        // Add the movie to the likedMovies object
        likedMovies[movieID] = movieData;
        console.log(likedMovies[movieID]); // Debugging: Log the updated likedMovies object
        // Save the updated object back to localStorage
        localStorage.setItem('movies', JSON.stringify(likedMovies));

        // Update the UI to show the movie is liked
        event.target.setAttribute('src', './Styles/Media/AddedHeart.png');
    } else {
        // Remove the movie from the likedMovies object
        delete likedMovies[movieID];

        // Save the updated object back to localStorage
        localStorage.setItem('movies', JSON.stringify(likedMovies));

        // Update the UI to show the movie is unliked
        event.target.setAttribute('src', './Styles/Media/AddHeart.png');
    }

    console.log(likedMovies); // Debugging: Log the updated likedMovies object
}

let emptyObjet = {}

let newObject = {
    name: 'Miguel',
    age: 25,
    city: 'Madrid'
}

emptyObjet['user'] = newObject

console.log(emptyObjet)

//{ user: { name: 'Miguel', age: 25, city: 'Madrid' }}