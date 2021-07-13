var pageContentEl = document.querySelector("#page-content");
var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");
var tasksInProgressEl = document.querySelector("#tasks-in-progress");
var tasksCompletedEl = document.querySelector("#tasks-completed");

var taskIdCounter = 0;

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // check if input values are empty
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }
    
    var isEdit = formEl.hasAttribute("data-task-id");

    formEl.reset();

    // send it as an argument to createTaskEl
    if (isEdit) {
        var taskId = formEl.getAttribute("data-task-id");
        completeEditTask(taskNameInput, taskTypeInput, taskId);
    } else {
        // package up data as an object
        var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
        };
        createTaskEl(taskDataObj);
    }
};

var completeEditTask = function(taskName,taskType,taskId) {
    var taskSelected = document.querySelector(".task-list li[data-task-id='" + taskId + "']");

    taskSelected.querySelector("h3.task-name").textContent = taskName;
    taskSelected.querySelector("span.task-type").textContent = taskType;

    alert("Task updated!");

    // reset form
    formEl.removeAttribute("data-task-id");
    document.querySelector("#save-task").textContent = "Add Task";
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");

    // add task id as a custom attribute
    listItemEl.setAttribute("data-task-id", taskIdCounter);

    // create div to hold task info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className="task-info";
    taskInfoEl.innerHTML="<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // add task Info div to list item
    listItemEl.appendChild(taskInfoEl);

    // add task actions to task Info div
    var taskActionEl = createTaskActions(taskIdCounter);
    listItemEl.appendChild(taskActionEl);

    //add list item to Tasks To Do section
    tasksToDoEl.appendChild(listItemEl);

    // increase task counter for next unique id
    taskIdCounter++;
};

var createTaskActions = function(taskId) {
    // create div to hold task buttons
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

    // create status select element
    var statusSelectEl = document.createElement("select");
    statusSelectEl.className = "select-status";
    statusSelectEl.setAttribute("name", "status-change");
    statusSelectEl.setAttribute("data-task-id", taskId);

    var statusChoices = ["To Do", "In Progress", "Completed"];
    for (var i =0; i < statusChoices.length; i++) {
        // create option element
        var statusOptionEl = document.createElement("option");
        statusOptionEl.textContent = statusChoices[i];
        statusOptionEl.setAttribute("value", statusChoices[i]);

        statusSelectEl.appendChild(statusOptionEl);
    }

    actionContainerEl.appendChild(statusSelectEl);

    return actionContainerEl;
};

formEl.addEventListener("submit", taskFormHandler);

var taskButtonHandler = function(event) {
    console.log(event.target);
    
    // get the element's task id
    var taskId = event.target.getAttribute("data-task-id");
    var taskSelected = document.querySelector(".task-list li[data-task-id='" + taskId + "']");

    if (event.target.matches(".edit-btn")) {
        editTask(taskSelected);
    }

    if (event.target.matches(".delete-btn")) {
        deleteTask(taskSelected);
    }
};

var editTask = function(taskSelected) {
    var taskName = taskSelected.querySelector(".task-name").textContent;
    var taskType = taskSelected.querySelector(".task-type").textContent;
    
    document.querySelector("input[name='task-name']").value = taskName;
    document.querySelector("select[name='task-type']").value = taskType;
    document.querySelector("#save-task").textContent = "Save Task";
    formEl.setAttribute("data-task-id", taskSelected.getAttribute("data-task-id"));
};

var deleteTask = function(taskSelected) {
    taskSelected.remove();
};

pageContentEl.addEventListener("click", taskButtonHandler);

var taskStatusChangeHandler = function(event) {
    var taskId = event.target.getAttribute("data-task-id");
    var statusValue = event.target.value.toLowerCase();
    var taskSelected = document.querySelector(".task-list li[data-task-id='" + taskId +"']");

    if (statusValue === "to do") {
        tasksToDoEl.appendChild(taskSelected);
    }
    if (statusValue === "in progress") {
        tasksInProgressEl.appendChild(taskSelected);
    }
    if (statusValue === "completed") {
        tasksCompletedEl.appendChild(taskSelected);
    }
};

pageContentEl.addEventListener("change", taskStatusChangeHandler);