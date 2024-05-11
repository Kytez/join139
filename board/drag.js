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
    allTasks[currentDraggedElement]['workMode'] = workMode;
    updateTasksHTML();
    saveTasks();
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

function countDraggableElements() {
    // Zähler für draggable Elemente
    let count = 0;

    // Das DIV-Element mit der ID "todo" abrufen
    const todoDiv = document.getElementById("todo");

    // Überprüfen, ob das DIV-Element existiert
    if (todoDiv) {
        // Alle Elemente mit der Klasse "draggable" innerhalb des DIV-Elements auswählen
        const draggableElements = todoDiv.getElementsByClassName("draggable");

        // Die Anzahl der ausgewählten Elemente zählen
        count = draggableElements.length;
    } else {
        console.error("DIV mit der ID 'todo' wurde nicht gefunden.");
    }

    // Die Anzahl der draggable Elemente zurückgeben
    return count;
}