const sliderButtons = document.getElementsByClassName('slider-btn')
const imageEl = document.querySelector('.image');
const imagesArr = ['laderas', 'castle', 'fantasy', 'forest', 'lake', 'ocean', 'tree', 'universe'];

let index = 0;

for(let sliderButton of sliderButtons) {
    sliderButton.addEventListener('click', () => {
        if(sliderButton.classList.contains('next')) {
            index < (imagesArr.length - 1) ? index++ : index = 0;
        } 
    
        if(sliderButton.classList.contains('previous')) {
            index > 0 ? index-- : index = (imagesArr.length - 1);
        }  
        imageEl.src = `images/${imagesArr[index]}.jpg`;
    })
}