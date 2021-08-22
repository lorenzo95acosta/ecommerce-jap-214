//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Funcion que luego voy a usar para validar datos, mientras la utilizo para redirigir
function validacion(){
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("contraseña").value;
    if((user !== "")&&(password !== "")){
        sessionStorage.setItem("usuario", user);
        sessionStorage.setItem("contraseña", password);
        window.location.href = "index.html";
    }else{
        alert("Ninguno de los campos puede permanecer sin completar")
    }
}

function recuperarContraseña(){
    alert("Futura funcionalidad a integrar en el eMercado");
}

//Scripts de google para obtener la información del usuario.
function onSignIn(googleUser) {
    var profile = googleUser.getBasicProfile();
    console.log('ID: ' + profile.getId());
    console.log('Name: ' + profile.getName());
    console.log('Image URL: ' + profile.getImageUrl());
    console.log('Email: ' + profile.getEmail()); 
    //Se envia mediante tokens para asegurar la seguridad de los datos del cliente
    var id_token = googleUser.getAuthResponse().id_token;
    console.log(id_token);
  }

  //Funcion para hacer log-out
  function signOut(){
    var auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      console.log('User signed out.');
    });
}

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("boton-ingresar").addEventListener("click", function(event){
        validacion();
    })
})

