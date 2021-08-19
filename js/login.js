//Función que se ejecuta una vez que se haya lanzado el evento de
//que el documento se encuentra cargado, es decir, se encuentran todos los
//elementos HTML presentes.

/* REFERENCIA OBTENIDA DE UN TEMPLATE DE LA WEB

<div class="wrapper fadeInDown">
  <div id="formContent">
    <!-- Tabs Titles -->
    <h2 class="active"> Sign In </h2>
    <h2 class="inactive underlineHover">Sign Up </h2>

    <!-- Icon -->
    <div class="fadeIn first">
      <img src="http://danielzawadzki.com/codepen/01/icon.svg" id="icon" alt="User Icon" />
    </div>

    <!-- Login Form -->
    <form>
      <input type="text" id="login" class="fadeIn second" name="login" placeholder="login">
      <input type="text" id="password" class="fadeIn third" name="login" placeholder="password">
      <input type="submit" class="fadeIn fourth" value="Log In">
    </form>

    <!-- Remind Passowrd -->
    <div id="formFooter">
      <a class="underlineHover" href="#">Forgot Password?</a>
    </div>

  </div>
</div>




function crearLogin(){
    //Localizo el div donde voy a crear el login y le cambio la clase
    let inicio= document.getElementById("login");
    inicio.className = "wrapper fadeInDown";

    //Menú de Entrar o registrarse
    let entrar = document.createElement("h2");
    entrar.innerHTML = "ENTRAR";
    entrar.className = "active";
    let registrarse = document.createElement("h2");
    registrarse.innerHTML = "REGISTRARSE";
    registrarse.className = "inactive underlineHover";

    //Icono
    let icono = document.createElement("div");
    icono.className = "fadeIn first";
    let linkIcono = document.createElement("img");
    linkIcono.src = "img/icono.jpg";
    icono.appendChild(linkIcono);

    //Olvido de contraseña
    let olvido = document.createElement("div");
    olvido.className = "formFooter";
    let recuperar = document.createElement("a");
    recuperar.href = "index.html";
    olvido.appendChild(recuperar);

    //Formulario de login
    let formulario = document.createElement("form");
    let mail = document.createElement("input");
    mail.type = "text";
    mail.className = "fadeIn second";
    mail.placeholder = "Correo Electrónico";
    let contraseña = document.createElement("input");
    contraseña.type = "text";
    contraseña.className = "fadeIn third";
    contraseña.placeholder = "Contraseña";
    let boton = document.createElement("input");
    boton.type = "submit";
    boton.className = "fadeIn fourth";
    boton.value = "Ingresar";
    formulario.appendChild(mail);
    formulario.appendChild(contraseña);
    formulario.appendChild(boton);

    //Anexo lo correspondiente a cada div
    inicio.appendChild(entrar);
    inicio.appendChild(registrarse);
    inicio.appendChild(icono);
    inicio.appendChild(olvido);
    inicio.appendChild(formulario);
}
*/



document.addEventListener("DOMContentLoaded", function(e){
  //crearLogin();
});