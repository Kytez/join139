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

function highlight(id) {
    document.getElementById(id).classList.add('drag-area');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area');
    
}