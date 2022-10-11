const { src, dest, watch, parallel} = require("gulp");

//CSS
const sass = require("gulp-sass")(require("sass"));
const plumber = require('gulp-plumber');

//Imagenes
const cache = require('gulp-cache');
const imagemin = require('gulp-imagemin');
const webp = require('gulp-webp');
const avif = require('gulp-avif');

//Funciones
function css(done) {    //*Funcion que permite compilar y guardar 
    
    src("src/scss/**/*.scss")//Identifica todos los archivos en la carpeta
        .pipe( plumber())   //Permite visualizar un error sin cortar el workflow y poder seguir compilando
        .pipe( sass() )     //Compilar
        .pipe( dest("build/css")) //Almacenarla en destino 

    done(); //Callback que avisa a gulp cuando llegamos al final
}

function imagenes(done) {
    const opciones = {
        optimizationLevel: 3    //Opciones que viene en la libreria para optimizar con imagemin
    };
    src('src/img/**/*.{png,jpg}')
        .pipe( cache ( imagemin(opciones) ) )
        .pipe( dest('build/img') )
    done();
}
function versionWebp( done ) {  
    const opciones = {
        quality: 50 //Da calidad a la imagen del 1/100
    };
    src('src/img/**/*.{png,jpg}')   //Busca los archivos en destino con los formatos dentro de{}
        .pipe( webp(opciones) )
        .pipe( dest('build/img') )
    done();
}
function versionAvif( done ) {
    const opciones = {
        quality: 50 //Da calidad a la imagen del 1/100
    };
    src('src/img/**/*.{png,jpg}')   //Busca los archivos en destino con los formatos dentro de{}
        .pipe( avif(opciones) )
        .pipe( dest('build/img') )
    done();
}

function javascript( done ) {
    src('src/js/**/*.js')
        .pipe(dest('build/js'));

    done();
}
// npx gulp dev ejecuta plumber y el watch sass, busca y compila en toda la carpeta src
function dev(done) { //*Funcion que permite mirar cambios y guardarlos
    watch("src/scss/**/*.scss", css)        //Llama funcion css
    watch("src/js/**/*.js", javascript);    //Llama funcion javascript 
    //Identifica el archivo a mirar, y luego llama la funcion css.

    done();
}

exports.css = css;
exports.js = javascript;
exports.imagenes = imagenes;
exports.versionWebp = versionWebp;
exports.versionAvif = versionAvif;
exports.dev = parallel( imagenes, versionWebp, versionAvif, javascript, dev);  //Ejecuta en paralelo las funciones indicadas