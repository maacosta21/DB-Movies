//Home start
loadCategories()

//hide
function hideCategories() {
    catogoriesContainerList.classList.add('inactive')
    viewCategories.textContent = '▼'
    viewMoreCategoriesMobile.textContent = '▼'
}

//show
function showCategories() {
    catogoriesContainerList.classList.remove('inactive')
    viewCategories.textContent = '▲'
    viewMoreCategoriesMobile.textContent = '▲'
    document.querySelector('.main-container').addEventListener('click', (e)=>{
        if(catogoriesContainerList.classList.contains('inactive') == false){
            catogoriesContainerList != e.target ? catogoriesContainerList.classList.add('inactive') : false
            viewCategories.textContent = '▼'
        } 
    }) 
}

//Nav Navigation
navCategories.addEventListener('click', ()=>{
    if(inicioButton.checked == true){
        location.hash = 'home'
        inicioButtonMobile.checked = true
    }else if(pupularButton.checked == true){
        location.hash = 'popular'
        trendingButtonMobile.checked = true
    }else if(carteleraButton.checked == true) {
        location.hash = 'cartelera'
        carteleraButtonMobile.checked = true
    }
})

navCategoriesMobile.addEventListener('click', ()=> {
    if(inicioButtonMobile.checked == true) {
        location.hash = 'home'
        inicioButton.checked = true
    } else if(trendingButtonMobile.checked == true) {
        location.hash = 'popular'
        pupularButton.checked = true
    }else if(carteleraButtonMobile.checked == true){
        location.hash = 'cartelera'
        carteleraButton.checked = true
    }
    mobileMenuContainer.classList.add('inactive')
})

searchInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        location.hash = `search=user=${searchInput.value}`
        showSectionName(`Results: ${searchInput.value}`)
    }
})

searchMobileInput.addEventListener('keypress', (event) => {
    if(event.key === 'Enter'){
        location.hash = `search=user=${searchMobileInput.value}`
        showSectionName(`Results: ${searchMobileInput.value}`)
    }
})

searchMobileLogo.addEventListener('click', () => {
        location.hash = `search=user=${searchMobileInput.value}`
        showSectionName(`Results: ${searchMobileInput.value}`)
})

returnNavigation.addEventListener('click', ()=>{
    history.back()
    setTimeout(() => {
    sectionInformation.textContent = decodeURI(getnavigationInfo()[2])
}, 25)
})

function uncheckingHomeNavigation(){
    alNavInputs.forEach(nav => {
        nav.checked = false
    });
    alNavInputsMobile.forEach(nav => {
        nav.checked = false
    });
}

//Categories Section
const viewCatogeriesButtonStatus = {
    '▲': ()=>{
        hideCategories()
        
    },
    '▼': ()=>{
        showCategories()
    }
}

//Categories Button
viewCategories.addEventListener('click', ()=>{ 
    viewCatogeriesButtonStatus[viewCategories.textContent]()
})

viewMoreCategoriesMobile.addEventListener('click', ()=>{ 
    viewCatogeriesButtonStatus[viewMoreCategoriesMobile.textContent]()
    mobileMenuContainer.classList.add('inactive')
})

closeCategoriesListMobile.addEventListener('click', ()=>{
    hideCategories()
})

//Navigatiobn URL

const navigatorHash = {
    '#home': () => {
        inicioButton.checked = true
        inicioButtonMobile.checked = true
        sectionNavigator.classList.add('inactive')
        getMoviesPreview({
            address: 'trending/movie/day?language=es', 
    });
    
    },
    '#popular': ()=> {
        pupularButton.checked = true
        trendingButtonMobile.checked = true
        sectionNavigator.classList.add('inactive')
        getMoviesPreview({
            address: 'movie/popular?language=es-US&page=1',
        })
    },
    '#cartelera': ()=> {
        carteleraButton.checked = true
        carteleraButtonMobile.checked = true
        sectionNavigator.classList.add('inactive')
        getMoviesPreview({
            address: 'movie/now_playing?language=es-US&page=1',
        })
    },
    '#search': ()=>{
        uncheckingHomeNavigation()
        getMoviesPreview({
            address: 'search/movie',
            query: getnavigationInfo()[2],
        })
    },
    '#category': ()=>{
        uncheckingHomeNavigation()
        getMoviesPreview({
            address: 'discover/movie',
            id: getnavigationInfo()[1],
        })
    }
}

function navigatore() {
    navigatorHash[getnavigationInfo()[0]]()
}



window.addEventListener('hashchange', navigatore, false)
window.addEventListener('DOMContentLoaded', navigatore, false)



//load DOM section


