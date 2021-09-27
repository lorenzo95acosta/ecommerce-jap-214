//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var listaComentarios = [];

//Muestra la informacion del JSON (imagenes, puntuacion)
function mostrarInfoProducto(producto) {
    let infoProducto = ``;
    infoProducto += ``;
    infoProducto += crearTitulo(producto);
    infoProducto += crearCarrusel(producto);
    let contenedor = document.getElementById('info-producto');
    contenedor.innerHTML += infoProducto;
}

//Crea el carrusel de imagenes para agregar a la info del producto
function crearCarrusel() {
    let carrusel = ``;
    carrusel += `
    <div  class="container  containerProduct" id="containerProducto" style="width: 50%;">
        <div id="imagenesProductos">
          <!--Acá se muestran las imagenes, se usa carousel de Boostrap-->
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner">
              <div class=".col-4	.col-sm-4	.col-md-4	.col-lg-4	.col-xl-4 carousel-item active">
                <img src="img/prod1_1.jpg" class="d-block w-100">
              </div>
              <div class=".col-4	.col-sm-4	.col-md-4	.col-lg-4	.col-xl-4 carousel-item">
                <img src="img/prod1_2.jpg" class="d-block w-100">
              </div>
              <div class=".col-4	.col-sm-4	.col-md-4	.col-lg-4	.col-xl-4 carousel-item">
                <img src="img/prod1_3.jpg" class="d-block w-100">
              </div>
              <div class=".col-4	.col-sm-4	.col-md-4	.col-lg-4	.col-xl-4 carousel-item">
                <img src="img/prod1_4.jpg" class="d-block w-100">
              </div>
            </div>
            <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Siguiente</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Anterior</span>
            </a>
          </div>
        </div>
      </div>
    `;
    return carrusel;
}

//Crea el titulo de la info del producto.
function crearTitulo(producto) {
    let titulo = `
    <div class="text-center p-4">
        <h2 id="nombrProducto">${producto.name}</h2>
    </div>
    `;
    return titulo
}

//Crea la descripcion del producto
function crearDescripcion(producto) {
    let descripcion = `
    <div class="text-center p-4">
        <p>${producto.description}</p>
    </div>
    `;
    return descripcion
}

//Funcion utilizada para obtener el promedio de las puntiuaciones en los comentarios
function puntuacionPromedio(comentarios) {
    let suma = 0;
    let contador = 0;
    if (comentarios.lenght != 0) {
        for (let comentario of comentarios) {
            suma += comentario.parseInt(score);
            contador++;
        }
    }
    return suma / contador;
}

//Muncion para agregar las estrellas a los comentarios (crea el HTML correspondiente)
function puntuacionHtml(puntuacion) {
    let string = ``;
    string += `<div class="container">`;
    if (puntuacion > 0 && puntuacion <= 5) {
        for (let i = puntuacion; i > 0; i--) {
            string += `<span class="fa fa-star checked"></span>`;
        }
        for (let j = 5 - puntuacion; j > 0; j--)
            string += ` <span class="fa fa-star"></span>`
    }
    string += `</div>`;
    return string;
}

//Muestra lo relacionado a los comentarios del producto (puntuacion y opinion del usuario)
function mostrarComentario(comentarios) {
    let comentarioHtml = ``;
    for (let comentario of comentarios) {
        comentarioHtml += `
        <div class="container  containerProduct">`;
        comentarioHtml += puntuacionHtml(comentario.score);
        comentarioHtml += `<p>${comentario.dateTime}</p>`;
        comentarioHtml += `
        <div>
            <p>${comentario.user}</p>
            <p>${comentario.description}</p>
            </div>
        </div>
        `
    };
    let contenedor = document.getElementById('comentario');
    contenedor.innerHTML += comentarioHtml;
}


//Obtengo los datos del comentario, para agregarlo a mi lista de comentarios existentes
function recibirComentario() {
    let date = new Date();
    let formatDate = date.getDate().toString().padStart(2, '0') + "-" + (date.getMonth() + 1).toString().padStart(2, '0') + "-" + date.getFullYear().toString() + "  " + date.getHours().toString() + ":" + date.getMinutes().toString() + ":" + date.getSeconds().toString();
    let descripcion = document.getElementById("texto-comentario").value;
    let puntuacion = document.getElementById("puntuacion").value;
    let usuario = localStorage.getItem("usuario");

    let comentarioHtml = ``;
    comentarioHtml += `<div class="container  containerProduct">`;
    comentarioHtml += puntuacionHtml(puntuacion);
    comentarioHtml += `
    <p>`+ formatDate + `</p>
    <div>
        <p>`+ usuario + `</p>
        <p>`+ descripcion + `</p>
        </div>
    </div>
    `
    let contenedor = document.getElementById('comentario-reciente');
    contenedor.innerHTML += comentarioHtml;
    document.getElementById("caja-comentarios").reset()
}

//Agrega la informacion de los productos relacionados de cada producto
function relatedProducts(producto, listaProductos){
    let contenedor = document.getElementById('productos-relacionados');
    let string = ``;
    for(let i =0; i < producto.relatedProducts.length ; i++){
        string += `
        <div class="card col-md-4">
        <img src="`+ listaProductos[producto.relatedProducts[i]].imgSrc +`" class="bd-placeholder-img card-img-top">
        <div class="card-body">
            <hr>
            <h4 class="card-text">`+ listaProductos[producto.relatedProducts[i]].name +`</h4>
            <p class="card-text">`+ listaProductos[producto.relatedProducts[i]].description+`</p>
            <a href="#" class="btn btn-secondary btn-lg btn-block">Ir al producto</a>
        </div>
        </div>
        `;
    }
    contenedor.innerHTML += string;
}

//Espacio donde se agregan los event listener's y se usan las funciones
document.addEventListener("DOMContentLoaded", function (e) {
    document.getElementById("comentar").addEventListener("click", function (event) {
        recibirComentario();
    })

    getJSONData(PRODUCT_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            //Muestro la info del producto
            let producto = resultObj.data;
            mostrarInfoProducto(producto);

            //Muestro los productos relacionados
            getJSONData(PRODUCTS_URL).then(function (resultObj) {
                if (resultObj.status === "ok") {
                    relatedProducts(producto, resultObj.data);
                }
            })
        }
    })

    getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            //Muestro los comentarios
            mostrarComentario(resultObj.data);
        }
    })
});