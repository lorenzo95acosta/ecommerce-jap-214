//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productCost = 0;
let productCount = 0;
let porcentajeEnvio = 0.05;
let mensaje = ``;

//Funcion de Bootsrap para las validaciones
(function () {
    'use strict';
    window.addEventListener('load', function () {
        // Fetch all the forms we want to apply custom Bootstrap validation styles to
        var forms = document.getElementsByClassName('needs-validation');
        // Loop over them and prevent submission
        var validation = Array.prototype.filter.call(forms, function (form) {
            form.addEventListener('submit', function (event) {
                if (form.checkValidity() === false) {
                    event.preventDefault();
                    event.stopPropagation();
                }
                form.classList.add('was-validated');
            }, false);
        });
    }, false);
})();

//Creo un array de productos, por si recibo más de un artículo para mostrar
let productosCarrito = [];

//Funcion que agrega el HTML necesario para mostrar el producto en la tabla
function mostrarCarrito() {
    let htmlToAppend = "";
    for (let i = 0; i < productosCarrito.length; i++) {

        htmlToAppend += `
        <tr >
        <td><img src="${productosCarrito[i].src}" class = "img-fluid" style ="max-width:50px!important"></td>
        <td class="align-middle">${productosCarrito[i].name}</td>
        <td class="align-middle">${productosCarrito[i].currency} ${productosCarrito[i].unitCost}</td>
        <td class="align-middle"><input id="${i}" type="number" min ="1" value=${productosCarrito[i].count} class="cantidad"
            onChange="agregarPtf(this.value, ${productosCarrito[i].unitCost}, ${i}); totalCarrito(0.9);";
            data-name = "${productosCarrito[i].name}"
            data-precio = "${productosCarrito[i].unitCost}"
            data-moneda = "${productosCarrito[i].currency}"
        ></td>
        <td id="precio${i}" class="subtotal  align-middle"></td>
        </tr>`
    }
    document.getElementById("carrito").innerHTML = htmlToAppend;
    // actualizarSubtotales();
}


//Funcion que me  me calculo el P.T.F, ya convertido a pesos y  lo agrega a su lugar correspondiente en la tabla
function agregarPtf(cantidad, unitCost, id) {
    let ptf = unitCost * cantidad;
    let moneda = document.getElementById(id);
    if (moneda.data - moneda === "USD") {
        ptf * 40;
    }
    let subtotal = document.getElementById("precio" + id);
    subtotal.innerHTML = ptf;
}

// function actualizarSubtotales(){
//     let inputs = document.getElementsByClassName("cantidad");
//     for(let input of inputs){
//         input.addEventListener("change", (e)=>{
//             //Obtengo informacion del producto al que le cambio la cantidad
//             let precio = parseFloat(e.target.dataset.precio);
//             let moneda = e.target.dataset.moneda;
//             let  cantidad = parseInt(e.target.value);
//             //Calculo el precio total final
//             let ptf = precioProducto(moneda, precio, cantidad);
//             let id = e.target.getAttribute("id");
//             //Muestro el precio total final de cada producto
//             agregarPtf(ptf, id);
//         })
//     }
// }

//Funcion que calcula el total de la compra
function totalCarrito(porcentaje) {
    let suma = 0
    let subtotal = document.getElementsByClassName("subtotal");
    for (let valor of subtotal) {
        suma += parseInt(valor.innerHTML);
    }
    envio = suma * porcentaje;
    precio = suma + envio;

    let total = document.getElementById('totalCarrito');
    total.innerHTML = suma;
}

function precioConEnvio() {
    let total = document.getElementById("totalCarrito");
    let envio = document.getElementById("envioCarrito");
    let precio = document.getElementById("precioCarrito");

    let comissionToShow = Math.round(parseInt(total.innerHTML) * porcentajeEnvio);
    let totalCostToShow = comissionToShow + parseInt(total.innerHTML);

    envio.innerHTML = comissionToShow;
    precio.innerHTML = totalCostToShow;
}

function mensajeCompraExitosa(){
        let cuerpo = document.body;
        html = `
        <div class="alert alert-success alert-dismissible fade show" role="alert">
        <strong>${mensaje}</strong>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `;
        cuerpo.innerHTML += html;
}


document.addEventListener("DOMContentLoaded", function (e) {
    getJSONData(CART_INFO_URL).then(function (resultObj) {
        if (resultObj.status === "ok") {
            //Cargo en mi array de productos, los recibidos desde la peticion web
            productosCarrito = resultObj.data.articles;
            mostrarCarrito();
        }
    });
    
    getJSONData(CART_BUY_URL).then(function(resultObj){
        if(resultObj.status === "ok"){
            //Traigo el mensaje de compra exitosa desde el JSON
            mensaje = resultObj.data.msg;
        }
    });

    document.getElementById("totalCarrito").addEventListener("change", function () {
        productCost = parseInt(this.innerHTML);
        updateTotalCosts();
    });

    document.getElementById("premium").addEventListener("change", function () {
        porcentajeEnvio = 0.15;
        precioConEnvio();
    });

    document.getElementById("express").addEventListener("change", function () {
        porcentajeEnvio = 0.07;
        precioConEnvio();
    });

    document.getElementById("standard").addEventListener("change", function () {
        porcentajeEnvio = 0.05;
        precioConEnvio();
    });

});