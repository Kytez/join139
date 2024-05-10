function showEditTask(title, description, date, id, prio, users, names){
    document.getElementById('editTaskSection').style.display = 'flex';
    document.getElementById('editTaskFullScreen').style.display = 'flex';
    
    let popUpElements = document.getElementsByClassName('edit-task-card');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(0)';
            }, 100);
        })(i);
    }
    
    let titleEdit = document.getElementById('titleEdit')
    let descriptionEdit = document.getElementById('descriptionEdit')
    let dateEdit = document.getElementById('dateEdit')

    titleEdit.value = title;
    descriptionEdit.value = description;
    dateEdit.value = date;
    setPrioButtonsColorEdit(prio);


}


function setPrioButtonsColorEdit(i) {
    document.getElementById("mediumEdit").classList.remove("highlighted-button-medium");
    document.getElementById("lowEdit").classList.remove("highlighted-button-low");
    document.getElementById("urgentEdit").classList.remove("highlighted-button-urgent");
    if (i === "medium") {
        document.getElementById("mediumEdit").classList.add("highlighted-button-medium");
    } else if (i === "low") {
        document.getElementById("lowEdit").classList.add("highlighted-button-low");
    } else if (i === "urgent") {
        document.getElementById("urgentEdit").classList.add("highlighted-button-urgent");
    }
}


function hideEditTask() {
    document.getElementById('editTaskSection').style.display = 'none';
    document.getElementById('editTaskFullScreen').style.display = 'none';
    
    let popUpElements = document.getElementsByClassName('edit-task-card');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(275%)';
            }, 100);
        })(i);
    }
}