const personaPictureEl = document.querySelector('.persona-picture');
const personaNameEL = document.querySelector('.persona-name');
const personaPositionEl = document.querySelector('.persona-position');
const testimonialEl = document.querySelector('.testimonial');
const sliderButtons = document.getElementsByClassName('slider-btn');

//function to clean the full name and generate url
//removed accents, replaced spaces with hyphens and made the string lowercase
const setUrl = str => str.normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(' ', '-').toLowerCase();

//testimonial function constructor
function Testimonial(firstName, lastName, position, description) {
    this.fullName = `${firstName} ${lastName}`, 
    this.position = position,
    this.description = description,
    this.pictureUrl = setUrl(this.fullName);
}

//creating testimonials (instantiation)
const testimonial1 = new Testimonial(
    'Davis', 
    'Wilson', 
    'Backend Engineer',
    'Lorem ipsum dolor, sit amet consectetur adipisicing elit. Exercitationem ut laudantium vitae porro, natus impedit aut. Hic suscipit modi incidunt architecto, earum deleniti officiis sapiente esse voluptas nihil optio nemo?'
    );

const testimonial2 = new Testimonial(
    'Leyla', 
    'Adams', 
    'Sales Assistant',
    'Donec nulla turpis, tincidunt vitae maximus vitae, hendrerit at eros. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos.'
    );

const testimonial3 = new Testimonial(
    'Sofía', 
    'Miller', 
    'HR Recruiter',
    'Aliquam augue est, dictum vel neque pellentesque, dictum accumsan tellus. Cras vitae ante nisl. Nam elit orci, mattis eget commodo in, euismod eu nisi.'
    );

//placing the testimonials in an array
const testimonials = [testimonial1, testimonial2, testimonial3];

//starting index
let currentIndex = 0;
//iterate to add events to buttons
for(let sliderButton of sliderButtons) {
    sliderButton.addEventListener('click', () => {
        //I increase the index only if it is less than the number of elements in the array, otherwise I convert it to 0 (to start from the first element of the array again)
        if(sliderButton.classList.contains('next')) {
            currentIndex < (testimonials.length - 1) ? currentIndex ++ : currentIndex = 0;
        }
        //I decrement the index only if it is greater than the number 0 (lowest possible index of an array), otherwise I convert it to the number of elements in the array (to jump to the last element)
        if(sliderButton.classList.contains('previous')) {
            currentIndex > 0 ? currentIndex-- : currentIndex = (testimonials.length - 1);
        }
        //current testimonial
        const testimonial = testimonials[currentIndex];
        //replacing content
        personaPictureEl.src = `images/${testimonial.pictureUrl}.jpg`;
        personaNameEL.textContent = testimonial.fullName;
        personaPositionEl.textContent = testimonial.position;
        testimonialEl.textContent = testimonial.description;
    })
}