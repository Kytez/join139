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
  let container = document.getElementById("container");
  let content = document.getElementById("content");

  if (content.scrollWidth > container.clientWidth) {
    container.style.overflowX = "auto";
  } else {
    container.style.overflowX = "hidden";
  }
};

