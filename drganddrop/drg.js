const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.dropbox')

draggables.forEach((draggable) => {
  draggable.addEventListener("dragstart", () => {
    draggable.classList.add("dragging");
  });
  draggable.addEventListener("dragend", () => {
    draggable.classList.remove("dragging");
  });
});

containers.forEach(dropbox => {
  dropbox.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(dropbox, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      dropbox.appendChild(draggable)
    } else {
      dropbox.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(dropbox, y) {
  const draggableElements = [...dropbox.querySelectorAll('.draggable:not(.dragging)')]

  return draggableElements.reduce((closest, child) => {
    const box = child.getBoundingClientRect()
    const offset = y - box.top - box.height / 2
    if (offset < 0 && offset > closest.offset) {
      return { offset: offset, element: child }
    } else {
      return closest
    }
  }, { offset: Number.NEGATIVE_INFINITY }).element
}