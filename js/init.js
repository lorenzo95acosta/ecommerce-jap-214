if ((localStorage.usuario === undefined) || (localStorage.contraseña === undefined)){
  window.location.href = "login.html";
}

const CATEGORIES_URL = "https://japdevdep.github.io/ecommerce-api/category/all.json";
const PUBLISH_PRODUCT_URL = "https://japdevdep.github.io/ecommerce-api/product/publish.json";
const CATEGORY_INFO_URL = "https://japdevdep.github.io/ecommerce-api/category/1234.json";
const PRODUCTS_URL = "https://japdevdep.github.io/ecommerce-api/product/all.json";
const PRODUCT_INFO_URL = "https://japdevdep.github.io/ecommerce-api/product/5678.json";
const PRODUCT_INFO_COMMENTS_URL = "https://japdevdep.github.io/ecommerce-api/product/5678-comments.json";
const CART_INFO_URL = "https://japdevdep.github.io/ecommerce-api/cart/987.json";
const CART_BUY_URL = "https://japdevdep.github.io/ecommerce-api/cart/buy.json";

var showSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "block";
}

var hideSpinner = function(){
  document.getElementById("spinner-wrapper").style.display = "none";
}

var getJSONData = function(url){
    var result = {};
    showSpinner();
    return fetch(url)
    .then(response => {
      if (response.ok) {
        return response.json();
      }else{
        throw Error(response.statusText);
      }
    })
    .then(function(response) {
          result.status = 'ok';
          result.data = response;
          hideSpinner();
          return result;
    })
    .catch(function(error) {
        result.status = 'error';
        result.data = error;
        hideSpinner();
        return result;
    });
}

function mostrarMenu(){
  string = `
  <div class="dropdown">
    <button  id="info_usuario" class="btn btn-secondary dropdown-toggle" type="button"  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
    </button>
    <div class="dropdown-menu" >
    <a class="dropdown-item" href="cart.html">Mi carrito</a>
      <a class="dropdown-item" href="login.html" onclick="signOut()">Salir</a>
    </div>
</div>
  `;
  let menu = document.getElementById('menu_usuario');
  menu.innerHTML += string;
}


//Carga la información del usuario logueado
function mostrarUsuario(){
  let nombre = localStorage.getItem('usuario');
  let usuario = document.getElementById("info_usuario");
  usuario.innerHTML = nombre;
}

//Funcion que filtra la informacion
function filtrar() {
  // Declara variables
  var input, filter, ul, li, a, i, txtValue;
  //Inicializa variables
  input = document.getElementById('buscador');
  filter = input.value.toUpperCase();
  ul = document.getElementById("resultados");
  li = ul.getElementsByTagName('li');

  //Recorro todos los elementos de la lista, y los hago visibles solo si se estan buscando
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}

function mostrarSearchbar(){
  let string = `
  <div class="dropdown">
    <button class="btn btn-outline-secondary" style="border: none;" type="button"  data-toggle="dropdown"> 
        <!--Codigo obtenido de la tabla de Unicode https://unicode-table.com/en/-->
        <!--Lo que hace  SVG(scalable vector graphics)  permite crear la imagne de la lupa en el buscador con texto -->
        <svg width="17" height="17" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <circle cx="8.78439" cy="8.78436" r="6" stroke="white" stroke-width="3"></circle>
        <rect x="11.3459" y="13.4158" width="3" height="8.80485" rx="1.5" transform="rotate(-45 11.3459 13.4158)" fill="white"></rect>
        </svg>
  </button>
    <div class="dropdown-menu" >
      <form class="form-inline mt-2 mt-md-0">
        <input id="buscador" class="form-control mr-sm-2" onkeyup="filtrar()" type="search" placeholder="¿Qué estás buscando?" aria-label="Search" style="border: none; width: 210px;">
      </form>
        <ul id="resultados" class="list-group list-group-flush">
          <li class="list-group-item"><a href="index.html">Inicio</a></li>
          <li class="list-group-item"><a href="categories.html">Categorias</a></li>
          <li class="list-group-item"><a href="products.html">Productos</a></li>
          <li class="list-group-item"><a href="sell.html">Vender</a></li>
          <li class="list-group-item"><a href="cart.html">Mi carrito</a></li>
        </ul>
    </div>
</div>
  `;
  let divBuscador = document.getElementById('searchbar');
  divBuscador.innerHTML += string;
}



//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.
document.addEventListener("DOMContentLoaded", function(e){
  mostrarSearchbar();
  mostrarMenu();
  mostrarUsuario();
});