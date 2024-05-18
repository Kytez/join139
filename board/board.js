let allTasks = [];
let emptyArray = [];
let selectedContacts = [];
let prio = "";
let singleContactId = [];
let colors = [];
let contactList = [];
let subTasks = [];
let names = [];
let numberAddedSubtasks = 0;

/**
 * Initializes the board html and loads all necessary information from the server and renders the page.
 */
async function initBoard() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadAllTasks();
    await loadContacts();
    updateTasksHTML();
}

/**
 * Loads all tasks from the local storage.
 *
 * @return {Promise<void>} A promise that resolves when the tasks are successfully loaded.
 */
async function loadAllTasks() {
    try {
      let allTasksResponse = (await getItem("allTasks")) || [];
      if(allTasksResponse !== null) {
        allTasks = allTasksResponse;
      } else {
        allTasks = [];
      }
    } catch (e) {
      console.error("Loading error:", e);
    }
  }

  /**
 * Saves the tasks by storing them in the local storage.
 *
 * @return {Promise<void>} A promise that resolves when the tasks are successfully saved.
 */
async function saveTasks() {
    setItem("allTasks", allTasks);
  }

/**
 * Displays a task popup with the given details.
 *
 * @param {string} title - The title of the task.
 * @param {string} description - The description of the task.
 * @param {string} date - The date of the task.
 * @param {number} id - The ID of the task.
 * @param {string} category - The category of the task.
 * @param {string} prio - The priority of the task.
 * @param {Array} names - The names of the users assigned to the task.
 * @param {Array} subTasks - The subtasks of the task.
 * @param {number} singleContactId - The ID of the single contact assigned to the task.
 * @return {void} This function does not return anything.
 */
function showTask(
  title,
  description,
  date,
  id,
  category,
  prio,
  names,
  subTasks,
  singleContactId
) {
    document.getElementById("tasks").style.display = "flex";
    let taskPopUp = document.getElementById("taskPopUp");
    taskPopUp.style.display = "flex";
    let popUpElements = document.getElementsByClassName("pop-up");
    for (let i = 0; i < popUpElements.length; i++) {
      popUpElements[i].style.transition = "transform 400ms";
      (function (index) {
        setTimeout(function () {
          popUpElements[index].style.transform = "translateX(0)";
        }, 100);
      })(i);
    }
    renderTasksPopUp(
      title,
      description,
      date,
      id,
      category,
      prio,
      names,
      subTasks,
      singleContactId
    );
    assignCategoryColour();
    assignUserColourPopUp(names, id);
    loadCheckBoxStatus(id);
}

/**
 * Hides the task by setting the display property of the "tasks" and "taskPopUp" elements to "none".
 * Also animates the transition of the "pop-up" elements by setting their transition property and applying a translateX transform.
 *
 * @return {void} This function does not return anything.
 */
function hideTask() {
  document.getElementById("tasks").style.display = "none";
  document.getElementById("taskPopUp").style.display = "none";
  let popUpElements = document.getElementsByClassName("pop-up");

  for (let i = 0; i < popUpElements.length; i++) {
    popUpElements[i].style.transition = "transform 400ms";
    (function (index) {
      setTimeout(function () {
        popUpElements[index].style.transform = "translateX(200%)";
      }, 100);
    })(i);
  }
}

/**
 * Displays the add task section and full screen add task section by setting their display property to "flex".
 * Animates the transition of the add task card elements by setting their transition property and applying a translateX transform.
 * Sets the filter board value to an empty string.
 *
 * @return {void} This function does not return anything.
 */
function showAddTask() {
  document.getElementById("addTaskSection").style.display = "flex";
  document.getElementById("addTaskFullScreen").style.display = "flex";
  let popUpElements = document.getElementsByClassName("add-task-card-board");

  for (let i = 0; i < popUpElements.length; i++) {
    popUpElements[i].style.transition = "transform 400ms";
    (function (index) {
      setTimeout(function () {
        popUpElements[index].style.transform = "translateX(0)";
      }, 100);
    })(i);
  }
  setFilterBoard({ value: "" });
}

/**
 * Clears the task board by resetting the values of various input fields and removing any subtasks.
 * Also removes any selected contacts and resets the priority button highlight.
 *
 * @return {void} This function does not return anything.
 */
function clearTaskBoard() {
  document.getElementById("titleBoard").value = "";
  document.getElementById("descriptionBoard").value = "";
  document.getElementById("dateBoard").value = "";
  document.getElementById("subTaskContainerBoard").innerHTML = "";
  document.getElementById("subTaskInputBoard").value = "";
  document.getElementById("categoryBoard").value = "";
  document.getElementById("contact-selectBoard").value = "";
  let initialsContainer = document.getElementById("contactInitalsBoard");
  let divs = initialsContainer.querySelectorAll("div");
        divs.forEach(function(div) {
            div.remove();
          });
  prio = "";
  removeSelectedContactsBoard();

  document.getElementById("mediumBoard").classList.remove("highlighted-button-medium");
  document.getElementById("lowBoard").classList.remove("highlighted-button-low");
  document.getElementById("urgentBoard").classList.remove("highlighted-button-urgent");
}

function removeSelectedContactsBoard() {
    setFilterBoard({ value: `` });
    selectedContacts = [];
            colors = [];
            names = [];
            singleContactId = [];
};

/**
 * Sets the color of the priority buttons on the board based on the given priority.
 *
 * @param {string} i - The priority of the button ("medium", "low", or "urgent").
 * @return {void} This function does not return a value.
 */
function setPrioButtonsColorBoard(i) {
  document.getElementById("mediumBoard").classList.remove("highlighted-button-medium");
  document.getElementById("lowBoard").classList.remove("highlighted-button-low");
  document.getElementById("urgentBoard").classList.remove("highlighted-button-urgent");
  if (i === "medium") {
    document.getElementById("mediumBoard").classList.add("highlighted-button-medium");
  } else if (i === "low") {
    document.getElementById("lowBoard").classList.add("highlighted-button-low");
  } else if (i === "urgent") {
    document.getElementById("urgentBoard").classList.add("highlighted-button-urgent");
  }
}

/**
 * Hides the add task section and full screen add task section by setting their display property to "none".
 * Animates the transition of the add task card elements by setting their transition property and applying a translateX transform.
 * Calls the emptyCurrentContainerInformation function and the clearTaskBoard function.
 *
 * @return {void} This function does not return anything.
 */
function hideAddTask() {
  document.getElementById("addTaskSection").style.display = "none";
  document.getElementById("addTaskFullScreen").style.display = "none";
  let popUpElements = document.getElementsByClassName("add-task-card-board");

  for (let i = 0; i < popUpElements.length; i++) {
    popUpElements[i].style.transition = "transform 400ms";
    (function (index) {
      setTimeout(function () {
        popUpElements[index].style.transform = "translateX(275%)";
      }, 100);
    })(i);
  }
  emptyCurrentContainerInformation();
  clearTaskBoard()
}

/**
 * Displays the add task section and full screen add task section by setting their display property to "flex".
 * Animates the transition of the add task card elements by setting their transition property and applying a translateX transform.
 * Sets the filter board value to an empty string.
 *
 * @param {string} section - The section to add the task to.
 * @return {void} This function does not return anything.
 */
function addTaskToSectionButton(section) {
  showAddTask(section);
}


/**
 * Filters tasks based on the search input value.
 *
 * @return {Promise<void>} A promise that resolves when the tasks are updated in the HTML.
 */
async function filterTask() {
  let searchInput = document.getElementById("site-search").value.trim().toLowerCase();

  if (document.getElementById("site-search").value.length < 1) {
  await loadAllTasks();
  updateTasksHTML();
  } else {
      let foundTasks = [];

      allTasks.forEach((task) => {
      if (
        task.title.toLowerCase().includes(searchInput) ||
        (task.description &&
          task.description.toLowerCase().includes(searchInput))
        ) {
        foundTasks.push(task);
      }
    });

    allTasks = foundTasks;
    updateTasksHTML();
  }
}

/**
 * Stops the propagation of an event.
 *
 * @param {Event} event - The event to stop the propagation of.
 * @return {void} This function does not return a value.
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * hides the edit-task pop-up field from the screen via translateX.
 */
function hideEditTask() {
    document.getElementById('editTaskSection').style.display = 'none';
    document.getElementById('editTaskFullScreen').style.display = 'none';
    subTasks = [];
    let popUpElements = document.getElementsByClassName('edit-task-card');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(275%)';
            }, 100);
        })(i);
    }
    emptyCurrentContainerInformation();
}

/**
 * hides the edit-task pop-up field from the screen via translateX without user actually editing anything
 */
function breakEditSession(id) {
    document.getElementById('editTaskSection').style.display = 'none';
    document.getElementById('editTaskFullScreen').style.display = 'none';
    subTasks = [];
    let popUpElements = document.getElementsByClassName('edit-task-card');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(275%)';
            }, 100);
        })(i);
      }
      let checkbox = allTasks[id]['checkbox']
    emptyCurrentContainerInformation();
    checkbox.splice(-numberAddedSubtasks)
    numberAddedSubtasks = 0;
    checkForEmptyCheckBox(checkbox);
}

/**
 * Empties the current container information by resetting various variables and clearing the content of specific HTML elements.
 *
 * @return {void} This function does not return anything.
 */
function emptyCurrentContainerInformation(){
    singleContactId = [];
    subTasks = [];
    names = [];
    colors = [];
    selectedContacts = [];
    document.getElementById("contactInitalsBoard").innerHTML ="";
    document.getElementById("contactInitalsEdit").innerHTML ="";
}

/**
 * Deletes a task.
 * @param {number} id - The ID of the task to delete.
 */
function deleteTask(id) {
  allTasks.splice(id, 1)
  updateTasksHTML();
  hideTask();
  saveTasks();
}