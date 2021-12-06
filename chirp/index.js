const menuCloser = document.querySelector('.menuCloser');
const menuDiv = document.querySelector('.menuDiv');
const content = document.querySelector('.content');
const header = document.querySelector('.header');
const featureContainer = document.querySelector('.featureContainer');
const customerSectionContainer = document.querySelector('.customerSectionContainer');
const pricePlanContainer = document.querySelector('.pricePlanContainer');

function toggleMenu(event) {
    menuDiv.classList.toggle('menuDivActive');
    menuCloser.classList.toggle('menuCloserActive');
    event.stopPropagation();
}

function doNothing(event) {
    event.stopPropagation();
}
window.onscroll = function() {
    let top = document.documentElement.scrollTop;
    if (top > pricePlanContainer.offsetTop - header.offsetHeight) {
        header.style.backgroundColor = '#fff';
    } else if (top > customerSectionContainer.offsetTop - header.offsetHeight) {
        header.style.backgroundColor = '#d7f5f5';
    } else if (top > featureContainer.offsetTop - header.offsetHeight) {
        header.style.backgroundColor = '#fff';
    }
    if (top < featureContainer.offsetTop - header.offsetHeight) {
        header.style.backgroundColor = "#fbf8f3";
    }



}