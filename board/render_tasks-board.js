
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
    assignUserColour();

}


function updateCategoryHTML(cat){
    let list =  allTasks.filter(t => t['workMode'] == cat);
    if(list.length == 0) noTasksInArea(cat);
    else generateTask(cat, list);
}


function generateTask(id, list){
    document.getElementById(id).innerHTML = '';
    for (let index = 0; index < list.length; index++) {
        const element = list[index];
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
                    ${returnSubTasksHTML(element['id'])}  
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

function returnSubTasksHTML(id){
    let subTaskHTML = '';
    let subTasks = allTasks[id]['subTask']
    let checkedTasks = allTasks[id]['checkbox'] 
    let sumTrue = 0;
    checkedTasks.forEach(value => {
        if (value) {
            sumTrue++;
        }
    });
    let percentage = Math.round(sumTrue/subTasks.length*100)
    if(subTasks.length > 0){
        subTaskHTML =` 
            <div class="progress">
                <div class="progress-bar" role="progressbar" style="width: ${percentage}%;"></div>
            </div>
            <span class="subFonts">${sumTrue}/${subTasks.length} Subtasks</span> 
        `
    }
    else{
        subTaskHTML = "No Subtasks"
    }
    return subTaskHTML
}

function renderTasksPopUp(title, description, date, id, category, prio, names){
    let taskPopUp = document.getElementById('taskPopUp')

    taskPopUp.innerHTML = /*html*/`
        <div class="task-padding gap width-100">
            <div class="space-between subtasks-checkbox">
                <div class="task-category">${category}</div> 
                <img onclick="hideTask()" class="close-img" src="../assets/img/icons/close.png">
            </div>
            
            <span class="pop-up-headline">${title}</span> <br>
            <div class="margin-top-16">
                <span>${description}</span>
            </div>
            <div class="margin-top-16">
                <span>Due date:</span>
                <span>${date}</span>
            </div>
            <div class="margin-top-16 user-flex">
                <span>Priority:</span>
                <div class="user-prio">
                    <span class="prio-txt">${prio}</span> 
                    <img src="${assignPriorityImgTask(prio)}" alt="">
                </div>
            </div>
            <div class="margin-top-16">
                <span>Assigned To:</span>
                <div id="assigned-taskUsers-${id}" class="margin-top-16 user-flex column user-assigned">
                    ${generateAssignedUsersPopUp(names)}
                </div>
            </div>
            <div class="margin-top-16">
                <span>Subtasks:</span>
                <div id="subTasksPopUp">
                    ${generateSubTasksInPopUP(id)}
                </div>
            </div>
            <div class="margin-top-16 subtask-edit-delete user-flex">
                <div onclick="deleteTask(${id})" class="subtasks-checkbox">
                    <img src="../assets/img/icons/delete.png" alt="">
                    <span>Delete</span>
                </div>
                <div class="subtasks-seperator"></div>
                <div onclick="showEditTask('${title}', '${description}', '${date}', '${id}', '${prio}')" class="subtasks-checkbox">
                    <img src="../assets/img/icons/edit.png" alt="">
                    <span>Edit</span>
                </div>
            </div>
        </div>
    `
}

function generateSubTasksInPopUP(id){
    let subTasksPopUpHTML = ''
    let subTasksArray = allTasks[id]['subTask'] 
    if(subTasksArray.length > 0){
        for (let i = 0; i < subTasksArray.length; i++) {
            const subTask = subTasksArray[i];
            subTasksPopUpHTML += /*html*/ `
                <div class="margin-top-16 subtasks-checkbox user-assigned">
                    <input class="checkbox-custom" onclick="saveCheckBoxStatus(${id})" id="box${id}${i}" type="checkbox"/>
                    <span>${subTask}</span>
                </div>
            `
        }
    }

    return subTasksPopUpHTML;
}

function saveCheckBoxStatus(id){
    let subTasks = allTasks[id]['subTask']
    for (let i = 0; i < subTasks.length; i++) {
        const subTask = subTasks[i];
        const checkbox = document.getElementById(`box${id}${i}`)
        if(checkbox.checked){
            allTasks[id]['checkbox'][i] = true;
        }
        else{
            allTasks[id]['checkbox'][i] = false;
        }
    }
    updateTasksHTML();
    saveTasks();
}

function loadCheckBoxStatus(id){
    let checkBoxValue = allTasks[id]['checkbox']
    console.log(checkBoxValue)
    console.log(typeof(checkBoxValue))
    if(checkBoxValue.length > 0){
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
}

function generateAssignedUsers(element){
    let usersHTML = '';
    console.log(typeof(element))
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
        usersHTML += /*html*/`
            <div class="flex align-center">
                <div class="pop-up-user-circle">${getInitials(user)}</div>
                <span>${user}</span>
            </div>
        `;
    
    }
    
    return usersHTML
}



function noTasksInArea(category){
    let catContainer = document.getElementById(category) 
    if(category == 'todo'){
        catContainer.innerHTML = `
            <div class="center no-taskts-to-do">No tasks To do</div>
        `
    }
    else if(category == 'inprogress'){
        catContainer.innerHTML = `
            <div class="center no-taskts-to-do">No tasks in Progress</div>
        `
    }
    else if(category == 'feedback'){
        catContainer.innerHTML = `
            <div class="center no-taskts-to-do">No tasks await Feedback</div>
        `
    }
    else if(category == 'done'){
        catContainer.innerHTML = `
            <div class="center no-taskts-to-do">No tasks Done</div>
        `
    }
}

function assignPriorityImgTask(prio){
    let source;
    let low = '../assets/img/icons/arrow-down.png'
    let medium = '../assets/img/icons/line.png'
    let urgent = '../assets/img/icons/arrow-up.png'

    if(prio == 'low'){
        source = low;
    }
    if(prio == 'medium'){
        source = medium;
    }
    if(prio == 'urgent'){
        source = urgent;
    }
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

function assignUserColour(){
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

function assigntaskUserColour(names, id){
    let namesArray = names.split(","); 
    for (let i = 0; i < allTasks.length; i++) {
        if(i == id){
            const task = allTasks[i];
            let divElement = document.getElementById(`assigned-taskUsers-${id}`);
            for (let j = 0; j < namesArray.length; j++) {
                const user = divElement.children[j].firstElementChild;
                const colour = task['colors'][j];
                user.style.backgroundColor = colour;
            }
        }
    }
}

function deleteTask(id){
    allTasks.splice(id, 1)
    updateTasksHTML();
    hideTask();
    saveTasks();
}
