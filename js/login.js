//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

//Funcion que luego voy a usar para validar datos, mientras la utilizo para redirigir
function validacion(){
    let user = document.getElementById("usuario").value;
    let password = document.getElementById("contraseña").value;
    sessionStorage.setItem("usuario", user);
    sessionStorage.setItem("contraseña", password);
    window.location.href = "index.html";
}

document.addEventListener("DOMContentLoaded", function(e){
    document.getElementById("boton-ingresar").addEventListener("click", function(event){
        validacion();
    })
})

