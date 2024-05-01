let currentDraggedElement;

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

window.onload = function() {
    var container = document.getElementById('container');
    var content = document.getElementById('content');

    // Überprüfe, ob der Inhalt breiter ist als der Container
    if (content.scrollWidth > container.clientWidth) {
        container.style.overflowX = 'auto'; // Zeige die horizontale Scrollleiste an
    } else {
        container.style.overflowX = 'hidden'; // Verstecke die horizontale Scrollleiste
    }
};