let currentYear;
let hourSpan;
let dateSpan;
let addNoteButton;
let saveButton;
let cancelButton;
let deleteAllButton;
let notesContainer;
let notesPanel;
let notesShadow;
let notesSelect;
let notesTextarea;
let error;

let selectedValue;

// Każda notatka będzie miała własny, unikalny identyfikator
let noteId = 0;

const main = () => { 
  prepareDOMElements();
  prepareDOMEvents();
  setDateAndTime();
  updateDateAndTime();
}

const prepareDOMElements = () => {
  currentYear = document.querySelector("span.year");
  hourSpan = document.querySelector(".menu__date > span");
  dateSpan = document.querySelector(".menu__time > span");
  addNoteButton = document.querySelector(".menu__button--add");
  saveButton = document.querySelector(".notes__panel-button--save");
  cancelButton = document.querySelector(".notes__panel-button--cancel");
  deleteAllButton = document.querySelector(".menu__button--delete");
  notesContainer = document.querySelector(".notes__container");
  notesPanel = document.querySelector(".notes__panel");
  notesShadow = document.querySelector(".notes__shadow");
  notesSelect = document.querySelector(".notes__panel-select");
  notesTextarea = document.querySelector(".notes__panel-text");
  error = document.querySelector(".notes__panel-error");
}

const prepareDOMEvents = () => {
  addNoteButton.addEventListener("click", openPanel);
  cancelButton.addEventListener("click", closePanel);
  saveButton.addEventListener("click", addNote);
  deleteAllButton.addEventListener("click", deleteAllNotes);
  window.addEventListener("click", (event) => event.target === notesShadow ? closePanel() : false);
}

const setDateAndTime = () => {
  const now = new Date();
  
  const formattingOptions = {
    day: "numeric",
    month: "long",
    year: "numeric"
  };
  
  hourSpan.textContent = now.toLocaleTimeString();
  dateSpan.textContent = now.toLocaleDateString("en-US", formattingOptions);
}

const updateDateAndTime = () => setInterval(setDateAndTime, 1000);

const openPanel = () => {
  notesPanel.classList.add("active", "animation-in");
  notesShadow.classList.add("active", "animation-in");
}

const closePanel = () => {
  notesPanel.classList.remove("active","animation-in");
  notesShadow.classList.remove("active", "animation-in");
  notesSelect.selectedIndex = 0;
  notesTextarea.value = "";
  error.style.display = "none";
}

const addNote = () => {
  if (notesSelect.value !== "default" && notesTextarea.value !== "") {
    error.style.display = "none";
    createNote();
  } else if (notesSelect.value === "default") {
    error.textContent = "Select category!";
    error.style.display = "block";
  } else if (notesTextarea.value === "") {
    error.textContent = "Enter your note's content!";
    error.style.display = "block";
  }
}

const createNote = () => {
  selectedValue = notesSelect.options[notesSelect.selectedIndex].textContent;
  const notesTemplate = document.querySelector(".notes__template").content.cloneNode(true);

  const newNote = notesTemplate.querySelector(".notes__note");
  newNote.setAttribute("id", `note-${noteId}`);
  // Ustaw tytuł notatki:
  const notesTitle = newNote.querySelector(".notes__title");
  notesTitle.textContent = selectedValue;
  // Ustaw treść notatki:
  const noteBody = newNote.querySelector(".notes__body");
  noteBody.textContent = notesTextarea.value;
  
  const noteDeleteButton = newNote.querySelector(".notes__delete-btn");
  noteDeleteButton.setAttribute("onclick", `deleteNote(${noteId})`);

  notesContainer.appendChild(newNote);
  noteId += 1;
  closePanel();
}

const deleteNote = (noteId) => {
  const noteToDelete = document.getElementById(`note-${noteId}`);
  notesContainer.removeChild(noteToDelete);
}

const deleteAllNotes = () => {
  const notes = document.querySelectorAll(".notes__note");
  notes.forEach((note) => notesContainer.removeChild(note));
}

document.addEventListener("DOMContentLoaded", main);