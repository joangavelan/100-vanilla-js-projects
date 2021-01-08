const hexEl = document.querySelector('#hex-value');
const button = document.querySelector('button');
const body = document.querySelector('body');
const hexValues = [0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F']

const renderHexValue = () => {
    let hexValue = '#';
    
    for(let i = 0; i < 6 ; i++) {
        const index = Math.floor(Math.random() * hexValues.length);
        hexValue += hexValues[index];
    }
    
    hexEl.textContent = hexValue;
    body.style.backgroundColor = hexValue;
}

button.addEventListener('click', renderHexValue);