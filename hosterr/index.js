const centerHeaderSection = document.querySelector('.centerHeaderSection');
const rightHeaderSection = document.querySelector('.rightHeaderSection');

function menuToggle(event) {
    centerHeaderSection.classList.toggle('centerHeaderSectionActive');
    rightHeaderSection.classList.toggle('rightHeaderSectionActive');
    event.stopPropagation();
}