import Quotes from "./quotes.js";

//DOM
const buttonEl = document.querySelector('button');
const quoteEl = document.querySelector('.quote');
const authorEl = document.querySelector('.author');

buttonEl.addEventListener('click', () => {
    const ranIndex = Math.floor(Math.random() * Quotes.length);
    const selectedQuote = Quotes[ranIndex];

    quoteEl.textContent = selectedQuote.quote;
    authorEl.textContent = selectedQuote.author;
})