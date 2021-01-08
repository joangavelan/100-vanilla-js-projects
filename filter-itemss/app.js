import Products from './products.js';

const searchInput = document.querySelector('#search');
const galleryEl = document.querySelector('.gallery');
const categoryLinks = document.getElementsByClassName('category-link');

const renderAllItems = (value = Products) => {
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

//helper function to refine strings
const clean = str => str.trim().toLowerCase();

//function that filters items by passed value
const filterItems = value => {
    renderAllItems(Products.filter(product => {
        value = clean(value);
        return product.price.toString().includes(value) || product.category.toLowerCase().includes(value) || product.name.toLowerCase().includes(value);
    }))
}

//filter items by search query
searchInput.addEventListener('input', event => {
    let searchQuery = clean(event.target.value);
    searchQuery ? filterItems(searchQuery) : renderAllItems();
})

//filter items by category links
for(let link of categoryLinks) {
    link.addEventListener('click', function() {
        const category = this.getAttribute('href').substring(1);
        category === 'all' ? renderAllItems() : filterItems(category);
    })
}

//initial render
renderAllItems();