// taskIdCounter
var taskIdCounter = 0;

// find form with #task-form id and assign it var formEl
var formEl = document.querySelector("#task-form");

// find task list with #task-to-do id and assign it var tasksToDoEl
var tasksToDoEl = document.querySelector("#tasks-to-do");

// find the #page-content id and assign it var pageContentEl
var pageContentEl = document.querySelector("#page-content");

var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

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

    // check to see if we are editing or adding task
    var isEdit = formEl.hasAttribute("data-task-id");

    // if isEdit true find the id call function to complete edit
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        conpleteEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
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

        // call createTaskEl and pass argument taskDataObj
        createTaskEl(taskDataObj);
    }

    // reset the form
    formEl.reset();
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
    // get target elemnt from event
    var targetEl = event.target;
    var taskId = targetEl.getAttribute("data-task-id");

    // check if the clicked item is the edit button
    if (targetEl.matches(".edit-btn")) {
        // var taskId = event.target.getAttribute("data-task-id");
        editTask(taskId);
    }

    // check if the clicked item is the delete button
    else if (targetEl.matches(".delete-btn")) {
        // var taskId = event.target.getAttribute("data-task-id");
        deleteTask(taskId);
    }
};

// delete task after clicking the delete button in the task
var deleteTask = function(taskId) {
    // select the task for deletion
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");
    taskSelected.remove();
};

// edit task after clicking the edit button in the task
var editTask = function(taskId) {
    // edit the selected task and not add another one
    formEl.setAttribute("data-task-id", taskId);

    // select the task for editing
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // get content from task name and type
    var taskName = taskSelected.querySelector("h3.task-name").textContent;

    // get task type from task type
    var taskType = taskSelected.querySelector("span.task-type").textContent;

    // display the task name and task type in the input and the select above
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;

    // change the button name from add to edit
    document.querySelector("#save-task").textContent = "Save Task";
};

// conpleteEditTask to edit the values of existing values
var conpleteEditTask = function(taskNameInput, taskTypeInput, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskNameInput;
    taskSelected.querySelector("span.task-type").textContent = taskTypeInput;

    alert("Task Updated!");
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var taskStatusChangeHandler = function(event) {
    // get the task item's id
    var taskId = event.target.getAttribute("data-task-id");

    // get the curently selected option's value and convert to lowercase
    var statusValue = event.target.value.toLowerCase();

    // find the parent task item element based on the id
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // add selected value to selected task
    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    else if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    else if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
}

// addEventListener to buttonEl and run taskFormHandler
formEl.addEventListener("submit", taskFormHandler);

// addEventListener to main section for clik
pageContentEl.addEventListener("click", taskButtonHandler);

// addEventListener to change and run taskStatusChangeHandler
pageContentEl.addEventListener("change", taskStatusChangeHandler);