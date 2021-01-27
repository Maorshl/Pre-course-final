const controlSection = document.getElementById("control-section");
const viewSection = document.getElementById("view-section");
const prioritySelector = document.getElementById("priority-selector");
const theList = document.getElementById("the-list");
const addButton = document.getElementById("add-button");
let textInput = document.getElementById("text-input");
const toDoArray = [];

function divCreator(priority, date, content) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  todoText.innerText = content;
  const todoCreatedAt = document.createElement("div");
  todoCreatedAt.classList.add("todo-created-at");
  todoCreatedAt.innerText =
    date.getFullYear() +
    "-" +
    date.getMonth() +
    1 +
    "-" +
    date.getDate() +
    " " +
    date.getHours() +
    ":" +
    date.getMinutes() +
    ":" +
    date.getSeconds();
  const todoPriority = document.createElement("div");
  todoPriority.classList.add("todo-priority");
  todoPriority.innerText = priority;
  todoContainer.appendChild(todoText);
  todoContainer.appendChild(todoCreatedAt);
  todoContainer.appendChild(todoPriority);
  const li = document.createElement("li");
  li.appendChild(todoContainer);
  theList.appendChild(li);
}

function addToDo() {
  toDoArray.push({
    priority: prioritySelector.value,
    date: new Date(),
    content: textInput.value,
  });
  divCreator(
    toDoArray[toDoArray.length - 1]["priority"],
    toDoArray[toDoArray.length - 1]["date"],
    toDoArray[toDoArray.length - 1]["content"]
  );
  textInput.value = "";
  textInput.focus();
}

addButton.addEventListener("click", addToDo);
