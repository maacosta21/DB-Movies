const desktopMenu = document.querySelector('.desktop-menu')
const UserMenu = document.querySelector('.navbar-email-address')
const mobileMenu = document.querySelector('.mobile-menu')
const UserMenuMobile = document.querySelector('.menu')
const js1 = document.querySelector('#js1')
const js2 = document.querySelector('#js2')
const toggleThemeMobile = document.querySelector('.toggle-theme-mobile')
let themeAdvisor
let themeAdvisorMobile
const body = document.querySelector('body')
const myOrder = document.querySelector('.my-order')
const shoppingCart = document.querySelector('.Navbar-shppingcar')
const btoDeleteItem = document.querySelector('.delete-item')
const shoppingcartItem = document.querySelector('.shopping-cart')
const cardsContainer = document.querySelector('.cards-container')

console.log({location})


//Toggle-DesktopMenu
UserMenu.addEventListener('click', (event)=>{
   event.preventDefault()
   desktopMenu.classList.toggle('inactive')
   myOrder.classList.add('inactive')
})

//toggle-MobileMenu
UserMenuMobile.addEventListener('click', ()=>{
   mobileMenu.classList.toggle('inactive')
   myOrder.classList.add('inactive')
})

//toggle-Theme
const localStorageTheme = localStorage.getItem('Black-theme')

js1.addEventListener('click', turntheme)
js2.addEventListener('click', turntheme)

function turntheme(e){
   
   e.preventDefault()
   body.classList.toggle('blacktheme')
   myOrder.classList.toggle('blackthemeMenus')
   desktopMenu.classList.toggle('blackthemeMenus')
   mobileMenu.classList.toggle('blacktheme')

   if(body.classList.contains('blacktheme')){
      toggleThemeON(true)
   } else{
      toggleThemeON(false) 
   }
   

   const currentTheme = body.classList.contains('blacktheme') ? true : false
   localStorage.setItem('Black-theme', currentTheme)
}

if(localStorageTheme === 'true'){
   toggleThemeON(true)
   body.classList.add('blacktheme')
   myOrder.classList.add('blackthemeMenus')
   desktopMenu.classList.add('blackthemeMenus')
   mobileMenu.classList.add('blacktheme')
   
}else{
   toggleThemeON(false)
}

function toggleThemeON(method) {
   js1.checked = method
   js2.checked = method
   themeAdvisor = method
   themeAdvisorMobile = method
}

//Toggle Order with Shopping car

shoppingCart.addEventListener('click', (event)=>{
   event.preventDefault()
   myOrder.classList.toggle('inactive')
   desktopMenu.classList.add('inactive')
   mobileMenu.classList.add('inactive')
   productDetailContainer.classList.add('inactive')
})

//shoppingcar listeners

myOrder.addEventListener('click', (event) => {
   if(event.target.classList.contains('delete-item')){
      deleteItems(event, '.shopping-cart')
   } else if(event.target.classList.contains('closeCart')){
      myOrder.classList.add('inactive')
   }
})

function deleteItems(event, domElement) {
   event.target.closest(domElement).remove()
}

//Create Products API (Demo)

function ProductBuilder(products){
   products.forEach(product => {
      const divContainer = document.createElement('div')
      divContainer.classList.add('Product-card')
   
      const productImg = document.createElement('img')
      productImg.setAttribute('src', product.image)

      const divProductInfo = document.createElement('div')
      divProductInfo.classList.add('product-info')
   
      const divInfo = document.createElement('div')
   
      const productPrice = document.createElement('p')
      productPrice.textContent = '$ ' +product.price
   
      const productName = document.createElement('p')
      productName.classList.add('product-name')
      productName.textContent = product.title
   
      const ProductFigureContainer = document.createElement('figure')
   
      const imgIcon = document.createElement('img')
      imgIcon.setAttribute('src', './icons/bt_add_to_cart.svg')
   
      divContainer.appendChild(productImg)
      divProductInfo.appendChild(divInfo)
      divInfo.appendChild(productPrice)
      divInfo.appendChild(productName)
      divContainer.appendChild(divProductInfo)
      divProductInfo.appendChild(ProductFigureContainer)
      ProductFigureContainer.appendChild(imgIcon)
      cardsContainer.appendChild(divContainer)

   })
}

const API = 'https://fakestoreapi.com/products'

async function fetchData(urlAPI) {
   const response = await fetch(urlAPI)
   const data = await response.json()
   return data
}

const loadAPi = async (urlAPI) => {
   try{
      const data = await fetchData(urlAPI)
      ProductBuilder(data)
   }catch{
      console.error(error)
   }
}
loadAPi(API)

//Aside product details
const productDetailContainer = document.querySelector('.product-detail')

function createAside(objetcProductAsisde) {
   productDetailContainer.innerHTML = `
   <div class="close-picture">
              <img class = 'closeAside' src="./icons/icon_close.png" alt="">
          </div>
          
          <img class="product-picture" src=${objetcProductAsisde.image} alt="">
          <div class="product-info-detail">
              <p>$35,00</p>
              <p>Bike</p>
              <p>with its practical bike, you will have confort, security and the option to move safety through the city, please add to cart for more datils.</p>
              <button class="primary-button add-to-cart">
                  <img src="./icons/bt_add_to_cart.svg" alt="">
                  Add to cart
              </button>
          </div>
  `
  productDetailContainer.classList.remove('inactive')
  myOrder.classList.add('inactive')
  
  productDetailContainer.addEventListener('click', (event) => {
    
      if(event.target.classList.contains('closeAside')){
        productDetailContainer.classList.add('inactive')
      }
        
  }) 
}

cardsContainer.addEventListener('click', (event) =>{
   const loadAside = async (urlAPI) => {
      try{
         const data = await fetchData(urlAPI)
         let productAside = data.find(product => product.image === event.target.src)
         createAside(productAside)
      }catch{
         console.error(error);
      }
   }
   loadAside (API)
})