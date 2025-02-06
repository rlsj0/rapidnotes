import User from './user.js'
import { notifyOK, notifyKO } from './utils/notificationsUtils.js';

const user = new User();

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
    const userIdLogged = user.loginUser(inputEmail, inputPassword).then(function(userIdLogged) {

      console.log(userIdLogged);

      if (userIdLogged) {
        notifyOK("Sesión iniciada");
        sessionStorage.setItem("userId", userIdLogged);
        console.log(userIdLogged);

        setTimeout( () => {
          window.location.href = 'detail.html#/'+ userIdLogged;
        }, 1200)
        
      } else {
        notifyKO("Usuario o contraseña incorrectos");
      }
    })
  })



