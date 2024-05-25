let hamburger;
let currentYear;
let navbarLinks;
let mainContent;

const main = () => { 
  prepareDOMElements();
  prepareDOMEvents();  
}

const prepareDOMElements = () => {
  hamburger = document.querySelector("div.hamburger-menu > img");
  currentYear = document.querySelector("span.year");
  navbarLinks = document.querySelector("div.navbar-links > ul");
}

const prepareDOMEvents = () => {
  hamburger.addEventListener("click", toggleSidebar);
}

document.addEventListener("DOMContentLoaded", main);