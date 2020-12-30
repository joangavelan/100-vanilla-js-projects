const counterEl = document.querySelector('.counter');

let counter = 0;

const setCounterColor = () => {
    if(counter < 0) {
        counterEl.style.color = 'red';
    } else if(counter > 0) {
        counterEl.style.color = 'green';
    } else {
        counterEl.style.color = null;
    }
}

window.addEventListener('click', event => {
    if(event.target.classList.contains('add-count')) {
        counter++;
    }
    else if(event.target.classList.contains('lower-count')) {
        counter--;
    }
    counterEl.textContent = counter;
    setCounterColor();
})