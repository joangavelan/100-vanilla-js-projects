const formEl = document.querySelector('form');
const inputEl = document.querySelector('.input');
const errorMessageEl = document.querySelector('.error-message');
const lastMessageEl = document.querySelector('.last-message');

formEl.addEventListener('submit', event => {
    //prevent default browser functionality
    event.preventDefault();
    //if there's data inside the input replace the last message value
    if(inputEl.value) {
        lastMessageEl.textContent = inputEl.value;
        inputEl.value = '';
    }
    //if there's no data in the input display error message and remove it after 2 seconds
    else {
        errorMessageEl.classList.add('display');
        setTimeout(() => {
            errorMessageEl.classList.remove('display');       
        }, 2000);
    }
})