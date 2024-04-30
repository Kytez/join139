let currentDraggedElement;

// Drag Funktionen

function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(workMode) {
    allTasks[currentDraggedElement]['workMode'] = workMode;
    updateTasksHTML();
}
