function showTask(title, description, date, id, category, prio, names) {
    document.getElementById('tasks').style.display = 'flex';
   let taskPopUp = document.getElementById('taskPopUp')
   taskPopUp.style.display = 'flex';
    
    let popUpElements = document.getElementsByClassName('pop-up');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(0)';
            }, 100);
        })(i);
    }
    renderTasksPopUp(title, description, date, id, category, prio, names)
    assignCategoryColour();
    assigntaskUserColour(names, id);
    loadCheckBoxStatus(id);
}


function hideTask() {
    document.getElementById('tasks').style.display = 'none';
    document.getElementById('taskPopUp').style.display = 'none';
    
    let popUpElements = document.getElementsByClassName('pop-up');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(200%)';
            }, 100);
        })(i);
    }
}

function showAddTask(section = 'todo') {
    document.getElementById('addTaskSection').style.display = 'flex';
    document.getElementById('addTaskFullScreen').style.display = 'flex';
    
    let popUpElements = document.getElementsByClassName('add-task-card-board');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(0)';
            }, 100);
        })(i);
    }

    document.getElementById('boardAddTaskBtns').innerHTML = /*html*/`
        <button class="btn-white">Clear <img src="../assets/img/icons/x.png" alt=""></button>
        <button onclick="addTaskBoard('${section}')" class="btn-dark">Create Task <img src="../assets/img/icons/check_icon.png" alt=""></button>  
    `
}

function setPrioButtonsColorBoard(i) {
    document.getElementById("mediumBoard").classList.remove("highlighted-button-medium");
    document.getElementById("lowBoard").classList.remove("highlighted-button-low");
    document.getElementById("urgentBoard").classList.remove("highlighted-button-urgent");
    if (i === "medium") {
        document.getElementById("mediumBoard").classList.add("highlighted-button-medium");
    } else if (i === "low") {
        document.getElementById("lowBoard").classList.add("highlighted-button-low");
    } else if (i === "urgent") {
        document.getElementById("urgentBoard").classList.add("highlighted-button-urgent");
    }
}

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

function hideAddTask() {
    document.getElementById('addTaskSection').style.display = 'none';
    document.getElementById('addTaskFullScreen').style.display = 'none';
    
    let popUpElements = document.getElementsByClassName('add-task-card-board');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(275%)';
            }, 100);
        })(i);
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


function addTaskToSectionButton(section){
    showAddTask(section)
}


function addTaskInProgress() {
    window.location.href = 'https://www.iqbal-adel.developerakademie.net/join9/add_task/add_task.html';

    window.addEventListener('DOMContentLoaded', function() {
            let buttonAdd = document.getElementById('buttonAdd');
            if (buttonAdd) {
                buttonAdd.onclick = function() {
                    addTask('inprogress');
                };
            }
    });
}

function doNotClose(event){
    event.stopPropagation();
}

function addTaskBoard(workMode = 'todo') {
    let title = document.getElementById('titleBoard');
    let description = document.getElementById('descriptionBoard');
    let date = document.getElementById('dateBoard');
    let category = document.getElementById('categoryBoard');
    let subTask = document.getElementById('subTaskBoard');
    let contactIDs = [];
    if (title.value.trim() === '' && category.value.trim() === '' && date.value.trim() === '') {
    }else {
        let task = {
            'id': allTasks.length + 1,
            'title': title.value,
            'description': description.value,
            'assignedTo': selectedContacts,
            'colors': colors,
            'date': date.value,
            'prio': prio,
            'category': category.value,
            'subTask': subTask.value,
            createdAt: new Date().getDate(),
            'workMode': workMode,
            'names': names,
        };
        allTasks.push(task);
        updateTasksHTML();
        saveTasks();
        hideAddTask();  
    }
}

async function filterTask() {
    let searchInput = document.getElementById("site-search").value.trim().toLowerCase();

    if(document.getElementById("site-search").value.length < 1) {
        await loadAllTasks();
        updateTasksHTML();
    } else {
    let foundTasks = [];

    allTasks.forEach(task => {
        if (
            task.title.toLowerCase().includes(searchInput) ||
            (task.description && task.description.toLowerCase().includes(searchInput))
        ) {
            foundTasks.push(task);
        }
    });

    allTasks = foundTasks;

    updateTasksHTML();
}
}

