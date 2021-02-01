"use strict";
const myKey = "$2b$10$BGGGF8ElZbzLBwv5fGJ5zOtgmBQcZgpCYvK6RJuDfjxK/ZU4vFt6.";
let id = "60166ab713b20d48e8bf6d48";
const apiUrl = `https://api.jsonbin.io/v3/b/${id}`;

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
async function onload() {
  const saved = await getTasks();
  for (let todo of saved["my-todo"]) {
    divCreator(todo["priority"], todo["date"], todo["text"]);
    toDoArray = saved;
    counter.innerText = toDoArray["my-todo"].length;
  }
  listIndex = 0;
}
onload();

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
    setTasks(toDoArray);
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
    text: textInput.value,
  });
  divCreator(
    toDoArray["my-todo"][toDoArray["my-todo"].length - 1]["priority"],
    toDoArray["my-todo"][toDoArray["my-todo"].length - 1]["date"],
    toDoArray["my-todo"][toDoArray["my-todo"].length - 1]["text"]
  );
  textInput.value = "";
  textInput.focus();
  counter.innerText = toDoArray["my-todo"].length;
  setTasks(toDoArray);
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
    divCreator(todo["priority"], todo["date"], todo["text"]);
  }
  listIndex = 0;
  setTasks(toDoArray);
}
sortButton.addEventListener("click", sort);

async function getTasks() {
  let response = await fetch(`${apiUrl}/latest`, {
    method: "GET",
    headers: {
      "X-Master-Key": myKey,
    },
  });
  response = await response.json();
  return response["record"];
}

async function setTasks(data) {
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      referer: "",
      "Content-Type": "application/json",
      "X-Master-Key": myKey,
    },
    body: JSON.stringify(data),
  });
  return response.json();
}

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
