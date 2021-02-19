"use strict";
const myKey = "$2b$10$BGGGF8ElZbzLBwv5fGJ5zOtgmBQcZgpCYvK6RJuDfjxK/ZU4vFt6.";
let id = "40f5d658-c182-4662-a997-22b5279930f3";
const apiUrl = `http://localhost:3000/b/${id}`;

let isdarkmode = false;
const controlSection = document.getElementById("control-section");
const viewSection = document.getElementById("view-section");
const prioritySelector = document.getElementById("priority-selector");
const theList = document.getElementById("the-list");
const addButton = document.getElementById("add-button");
const textInput = document.getElementById("text-input");
const counter = document.getElementById("counter");
const sortButton = document.getElementById("sort-button");
const loading = document.getElementById("lds-ring");
let listIndex = 0;
let toDoArray = {
  "my-todo": [],
};

async function onload() {
  loading.style.display = "block";
  const saved = await getTasks();
  for (let todo of saved["my-todo"]) {
    divCreator(todo["priority"], todo["date"], todo["text"]);
    toDoArray = saved;
    counter.innerText = toDoArray["my-todo"].length;
  }
  listIndex = 0;
  loading.style.display = "none";
}
try {
  onload();
} catch (error) {
  console.error(error);
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
  const textContainer = elementCreator("div", "todo-text", content)

  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button", `${listIndex}`);
  deleteButton.addEventListener("click", () => {
    toDoArray["my-todo"].splice(deleteButton.classList[1], 1);
    removeAndPrint()
    try {
      setTasks(toDoArray);
    } catch (error) {
      console.error(error);
    }
  });

  const editButton = document.createElement("button");
  editButton.classList.add("edit-button", `${listIndex}`);
  editButton.addEventListener("click", () => {
    const newText = prompt("Enter new task:")
    toDoArray["my-todo"][editButton.classList[1]]["text"] = newText
    removeAndPrint()
    try {
      setTasks(toDoArray);
    } catch (error) {
      console.error(error);
    }
  });
  const check = document.createElement("input");
  check.classList.add("check-box", `${listIndex}`);
  check.setAttribute("type", "checkbox");

  todoContainer.appendChild(check);
  todoContainer.appendChild(textContainer);
  todoContainer.appendChild(elementCreator("div", "todo-created-at", date));
  todoContainer.appendChild(elementCreator("div", "todo-priority", priority));
  todoContainer.appendChild(deleteButton);
  todoContainer.appendChild(editButton);
  deleteButton.appendChild(elementCreator("i", "material-icons", "delete"));
  editButton.appendChild(elementCreator("i", "material-icons", "edit"));

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
  removeAndPrint()
  textInput.value = "";
  textInput.focus();
  try {
    setTasks(toDoArray);
  } catch (error) {
    console.error(error);
  }
}

addButton.addEventListener("click", addToDo);
textInput.addEventListener("keyup", (event) => {
  if (event.keyCode === 13) {
    event.preventDefault();
    addButton.click();
  }
});

function removeAndPrint() {
  listIndex = 0;
  const todoContainers = document.querySelectorAll("li");
  for (let list of todoContainers) {
    list.remove();
  }
  for (let todo of toDoArray["my-todo"]) {
    divCreator(todo["priority"], todo["date"], todo["text"]);
  }
  counter.innerText = toDoArray["my-todo"].length;
  listIndex = 0
}

// sorting the list by priority
function sort() {
  toDoArray["my-todo"].sort((a, b) => {
    return b["priority"] - a["priority"];
  });
  removeAndPrint()
  try {
    setTasks(toDoArray);
  } catch (error) {
    console.error(error);
  }
}
sortButton.addEventListener("click", sort);

async function getTasks() {
  loading.style.display = "block";
  let response = await fetch(`${apiUrl}`, {
    method: "GET",
  });
  response = await response.json();
  loading.style.display = "none";
  return response;
}

async function setTasks(data) {
  loading.style.display = "block";
  const response = await fetch(apiUrl, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });
  loading.style.display = "none";
  return response;
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
