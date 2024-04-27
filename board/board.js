function showTask(title, description, date, id, category, prio) {
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
    renderTasksPopUp(title, description, date, id, category, prio)
    assignCategoryColour();
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
    
    let popUpElements = document.getElementsByClassName('add-task-card');
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

function hideAddTask() {
    document.getElementById('addTaskSection').style.display = 'none';
    document.getElementById('addTaskFullScreen').style.display = 'none';
    
    let popUpElements = document.getElementsByClassName('add-task-card');
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
    if(window.innerWidth > 992){
        showAddTask(section)
    }
    else{
        
    }
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
    };
    console.log(colors);
    console.log(allTasks);
    allTasks.push(task);
    console.log(allTasks);
    updateTasksHTML();
    hideAddTask();    
}