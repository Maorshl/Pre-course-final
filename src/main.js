"use strict";
// const myKey = "$2b$10$BGGGF8ElZbzLBwv5fGJ5zOtgmBQcZgpCYvK6RJuDfjxK/ZU4vFt6.";
// let id = "60166ab713b20d48e8bf6d48";
// const apiUrl = `https://api.jsonbin.io/v3/b/${id}/latest`;

const controlSection = document.getElementById("control-section");
const viewSection = document.getElementById("view-section");
const prioritySelector = document.getElementById("priority-selector");
const theList = document.getElementById("the-list");
const addButton = document.getElementById("add-button");
const textInput = document.getElementById("text-input");
const counter = document.getElementById("counter");
const sortButton = document.getElementById("sort-button");
let listIndex = 0;
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
  listIndex = 0;
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
// creating the divs and the elements inside and appending it to the list in the view section
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
  deleteButton.classList.add("delete-button", `${listIndex}`);
  deleteIcon.innerText = "delete";
  deleteButton.addEventListener("click", () => {
    todoContainer.parentNode.style.display = "none";
    toDoArray["my-todo"].splice(deleteButton.classList[1], 1);
    localStorage.setItem("my-array", JSON.stringify(toDoArray));
  });
  const check = document.createElement("input");
  check.classList.add("check-box");
  check.setAttribute("type", "checkbox");
  todoContainer.appendChild(check);
  todoContainer.appendChild(todoText);
  todoContainer.appendChild(todoCreatedAt);
  todoContainer.appendChild(todoPriority);
  todoContainer.appendChild(deleteButton);
  deleteButton.appendChild(deleteIcon);
  const li = document.createElement("li");
  li.appendChild(todoContainer);
  theList.appendChild(li);
  listIndex++;
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
textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addButton.click();
  }
});
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
  listIndex = 0;
  localStorage.setItem("my-array", JSON.stringify(toDoArray));
}
sortButton.addEventListener("click", sort);

// async function post() {
//   let response = await fetch(apiUrl, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Master-Key": myKey,
//     },
//     body: JSON.stringify(toDoArray),
//   });
//   response = await response.json();
//   console.log(response["metadata"]["id"]);
// }
// post();
// async function getTasks() {
//   const response = await fetch(apiUrl, {
//     method: "GET",
//     headers: {
//       "X-Master-Key": xKey,
//     },
//   });
//   return response["record"];
// }

// async function setTasks(data) {
//   const response = await fetch(apiUrl, {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "X-Master-Key": xKey,
//     },
//     body: JSON.stringify(data),
//   });
// }
