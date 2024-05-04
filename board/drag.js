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

// Beispielaufruf der Funktion
const draggableCount = countDraggableElements();
console.log("Anzahl der draggable Elemente in der DIV mit der ID 'todo':", draggableCount);