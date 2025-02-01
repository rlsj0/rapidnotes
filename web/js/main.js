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
  document.getElementById("form");
  form.addEventListener('submit', function (event){

    const inputEmail = document.querySelector("#inputEmail").value;
    const inputPassword = document.querySelector("#inputPassword").value;


    event.preventDefault();
    User.loginUser(inputEmail, inputPassword)
      
  })



