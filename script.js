let hamburger;
let currentYear;
let navbarLinks;
let mainContent;

const date = new Date();
const fullYear = date.getFullYear();

const main = () => {
  prepareDOMElements();
  prepareDOMEvents();
  setCurrentYear();
}

const prepareDOMElements = () => {
  hamburger = document.querySelector("div.hamburger-menu > img");
  currentYear = document.querySelector("span.year");
  navbarLinks = document.querySelector("div.navbar-links > ul");
  mainContent = document.querySelector("main");
}

const prepareDOMEvents = () => {
  hamburger.addEventListener("click", toggleSidebar);
  mainContent.addEventListener("click", closeSidebar);
}

const setCurrentYear = () => {
  currentYear.textContent = fullYear;  
}

const toggleSidebar = () => {
  navbarLinks.classList.toggle("sidebar-collapse");
}

const closeSidebar = () => {
  if (navbarLinks.classList.contains("sidebar-collapse")) {
    navbarLinks.classList.remove("sidebar-collapse");
  }
}

document.addEventListener("DOMContentLoaded", main);