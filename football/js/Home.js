var lista = document.querySelector('nav ul');
var btn = document.querySelector('.menu-btn i');

function menuShow(){
    if (lista.classList.contains('open')) {
        lista.classList.remove('open');
    }
    else{
        lista.classList.add('open');
    }
}