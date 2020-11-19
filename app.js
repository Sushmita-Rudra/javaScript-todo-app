//Selectors

const todoInput = document.querySelector(".todo-input");
const todoSubmit = document.querySelector(".todo-submit");
const todoList = document.querySelector(".todo-list");
const filterTodo = document.querySelector(".filter-todo");

//Event listeners
document.addEventListener("DOMContentLoaded", getTodos);
todoSubmit.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterTodo.addEventListener("click", filterTodos);

//Functions

function addTodo(event) {
  event.preventDefault();

  //Create div
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  //Create li
  const newTodo = document.createElement("li");
  newTodo.classList.add("todo-list-item");
  newTodo.innerText = todoInput.value;
  todoDiv.appendChild(newTodo);

  //Save to local storage
  saveTodosInLS(todoInput.value);

  //Create complete button
  const completeBtn = document.createElement("button");
  completeBtn.classList.add("completed-btn");
  completeBtn.innerHTML = `<i class="far fa-check-square"></i>`;
  todoDiv.appendChild(completeBtn);

  //Create trash/delete button
  const trashBtn = document.createElement("button");
  trashBtn.classList.add("trash-btn");
  trashBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
  todoDiv.appendChild(trashBtn);

  //Add div to todo-list ul
  todoList.appendChild(todoDiv);

  //Clear input value
  todoInput.value = "";
}

//Delete function

function deleteCheck(e) {
  e.stopPropagation();
  const item = e.target;
  if (item.classList[0] === "trash-btn") {
    const todo = item.parentElement;
    //add animation
    todo.classList.add("fall");
    //call removefromLS
    removeFromLS(todo);
    // remove todo
    todo.addEventListener("transitionend", function () {
      todo.remove();
    });
  }

  if (item.classList[0] === "completed-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
  }
}

//FilterTodos function

function filterTodos(e) {
  const todos = todoList.childNodes;
  console.log(e.target.value);

  todos.forEach((todo) => {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

//Save to LS
function saveTodosInLS(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

//Get todos to UI display

function getTodos() {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach((todo) => {
    //Create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    //Create li
    const newTodo = document.createElement("li");
    newTodo.classList.add("todo-list-item");
    newTodo.innerText = todo;
    todoDiv.appendChild(newTodo);

    //Create complete button
    const completeBtn = document.createElement("button");
    completeBtn.classList.add("completed-btn");
    completeBtn.innerHTML = `<i class="far fa-check-square"></i>`;
    todoDiv.appendChild(completeBtn);

    //Create trash/delete button
    const trashBtn = document.createElement("button");
    trashBtn.classList.add("trash-btn");
    trashBtn.innerHTML = `<i class="far fa-trash-alt"></i>`;
    todoDiv.appendChild(trashBtn);

    //Add div to todo-list ul
    todoList.appendChild(todoDiv);
  });
}

//Remove from LS
function removeFromLS(todo) {
  let todos;
  if (localStorage.getItem("todos") === null) {
    todos = [];
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  const todoIndex = todo.children[0].innerText;
  console.log(todoIndex);
  todos.splice(todos.indexOf(todoIndex), 1);
  localStorage.setItem("todos", JSON.stringify(todos));
}
