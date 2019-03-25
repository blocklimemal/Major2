const backdrop = document.querySelector('.backdrop');
const sideDrawer = document.querySelector('.mobile-nav');
const menuToggle = document.querySelector('#side-menu-toggle');

var slide_index = 1;
function backdropClickHandler() {
  backdrop.style.display = 'none';
  sideDrawer.classList.remove('open');
}

function menuToggleClickHandler() {
  backdrop.style.display = 'block';
  sideDrawer.classList.add('open');
}
function nextSlide(n) {  
            displaySlides(slide_index += n);  
        }  
        function currentSlide(n) {  
            displaySlides(slide_index = n);  
        }  

function displaySlides(n){

  var i;  
  var slides = document.getElementsByClassName("showSlide");  
  if (n > slides.length) { slide_index = 1 }  
  if (n < 1) { slide_index = slides.length }  
  for (i = 0; i < slides.length; i++) {  
        slides[i].style.display = "none";  
       }  
    slides[slide_index - 1].style.display = "block";  

}

displaySlides(slide_index);

backdrop.addEventListener('click', backdropClickHandler);
menuToggle.addEventListener('click', menuToggleClickHandler);
