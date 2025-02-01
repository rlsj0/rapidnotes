window.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("menu-toggle").addEventListener("click", function() {
        document.getElementById("menu").classList.add("active");
    });

    document.getElementById("menu-close").addEventListener("click", function() {
        document.getElementById("menu").classList.remove("active");
    });

  
    const inputEmail = document.getElementById('inputEmail');
    const inputPassword = document.getElementById('inputPaswword')

    console.log(inputEmail)
    console.log(inputPassword)

  
    console.log('Hola script principal')
  
  })


  form.addEventListener('submit', function (event){
    event.preventDefault();

    //Validación de campos obligatorios
      const datos = getFormData();
      api.postSite(selectedId, datos)
      .then(() => {
        sendMessage();
        form.reset();
        resetField();

        //Eliminar alerta cuando pasan 5 segundos
        setTimeout(() => {
          clearMessage();
        }, 3000)
      })
      .catch(() => {
        sendError();

        setTimeout(() => {
          clearMessage();
        }, 3000)
      });
    }
);


function getFormData() {
    return {
        name: document.querySelector("#siteName").value,
        user: document.querySelector("#siteUser").value,
        password: document.querySelector("#sitePassword").value,
    }
}