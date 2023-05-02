document.addEventListener('DOMContentLoaded', function() { 
    //El método addEventlistener, es un escuchador que indica al navegador que este atento a la interacción del usuario. La ventaja es que se escribe totalmente en el JS, sin necesidad de tocar el HTML.
    //DOMContentLoaded – el navegador HTML está completamente cargado y el árbol DOM está construido, pero es posible que los recursos externos como <img> y hojas de estilo aún no se hayan cargado. load – no solo se cargó el HTML, sino también todos los recursos externos: imágenes, estilos, etc
    iniciarApp();   //Call 
});

function iniciarApp() { //Crea
    navegacionFija();
    crearGaleria(); //Call
    scrollNav();
}
/* barra, sobreFestival tomo html. addEventListener toma el scroll, y con bounding mira el header y añade una clase para fijar la nav */
function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');

    window.addEventListener('scroll', function() {
        console.log( sobreFestival.getBoundingClientRect() );

        if ( sobreFestival.getBoundingClientRect().bottom < 0 ) {
            barra.classList.add('fijo');
        } else {
            barra.classList.remove('fijo');
        }
    });
}


/* addEventListener va dentro del forEach, para que recorra cada uno. Por que cuando se usa querySelectorAll da error, si se coloca fuera del forEach.
e.preventDefault previene el anclaje por defecto. seccionScroll busca el valor. 
seccion.scrollIntoView({behavior: "smooth"}); genera el efecto*/

function scrollNav () {
    const enlaces = document.querySelectorAll('.navegacion-principal a');

    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const seccionScroll = e.target.attributes.href.value;
            const seccion = document.querySelector(seccionScroll);
            seccion.scrollIntoView({behavior: "smooth"});

        });
    });
}

function crearGaleria() {   //Crea
    const galeria = document.querySelector('.galeria-imagenes');    //Crea variable constante y le da valor de referencia querySelector dentro del HTML para id se antepone numeral(#) y para clase se antepone punto (.).

    for(let i = 1; i <= 12; i++) {  //For que itera y recorre la cantidad de imagenes en carpeta build
        const imagen = document.createElement('picture');   //createElement() crea un elemento HTML especificado por su tagName
        imagen.innerHTML = `    
        <source srcset="build/img/thumb/${i}.avif" type="image/avif">
        <source srcset="build/img/thumb/.${i}webp" type="image/webp">
        <img loading="lazy" width="200" height="300" src="build/img/thumb/${i}.jpg" alt="imagen galeria">
        `;
        imagen.onclick = function() {
            mostrarImagen(i);
        }
        //${i} en el lugar del nombre del archivo, para que cicle "for"
        //innerHTML devuelve o establece la sintaxis HTML describiendo los descendientes del elemento. Al establecerse se reemplaza la sintaxis HTML del elemento por la nueva.
        galeria.appendChild(imagen);
    }
}
//Carga las Imagenes grandes
function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `    
    <source srcset="build/img/grande/${id}.avif" type="image/avif">
    <source srcset="build/img/grande/${id}.webp" type="image/webp">
    <img loading="lazy" width="200" height="300" src="build/img/grande/${id}.jpg" alt="imagen galeria">
    `;
//Crea el overlay con la imagen
    const overlay = document.createElement('DIV');  //Crea un DIV
    overlay.appendChild(imagen);    
    overlay.classList.add('overlay');   //Crea la clase overlay 
    overlay.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }

//Boton para cerrar el Modal de la Imagen
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    overlay.appendChild(cerrarModal);

//Funcion que permite hacer scroll y remover el overlay
    cerrarModal.onclick = function() {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');
        overlay.remove();
    }
    

    //Incorpora el overlay al HTML
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');   //Fija el body para evitar scroll
}