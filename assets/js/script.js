// find button with #save-task id and assign it var buttonE1
// var buttonEl = document.querySelector("#save-task");
// find form with #task-form id and assign it var formE1
var formE1 = document.querySelector("#task-form");

// find task list with #task-to-do id and assign it var tasksToDoE1
var tasksToDoE1 = document.querySelector("#tasks-to-do");

// function to create task elements
var createTaskHandler = function(event) {
    // stop the web page from refreshing on its on
    event.preventDefault();

    var listItemE1 = document.createElement("li");
    listItemE1.className = "task-item";
    listItemE1.textContent = "This is a new task";
    tasksToDoE1.appendChild(listItemE1);
}

// add EventListener to buttonE1 and run createTaskHandler
// buttonEl.addEventListener("click", createTaskHandler)
// add EventListener to buttonE1 and run createTaskHandler
formE1.addEventListener("submit", createTaskHandler)