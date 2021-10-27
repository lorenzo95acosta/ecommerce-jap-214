//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Funcion de Bootsrap para las validaciones
(function() {
    'use strict';
    window.addEventListener('load', function() {
      // Fetch all the forms we want to apply custom Bootstrap validation styles to
      var forms = document.getElementsByClassName('needs-validation');
      // Loop over them and prevent submission
      var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
      });
    }, false);
})();


//Funcion guardar
function guardarDatos(){
    //Obtengo los datos
    let nombre = document.getElementById("nombre-formulario").value;
    let apellido = document.getElementById("apellido-formulario").value;
    let correo = document.getElementById("email-formulario").value;
    let edad = document.getElementById("edad-formulario").value;
    let telefono = document.getElementById("telefono-formulario").value;
    //Los convierto a objeto
    let usuario = {
      name: nombre,
      lastname: apellido,
      email: correo,
      age: edad,
      contact: telefono
    };
    localStorage.setItem("usuario-formulario", JSON.stringify(usuario));
  }

function mostrarDatos(){
  let usuario = JSON.parse(localStorage.getItem("usuario-formulario"));
  if( usuario != undefined){
    let contenido = `
    <table class="table table-responsive">
    <thead class="thead-light">
      <tr>
        <th colspan= "4" >${usuario.name}`+`   ${usuario.lastname}</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <th scope="row">E-Mail: </th>
        <td>${usuario.email}</td>
      </tr>
      <tr>
        <th scope="row">Edad: </th>
        <td>${usuario.age}</td>
      </tr>
      <tr>
        <th scope="row">Contacto: </th>
        <td>${usuario.contact}</td>
      </tr>
    </tbody>
  </table>
    `;
    let contenedor = document.getElementById("info-usuario");
    contenedor.innerHTML = contenido;
  }

}


document.addEventListener("DOMContentLoaded", function (e) {
  mostrarDatos();
});