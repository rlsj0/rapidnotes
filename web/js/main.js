import User from './user.js'

window.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("menu-toggle").addEventListener("click", function() {
        document.getElementById("menu").classList.add("active");
    });

    document.getElementById("menu-close").addEventListener("click", function() {
        document.getElementById("menu").classList.remove("active");
    });
  
    console.log('Hola script principal')
  
  })


  //envio de formulario de login
  const form =document.getElementById("form");
  form.addEventListener('submit', function (event){

    const inputEmail = document.querySelector("#inputEmail").value;
    const inputPassword = document.querySelector("#inputPassword").value;


    event.preventDefault();
    const userIdLogged = User.loginUser(inputEmail, inputPassword).then(function(userIdLogged) {

      console.log(userIdLogged);

      if (userIdLogged) {
        sessionStorage.setItem("userId", userIdLogged);
        console.log(userIdLogged);
        window.location.href = "detail.html";
      } else {
        alert("Usuario o contraseña incorrectos");
      }
    })
  })



