//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
let productCost = 0;
let productCount = 0;
let porcentajeEnvio = 0.05;
let mensaje = ``;
let tipoDePago =``;


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
        <td class="align-middle"><button type="button" class="btn btn-danger" onclick="quitarProducto(${i})"> - </button></td>
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

//Calcula el precio del envió según el subtotal
function precioConEnvio() {
    let total = document.getElementById("totalCarrito");
    let envio = document.getElementById("envioCarrito");
    let precio = document.getElementById("precioCarrito");

    let comissionToShow = Math.round(parseInt(total.innerHTML) * porcentajeEnvio);
    let totalCostToShow = comissionToShow + parseInt(total.innerHTML);

    envio.innerHTML = comissionToShow;
    precio.innerHTML = totalCostToShow;
}

//Confirma la compra SII todo los campos están llenos
function mensajeCompraExitosa(){
    //Corroboro que los campos estén llenos
    let direccion = document.getElementById('direccion');
    localStorage.setItem('dir', direccion.value);
    let barrio = document.getElementById('barrio');
    let zip = document.getElementById('zip');
    let usuario = JSON.parse(localStorage.getItem("usuario-formulario"));
    let infopago = '';

    if(tipoDePago === 'Tarjeta de crédito'){
        let info1 = document.getElementById('numeroCredito');
        let info2 = document.getElementById('numeroCvCredito');
        let info3 = document.getElementById('vencimientoCredito');
        if ((info1.value != '') &&(info2.value != '') &&(info3.value != '')){infopago = ' true';}
    } else  if(tipoDePago === 'Tarjeta de débito'){
        let info1 = document.getElementById('numeroDebito');
        let info2 = document.getElementById('vencimientoDebito');
        if ((info1.value != '') &&(info2.value != '')){infopago = ' true';}
    }else  if(tipoDePago === 'Efectivo'){
        let info1 = document.getElementById('efectivo');
        if (info1.value != ''){infopago = ' true';}
    }else  if(tipoDePago === 'Transferencia Bancaria'){
        let info1 = document.getElementById('comprobanteTransferencia');
        if (info1.value != ''){infopago = ' true';}
    };

    if((direccion.value != '') && (barrio.value != '') && (zip.value != '') && (infopago != '')){
        let cuerpo = document.body;
        html = `
        <div class="alert alert-success alert-dismissible" role="alert">
        <strong>${mensaje}</strong>
        <br>
        <hr>
        <br>
        <p> El pedido se enviará a: ${direccion.value}</p>
        <p>¡${usuario.name}, muchas gracias por elegirnos!</p>
        <button type="button" class="close" data-dismiss="alert" aria-label="Close">
            <span aria-hidden="true">&times;</span>
        </button>
        </div>
        `;
        cuerpo.innerHTML += html;
    }
}

//Muestra el tipo de pago elegido
function formDePago() {
    let metodo = document.getElementById('metodoPago');
    metodo.addEventListener("change", ()=>{
        let tipo = document.getElementById('tipo');
        tipo.innerHTML = metodo.value;
    })
}

//Agrega los campos correspondientes, para obtener los datos necesarios seguún el método de pago
function datosPago(){
    let boton = document.getElementById('tipoDePago');
    boton.addEventListener("click", ()=>{
        let tipo = document.getElementById('tipo');
        tipoDePago = tipo.innerHTML;
        let formMetodo = ``;
        if(tipoDePago === 'Tarjeta de crédito'){
            //Tarjeta de credito
            formMetodo = `
            <label for="direccion">N° de tarjeta</label>
            <input type="text" class="form-control" id="numeroCredito" placeholder="1234 1234 1234 1234" required>
            <div class="valid-feedback">
            </div>
            <label for="direccion">CV</label>
            <input type="text" class="form-control" id="numeroCvCredito" placeholder="Ej: 123" required>
            <div class="valid-feedback">
            </div>
            <label for="direccion">Fecha de vencimiento</label>
            <input type="date" class="form-control" id="vencimientoCredito" required>
            <div class="valid-feedback">
            </div>
            `;
        } else if(tipoDePago === 'Tarjeta de débito'){
            //Tarjeta de debito
            formMetodo = `
            <label for="direccion">N° de tarjeta</label>
            <input type="text" class="form-control" id="numeroDebito" placeholder="Ej: 1234 1234 1234 1234" required>
            <div class="valid-feedback">
            </div>
            <label for="direccion">Fecha de vencimiento</label>
            <input type="date" class="form-control" id="vencimientoDebito" required>
            <div class="valid-feedback">
            </div>
            `;
        } else if(tipoDePago === 'Efectivo'){
            //Efectivo
            formMetodo = `
            <label for="direccion">Cantidad con la que va a pagar:</label>
            <input type="text" class="form-control" id="efectivo" placeholder="Ej: $ 1000" required>
            <div class="valid-feedback">
            </div>
            `;
        } else if (tipoDePago === 'Transferencia Bancaria'){
            //Transferencia bancaria
            formMetodo = `
            <label for="direccion">N° comprobante:</label>
            <input type="text" class="form-control" id="comprobanteTransferencia" placeholder="Ej: 123546 " required>
            <div class="valid-feedback">
            </div>
            `;
        }
        let datos = document.getElementById('datosPago');
        datos.innerHTML = formMetodo;
    })
}

//Si no se selecciona un método de pago, se le solicita uno al cliente
function existePago(){
    let boton = document.getElementById('botonComprar');
    boton.addEventListener("click", ()=>{
        let metodo = document.getElementById('tipo');
        if(metodo.innerHTML === ''){
            let cuerpo = document.body;
            html = `
            <div class="alert alert-danger alert-dismissible" role="alert">
            <strong>Debe seleccionar un método de pago</strong>
            <button type="button" class="close" data-dismiss="alert" onclick="location.reload();" aria-label="Close">
                <span aria-hidden="true">&times;</span>
            </button>
            </div>
            `;
            cuerpo.innerHTML += html;
        }
    });
}

/*****************DESAFIATE***********************/
//Quita los productos según su indice en el array de productos agregados al carrito

function quitarProducto(indice){
    let nuevalista = productosCarrito.splice(indice, 1);
    mostrarCarrito(nuevalista);
}
/*****************DESAFIATE  Entrega 8***************/
//Quita los productos según su indice en el array de productos agregados al carrito

function datosUrlPost(){
    //Obtengo los datos del formulario
    let usuario = JSON.parse(localStorage.getItem("usuario-formulario"));
    let nombre = usuario.name;
    let direccion = localStorage.getItem('dir');
    console.log(direccion);
    let telefono = usuario.contact;
    //Creo un objeto DATA con la info obtenida
    let dataUsuario = {
        name : nombre,
        address : direccion,
        contact : telefono
    }
    console.log(dataUsuario);

    fetch("http://localhost:3000/compra", {
        method : 'POST', 
        body : JSON.stringify(dataUsuario), 
        headers : {
            'Content-Type' : 'application/json'
        }
    }).then(res => res.json())
    
}




document.addEventListener("DOMContentLoaded", function (e) {
    formDePago();
    datosPago();
    existePago();

    getJSONData("https://japdevdep.github.io/ecommerce-api/cart/654.json").then(function (resultObj) {
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