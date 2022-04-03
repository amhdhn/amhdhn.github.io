const supportMobile = document.querySelector(".supportMobile");
const modalContainer = document.querySelector(".modalContainer");
const addNewToDoElem = document.querySelector(".addNewToDo");
const closeModalElem = document.querySelector(".closeModal");
const modalInput = document.querySelector(".modalInput");
const modalSubmit = document.querySelector(".modalSubmit");
const notStartedElem = document.querySelector(".notStarted");
const inProgressElem = document.querySelector(".inProgress");
const finishedElem = document.querySelector(".finished");

let idCounter = 0;

let toDosArray = [];

window.addEventListener("load", loadTodoFromStorage)
    // check for mobile
let isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

if (isMobile) {
    supportMobile.style.display = "flex";
}

addNewToDoElem.addEventListener("click", showModal);
closeModalElem.addEventListener('click', closeModal);
modalContainer.addEventListener('click', closeModal);
modalSubmit.addEventListener("click", function() {
    addNewToDo(modalInput.value, notStartedElem);
    modalInput.value = "";
    closeModal();
});
modalInput.addEventListener("keydown", function(event) {
    if (event.key === "Enter") {
        addNewToDo(modalInput.value, notStartedElem);
        modalInput.value = "";
        closeModal();
    }
});
notStartedElem.addEventListener("dragover", disableDragOver);
inProgressElem.addEventListener("dragover", disableDragOver);
finishedElem.addEventListener("dragover", disableDragOver);
notStartedElem.addEventListener("drop", () => dropHandler(event, notStartedElem));
inProgressElem.addEventListener("drop", () => dropHandler(event, inProgressElem));
finishedElem.addEventListener("drop", () => dropHandler(event, finishedElem));

function dropHandler(event, nextParent) {

    let elementId = event.dataTransfer.getData("elementId");
    let itemToMove = document.getElementById(elementId);

    let primitiveParent = document.querySelector("." + event.dataTransfer.getData("parent"));

    if (primitiveParent !== nextParent) {
        nextParent.appendChild(itemToMove);
        toDosArray.find(item => {
            if (item.id === itemToMove.id) {
                item.parentCode = nextParent.dataset.code;
                return true;
            }
        });
        localStorage.todos = JSON.stringify(toDosArray);
    }

}

function disableDragOver(event) {
    event.preventDefault();
}

function showModal() {
    modalContainer.style.display = "flex";
}

function closeModal() {
    modalContainer.style.display = "none";
}

function preventClick(event) {
    event.stopPropagation();
}


function addNewToDo(todoContent, parentToInsert) {

    let newId = "toDo" + idCounter;

    let newTodoElem = document.createElement("p");
    newTodoElem.classList.add("toDoItem");
    newTodoElem.innerText = todoContent;
    newTodoElem.id = newId;
    newTodoElem.draggable = true;
    newTodoElem.addEventListener("dragstart", function(event) {
        event.dataTransfer.setData("elementId", newId);
        event.dataTransfer.setData("parent", event.target.parentNode.classList);
    });

    let toDoRemoveBtn = document.createElement("span");
    toDoRemoveBtn.classList.add("toDoRemove");
    toDoRemoveBtn.innerText = "close";
    toDoRemoveBtn.addEventListener("click", function(event) {
        // create animation to before Delete todo
        event.target.parentNode.style.height = "0";
        event.target.parentNode.style.marginTop = "0";
        event.target.parentNode.style.marginBottom = "0";

        // remove todod after animation
        let animationDuration = 620;

        setTimeout(() => {
            // remove from toDosArray
            let itemIndex = toDosArray.findIndex(function(item) {
                return item.id == event.target.parentNode.id;
            });
            toDosArray.splice(itemIndex, 1);
            localStorage.todos = JSON.stringify(toDosArray);

            // remove element from parent
            event.target.parentNode.remove();
        }, animationDuration);
    });

    newTodoElem.appendChild(toDoRemoveBtn);
    parentToInsert.appendChild(newTodoElem);

    // insert todo info to toDosArray
    let todoObject = {
        content: todoContent,
        id: newId,
        parentCode: parentToInsert.dataset.code
    }
    toDosArray.push(todoObject);

    // save to local storage 
    localStorage.todos = JSON.stringify(toDosArray);

    idCounter++;

}

function loadTodoFromStorage() {
    if (localStorage.todos) {
        let dataInStorage = JSON.parse(localStorage.todos);

        // create element 
        let itemParent;
        let content;
        dataInStorage.forEach(item => {
            let itemParent = defineParent(+item.parentCode);
            let content = item.content;
            addNewToDo(content, itemParent);
        });
    }
}

function defineParent(parentCode) {
    switch (parentCode) {
        case 1:
            return notStartedElem;
        case 2:
            return inProgressElem;
        case 3:
            return finishedElem;
    }
}