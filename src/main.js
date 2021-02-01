"use strict";
let isdarkmode = false;
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

function elementCreator(tagName, className, innerText = null) {
  const element = document.createElement(tagName);
  element.classList.add(className);
  if (innerText) {
    element.innerText = innerText;
  }
  return element;
}
// creating the divs and the elements inside and appending it to the list in the view section
function divCreator(priority, date, content) {
  const todoContainer = elementCreator("div", "todo-container");

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button", `${listIndex}`);
  deleteButton.addEventListener("click", () => {
    todoContainer.parentNode.style.display = "none";
    toDoArray["my-todo"].splice(deleteButton.classList[1], 1);
    counter.innerText = toDoArray["my-todo"].length;
    localStorage.setItem("my-array", JSON.stringify(toDoArray));
  });

  const check = document.createElement("input");
  check.classList.add("check-box", `${listIndex}`);
  check.setAttribute("type", "checkbox");

  todoContainer.appendChild(check);
  todoContainer.appendChild(elementCreator("div", "todo-text", content));
  todoContainer.appendChild(elementCreator("div", "todo-created-at", date));
  todoContainer.appendChild(elementCreator("div", "todo-priority", priority));
  todoContainer.appendChild(deleteButton);
  deleteButton.appendChild(elementCreator("i", "material-icons", "delete"));

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

const appearanceChange = (dark, imageUrl, bodyColor, listColor, buttonText) => {
  isdarkmode = dark;
  const darkModeButton = document.getElementById("dark-mode");
  const li = document.getElementsByTagName("LI");
  const h1 = document.getElementById("h1");
  document.body.style.backgroundImage = `url('./${imageUrl}')`;
  document.body.style.color = bodyColor;
  h1.style.color = bodyColor;
  for (let i = 0; i < li.length; i++) {
    li[i].style.backgroundColor = listColor;
  }
  darkModeButton.innerText = buttonText;
};

function darkmode() {
  if (!isdarkmode) {
    appearanceChange(
      true,
      "darkmode background.jpg",
      "white",
      "#7E8B91",
      "Bright Mode"
    );
  } else {
    appearanceChange(
      false,
      "background.jpg",
      "black",
      " rgba(248, 249, 250, 0.6)",
      "Dark Mode"
    );
  }
}
const darkModeButton = document.getElementById("dark-mode");
darkModeButton.addEventListener("click", darkmode);
