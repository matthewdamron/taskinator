// taskIdCounter
var taskIdCounter = 0;

// array to hold our tasks
var tasks = [];

// find form with #task-form id and assign it var formEl
var formEl = document.querySelector("#task-form");

// find task lists id's and assign it a var based on the list category
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

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

    // check to see if we are editing or adding task
    var isEdit = formEl.hasAttribute("data-task-id");

    // if isEdit true find the id call function to complete edit
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    }
    else {
        // package up data as an object
        var taskDataObj = {
            name: taskNameInput,
            type: taskTypeInput,
            status: "to do"
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

    // add task id as a custom attribute using the taskIdCounter
    listItemEl.setAttribute("data-task-id", taskIdCounter);
    // add draggable attribute to the listItemEl
    listItemEl.setAttribute("draggable", "true");

    // create div to hold task info and add to list item
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className = "task-info";

    // add HTML contect to div
    taskInfoEl.innerHTML = "<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // add taskInfoEl into the HTML
    listItemEl.appendChild(taskInfoEl);

    // create the task
    var taskActionsEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionsEl);

    // add taskId to taskDataObj
    taskDataObj.id = taskIdCounter;
    // push taskDataObj to task array
    tasks.push(taskDataObj);

    // save tasks
    saveTasks();

    // add entire list item to the Task To Do category
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

    // create new array to hold updated list of tasks
    var updatedTaskArr = [];

    // loop through current tasks
    for (var i = 0; i < tasks.length; i++) {
        // if tasks[i].id doesn't match the value of taskId, let's keep that task and push it into the new array
        if (tasks[i].id !== parseInt(taskId)) {
            updatedTaskArr.push(tasks[i]);
        }
    }
    // reassign tasks array to be the same as updatedTaskArr
    tasks = updatedTaskArr;

    // save tasks
    saveTasks();
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

// completeEditTask to edit the values of existing values
var completeEditTask = function(taskNameInput, taskTypeInput, taskId) {
    // find the matching task list item
    var taskSelected = document.querySelector(".task-item[data-task-id='" + taskId + "']");

    // set new values
    taskSelected.querySelector("h3.task-name").textContent = taskNameInput;
    taskSelected.querySelector("span.task-type").textContent = taskTypeInput;

    // loop through tasks array to find and update the name and type
    for (var i = 0; i < task.length; i++) {
        if (task[i].id === parseInt(taskId)) {
            task[i].name = taskName;
            task[i].type = taskType;
        }
    };

    // save tasks
    saveTasks();

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

    // loop through tasks array to find and update the status
    for (var i = 0; i < task.length; i++) {
        if (task[i].id === parseInt(taskId)) {
            task[i].status = statusValue;
        }
    };

    // save tasks
    saveTasks();
};

var dragTaskHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    event.dataTransfer.setData("text/plain", taskId);
    var getId = event.dataTransfer.getData("text/plain");
    console.log("getId:", getId, typeof getId);
};

var dropZoneDragHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        event.preventDefault();
        // add hightlight attributes
        taskListEl.setAttribute("style", "background: rgba(68, 233, 255, 0.7); border-style: dashed;");
    }
};

var dropTaskHandler = function(event) {
    event.preventDefault();
    var id = event.dataTransfer.getData("text/plain");
    var draggableElement = document.querySelector("[data-task-id='" + id + "']");
    var dropZoneEl = event.target.closest(".task-list");
    var statusType = dropZoneEl.id;

    // set status of task based on dropZone id
    var statusSelectEl = draggableElement.querySelector("select[name='status-change']");

    if (statusType === "tasks-to-do") {
        statusSelectEl.selectedIndex = 0;
    } 
    else if (statusType === "tasks-in-progress") {
        statusSelectEl.selectedIndex = 1;
    } 
    else if (statusType === "tasks-completed") {
        statusSelectEl.selectedIndex = 2;
    }

    // remove hightlight attributes
    dropZoneEl.removeAttribute("style");

    dropZoneEl.appendChild(draggableElement);

    // loop through tasks array to find and update the updated task's status
    for (var i = 0; i < tasks.length; i++) {
        if (tasks[i].id === parseInt(id)) {
        tasks[i].status = statusSelectEl.value.toLowerCase();
        }
    }

    // save tasks
    saveTasks();
};

var dragLeaveHandler = function(event) {
    var taskListEl = event.target.closest(".task-list");
    if (taskListEl) {
        taskListEl.removeAttribute("style");
    }
};

var saveTasks = function() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
};

// addEventListener to buttonEl and run taskFormHandler
formEl.addEventListener("submit", taskFormHandler);

// addEventListener to main section for clik
pageContentEl.addEventListener("click", taskButtonHandler);

// addEventListener to change and run taskStatusChangeHandler
pageContentEl.addEventListener("change", taskStatusChangeHandler);

// addEventListener to draggable and run dragTaskHandler
pageContentEl.addEventListener("dragstart", dragTaskHandler);

// addEventListener to add dragover zones to the task status
pageContentEl.addEventListener("dragover", dropZoneDragHandler);

// addEventListener to drop task into new task status
pageContentEl.addEventListener("drop", dropTaskHandler);

// addEventListener to dragleave
pageContentEl.addEventListener("dragleave", dragLeaveHandler);