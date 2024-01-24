const currentYear = document.querySelector("span.year");
const hamburger = document.querySelector("div.hamburger-menu > img");

const date = new Date();
const fullYear = date.getFullYear();

currentYear.textContent = fullYear;