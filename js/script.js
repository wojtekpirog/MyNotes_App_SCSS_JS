let currentYear;
let hourSpan;
let dateSpan;
let addNoteButton;
let deleteAllButton;

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
  deleteAllButton = document.querySelector(".menu__button--delete");
}

const prepareDOMEvents = () => {
  addNoteButton.addEventListener("click", addNote);
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

const addNote = () => {
  console.log("addNote");
}

document.addEventListener("DOMContentLoaded", main);