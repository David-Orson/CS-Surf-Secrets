const navbarBtn = document.querySelector('#hamburger');
const navbarLinks = document.querySelector('ul');


navbarBtn.addEventListener('click', function(){
    let value = navbarLinks.classList.contains('ul__collapse');
    if(value){
        navbarLinks.classList.remove('ul__collapse');
    } else {
        navbarLinks.classList.add('ul__collapse');
    }
})