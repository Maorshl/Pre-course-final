const controlSection = document.getElementById("control-section");
const viewSection = document.getElementById("view-section");
const prioritySelector = document.getElementById("priority-selector");
const theList = document.getElementById("the-list");
const addButton = document.getElementById("add-button");
const textInput = document.getElementById("text-input");
const counter = document.getElementById("counter");
const sortButton = document.getElementById("sort-button");
let toDoArray = {
  "my-todo": [],
};
function onload() {
  const saved = JSON.parse(localStorage.getItem("my-array"));
  for (let todo of saved["my-todo"]) {
    divCreator(todo["priority"], todo["date"], todo["content"]);
    toDoArray = saved;
    counter.innerText = toDoArray["my-todo"].length;
  }
}
if (localStorage.getItem("my-array") !== null) {
  onload();
}

function elementCreator(element, className, text = null, appendTo = null) {
  const todoText = document.createElement(element);
  todoText.classList.add(className);
  todoText.innerText = text;
  appendTo.appendChild(todoText);
}
// creating the divs and appending it to the list in the view section
function divCreator(priority, date, content) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  todoText.innerText = content;
  const todoCreatedAt = document.createElement("div");
  todoCreatedAt.classList.add("todo-created-at");
  todoCreatedAt.innerText = date;
  const todoPriority = document.createElement("div");
  todoPriority.classList.add("todo-priority");
  todoPriority.innerText = priority;
  const deleteButton = document.createElement("button");
  const deleteIcon = document.createElement("i");
  deleteIcon.classList.add("material-icons");
  deleteButton.classList.add("delete-button");
  deleteIcon.innerText = "delete";
  deleteButton.addEventListener("click", () => {
    todoContainer.parentNode.style.display = "none";
  });
  todoContainer.appendChild(todoText);
  todoContainer.appendChild(todoCreatedAt);
  todoContainer.appendChild(todoPriority);
  todoContainer.appendChild(deleteButton);
  deleteButton.appendChild(deleteIcon);
  const li = document.createElement("li");
  li.appendChild(todoContainer);
  theList.appendChild(li);
}
//adding a todo container to the list
function addToDo() {
  toDoArray["my-todo"].push({
    priority: prioritySelector.value,
    date: new Date().toLocaleString("en-GB"),
    content: textInput.value,
  });
  divCreator(
    toDoArray["my-todo"][toDoArray["my-todo"].length - 1]["priority"],
    toDoArray["my-todo"][toDoArray["my-todo"].length - 1]["date"],
    toDoArray["my-todo"][toDoArray["my-todo"].length - 1]["content"]
  );
  textInput.value = "";
  textInput.focus();
  counter.innerText = toDoArray["my-todo"].length;
  localStorage.setItem("my-array", JSON.stringify(toDoArray));
}

addButton.addEventListener("click", addToDo);

// sorting the list by priority
function sort() {
  toDoArray["my-todo"].sort((a, b) => {
    return b["priority"] - a["priority"];
  });
  const todoContainers = document.querySelectorAll("li");
  for (let list of todoContainers) {
    list.remove();
  }
  for (let todo of toDoArray["my-todo"]) {
    divCreator(todo["priority"], todo["date"], todo["content"]);
  }
  localStorage.setItem("my-array", JSON.stringify(toDoArray));
}
sortButton.addEventListener("click", sort);
