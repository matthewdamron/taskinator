// find form with #task-form id and assign it var formEl
var formEl = document.querySelector("#task-form");

// find task list with #task-to-do id and assign it var tasksToDoEl
var tasksToDoEl = document.querySelector("#tasks-to-do");

// function to create task elements
var taskFormHandler = function(event) {
    // stop the web page from refreshing on its on
    event.preventDefault();

    // get the value from our input form
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    // console.log(taskNameInput);

    // get the value from our select-dropdown list
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // console.log(taskTypeInput);

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    // call createTaskEl and pass argument taskDataObj
    createTaskEl(taskDataObj);
}

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    // give it a class name
    taskInfoEl.className = "task-info";

    // add HTML contect to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);
}

// add EventListener to buttonEl and run taskFormHandler
formEl.addEventListener("submit", taskFormHandler)