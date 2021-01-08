const button = document.querySelector('button');
const body = document.querySelector('body');
const colors = ['red', 'green', 'blue', 'yellow', 'pink', 'purple']

const randomColor = _ => colors[Math.floor(Math.random() * colors.length)];

button.addEventListener('click', () => 
    body.style.backgroundColor = randomColor()
);