import Products from './products.js';

const searchInput = document.querySelector('#search');
const galleryEl = document.querySelector('.gallery');

const renderItems = (value = Products) => {
    let markup = '';
    value.forEach(product => {
        markup += `
          <li class="product">
            <img class="product__image" src="images/${product.imageUrl}.jpg">
            <div class="product__data">
            <h3 class="product__name">${product.name}</h3>
            <span class="product__price">$${product.price}</span>
            </div>
          </li> 
        `;
    });
    galleryEl.innerHTML = markup;
}

const filterItems = searchQuery => {
    renderItems(Products.filter(product => {
        const value = searchQuery.toLowerCase();
        return product.price.toString().includes(value) || product.name.toLowerCase().includes(value) || product.category.toLowerCase().includes(value);
    }))
}

searchInput.addEventListener('input', event => {
    let searchValue = event.target.value;
    
    if(searchValue.trim().length > 0) {
        searchValue = searchValue.trim().toLowerCase();
        filterItems(searchValue);
    } 
    else {
        renderItems();
    }
})

renderItems();