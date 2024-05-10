
async function initBoard() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadAllTasks();
    await loadContacts();
    updateTasksHTML();
    renderAssignedContactList()
}

let categories = ['todo', 'inprogress', 'feedback', 'done']

function updateTasksHTML() {
    assignIDTasks();
    categories.forEach(cat => {
        updateCategoryHTML(cat);
    });
    assignCategoryColour();
    assignUserColourCard();

}


function updateCategoryHTML(cat){
    let listPerCategory =  allTasks.filter(t => t['workMode'] == cat);
    if(listPerCategory.length == 0) noTasksInArea(cat);
    else generateTask(cat, listPerCategory);
}


function generateTask(id, list){
    document.getElementById(id).innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        document.getElementById(id).innerHTML += returnTaskHTML(element);
    }
}

function returnTaskHTML(element){
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="showTask('${element['title']}', '${element['description']}', '${element['date']}', '${element['id']}', '${element['category']}', '${element['prio']}', '${element['names']}')" class="todo-task draggable tasks">
            <div class="task-padding">
                <div class="task-category">${element['category']}</div>
                <span class="task-title">${element['title']}</span> <br>
                <div >
                    <span class="description">${element['description']}</span> <br>
                </div>
                <div class="subtasks">
                    ${generateProgressBar(element['id'])}  
                </div>
            </div>
            <div class="user-container flex">
                <div id="assigned-users-${element['id']}" class="flex m-left">
                    ${generateAssignedUsers(element)}
                </div>
                <img id="img-${element['id']}" class="priority" src="${assignPriorityImgTask(element['prio'])}" alt="">
            </div> 
        </div>
    `
}

function generateProgressBar(id){
    let subTaskHTML = '';
    let subTasks = allTasks[id]['subTask']
    let sumChecked = calculateSumCheckedTasks(id);
    let percentage = Math.round(sumChecked/subTasks.length*100)
    if(subTasks.length > 0){
        subTaskHTML = returnProgressBarHTML(percentage, sumChecked, subTasks)
    }
    else{
        subTaskHTML = "No Subtasks"
    }
    return subTaskHTML
}

function calculateSumCheckedTasks(id){
    let checkedTasks = allTasks[id]['checkbox'] 
    let sumTrue = 0;
    checkedTasks.forEach(value => {
        if (value) {
            sumTrue++;
        }
    });
    return sumTrue;
}

function returnProgressBarHTML(percentage, sumChecked, subTasks){
    return ` 
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${percentage}%;"></div>
        </div>
        <span class="subFonts">${sumChecked}/${subTasks.length} Subtasks</span> 
    `
}

function renderTasksPopUp(title, description, date, id, category, prio, names){
    let taskPopUp = document.getElementById('taskPopUp')

    taskPopUp.innerHTML = /*html*/`
        <div class="task-popup-padding width-100">
            <div class="space-between gap subtasks-checkbox">
                <div class="task-category header-popup">${category}</div> 
                <img onclick="hideTask()" class="close-img pointer" src="../assets/img/icons/close.png">
            </div>
            
            <span class="pop-up-headline">${title}</span> <br>
            <div class="margin-top-24">
                <span>${description}</span>
            </div>
            <div class="margin-top-24">
                <span class="detail duedate-popup">Due date:</span>
                <span>${date}</span>
            </div>
            <div class="margin-top-24 user-flex">
                <span class="detail">Priority:</span>
                <div class="user-prio">
                    <span class="prio-txt">${prio}</span> 
                    <img src="${assignPriorityImgTask(prio)}" alt="">
                </div>
            </div>
            <div class="margin-top-24">
                <span class="detail">Assigned To:</span>
                <div id="assigned-taskUsers-${id}" class="margin-top-16 user-flex column user-assigned">
                    ${generateAssignedUsersPopUp(names)}
                </div>
            </div>
            <div class="margin-top-24">
                <span class="detail">Subtasks</span>
                <div class="margin-top-12" id="subTasksPopUp">
                    ${generateSubTasksInPopUp(id)}
                </div>
            </div>
            <div class="margin-top-24 subtask-edit-delete user-flex">
                <div onclick="deleteTask(${id})" class="subtasks-checkbox pointer">
                    <img src="../assets/img/icons/delete.png" alt="">
                    <span>Delete</span>
                </div>
                <div class="subtasks-seperator"></div>
                <div onclick="showEditTask('${title}', '${description}', '${date}', '${id}', '${prio}')" class="subtasks-checkbox pointer">
                    <img src="../assets/img/icons/edit.png" alt="">
                    <span>Edit</span>
                </div>
            </div>
        </div>
    `
}

function generateSubTasksInPopUp(id){
    let subTasksPopUpHTML = ''
    let subTasksArray = allTasks[id]['subTask'] 
    if(subTasksArray.length > 0){
        for (let i = 0; i < subTasksArray.length; i++) {
            subTasksPopUpHTML += returnSubTasksHTML(id, i)
        }
    }
    else{
        subTasksPopUpHTML = /*html*/ `
            No Subtasks
        `
    }
    return subTasksPopUpHTML;
}

function returnSubTasksHTML(id, i){
    return /*html*/ `
        <div class=" subtasks-checkbox user-assigned">
            <input class="checkbox-custom" onclick="saveCheckBoxStatus(${id})" id="box${id}${i}" type="checkbox"/>
            <span>${subTask}</span>
        </div>
    `
}

function saveCheckBoxStatus(id){
    let subTasks = allTasks[id]['subTask']
    subTaskIsChecked(id, subTasks)
    updateTasksHTML();
    saveTasks();
}

function subTaskIsChecked(id, subTasks){
    for (let i = 0; i < subTasks.length; i++) {
        const checkbox = document.getElementById(`box${id}${i}`)
        if(checkbox.checked){
            allTasks[id]['checkbox'][i] = true;
        }
        else{
            allTasks[id]['checkbox'][i] = false;
        }
    }
}

function loadCheckBoxStatus(id){
    let checkBoxValue = allTasks[id]['checkbox']
    if(checkBoxValue.length > 0){
        checkSubTasks(id, checkBoxValue)
    }
}

function checkSubTasks(id, checkBoxValue){
    for (let i = 0; i < checkBoxValue.length; i++) {
        const value = checkBoxValue[i];
        const checkbox = document.getElementById(`box${id}${i}`)
        if(value == true){
            checkbox.checked = true;
        }
        else{
            checkbox.checked = false;
        }
    }
}

function generateAssignedUsers(element){
    let usersHTML = '';
    if(element['assignedTo'] == null){
        element['assignedTo'] = 0;
    }
    for (let i = 0; i < element['assignedTo'].length; i++) {
        const user = element['assignedTo'][i];
        usersHTML += /*html*/`
            <div class="user-circle"><span>${user}</span></div>
        `;
    }
    return usersHTML
}

function generateAssignedUsersPopUp(names){
    let usersHTML = '';
    let namesArray = names.split(",");
    for (let i = 0; i < namesArray.length; i++) {
        const user = namesArray[i];
        usersHTML += returnAssignedUserHTMLPopUp(user)
    }
    return usersHTML
}

function returnAssignedUserHTMLPopUp(user){
    return /*html*/`
        <div class="flex align-center">
            <div class="pop-up-user-circle">${getInitials(user)}</div>
            <span>${user}</span>
        </div>
    `
}



function noTasksInArea(category){
    let taskArea = '';
    switch (category) {
        case 'todo':
            message = 'No tasks To do';
            break;
        case 'inprogress':
            message = 'No tasks in Progress';
            break;
        case 'feedback':
            message = 'No tasks await Feedback';
            break;
        case 'done':
            message = 'No tasks Done';
            break;
    }
    let catContainer = document.getElementById(category);
    catContainer.innerHTML = `<div class="center no-taskts-to-do">${taskArea}</div>`;
}

function assignPriorityImgTask(prio){
    let source;
    let low = '../assets/img/icons/arrow-down.png'
    let medium = '../assets/img/icons/line.png'
    let urgent = '../assets/img/icons/arrow-up.png'

    if(prio == 'low') source = low;
    else if(prio == 'medium') source = medium;
    else if(prio == 'urgent') source = urgent;
    return source;
}


function assignCategoryColour(){
    const task_category = document.querySelectorAll('.task-category');
    task_category.forEach(task => {
            if(task.innerHTML === 'Technical Task'){
                task.style.backgroundColor = '#1FD7C1';
            }
        });
    };



function assignIDTasks(){
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task['id'] = i;
    }
}

function assignUserColourCard(){
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        let divElement = document.getElementById(`assigned-users-${i}`);
        for (let j = 0; j < task['assignedTo'].length; j++) {
            const user = divElement.children[j];
            const colour = task['colors'][j];
            user.style.backgroundColor = colour;
        }
    }
}

function assignUserColourPopUp(names, id){
    let namesArray = names.split(","); 
    const task = allTasks[id];
    let divElement = document.getElementById(`assigned-taskUsers-${id}`);
    for (let j = 0; j < namesArray.length; j++) {
        const user = divElement.children[j].firstElementChild;
        const colour = task['colors'][j];
        user.style.backgroundColor = colour;
    }
}

function deleteTask(id){
    allTasks.splice(id, 1)
    updateTasksHTML();
    hideTask();
    saveTasks();
}
