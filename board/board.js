const draggables = document.querySelectorAll('.draggable')
const containers = document.querySelectorAll('.container')

draggables.forEach(draggable => {
  draggable.addEventListener('dragstart', () => {
    draggable.classList.add('dragging')
  })

  draggable.addEventListener('dragend', () => {
    draggable.classList.remove('dragging')
  })
})

containers.forEach(container => {
  container.addEventListener('dragover', e => {
    e.preventDefault()
    const afterElement = getDragAfterElement(container, e.clientY)
    const draggable = document.querySelector('.dragging')
    if (afterElement == null) {
      container.appendChild(draggable)
    } else {
      container.insertBefore(draggable, afterElement)
    }
  })
})

function getDragAfterElement(container, y) {
  const draggableElements = [...container.querySelectorAll('.draggable:not(.dragging)')]

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






function showTask() {
    document.getElementById('tasks').style.display = 'flex';
    document.getElementById('taskPopUp').style.display = 'flex';
    
    var popUpElements = document.getElementsByClassName('pop-up');
    for (var i = 0; i < popUpElements.length; i++) {
        // Setze die Transition-Eigenschaft zuerst
        popUpElements[i].style.transition = 'transform 400ms';
        // Verwende eine Funktionsschließung, um den Wert von i zu erfassen
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(0)';
            }, 100);
        })(i);
    }
}


function hideTask() {
    document.getElementById('tasks').style.display = 'none';
    document.getElementById('taskPopUp').style.display = 'none';
    
    var popUpElements = document.getElementsByClassName('pop-up');
    for (var i = 0; i < popUpElements.length; i++) {
        // Setze die Transition-Eigenschaft zuerst
        popUpElements[i].style.transition = 'transform 400ms';
        // Verwende eine Funktionsschließung, um den Wert von i zu erfassen
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(200%)';
            }, 100);
        })(i);
    }
}

function addTask() {
    document.getElementById('addTaskSection').style.display = 'flex';
    document.getElementById('addTaskPopUp').style.display = 'flex';
    
    var popUpElements = document.getElementsByClassName('add-task-card');
    for (var i = 0; i < popUpElements.length; i++) {
        // Setze die Transition-Eigenschaft zuerst
        popUpElements[i].style.transition = 'transform 400ms';
        // Verwende eine Funktionsschließung, um den Wert von i zu erfassen
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(0)';
            }, 100);
        })(i);
    }
}

function hideTaskMenu() {
    document.getElementById('addTaskSection').style.display = 'none';
    document.getElementById('addTaskPopUp').style.display = 'none';
    
    var popUpElements = document.getElementsByClassName('add-task-card');
    for (var i = 0; i < popUpElements.length; i++) {
        // Setze die Transition-Eigenschaft zuerst
        popUpElements[i].style.transition = 'transform 400ms';
        // Verwende eine Funktionsschließung, um den Wert von i zu erfassen
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(275%)';
            }, 100);
        })(i);
    }
}