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