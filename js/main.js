const title = document.getElementById("currentDate");
let date = new Date();
let year = date.getFullYear();
const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
];
let month = monthNames[date.getMonth()];
date = new Date();
let day = date.getDate();
if(day < 10){day = "0" + day;}
let hour = date.getHours();
if(hour < 10){hour = "0" + hour;}
let minute = date.getMinutes();
if(minute < 10){minute = "0" + minute;}
let second = date.getSeconds();
if(second < 10){second = "0" + second;}
title.innerText = `${year}. ${month}. ${day}. ${hour}:${minute}:${second}`;


const counter = setInterval(() => {
    date = new Date();
    day = date.getDate();
    if(day < 10){day = "0" + day;}
    hour = date.getHours();
    if(hour < 10){hour = "0" + hour;}
    minute = date.getMinutes();
    if(minute < 10){minute = "0" + minute;}
    second = date.getSeconds();
    if(second < 10){second = "0" + second;}
    title.innerText = `${year}. ${month}. ${day}. ${hour}:${minute}:${second}`;
},1000);

function addTodo(content){
  const todo = document.createElement("li");
    todo.id = "task";
    const taskContent = document.createElement("div");
    taskContent.id = "taskContent";
    if(content.slice(-1) == "*"){
      todo.classList.add("complete");
      content = content.slice(0,content.length-1)
    }
    taskContent.innerText = content;
    addTodoInput.value = "";


    const completeButton = document.createElement("button");
    completeButton.id = "completeButton";
    completeButton.innerHTML="<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"2em\" height=\"2em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 24 24\"><path fill=\"currentColor\" d=\"m10.6 16.2l7.05-7.05l-1.4-1.4l-5.65 5.65l-2.85-2.85l-1.4 1.4ZM5 21q-.825 0-1.413-.587Q3 19.825 3 19V5q0-.825.587-1.413Q4.175 3 5 3h14q.825 0 1.413.587Q21 4.175 21 5v14q0 .825-.587 1.413Q19.825 21 19 21Z\"/></svg>";
    completeButton.addEventListener("click", (event) => {
      todo.classList.add("complete");
      completeButton.style.pointerEvents = "none";
      todo.addEventListener("animationend", () => {

        checkFilter();
      })
      checkComplete(todo);
    })
    const removeButton = document.createElement("button");
    removeButton.id = "removeButton";
    removeButton.innerHTML = "<svg xmlns=\"http://www.w3.org/2000/svg\" style=\"vertical-align: -0.125em;\" width=\"2em\" height=\"2em\" preserveAspectRatio=\"xMidYMid meet\" viewBox=\"0 0 512 512\"><path fill=\"none\" d=\"M296 64h-80a7.91 7.91 0 0 0-8 8v24h96V72a7.91 7.91 0 0 0-8-8Z\"/><path fill=\"none\" d=\"M292 64h-72a4 4 0 0 0-4 4v28h80V68a4 4 0 0 0-4-4Z\"/><path fill=\"currentColor\" d=\"M447.55 96H336V48a16 16 0 0 0-16-16H192a16 16 0 0 0-16 16v48H64.45L64 136h33l20.09 314A32 32 0 0 0 149 480h214a32 32 0 0 0 31.93-29.95L415 136h33ZM176 416l-9-256h33l9 256Zm96 0h-32V160h32Zm24-320h-80V68a4 4 0 0 1 4-4h72a4 4 0 0 1 4 4Zm40 320h-33l9-256h33Z\"/></svg>";
    removeButton.addEventListener("click", (event) => {
      todo.classList.add("remove");
      todo.addEventListener("animationend", () => {
        removeButton.parentElement.remove();
        removeLocalTodo(todo);
      });
    })
    todo.appendChild(taskContent);
    todo.appendChild(completeButton);
    todo.appendChild(removeButton);
    todoList.appendChild(todo);

    console.log()
    if(!todos.includes(taskContent.innerText) && !todos.includes(taskContent.innerText + "*")){
      saveLocalTodos(taskContent.innerText);
    }
};

function checkFilter(){
  if(filter.value == "All"){
    for(child of todoList.children){
        child.style.display ="inline-flex";
    }
  }

  if(filter.value == "Completed"){
    for(child of todoList.children){
      if(!child.classList.contains("complete")){
        child.style.display = "none";
      }else{
        child.style.display ="inline-flex";
      }
    }
  }

  if(filter.value == "Due"){
    for(child of todoList.children){
      if(child.classList.contains("complete")){
        child.style.display = "none";
      }else{
        child.style.display ="inline-flex";
      }
    }
  }
};

const addTodoInput = document.getElementById("addTodoInput");
const addTodoButton = document.getElementById("addTodoButton");
const todoList = document.getElementById("todoList");

addTodoButton.addEventListener("click",(event) => {
    addTodo(addTodoInput.value);
});
addTodoInput.addEventListener("keypress", (event) =>{
  if(event.key == "Enter"){
    addTodo(addTodoInput.value);
  }
});

const filter = document.getElementById("filter");
filter.addEventListener("click", (e) => {
  checkFilter();
})

function saveLocalTodos(todo){
  let todos;
  if(!localStorage.getItem("todos")){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.push(todo);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodos(){
  if(!localStorage.getItem("todos")){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  todos.forEach(element => {
    addTodo(element);
  });
}
document.addEventListener("DOMContentLoaded",()=>{
  getTodos();
})

function removeLocalTodo(todo){
  if(!localStorage.getItem("todos")){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  let todoIndex;
  if(todo.classList.contains("complete")){
    todoIndex = todos.indexOf(todo.innerText + "*");
  }else{
    todoIndex = todos.indexOf(todo.innerText);
  }

  
  todos.splice(todoIndex,1);
  localStorage.setItem("todos", JSON.stringify(todos));
}

function checkComplete(todo){
  if(!localStorage.getItem("todos")){
    todos = [];
  }else{
    todos = JSON.parse(localStorage.getItem("todos"));
  }
  if(todo.innerText.slice(-1) != "*"){
    todos[todos.indexOf(todo.innerText)] = todo.innerText + "*";
  }
  localStorage.setItem("todos", JSON.stringify(todos));
}