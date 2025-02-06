import User from './user.js'
import { notifyOK, notifyKO } from './utils/notificationsUtils.js';

window.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("menu-toggle").addEventListener("click", function() {
        document.getElementById("menu").classList.add("active");
    });

    document.getElementById("menu-close").addEventListener("click", function() {
        document.getElementById("menu").classList.remove("active");
    });
  
    console.log('Hola script registro')
  
  })


   //envio de formulario de login
   document.getElementById("form");
   form.addEventListener('submit', function (event){
 
     const inputEmail = document.querySelector("#inputEmail").value;
     const inputPassword = document.querySelector("#inputPassword").value;
     const inputName = document.querySelector("#inputName").value;
 

     event.preventDefault();
     User.addNewUser(inputName, inputEmail, inputPassword)
     notifyOK("Usuario registrado correctamente");
     console.log(inputEmail, inputPassword, inputName)
       
   })