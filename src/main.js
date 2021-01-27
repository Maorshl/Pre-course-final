const controlSection = document.getElementById("control-section");
const viewSection = document.getElementById("view-section");
const prioritySelector = document.getElementById("priority-selector");
const theList = document.getElementById("the-list");
const addButton = document.getElementById("add-button");
let textInput = document.getElementById("text-input");
const toDoArray = [];

function divCreator(priority, date, content) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add = "todo-container";
  const todoPriority = document.createElement("div");
  todoPriority.classList.add = "todo-priority";
  todoPriority.innerText = priority;
  const todoCreatedAt = document.createElement("div");
  todoCreatedAt.classList.add = "todo-created-at";
  todoCreatedAt.innerText = date;
  const todoText = document.createElement("div");
  todoText.classList.add = "todo-text";
  todoText.innerText = content;

  todoContainer.appendChild(todoPriority);
  todoContainer.appendChild(todoCreatedAt);
  todoContainer.appendChild(todoText);
  viewSection.appendChild(todoContainer);
}

function addToDo() {
  toDoArray.push({
    priority: prioritySelector.value,
    date: new Date(),
    content: textInput.value,
  });

  todoContainer.innerText = "nisan";
}

addButton.addEventListener("click", addToDo);
