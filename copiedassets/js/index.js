
const slideContainer = document.querySelector('.container');
const slide = document.querySelector('.slides');
const nextBtn = document.getElementById('next-btn');
const prevBtn = document.getElementById('prev-btn');
const interval = 3000;
const getSlides = () => document.querySelectorAll('.slide');

let slides = document.querySelectorAll('.slide');

let index = 1;
let slideLateral = slides[index].getBoundingClientRect().width;
console.log("slideLateral: " + slideLateral);
let slideId;
let deviceWidth = window.innerWidth;
let matchResult = window.matchMedia("(max-width: 767px)");
console.log("matchResult: " + matchResult.matches);
console.log(matchResult);



const firstClone = slides[0].cloneNode(true);
const lastClone = slides[slides.length - 1].cloneNode(true);

window.addEventListener("resize", function(event) {
  console.log(document.body.clientWidth + ' wide by ' + document.body.clientHeight+' high');
index = 0;
  moveToNextSlide();
});
//slide.style.transform = `translateX(0px)`;
firstClone.id = 'first-clone';
lastClone.id = 'last-clone';

slide.append(firstClone);
slide.prepend(lastClone);


let slideWidth = slides[index].clientWidth;

slide.style.transform = `translateX(${-slideWidth * index}px)`;

console.log(slides);

const startSlide = () => {
  slideId = setInterval(() => {
    slideWidth = slides[index].clientWidth;

    slide.style.transform = `translateX(${-slideWidth * index}px)`;

    console.log("startSlide called");
    console.log("line 36 slideWidth: " + slideWidth);
    moveToNextSlide();
  }, interval);
};



slide.addEventListener('transitionend', () => {
  slides = getSlides();
  if (slides[index].id === firstClone.id) {
    slide.style.transition = 'none';
    index = 1;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }

  if (slides[index].id === lastClone.id) {
    slide.style.transition = 'none';
    index = slides.length - 2;
    slide.style.transform = `translateX(${-slideWidth * index}px)`;
  }
  
  console.log("transitionend: " + index);
});

const moveToNextSlide = () => {
  slides = getSlides();
  if (index >= slides.length - 1) return;
  index++;

  slideWidth = slides[index].clientWidth;
  console.log(index);
  console.log("slidewidth:" + slideWidth);
  console.log("slideLateral: " + slideLateral);
  console.log("deviceWidth: " + deviceWidth);
  //slide.style.transform = `translateX(${-slideWidth * index}px)`;

  console.log("movetonextslide");

  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

const moveToPreviousSlide = () => {
  if (index <= 0) return;
  index--;
  slide.style.transition = '.7s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
};

const loadSlides = () => {
  slides = getSlides();
  //debugger;
  //index = 3;
  if (index >= slides.length - 1) return;
  index++;

  slideWidth = slides[index].clientWidth;
  console.log(index);
  console.log("slideWidth:" + slideWidth);
  console.log("deviceWidth: " + deviceWidth);
  slide.style.transition = '0s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;

  console.log("LOADED SLIDES: " + slides.length);
index--;
  slide.style.transition = '0s ease-out';
  slide.style.transform = `translateX(${-slideWidth * index}px)`;
  
};

slideContainer.addEventListener('mouseenter', () => {
  clearInterval(slideId);
});

slideContainer.addEventListener('mouseleave', startSlide);
nextBtn.addEventListener('click', moveToNextSlide);
prevBtn.addEventListener('click', moveToPreviousSlide);


loadSlides();

console.log('firstloaded');

startSlide();
