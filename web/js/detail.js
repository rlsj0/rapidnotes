import User from "./user.js";
import Note from "./note.js";
import { notifyKO, notifyOK } from "./utils/notificationsUtils.js";

const noteClass = new Note();

let noteSelected = null;

//Obtener userId del sessionStorage guardado en Login
const userId = Number(sessionStorage.getItem("userId"));

window.addEventListener("DOMContentLoaded", (event) => {
  //lógica para menú navegación en mobile
  document.getElementById("menu-toggle").addEventListener("click", function () {
    document.getElementById("menu").classList.add("active");
  });

  document.getElementById("menu-close").addEventListener("click", function () {
    document.getElementById("menu").classList.remove("active");
  });

  //Evento keyup + setTimeOut para no realizar tantas busquetas a API
  const searchInput = document.querySelector(".notes__form-input");
  let timer;

  searchInput.addEventListener("keyup", function () {
    clearTimeout(timer);

    //Se establecen 2 segundos de diferencia para buscar en api
    timer = setTimeout(() => {
      const searchQuery = this.value.trim();

      //Comprobación si hay algo escrito
      if (searchQuery.length > 0) {
        console.log(" Buscando notas con: " + searchQuery);

        let title = null;
        let priority = null;

        //Comprobación si es número o texto
        if (!isNaN(searchQuery) && searchQuery !== "") {
          priority = searchQuery;
        } else {
          title = searchQuery;
        }

        noteClass.searchNote(userId, title, "", priority, "", drawNotes);
      } else {
        noteClass.getNotesByUserId(userId, drawNotes);
      }
    }, 200);
  });

  //Comprobación para activar/desactivar boton enviar popup
  document.querySelector("#title").addEventListener("input", checkTitle);
  document.querySelector("#description").addEventListener("input", checkTitle);
  document.querySelector("#priority").addEventListener("input", checkTitle);

  //Lógica para abrir y cerrar formulario popup
  const closePopup = document.getElementById("close-btn");
  const addPopup = document.getElementById("add-btn");
  const submitPopup = document.getElementById("submit-btn");

  addPopup.addEventListener("click", () => {
    noteSelected = null;
    formNote.reset();
    checkTitle();
    popup.classList.add("notes__popup-container--show");
    clearSelection();
  });

  closePopup.addEventListener("click", () => {
    popup.classList.remove("notes__popup-container--show");
    formNote.reset();
    noteSelected = null;
    clearSelection();
  });

  submitPopup.addEventListener(
    "click",
    () => popup.classList.remove("notes__popup-container--show"),
  );

  //Cargando notas iniciales
  console.log("Cargando notas para el usuario ID:", userId);
  noteClass.getNotesByUserId(userId, drawNotes);

  //Evento logout
  const logoutButton = document.querySelector(".header__button-login");
  logoutButton.addEventListener("click", () => {
    console.log("Cerrando sesión");

    sessionStorage.removeItem("userId");
    notifyOK("Sesión cerrada correctamente");

    setTimeout(() => {
      window.location.href = "./index.html";
    }, 1200);
  });

  console.log("Hola script detalle");
});

const deleteButton = document.querySelector("#del-btn");
const modifyButton = document.querySelector("#modify-btn");
deleteButton.addEventListener("click", (event) => {
  event.preventDefault();

  let userId = Number(sessionStorage.getItem("userId"));
  console.log("Leyendo de nuevo el userID" + userId);

  console.log("Esta es la nota seleccionada" + noteSelected);
  noteClass.deleteNote(noteSelected, () => {
    notifyKO("Nota eliminada con éxito");
    console.log("Actualizando notas tras eliminar");
    noteClass.getNotesByUserId(userId, drawNotes);
  });

  clearSelection();
});

modifyButton.addEventListener("click", async (event) => {
  event.preventDefault();

  var noteValue = await noteClass.getNoteById(noteSelected);

  document.querySelector("#title").value = noteValue.title;
  document.querySelector("#description").value = noteValue.text;
  document.querySelector("#priority").value = noteValue.priority;

  console.log(noteValue);

  checkTitle();
  popup.classList.add("notes__popup-container--show");
});

//Pintar notas de usuario
function drawNotes(data) {
  const notesContainer = document.getElementById("notes-container");
  notesContainer.innerHTML = "";

  console.log("Length de data " + data.length);

  //Comprobación notas -> mostrar no hay notas
  if (!data || data.length === 0) {
    let titleInformationNotes = document.createElement("h3");
    titleInformationNotes.innerText = "No tienes ninguna nota";
    titleInformationNotes.classList.add("notes__container-title");
    notesContainer.appendChild(titleInformationNotes);
    return;
  }

  //Se crea lista de notas
  const noteUl = document.createElement("ul");
  noteUl.classList.add("notes__list");
  notesContainer.appendChild(noteUl);

  //Se crean los elementos
  data.forEach((note) => {
    //Cada nota
    const noteElement = document.createElement("li");
    noteElement.setAttribute("data-id", note.id);
    noteElement.classList.add("notes__list-element");

    //Cada link de nota
    const noteLink = document.createElement("a");
    noteLink.href = "detail.html#/" + userId;
    noteLink.classList.add("notes__list-link");

    //Cada titulo nota
    const noteTitle = document.createElement("h3");
    noteTitle.classList.add("notes__list-title");
    noteTitle.innerText = note.title;

    //Cada texto de nota
    const noteText = document.createElement("p");
    noteText.classList.add("notes__list-text");
    noteText.innerText = note.text;

    noteUl.appendChild(noteElement);
    noteElement.appendChild(noteLink);
    noteLink.appendChild(noteTitle);
    noteLink.appendChild(noteText);

    //Evento para cuando se hace doble click, abrir nota para modificar
    noteElement.addEventListener("dblclick", async function () {
      noteSelected = note.id;

      const noteValue = await noteClass.getNoteById(noteSelected);
      document.querySelector("#title").value = noteValue.title;
      document.querySelector("#description").value = noteValue.text;
      document.querySelector("#priority").value = noteValue.priority;

      console.log("Editando nota: ", noteValue);

      popup.classList.add("notes__popup-container--show");
    });
  });

  //Seleccionamos la Lista de notas y el boton delete
  const listItems = document.querySelectorAll(".notes__list-element");
  const deleteButton = document.getElementById("del-btn");
  const modifyButton = document.getElementById("modify-btn");

  listItems.forEach((note) => {
    note.addEventListener("click", function (event) {
      if (this.classList.contains("notes__list-element--active")) {
        // Quitamos la clase activa y reseteamos el selectedId
        this.classList.remove("notes__list-element--active");
        this.querySelector("a").blur();

        clearSelection();
      } else {
        noteSelected = this.getAttribute("data-id");
        console.log("Esta es la nota seleccionada: " + noteSelected);
        document.querySelectorAll(".notes__list-element").forEach((element) => {
          element.classList.remove("notes__list-element--active");
        });

        this.classList.add("notes__list-element--active");
        deleteButton.disabled = false;
        modifyButton.disabled = false;

        // hash de ruta modificado
        //window.location.hash = `/${selectedId}`
      }
    });
  });
}

//Evento click cuando es fuera de nota, popup y modificar
document.addEventListener("click", function (event) {
  const clickedInsideNote = event.target.closest(".notes__list-element");
  const clickedInsideNoteModify = event.target.closest("#modify-btn");
  const clickedInsideNotePopup = event.target.closest("#popup");

  if (
    !clickedInsideNote && !clickedInsideNoteModify && !clickedInsideNotePopup
  ) {
    console.log("Clic fuera de la lista, limpiando selección...");
    clearSelection();
  }
});

//Check titulo al añadir nueva nota
function checkTitle() {
  const titleInput = document.querySelector("#title");
  const submitButton = document.querySelector("#submit-btn");

  if (noteSelected == null) {
    submitButton.disabled = titleInput.value.trim() === "";
  } else {
    submitButton.disabled = titleInput.value.trim() === "";
  }
  /*if (titleInput.value === '') {
    submitButton.disabled = true
    } else {
    submitButton.disabled = false
    }*/
}

//Limpiar seleccion y bloqueo de botón delete
function clearSelection() {
  noteSelected = null;
  deleteButton.disabled = true;
  modifyButton.disabled = true;
  console.log("Selección limpia, botón deshabilitado");

  //se limpia hash si no hay categoria seleccionada
  //window.location.hash = '';
}

//Evento de envío de formulario
formNote.addEventListener("submit", async function (event) {
  event.preventDefault();

  const userId = Number(sessionStorage.getItem("userId"));
  const noteTitle = document.querySelector("#title").value;
  const noteDescription = document.querySelector("#description").value;
  const notePriority = document.querySelector("#priority").value;

  //Tras añadir nota, refrescar lista (callback)
  if (noteSelected == null) {
    console.log("Añadiendo nueva nota");
    noteClass.addNote(userId, noteTitle, noteDescription, notePriority, () => {
      notifyOK("Nota añadida con éxito");
      console.log("Actualizando notas tras añadir");
      noteClass.getNotesByUserId(userId, drawNotes);
    });
  } else {
    console.log("Modificando nota");
    noteClass.modifyNote(
      noteSelected,
      userId,
      noteTitle,
      noteDescription,
      notePriority,
      true,
      () => {
        notifyOK("Nota modificada con éxito");
        console.log("Actualizando notas tras modificar");
        noteClass.getNotesByUserId(userId, drawNotes);
      },
    );
  }

  //reseteo de formulario
  formNote.reset();
});
