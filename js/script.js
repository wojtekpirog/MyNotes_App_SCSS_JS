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
let notesInput;
let notesSelect;
let notesTextarea;
let searchInput;
let searchCancelButton;

let error;

// Każda notatka będzie miała własny, unikalny identyfikator:
let noteId = 0;
// Pojemnik dla wyników wyszukiwania:
let searchResults = [];

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
  notesInput = document.querySelector(".notes__panel-input");
  notesSelect = document.querySelector(".notes__panel-select");
  notesTextarea = document.querySelector(".notes__panel-text");
  searchInput = document.querySelector(".search-box__input");
  searchCancelButton = document.querySelector(".search-box__button--cancel");
  error = document.querySelector(".notes__panel-error");
}

const prepareDOMEvents = () => {
  addNoteButton.addEventListener("click", openPanel);
  cancelButton.addEventListener("click", closePanel);
  saveButton.addEventListener("click", addNote);
  deleteAllButton.addEventListener("click", deleteAllNotes);
  searchInput.addEventListener("input", searchNote);
  searchCancelButton.addEventListener("click", cancelSearch);
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
  notesInput.value = "";
  notesSelect.value = "default";
  notesTextarea.value = "";
  error.style.display = "none";
}

const addNote = () => {
  if (notesInput.value !== "" && notesSelect.value !== "default" && notesTextarea.value !== "") {
    error.style.display = "none";
    createNote();
  } else if (notesInput.value === "") {
    error.textContent = "Enter your note's title!";
    error.style.display = "block";
  } else if (notesSelect.value === "default") {
    error.textContent = "Select your note's category!";
    error.style.display = "block";
  } else if (notesTextarea.value === "") {
    error.textContent = "Enter your note's content!";
    error.style.display = "block";
  }
}

const createNote = () => {
  const selectedValue = notesSelect.options[notesSelect.selectedIndex].textContent;
  const notesTemplate = document.querySelector(".notes__template").content.cloneNode(true);

  const note = notesTemplate.querySelector(".notes__note");
  note.setAttribute("id", `note-${noteId}`);
  // Ustaw tytuł notatki:
  const notesTitle = note.querySelector(".notes__title");
  notesTitle.textContent = notesInput.value;
  // Ustaw kategorię notatki:
  const notesCategory = note.querySelector(".notes__category");
  notesCategory.innerHTML = `<b>Category:</b> ${selectedValue}`;
  // Ustaw treść notatki:
  const notesBody = note.querySelector(".notes__body");
  notesBody.innerHTML = `<b>Details:</b> ${notesTextarea.value}`;
  
  const noteDeleteButton = note.querySelector(".notes__delete-btn");
  noteDeleteButton.setAttribute("onclick", `deleteNote(${noteId})`);

  notesContainer.appendChild(note);
  noteId += 1;
  closePanel();
}

const searchNote = () => {
  console.log("Wyszukiwanie...");
}

const cancelSearch = () => {
  const allNotes = document.querySelectorAll(".notes__note");
  
  allNotes.forEach((note) => {
    note.style.display = "none";

    const noteTitle = note.querySelector(".notes__title").textContent;
    searchResults.push(noteTitle);
  });
  
  filterResults(allNotes);
  searchInput.value = "";
}

const filterResults = (allNotes) => {
  searchResults = searchResults.filter((result) => result.toLowerCase().includes(searchInput.value.toLowerCase()));
  
  searchResults.forEach((result) => {
    allNotes.forEach((note) => {
      const noteTitle = note.querySelector(".notes__title").textContent.toLowerCase();
      noteTitle === result.toLowerCase() ? note.style.display = "block" : false
    });
  });
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