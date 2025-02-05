import User from './user.js'
import Note from './note.js'
const note = new Note();

window.addEventListener('DOMContentLoaded', (event) => {

    //lógica para menú navegación en mobile
    document.getElementById("menu-toggle").addEventListener("click", function() {
        document.getElementById("menu").classList.add("active");
    });

    document.getElementById("menu-close").addEventListener("click", function() {
        document.getElementById("menu").classList.remove("active");
    });
    
    

    //Comprobación título al añadir nota en popup
    const titleInput = document.querySelector('#title');
    titleInput.addEventListener('input', checkTitle);


    //Lógica para abrir y cerrar formulario popup
    const closeCategory = document.getElementById('close-btn')
    const addCategory = document.getElementById('add-btn')
    const submitCategory = document.getElementById('submit-btn')

    addCategory.addEventListener('click', () => popup.classList.add("notes__popup-container--show"))
    closeCategory.addEventListener('click', () => popup.classList.remove("notes__popup-container--show"))
    submitCategory. addEventListener('click', () =>  popup.classList.remove("notes__popup-container--show"))



    //Obtener userId del sessionStorage guardado en Login
    const userId = Number(sessionStorage.getItem("userId"));

    //Cargando notas iniciales
    console.log("Cargando notas para el usuario ID:", userId);
    note.getNotesByUserId(userId, drawNotes);


    console.log('Hola script detalle');
  })




  //Pintar notas de usuario
function drawNotes(data) {

    const notesContainer = document.getElementById("notes-container");
    notesContainer.innerHTML = "";

    console.log("Length de data" + data.length)

    //Comprobación notas -> mostrar no hay notas
    if (!data || data.length === 0) {
        let titleInformationNotes = document.createElement('h3');
        titleInformationNotes.innerText = 'No tienes ninguna nota';
        titleInformationNotes.classList.add("notes__container-title");
        notesContainer.appendChild(titleInformationNotes);
        return;
    }

    //Se crea lista de notas
    const noteUl = document.createElement('ul');
    noteUl.classList.add('notes__list');
    notesContainer.appendChild(noteUl);

    data.forEach(note => {
        
        //Cada nota
        const noteElement = document.createElement('li');
        noteElement.classList.add('notes__list-element');

        //Cada link de nota
        const noteLink =  document.createElement('a');
        noteLink.href = '#'
        noteLink.classList.add('notes__list-link')

        //Cada titulo nota
        const noteTitle = document.createElement('h3')
        noteTitle.classList.add('notes__list-title');
        noteTitle.innerText = note.title;

        //Cada texto de nota
        const noteText = document.createElement('p');
        noteText.classList.add('notes__list-text');
        noteText.innerText = note.text;

        noteUl.appendChild(noteElement);
        noteElement.appendChild(noteLink);
        noteLink.appendChild(noteTitle);
        noteLink.appendChild(noteText);

    });
}




//Check titulo al añadir nueva nota
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

    const userId = Number(sessionStorage.getItem('userId'));
    const noteTitle = document.querySelector('#title').value;
    const noteDescription = document.querySelector('#description').value;
    const notePriority = document.querySelector('#priority').value;

    console.log('Añadiendo nueva nota');

    //Tras añadir nota, refrescar lista (callback)
    note.addNote(userId,noteTitle, noteDescription, notePriority, () => {
        console.log("Actualizando notas tras añadir")
        note.getNotesByUserId(userId, drawNotes);
    });
   
    //reseteo de formulario
    formNote.reset();
})

