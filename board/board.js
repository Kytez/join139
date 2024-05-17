let allTasks = [];
let emptyArray = [];
let selectedContacts = [];
let prio = "";
let singleContactId = [];
let colors = [];
let contactList = [];
let subTasks = [];
let names = [];

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
    // renderAssignedContactList()
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
  document
    .getElementById("mediumBoard")
    .classList.remove("highlighted-button-medium");
  document
    .getElementById("lowBoard")
    .classList.remove("highlighted-button-low");
  document
    .getElementById("urgentBoard")
    .classList.remove("highlighted-button-urgent");
}

function removeSelectedContactsBoard() {
    setFilterBoard({ value: `` });
    selectedContacts = [];
            colors = [];
            names = [];
            singleContactId = [];
};


function setPrioButtonsColorBoard(i) {
  document
    .getElementById("mediumBoard")
    .classList.remove("highlighted-button-medium");
  document
    .getElementById("lowBoard")
    .classList.remove("highlighted-button-low");
  document
    .getElementById("urgentBoard")
    .classList.remove("highlighted-button-urgent");
  if (i === "medium") {
    document
      .getElementById("mediumBoard")
      .classList.add("highlighted-button-medium");
  } else if (i === "low") {
    document.getElementById("lowBoard").classList.add("highlighted-button-low");
  } else if (i === "urgent") {
    document
      .getElementById("urgentBoard")
      .classList.add("highlighted-button-urgent");
  }
}

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

function addTaskToSectionButton(section) {
  showAddTask(section);
}


async function filterTask() {
  let searchInput = document
  .getElementById("site-search")
    .value.trim()
    .toLowerCase();

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

function emptyCurrentContainerInformation(){
    singleContactId = [];
    subTasks = [];
    names = [];
    colors = [];
    selectedContacts = [];
    document.getElementById("contactInitalsBoard").innerHTML ="";
    document.getElementById("contactInitalsEdit").innerHTML ="";
}