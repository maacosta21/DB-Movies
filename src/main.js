//Document Class
const startToSearchNav = document.querySelector('.li-search')
const searchNavBar = document.querySelector('.Search')
const categoriesNav = document.querySelector('.Categories-Nav')
const closeIconinSearchBar = document.querySelector('.Search-close')
const movieDetailsContainer = document.querySelector('.MoviePoster-container')
const viewCategories = document.querySelector('.view-more-categories')
const categorisList = document.querySelector('.categories-list')
const movieListContainer = document.querySelector('.MoviePoster-SetList')
const navCategories = document.querySelector('.middle-nav')
const navCategoriesMobile = document.querySelector('.Categories-Nav-text-mobile')
const postersContainer = document.querySelector('.MovieposterList')
const searchInput = document.querySelector('.searchInput')
const searchMobileInput = document.querySelector('.search-mobile-input')
const searchMobileLogo = document.querySelector('.Search-Logo-mobile')
const alNavInputs = document.getElementsByName('Categories-input')
const alNavInputsMobile = document.getElementsByName('Categories-input-mobile')
const sectionNavigator = document.querySelector('.section-navigator')
const sectionInformation = document.querySelector('.section-information')
const returnNavigation = document.querySelector('.return-navigation')
const buttonPage = document.querySelector('#page-counter')

//Document ID
const inicioButton = document.getElementById('Categories-inicio')
const pupularButton = document.getElementById('Categories-trending')
const carteleraButton = document.getElementById('Categories-Cartelera')
const inicioButtonMobile = document.getElementById('Categories-inicio-mobile')
const trendingButtonMobile = document.getElementById('Categories-trending-mobile')
const carteleraButtonMobile = document.getElementById('categories-cartelera-mobile')


//Mobile menu toggle
const toggleMobileMenu = document.querySelector('.mobile-menu-logo')
const mobileMenuContainer = document.querySelector('.section-mobile-container')

toggleMobileMenu.addEventListener('click', ()=> {
    mobileMenuContainer.classList.toggle('inactive')
})

//infinite Scrolling - Current page
let pageCounter = 2




