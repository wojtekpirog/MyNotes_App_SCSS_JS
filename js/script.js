// Footer year
let footerYear;
// time box
let hourSpan;
let dateSpan;
// Add note button
let addNoteButton;
// Delete all notes button
let deleteAllButton;
// Popup with warning
let deletionConfirmationPopup;
let confirmDeletionBtn;
let cancelDeletionBtn;
// Container for notes
let notesContainer;
// Notes panel
let notesPanel;
let notesShadow;
let notesInput;
let notesSelect;
let notesTextarea;
// Note panel buttons
let saveButton;
let cancelButton;
// Search box
let searchInput;
let searchButton;
let searchCancelButton;
// Error
let error;

// Każda notatka będzie miała własny, unikalny identyfikator:
let noteId = 0;
// Pojemnik dla wyników wyszukiwania:
let searchResults = [];

const main = () => { 
  prepareDOMElements();
  prepareDOMEvents();
  setFooterYear();
  setDateAndTime();
  updateDateAndTime();
}

const prepareDOMElements = () => {
  footerYear = document.querySelector(".footer__year");
  hourSpan = document.querySelector(".menu__date > span");
  dateSpan = document.querySelector(".menu__time > span");
  addNoteButton = document.querySelector(".menu__button--add");
  saveButton = document.querySelector(".notes__panel-button--save");
  cancelButton = document.querySelector(".notes__panel-button--cancel");
  deleteAllButton = document.querySelector(".menu__button--delete");
  deletionConfirmationPopup = document.querySelector(".deletion-modal");
  confirmDeletionBtn = document.querySelector(".deletion-modal__button--delete");
  cancelDeletionBtn = document.querySelector(".deletion-modal__button--cancel");
  notesContainer = document.querySelector(".notes__container");
  notesPanel = document.querySelector(".notes__panel");
  notesShadow = document.querySelector(".notes__shadow");
  notesInput = document.querySelector(".notes__panel-input");
  notesSelect = document.querySelector(".notes__panel-select");
  notesTextarea = document.querySelector(".notes__panel-text");
  searchInput = document.querySelector(".search-box__input");
  searchButton = document.querySelector(".search-box__button");
  searchCancelButton = document.querySelector(".search-box__button--cancel");
  error = document.querySelector(".notes__panel-error");
}

const prepareDOMEvents = () => {
  addNoteButton.addEventListener("click", openPanel);
  cancelButton.addEventListener("click", closePanel);
  saveButton.addEventListener("click", addNote);
  deleteAllButton.addEventListener("click", openConfirmPopup);
  confirmDeletionBtn.addEventListener("click", deleteAllNotes);
  cancelDeletionBtn.addEventListener("click", closeConfirmPopup);
  // searchInput.addEventListener("input", searchNotes);
  searchButton.addEventListener("click", searchForNotes);
  searchCancelButton.addEventListener("click", cancelSearching);
  // window.addEventListener("click", (event) => event.target === notesShadow ? closePanel() : false);
}

const setFooterYear = () => {
  const now = new Date();
  footerYear.textContent = now.getFullYear();
}

const setDateAndTime = () => {
  const now = new Date();

  const formatOptions = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };

  hourSpan.textContent = now.toLocaleTimeString();
  dateSpan.textContent = now.toLocaleDateString("en-US", formatOptions);
}

const updateDateAndTime = () => setInterval(setDateAndTime, 1000);

const openPanel = () => {
  notesPanel.classList.add("active", "animation-in");
  notesShadow.classList.add("active", "animation-in");
}

const closePanel = () => {
  notesPanel.classList.remove("active", "animation-in");
  notesShadow.classList.remove("active", "animation-in");

  notesInput.value = "";
  notesSelect.value = "default";
  notesTextarea.value = "";
  error.style.display = "none";
}

const addNote = () => {
  if (notesInput.value !== "" && notesSelect.value !== "default" && notesTextarea.value !== "") {
    clearError();
    createNote();
  } else if (notesInput.value === "") {
    displayError("Enter your note's title!");
  } else if (notesSelect.value === "default") {
    displayError("Select your note's category!");
  } else if (notesTextarea.value === "") {
    displayError("Enter your note's content!");
  }
}

const createNote = () => {
  const selectedValue = notesSelect.options[notesSelect.selectedIndex];
  const notesTemplate = document.querySelector(".notes__template").content.cloneNode(true);

  const note = notesTemplate.querySelector(".notes__note");
  // Ustaw ID notatki:
  note.setAttribute("id", `note-${noteId}`);
  // Ustaw tytuł notatki:
  note.querySelector(".notes__title").textContent = notesInput.value;
  // Ustaw kategorię notatki:
  note.querySelector(".notes__category").innerHTML = `<b>Category:</b> ${selectedValue.textContent}`;
  // Ustaw treść notatki:
  note.querySelector(".notes__body").innerHTML = `<b>Details:</b> ${notesTextarea.value}`;
  // Ustaw atrybut "onclick" dla przycisku usuwania notatki:
  note.querySelector(".notes__delete-btn").setAttribute("onclick", `deleteNote(${noteId})`);
  // Dodaj notatke do listy notatek:
  notesContainer.appendChild(note);

  noteId += 1;
  searchResults.push(notesInput.value);
  closePanel();
}

const displayError = (message) => {
  error.textContent = message;
  error.style.display = "block";
}

const clearError = () => {
  error.textContent = "";
  error.style.display = "none";
}

const searchForNotes = () => {
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
      const noteTitle = note.querySelector(".notes__title").textContent;
      noteTitle.toLowerCase() === result.toLowerCase() ? note.style.display = "block" : false
    });
  });
}

const cancelSearching = () => {
  searchInput.value = "";

  const allNotes = document.querySelectorAll(".notes__note");
  allNotes.forEach((note) => note.style.display = "block");

  searchResults = [];
}

const deleteNote = (noteId) => {
  const noteToRemove = document.getElementById(`note-${noteId}`);
  notesContainer.removeChild(noteToRemove);
}

const openConfirmPopup = () => {
  deletionConfirmationPopup.classList.add("active", "animation-in");
  notesShadow.classList.add("active", "animation-in");
}

const closeConfirmPopup = () => {
  deletionConfirmationPopup.classList.remove("active", "animation-in");
  notesShadow.classList.remove("active", "animation-in");
}

const deleteAllNotes = () => {
  const allNotes = notesContainer.querySelectorAll(".notes__note");
  allNotes.forEach((note) => notesContainer.removeChild(note));
  
  searchResults.length = 0;
  closeConfirmPopup();
}

document.addEventListener("DOMContentLoaded", main);