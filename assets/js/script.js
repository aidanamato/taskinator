var formEl = document.querySelector("#task-form");
var tasksToDoEl = document.querySelector("#tasks-to-do");

var taskFormHandler = function(event) {
    event.preventDefault();
    var taskNameInput = document.querySelector("input[name='task-name']").value;
    var taskTypeInput = document.querySelector("select[name='task-type']").value;
    // check if input values are empty
    if (!taskNameInput || !taskTypeInput) {
        alert("You need to fill out the task form!");
        return false;
    }

    // package up data as an object
    var taskDataObj = {
        name: taskNameInput,
        type: taskTypeInput
    };

    formEl.reset();
    
    // send it as an argument to createTaskEl
    createTaskEl(taskDataObj);
};

var createTaskEl = function(taskDataObj) {
    // create list item
    var listItemEl = document.createElement("li");

    // create div to hold task info
    var taskInfoEl = document.createElement("div");
    taskInfoEl.className="task-info";
    taskInfoEl.innerHTML="<h3 class='task-name'>" + taskDataObj.name + "</h3><span class='task-type'>" + taskDataObj.type + "</span>";

    // add div to li and add li to tasksToDo ul
    listItemEl.appendChild(taskInfoEl);
    tasksToDoEl.appendChild(listItemEl);
};

formEl.addEventListener("submit", taskFormHandler);