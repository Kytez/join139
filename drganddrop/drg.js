const draggables = document.querySelectorAll(".draggable");
const containers = document.querySelectorAll(".dropbox");

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach((dropbox) => {
  dropbox.addEventListener("dragover", (e) => {
    e.preventDefault();
    const afterElement = getDragAfterElement(dropbox, e.clientY);
    const draggable = document.querySelector(".dragging");
    if (afterElement == null) {
      dropbox.appendChild(draggable);
    } else {
      dropbox.insertBefore(draggable, afterElement);
    }
  });
});

/**
 * Finds the closest draggable element after a specified y-position in a given dropbox.
 *
 * @param {Element} dropbox - The dropbox element to search within.
 * @param {number} y - The vertical position to find the closest element after.
 * @return {Element} The closest draggable element after the specified y-position.
 */
function getDragAfterElement(dropbox, y) {
  const draggableElements = [
    ...dropbox.querySelectorAll(".draggable:not(.dragging)"),
  ];

  return draggableElements.reduce(
    (closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;
      if (offset < 0 && offset > closest.offset) {
        return { offset: offset, element: child };
      } else {
        return closest;
      }
    },
    { offset: Number.NEGATIVE_INFINITY }
  ).element;
}
