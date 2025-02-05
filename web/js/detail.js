import User from './user.js'
import Note from './note.js'
const note = new Note();

window.addEventListener('DOMContentLoaded', (event) => {

    document.getElementById("menu-toggle").addEventListener("click", function() {
        document.getElementById("menu").classList.add("active");
    });

    document.getElementById("menu-close").addEventListener("click", function() {
        document.getElementById("menu").classList.remove("active");
    });

    const notesContainer = document.getElementById('notes-container');
    


    const titleInput = document.querySelector('#title');
    titleInput.addEventListener('input', checkTitle);

    //Lógica para abrir y cerrar formulario popup
    const closeCategory = document.getElementById('close-btn')
    const addCategory = document.getElementById('add-btn')
    const submitCategory = document.getElementById('submit-btn')

    addCategory.addEventListener('click', () => popup.classList.add("notes__popup-container--show"))
    closeCategory.addEventListener('click', () => popup.classList.remove("notes__popup-container--show"))
    submitCategory. addEventListener('click', () =>  popup.classList.remove("notes__popup-container--show"))




    const userId = Number(sessionStorage.getItem("userId"));


    console.log("Cargando notas para el usuario ID:", userId);

    const notes = note.getNotesByUserId(userId).then( a => {    
        if(!a || a.length === 0){

            let titleInformationNotes = document.createElement('h3');
            titleInformationNotes.innerText = 'No tienes ninguna nota';
            titleInformationNotes.classList.add("notes__container-title");
        
            notesContainer.appendChild(titleInformationNotes);
            
            console.log(titleInformationNotes);
        }
        console.log(a);
        return a;
    })

    console.log("notes" + notes)

    console.log('Hola script detalle');
  })


//TODO DrawNotes()


//Check titulo nota
function checkTitle() {

    const noteInput = document.querySelector('#title');
    const submitButton = document.querySelector('#submit-btn');
  
    if(noteInput.value === '' ) {
      submitButton.disabled = true
    } else {
      submitButton.disabled = false
    }
  }


  //Evento de envío de formulario
formNote.addEventListener('submit', async function (event) {
    event.preventDefault();

    const userId = Number(sessionStorage.getItem("userId"));
    const noteTitle = document.querySelector('#title').value;
    const noteDescription = document.querySelector('#description').value;
    const notePriority = document.querySelector('#priority').value;


    await note.addNote(userId ,noteTitle, noteDescription, notePriority);
    //deleteButton.disabled = true;
    formNote.reset();
})





/*const notesList = async function loadUserNotes() {
    console.log("Funcion llamada")
    try {
        const userId = Number(sessionStorage.getItem("userId"));
        console.log("Obteniendo notas para el usuario:", userId);


        const notes = await note.getNotesByUserId(userId);

        if (!notes || notes.length === 0) {
            console.log("No tienes ninguna nota.");
            return;
        }

        notes.forEach(note => {
            console.log(`Título: ${note.title}, Texto: ${note.text}`);
        });

    } catch (error) {
        console.error("Error al obtener las notas:", error);
    }
}*/






