const App = (() => {
    const images = document.querySelectorAll('img');
    const modalEl = document.querySelector('.modal');
    const modalImageEl = document.querySelector('.modal__image');
    const sliderButtons = document.getElementsByClassName('slider-btn');
    
    const openModal = image => {
        modalEl.classList.add('active');
        modalImageEl.innerHTML = image;
    }

    const closeModal = () => {
        const closingClasses = ['modal', 'close'];
        window.addEventListener('click', event => {
            if(closingClasses.some(closingClass => event.target.classList.contains(closingClass))) {
                modalEl.classList.remove('active')
            }
        })
    }

    const slider = index => {
        for(let sliderButton of sliderButtons) {
            sliderButton.addEventListener('click', () => {
                if(sliderButton.classList.contains('next')) {
                    index < (images.length - 1) ? index++ : index = 0;
                }
                if(sliderButton.classList.contains('previous')) {
                    index > 0 ? index-- : index = (images.length - 1);
                }
            modalImageEl.innerHTML = images[index].outerHTML;
            })
        }
    }

    const carousel = () => {
        images.forEach((image, index) => {
            image.addEventListener('click', function() {
                const clickedImage = this.outerHTML; 
                openModal(clickedImage);
                slider(index);
                closeModal();
            })
        })
    }
    
    const listeners = () => {
    window.addEventListener('keydown', event => {
            if(event.keyCode === 27) modalEl.classList.remove('active');
        })
    }

    
    return {
        carousel,
        listeners
    }
})();

App.carousel();
App.listeners();