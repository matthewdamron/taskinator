// taskIdCounter
var taskIdCounter = 0;

// find form with #task-form id and assign it var formEl
var formEl = document.querySelector("#task-form");

// find task list with #task-to-do id and assign it var tasksToDoEl
var tasksToDoEl = document.querySelector("#tasks-to-do");

// find the #page-content id and assign it var pageContentEl
var pageContentEl = document.querySelector("#page-content");

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

    // check if input values are empty strings
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // reset the form
    formEl.reset();
    
    // call createTaskEl and pass argument taskDataObj
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");
    listItemEl.className = "task-item";

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML contect to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    listItemEl.appendChild(taskInfoEl);

    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add entire list item to list
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    var actionContainerEl = document.createElement("div");
    actionContainerEl.className = "task-actions";

    // create edit button
    var editButtonEl = document.createElement("button");
    editButtonEl.textContent = "Edit";
    editButtonEl.className = "btn edit-btn";
    editButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(editButtonEl);

    // create delete button
    var deleteButtonEl = document.createElement("button");
    deleteButtonEl.textContent = "Delete";
    deleteButtonEl.className = "btn delete-btn";
    deleteButtonEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(deleteButtonEl);

    var statusSelectEl = document.createElement("select");
    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i = 0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);
      
        // append to select
        statusSelectEl.appendChild(statusOptionEl);
    }
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);
    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

// function to see what or where you clicked within the addEventListener main section
var taskButtonHandler = function(event) {
    console.log(event.target);

    // check if the clicked item is the delete button
    if (event.target.matches(".delete-btn")) {
        var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// delete task after clicking the delete button in the task
var deleteTask = function(taskId) {
    // select the task for deletion
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

// addEventListener to buttonEl and run taskFormHandler
formEl.addEventListener("submit", taskFormHandler);

// addEventListener to main section for clik
pageContentEl.addEventListener("click", taskButtonHandler);