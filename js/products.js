//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
var currentProductsArray = [];
const ORDER_ASC_BY_PRICE = "A>B";
const ORDER_DESC_BY_PRICE =  "A<B";
const ORDER_DESC_BY_RELEVANCE = "-R";
var minCount = undefined;
var maxCount = undefined;

//Funcion que ordena los productos
function sortProducts(criterio, lista){
let result = [];
 //Segun precio
if (criterio === ORDER_DESC_BY_PRICE)
{
    result = lista.sort(function(a, b) {
        if ( a.cost < b.cost ){ return -1; }
        if ( a.cost > b.cost ){ return 1; }
        return 0;
    });
}else if (criterio === ORDER_ASC_BY_PRICE){
    result = lista.sort(function(a, b) {
        if ( a.cost > b.cost ){ return -1; }
        if ( a.cost < b.cost ){ return 1; }
        return 0;
    });
//Segun relevancia
}else if (criterio === ORDER_DESC_BY_RELEVANCE){
    result = lista.sort(function(a, b) {
        let aCount = parseInt(a.soldCount);
        let bCount = parseInt(b.soldCount);

        if ( aCount > bCount ){ return -1; }
        if ( aCount < bCount ){ return 1; }
        return 0;
    });
}

return result;
}

//Funcion para listar los productos

//Funcion antigua
// function listaProductos(lista){
//     let htmlContentToAppend = "";
//     for(let productos of lista){
//             htmlContentToAppend += `
//             <a href="product-info.html" class="list-group-item list-group-item-action">
//                 <div class="row">
//                     <div class="col-3">
//                         <img src="` + productos.imgSrc + `" alt="` + productos.description + `" class="img-thumbnail">
//                     </div>
//                     <div class="col">
//                         <div class="d-flex w-100 justify-content-between">
//                             <h4 class="mb-1">`+ productos.name +`</h4>
//                             <small class="text-muted">Ya se vendieron ` + productos.soldCount + ` iguales.</small>
//                         </div>
//                         <p class="mb-1">` + productos.description + `</p>
//                         <br>
//                         <h4 class="mb-1" style="text-align:right">`+ productos.currency + productos.cost  +`</h4>
//                     </div>
//                 </div>
//             </a>
//             `
//         }

//     document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
// }



function listaProductos(){
    let htmlContentToAppend = "";
    for(let i = 0; i < currentProductsArray.length; i++){
        let productos = currentProductsArray[i];

        if (((minCount == undefined) || (minCount != undefined && parseInt(productos.cost) >= minCount)) &&
            ((maxCount == undefined) || (maxCount != undefined && parseInt(productos.cost) <= maxCount))){

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
                    <br>
                    <h4 class="mb-1" style="text-align:right">`+ productos.currency + productos.cost  +`</h4>
                </div>
            </div>
        </a>
            `
        }

        document.getElementById("product-list-container").innerHTML = htmlContentToAppend;
    }
}





function sortAndShowProducts(criterio, lista){
    if(lista != undefined){
        currentProductsArray = lista;
    }
    currentProductsArray = sortProducts(criterio, currentProductsArray);
    //Muestro las categorías ordenadas
    listaProductos();
}

document.addEventListener("DOMContentLoaded", function (e){
        //Obtengo la info y la despliego <=> todo está bien, ordenada por el precio de forma ascendente
        getJSONData(PRODUCTS_URL).then(function(resultObj){
                if(resultObj.status === "ok"){
                    //Muestro los productos
                    sortAndShowProducts(ORDER_ASC_BY_PRICE, resultObj.data);
                }
        });

        //Se agregan los botones para elegir el tipo de orden
        document.getElementById("sortAscPrice").addEventListener("click", function(){
            sortAndShowProducts(ORDER_ASC_BY_PRICE);
        });
    
        document.getElementById("sortDescPrice").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_PRICE);
        });
    
        document.getElementById("sortByRelevance").addEventListener("click", function(){
            sortAndShowProducts(ORDER_DESC_BY_RELEVANCE);
        });
        // //Se agrega el filtro segun el precio
        document.getElementById("clearPriceFilter").addEventListener("click", function(){
            document.getElementById("priceFilterCountMin").value = "";
            document.getElementById("priceFilterCountMax").value = "";
    
            minCount = undefined;
            maxCount = undefined;
    
            listaProductos();
        });
    
        document.getElementById("priceFilterCount").addEventListener("click", function(){
            //Obtengo el mínimo y máximo de los intervalos para filtrar por precio
            minCount = document.getElementById("priceFilterCountMin").value;
            maxCount = document.getElementById("priceFilterCountMax").value;
    
            if ((minCount != undefined) && (minCount != "") && (parseInt(minCount)) >= 0){
                minCount = parseInt(minCount);
            }
            else{
                minCount = undefined;
            }
    
            if ((maxCount != undefined) && (maxCount != "") && (parseInt(maxCount)) >= 0){
                maxCount = parseInt(maxCount);
            }
            else{
                maxCount = undefined;
            }
    
            listaProductos();
        });


});