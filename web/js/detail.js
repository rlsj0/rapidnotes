import User from './user.js'
import Note from './note.js'

window.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("menu-toggle").addEventListener("click", function() {
        document.getElementById("menu").classList.add("active");
    });

    document.getElementById("menu-close").addEventListener("click", function() {
        document.getElementById("menu").classList.remove("active");
    });


    const userId = Number(sessionStorage.getItem("userId"));


    console.log("Cargando notas para el usuario ID:", userId);

    const notes = Note.getNotesByUserId(userId).then( a => {    
        if(a.length <= 0 || notes == null || notes ==[]){
            console.log("No tienes ninguna nota");
        }
        return a;
    })
    const notasContainer = document.getElementById("main-notes")
    console.log(notes)
    console.log('Hola script detalle');
  })




