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
// Notes shadow
let shadow;
// Note creation panel
let notesPanelTemplate;
let notesPanel;
let notesInput;
let notesSelect;
let notesTextarea;
// Notes creation error
let panelError;
// Note panel buttons
let saveButton;
let cancelButton;
// Search box
let searchInput;
let searchButton;
let clearSearchBarBtn;
// Note edition panel
let editPanelTemplate;
let editPanel;
let editPanelInput;
let editPanelSelect;
let editPanelTextarea;
// Notes edition error
// let editionPanelError;
// Każda notatka będzie miała własny, unikalny identyfikator:
let noteId = 0;
// Ikonka kategorii
let categoryIcon;

const main = () => { 
  prepareDOMElements();
  prepareDOMEvents();
  setFooterYear();
  setDateAndTime();
  updateDateAndTime();
}

const prepareDOMElements = () => {
  // Footer year
  footerYear = document.querySelector(".footer__year");
  // time box
  hourSpan = document.querySelector(".menu__date > span");
  dateSpan = document.querySelector(".menu__time > span");
  // Add note button
  addNoteButton = document.querySelector(".menu__button--add");
  // Delete all notes button
  deleteAllButton = document.querySelector(".menu__button--delete");
  // Popup with warning
  deletionConfirmationPopup = document.querySelector(".deletion-modal");
  confirmDeletionBtn = document.querySelector(".deletion-modal__button--delete");
  cancelDeletionBtn = document.querySelector(".deletion-modal__button--cancel");
  // Note edition panel
  editPanelTemplate = document.querySelector(".notes-panel-template").content.cloneNode(true);
  editPanel = editPanelTemplate.querySelector(".notes__panel");
  editPanelInput = editPanel.querySelector(".notes__panel-input");
  editPanelSelect = editPanel.querySelector(".notes__panel-select");
  editPanelTextarea = editPanel.querySelector(".notes__panel-text");
  // Notes edition error
  // editionPanelError = editPanel.querySelector(".notes__panel-error");
  // Insert notes edition panel into DOM
  deletionConfirmationPopup.insertAdjacentElement("afterend", editPanel);
  // Container for notes
  notesContainer = document.querySelector(".notes__container");
  // Notes shadow
  shadow = document.querySelector(".notes__shadow");
  // Note creation panel
  notesPanelTemplate = document.querySelector(".notes-panel-template").content.cloneNode(true);
  notesPanel = notesPanelTemplate.querySelector(".notes__panel");
  notesInput = notesPanel.querySelector(".notes__panel-input");
  notesSelect = notesPanel.querySelector(".notes__panel-select");
  notesTextarea = notesPanel.querySelector(".notes__panel-text");
  // Notes creation error
  panelError = notesPanel.querySelector(".notes__panel-error");
  // Insert notes creation panel into DOM
  notesContainer.insertAdjacentElement("afterend", notesPanel);
  // Note panel buttonsexi
  saveButton = document.querySelector(".notes__panel-button--save");
  cancelButton = document.querySelector(".notes__panel-button--cancel");
  // Search box
  searchInput = document.querySelector(".search-box__input");
  searchButton = document.querySelector(".search-box__button");
  clearSearchBarBtn = document.querySelector(".search-box__button--clear");
}

const prepareDOMEvents = () => {
  addNoteButton.addEventListener("click", () => openPanel(notesPanel));
  saveButton.addEventListener("click", addNote);
  cancelButton.addEventListener("click", closePanel);
  deleteAllButton.addEventListener("click", openConfirmPopup);
  confirmDeletionBtn.addEventListener("click", deleteAllNotes);
  cancelDeletionBtn.addEventListener("click", closeConfirmPopup);
  searchInput.addEventListener("keyup", searchForNotes);
  // searchButton.addEventListener("click", searchForNotes);
  // clearSearchBarBtn.addEventListener("click", clearSearchBar);
  // window.addEventListener("click", (event) => event.target === shadow && closePanel());
  window.addEventListener("click", (event) => event.target === shadow && closePanel());
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
  shadow.classList.add("active", "animation-in");
}

const closePanel = () => {
  notesPanel.classList.remove("active", "animation-in");
  shadow.classList.remove("active", "animation-in");

  notesInput.value = "";
  notesSelect.value = "default";
  notesTextarea.value = "";
  clearError();
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
  const selectedValue = notesSelect.options[notesSelect.selectedIndex].textContent;
  const notesTemplate = document.querySelector(".notes__template").content.cloneNode(true);
  const note = notesTemplate.querySelector(".notes__note");

  // Dobierz ikonę kategorii:
  getCategoryIcon(selectedValue);
  // Ustaw ID notatki:
  note.setAttribute("id", `note-${noteId}`);
  // Ustaw tytuł notatki:
  note.querySelector(".notes__title").innerHTML = `${categoryIcon} ${notesInput.value}`;
  // Ustaw kategorię notatki:
  note.querySelector(".notes__category").innerHTML = `<b>Category:</b> ${selectedValue}`;
  // Ustaw treść notatki:
  note.querySelector(".notes__body").innerHTML = `<b>Body:</b> ${notesTextarea.value}`;
  // Ustaw atrybut "onclick" dla przycisku do edytowania notatki:
  note.querySelector(".notes__edit-btn").setAttribute("onclick", `openEditionPanel(${noteId})`);
  // Ustaw atrybut "onclick" dla przycisku usuwania notatki:
  note.querySelector(".notes__delete-btn").setAttribute("onclick", `deleteNote(${noteId})`);
  // Dodaj notatke do listy notatek:
  notesContainer.appendChild(note);

  noteId += 1;
  closePanel();
}

const getCategoryIcon = (selectedValue) => {
  switch (selectedValue) {
    case "Shopping":
      categoryIcon = `<i class="fas fa-shopping-cart"></i>`;
      break;
    case "Work":
      categoryIcon = `<i class="fas fa-briefcase"></i>`;
      break;
    case "House":
      categoryIcon = `<i class="fas fa-home"></i>`;
      break;
    case "Gym":
      categoryIcon = `<i class="fas fa-dumbbell"></i>`;
      break;
    case "Other":
      categoryIcon = `<i class="fas fa-pen"></i>`;
      break;
  }
}

const displayError = (message) => {
  panelError.textContent = message;
  panelError.style.display = "block";
}

const clearError = () => {
  panelError.textContent = "";
  panelError.style.display = "none";
}

const searchForNotes = (event) => {
  const allNotes = document.querySelectorAll(".notes__note");
  const searchText = event.target.value.toLowerCase();

  allNotes.forEach((note) => {
    const notesTitle = note.querySelector(".notes__title").textContent.toLowerCase();

    if (notesTitle.indexOf(searchText) !== -1) {
      note.style.display = "block";
    } else {
      note.style.display = "none";
    }
  });
}

const clearSearchBar = () => {
  if (searchInput.value !== "") {
    const allNotes = document.querySelectorAll(".notes__note");
    allNotes.forEach((note) => note.style.display = "block");
    searchInput.value = "";
  }
}

const deleteNote = (noteId) => {
  const noteToRemove = document.getElementById(`note-${noteId}`);
  notesContainer.removeChild(noteToRemove);
}

const openEditionPanel = (noteId) => {
  editPanel.classList.add("active", "animation-in");
  shadow.classList.add("active", "animation-in");
  // Pobierz przyciski do zatwierdzenia i anulowania zmian:
  const saveChangesButton = editPanel.querySelector(".notes__panel-button--save");
  const cancelChangesButton = editPanel.querySelector(".notes__panel-button--cancel");
  // Pobierz notatke do edycji:
  const noteToEdit = document.getElementById(`note-${noteId}`);
  // Uzupełnij pola edycyjne danymi z notatki:
  console.log(noteToEdit.querySelector(".notes__title").textContent);
  console.log(noteToEdit.querySelector(".notes__category").textContent);
  console.log(noteToEdit.querySelector(".notes__body").textContent);

  editPanelInput.value = noteToEdit.querySelector(".notes__title").textContent.slice(1);
  editPanelSelect.value = noteToEdit.querySelector(".notes__category").textContent.slice(10).toLowerCase();
  editPanelTextarea.value = noteToEdit.querySelector(".notes__body").textContent.slice(6);
  // Dodaj zdarzenie klikniecia na przycisk zatwierdzenia zmian:
  saveChangesButton.addEventListener("click", () => editNote(noteToEdit));
  // Dodaj zdarzenie klikniecia na przycisk anulowania zmian:
  cancelChangesButton.addEventListener("click", closeEditionPanel);
}

const editNote = (noteToEdit) => {
  // Pobierz nazwę opcji wyboru z listy rozwijanej:
  const selectedValue = editPanelSelect.options[editPanelSelect.selectedIndex].textContent;
  // Dobierz ikonę kategorii:
  getCategoryIcon(selectedValue);

  if (editPanelInput.value !== "" && editPanelSelect.value !== "default" && editPanelTextarea.value !== "") {
    // Ustaw nowy tytuł notatki:
    noteToEdit.querySelector(".notes__title").innerHTML = `${categoryIcon} ${editPanelInput.value}`;
    // Ustaw nową kategorię notatki:
    noteToEdit.querySelector(".notes__category").innerHTML = `<b>Category:</b> ${selectedValue}`;
    // Ustaw nową treść notatki:
    noteToEdit.querySelector(".notes__body").innerHTML = `<b>Body:</b> ${editPanelTextarea.value}`;
  } else if (editPanelInput.value === "") {
    displayError("Enter your note's title!");
  } else if (editPanelSelect.value === "default") {
    displayError("Select your note's category!");
  } else if (editPanelTextarea.value === "") {
    displayError("Enter your note's content!");
  }
}

const closeEditionPanel = () => {
  editPanel.classList.remove("active", "animation-in");
  shadow.classList.remove("active", "animation-in");

  editPanelInput.value = "";
  editPanelSelect.value = "default";
  editPanelTextarea.value = "";
  clearError();
}

const openConfirmPopup = () => {
  deletionConfirmationPopup.classList.add("active", "animation-in");
  shadow.classList.add("active", "animation-in");
}

const closeConfirmPopup = () => {
  deletionConfirmationPopup.classList.remove("active", "animation-in");
  shadow.classList.remove("active", "animation-in");
}

const deleteAllNotes = () => {
  const allNotes = notesContainer.querySelectorAll(".notes__note");
  allNotes.forEach((note) => notesContainer.removeChild(note));
  closeConfirmPopup();
}

document.addEventListener("DOMContentLoaded", main);