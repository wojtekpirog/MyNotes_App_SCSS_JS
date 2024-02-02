let hamburger;
let currentYear;
let navbarLinks;
let mainContent;

const date = new Date();
const fullYear = date.getFullYear();

const main = () => { 
  prepareDOMElements();
  prepareDOMEvents();  
}

const prepareDOMElements = () => {
  hamburger = document.querySelector("div.hamburger-menu > img");
  currentYear = document.querySelector("span.year");
  navbarLinks = document.querySelector("div.navbar-links > ul");
  currentYear.textContent = fullYear;
}

const prepareDOMEvents = () => {
  hamburger.addEventListener("click", toggleSidebar);
}

const toggleSidebar = () => {
  if (navbarLinks.classList.contains("sidebar-collapse")) {
    closeSidebar();
    hamburger.setAttribute("src", "./assets/images/hamburger.svg");
  } else {
    openSidebar();
    hamburger.setAttribute("src", "./assets/images/x.svg");
  }
}

const closeSidebar = () => {
  navbarLinks.classList.remove("sidebar-collapse");
}

const openSidebar = () => {
  navbarLinks.classList.add("sidebar-collapse");
}

document.addEventListener("DOMContentLoaded", main);