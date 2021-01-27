const controlSection = document.getElementById("control-section");
const viewSection = document.getElementById("view-section");
const prioritySelector = document.getElementById("priority-selector");
const theList = document.getElementById("the-list");
const addButton = document.getElementById("add-button");
const textInput = document.getElementById("text-input");
const counter = document.getElementById("counter");
const sortButton = document.getElementById("sort-button");
const toDoArray = [];

// creating the divs and appending it to the list in the view section
function divCreator(priority, date, content) {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-container");
  const todoText = document.createElement("div");
  todoText.classList.add("todo-text");
  todoText.innerText = content + " ";
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
    date.getSeconds() +
    " ";
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
//adding a todo container to the list
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
  counter.innerText = toDoArray.length;
  const myJson = JSON.stringify(toDoArray);
  localStorage.setItem("my-todo", myJson);
}

addButton.addEventListener("click", addToDo);
// sorting the list by priority
function sort() {
  toDoArray.sort((a, b) => {
    return b["priority"] - a["priority"];
  });
  const todoContainers = document.querySelectorAll("li");
  for (let list of todoContainers) {
    list.remove();
  }
  for (let todo of toDoArray) {
    divCreator(todo["priority"], todo["date"], todo["content"]);
  }
}
sortButton.addEventListener("click", sort);
