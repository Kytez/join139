/**
 * moves the edit-task pop-up field into the screenview via translateX and executes rendering of adjusted editable elements for each task.
 * 
 * @param {string} id This is the id of the task
 * @param {string} prio This is the priority value for the task 
 */

function showEditTask(title, description, date, id, prio){
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
    renderEditTaskPopUpElements(title, description, date, id, prio)
}

/**
 * renders elements of the task into the edit-task pop-up segments for further editing
 * 
 * @param {string} id This is the id of the task
 * @param {string} prio This is the priority value for the task
 */

function renderEditTaskPopUpElements(title, description, date, id, prio){
    let titleEdit = document.getElementById('titleEdit');
    let descriptionEdit = document.getElementById('descriptionEdit');
    let dateEdit = document.getElementById('dateEdit');
    let okButton = document.getElementById('boardEditTaskBtns');

    titleEdit.value = title;
    descriptionEdit.value = description;
    dateEdit.value = date;
    setPrioButtonsColorEdit(prio);
    okButton.innerHTML = /*html*/ `
        <button onclick="editTask(${id})"  class="btn-dark-edit pointer">Ok 
            <img src="../assets/img/icons/check_icon.png" alt="">
        </button> 
    `
}


/**
 * saves edited values into the allTasks array, overwriting the old values and updates the array on the server and the HTML of the page.
 * 
 * @param {string} id This is the id of the task
 */
function editTask(id) {
    let titleEdit = document.getElementById('titleEdit')
    let descriptionEdit = document.getElementById('descriptionEdit')
    let dateEdit = document.getElementById('dateEdit')

    allTasks[id]['title'] = titleEdit.value
    allTasks[id]['description'] = descriptionEdit.value
    allTasks[id]['date'] = dateEdit.value
    allTasks[id]['prio'] = prio

    updateTasksHTML();
    saveTasks();
    hideEditTask();
    hideTask();
    // renderTasksPopUp(title, description, date, id, category, prio, names)
}


/**
 * sets the color for the priority fields depending on the priority value as chosen by user.
 * 
 * @param {string} i This is the priority value for the task
 */

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


/**
 * hides the edit-task pop-up field from the screen via translateX.
 */

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

