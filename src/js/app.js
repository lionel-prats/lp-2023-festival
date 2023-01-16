// el evento DOMContentLoad solo espera que se descargue el HTML, no espera CSS o imagenes
document.addEventListener("DOMContentLoaded", function() {
    iniciarApp();
});

function iniciarApp(){
    navegacionFija(); // manejar la posicion del nav con el scroll
    crearGaleria(); // crea el contenido de la galeria de fotos
    scrollNav(); // scrollSmooth de la navegacion
};

/* function navegacionFija() {
    const header = document.querySelector(".header");
    const sobreFestival = document.querySelector(".sobre-festival");
    const body = document.querySelector("body");

    window.addEventListener("scroll", function(){
        if(sobreFestival.getBoundingClientRect().bottom < 0){
            header.classList.add("fixed");
            body.classList.add("body-scroll");
        } else {
            header.classList.remove("fixed");
            body.classList.remove("body-scroll");
        }
    });
}; */

// alternativa de un usuario, (comentario video 206)
function navegacionFija() {
    const header = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');
    window.addEventListener('scroll', function() {
        const alturaHeader = header.offsetHeight; // alto del header en px (132 a 86 desde mq768px)
        const widthWindow = window.innerWidth; // ancho de la pantalla
        // sobreFestival.getBoundingClientRect().bottom) // distancia entre el top de la pantalla y el bottom del elemento sobreFestival    
        if( sobreFestival.getBoundingClientRect().bottom - alturaHeader < 0){
            header.classList.add('fixed');
            if(widthWindow > 768){
                body.style.paddingTop = alturaHeader + "px";
            };
        }else{
            header.classList.remove('fixed');
            body.removeAttribute("style");
        }
    });
}














































function scrollNav(){
    const enlaces = document.querySelectorAll(".navegacion-principal a");
    enlaces.forEach( enlace => {
        enlace.addEventListener("click", function(e){
            e.preventDefault();
            //obtengo el href del a cliqueado
            const seccionScroll = e.target.attributes.href.value;
            //capturo la seccion asociada al a clickeado
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({ behavior: "smooth" });
        });
    });
}

function crearGaleria() {
    const galeria = document.querySelector(".galeria-imagenes");
    for (let i = 1; i <= 12; i++) {
        const imagen = document.createElement("picture");
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.avif" type="image/avif">
            <source srcset="build/img/thumb/${i}.webp" type="image/webp">
            <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">`;
        imagen.onclick = function(){
            mostrarImagen(i);   
        }
        galeria.appendChild(imagen);
    }
};
function mostrarImagen(id){
    const imagen = document.createElement("picture");
    imagen.innerHTML = `
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">`;

    // crea el overlay con la imagen
    const overlay = document.createElement("div");
    overlay.appendChild(imagen);
    overlay.classList.add("overlay");
    overlay.onclick = function(){
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove();
    };

    // boton para cerrar el modal
    const cerrarModal = document.createElement("p");
    cerrarModal.textContent= "X";
    cerrarModal.classList.add("btn-cerrar");
    cerrarModal.onclick= function(){
        const body = document.querySelector("body");
        body.classList.remove("fijar-body");
        overlay.remove(); // remove() elimina el elemento del DOM (del documento HTML)
    }
    overlay.appendChild(cerrarModal);

    // lo añade al HTML
    const body = document.querySelector("body");
    body.appendChild(overlay);
    body.classList.add("fijar-body");
}
