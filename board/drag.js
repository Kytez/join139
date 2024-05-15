let currentDraggedElement;

/**
 * Puts the id of the dragged task into a global variable.
 *
 * @param {string} id this is the id of the task
 */
function startDragging(id) {
  currentDraggedElement = id;
}

/**
 * Allows moving a task into a different position.
 *
 * @param {event} ev
 */

function allowDrop(ev) {
  ev.preventDefault();
}

/**
 *
 * @param {string} workMode this is current mode of the task, either todo or in progress, awaiting feedback or done.
 */

function moveTo(workMode) {
  allTasks[currentDraggedElement]["workMode"] = workMode;
  updateTasksHTML();
  saveTasks();
}

window.onload = function () {
  var container = document.getElementById("container");
  var content = document.getElementById("content");

  if (content.scrollWidth > container.clientWidth) {
    container.style.overflowX = "auto";
  } else {
    container.style.overflowX = "hidden";
  }
};

function countDraggableElements() {
  let count = 0;

  const todoDiv = document.getElementById("todo");

  if (todoDiv) {
    const draggableElements = todoDiv.getElementsByClassName("draggable");

    count = draggableElements.length;
  } else {
    console.error("DIV mit der ID 'todo' wurde nicht gefunden.");
  }

  return count;
}
