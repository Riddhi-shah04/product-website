//header 
const header = document.querySelector('.fixed-header');

window.addEventListener('scroll', () => {
    if (window.scrollY > 100) {
        header.classList.add('active-header');
      } 
      else{
        header.classList.remove('active-header');
    }
});



// floating button scroll to top
const floatingButton = document.getElementById('scroll-btn');

floatingButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
 });

window.addEventListener('scroll', () =>{
    if(window.scrollY > 400){
        floatingButton.style.opacity = "1";
        if(window.scrollY > 3300) {
          floatingButton.style.bottom = "140px";
        }
        else{
          floatingButton.style.bottom = "30px";
        }
    } else{
        floatingButton.style.opacity = "0";
    }
});


// smooth scrolling to specific section
const links = document.querySelectorAll(".menu a");
for (const link of links) {
  link.addEventListener("click", clickHandler);
}
function clickHandler(e) {
  e.preventDefault();
  const href = this.getAttribute("href");
  document.querySelector(href).scrollIntoView({
    behavior: "smooth"
  });
}

// toggle menu sidebar
const openBtn = document.querySelector('.toggle-menu');
const closeBtn = document.querySelector('.toggle-close');
const sidebar = document.querySelector('.sidebar');


openBtn.addEventListener('click', function() {
  sidebar.style.right = "0";
})
closeBtn.addEventListener('click', function() {
  sidebar.style.right = "-300px";
})

// floating label
const inputs = document.querySelectorAll('.input-field');
const labels = document.querySelectorAll('.form-group label');

// Attach focus and blur event listeners to each input
inputs.forEach((input, index) => {
  input.addEventListener('focus', () => {
    labels[index].classList.add('active-label');
  });

  input.addEventListener('blur', () => {
    if (input.value === '') {
      labels[index].classList.remove('active-label');
    }
  });
});
