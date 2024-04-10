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