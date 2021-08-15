//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

var currentProductsArray = [];

//Funcion para listar los productos
function listaProductos(lista){

    let htmlContentToAppend = "";
    for(let productos in lista){
            htmlContentToAppend += `
            <a href="product-info.html" class="list-group-item list-group-item-action">
                <div class="row">
                    <div class="col-3">
                        <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
                    </div>
                    <div class="col">
                        <div class="d-flex w-100 justify-content-between">
                            <h4 class="mb-1">`+ productos.name +`</h4>
                            <small class="text-muted">Ya se vendieron ` + productos.soldCount + ` iguales.</small>
                        </div>
                        <p class="mb-1">` + productos.description + `</p>
                    </div>
                </div>
            </a>
            `
        }

    document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
}

document.addEventListener("DOMContentLoaded", function (e) {
        //Obtengo la info y la despliego <=> todo está bien
        getJSONData(PRODUCTS_URL).then(function(resultObj){
                if(resultObj.status === "ok"){
                    //Muestro los productos
                    listaProductos(resultObj.data);
                }
        });
});