
let categories = ['todo', 'inprogress', 'feedback', 'done']

/**
 * Updates the HTML for every task card according to the latest information on the allTasks array on the server.
 */
function updateTasksHTML() {
    assignIDTasks();
    categories.forEach(cat => {
        updateCategoryHTML(cat);
    });
    assignCategoryColour();
    assignUserColourCard();
}

/**
 * Updates the HTML for tasks in the specified category.
 * @param {string} cat - The category of a task.
 */
function updateCategoryHTML(cat) {
    let listPerCategory =  allTasks.filter(t => t['workMode'] == cat);
    if(listPerCategory.length == 0) noTasksInArea(cat);
    else generateTask(cat, listPerCategory);
}

/**
 * Generates the HTML for the tasks.
 * @param {string} id - The ID of the task div element.
 * @param {object[]} list - The list of tasks from one category.
 */
function generateTask(id, list) {
    document.getElementById(id).innerHTML = '';
    for (let i = 0; i < list.length; i++) {
        const element = list[i];
        document.getElementById(id).innerHTML += returnTaskHTML(element);
    }
}

/**
 * Returns HTML for a task.
 * @param {object} element - The task element.
 * @returns {string} - HTML string for the task.
 */
function returnTaskHTML(element) {
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="showTask('${element['title']}', '${element['description']}', '${element['date']}', '${element['id']}', '${element['category']}', '${element['prio']}', '${element['names']}', '${element['subTask']}', '${element['singleContactId']}')" class="todo-task draggable tasks">
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
            <div class="flex align-center">
                <div class="user-container flex">
                    <div id="assigned-users-${element['id']}" class="flex m-left">
                        ${generateAssignedUsers(element)}
                    </div>
                </div> 
                <img id="img-${element['id']}" class="priority" src="${assignPriorityImgTask(element['prio'])}" alt="">
            </div>
        </div>
    `
}

/**
 * Generates HTML for a progress bar.
 * @param {number} id - The ID of the task.
 * @returns {string} - HTML string for the progress bar.
 */
function generateProgressBar(id) {
    let subTaskHTML = '';
    let subTasks = allTasks[id]['subTask']
    let sumChecked = calculateSumCheckedTasks(id);
    if(subTasks && subTasks.length > 0 ){
        let percentage = Math.round(sumChecked/subTasks.length*100)
        subTaskHTML = returnProgressBarHTML(percentage, sumChecked, subTasks)
    }
    else{
        subTaskHTML = "No Subtasks"
    }
    return subTaskHTML
}

/**
 * Returns HTML for the progress bar for subtasks.
* @param {number} percentage this is percentage of subtasks checked to the total number of subtasks.
 * @param {number} sumChecked this is the number of checked subtasks
 * @param {array} subTasks this is an Array with all subtasks.
 * @returns {string} - HTML string for the progressbar.
 */
function returnProgressBarHTML(percentage, sumChecked, subTasks) {
    return ` 
        <div class="progress">
            <div class="progress-bar" role="progressbar" style="width: ${percentage}%;"></div>
        </div>
        <span class="subFonts">${sumChecked}/${subTasks.length} Subtasks</span> 
    `
}

/**
 * Generates HTML for pop-up field of a task
 * @param {string} title title of the task
 * @param {string} description description of the task
 * @param {date} date date of the task
 * @param {number} id id of the task
 * @param {string} category category of the task
 * @param {string} prio priority of the task
 * @param {array} names names from all contacts assigned to that task
 */
function renderTasksPopUp(title, description, date, id, category, prio, names, subTasks, singleContactId) {
    let taskPopUp = document.getElementById('taskPopUp')
    taskPopUp.innerHTML = /*html*/`
        <div class="task-popup-padding scroll width-100">
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
                <div id="assigned-taskUsers-${id}" class="margin-top-16 user-flex column user-assigned margin-left-16">
                    ${generateAssignedUsersPopUp(id)}
                </div>
            </div>
            <div class="margin-top-24">
                <span class="detail">Subtasks</span>
                <div class="margin-top-12" id="subTasksPopUp${id}">
                    ${generateSubTasksInPopUp(id)}
                </div>
            </div>
            <div class="margin-top-24 subtask-edit-delete user-flex">
                <div onclick="deleteTask(${id})" class="subtasks-checkbox pointer">
                    <img src="../assets/img/icons/delete.png" alt="">
                    <span>Delete</span>
                </div>
                <div class="subtasks-seperator"></div>
                <div onclick="showEditTask('${title}', '${description}', '${date}', '${id}', '${prio}', '${subTasks}', '${singleContactId}', '${names}' )" class="subtasks-checkbox pointer">
                    <img src="../assets/img/icons/edit.png" alt="">
                    <span>Edit</span>
                </div>
            </div>
        </div>
    `
}

/**
 * Generates HTML for subtasks in task pop-up.
 * @param {number} id - The ID of the task.
 * @returns {string} - HTML string for the subtasks in the task pop-up.
 */
function generateSubTasksInPopUp(id) {
    let subTasksPopUpHTML = ''
    let subTasksArray = allTasks[id]['subTask'] 
    if(subTasksArray && subTasksArray.length > 0){
        for (let i = 0; i < subTasksArray.length; i++) {
            const subTask = subTasksArray[i];
            subTasksPopUpHTML += returnSubTasksHTML(id, i, subTask)
        }
    }
    else{
        subTasksPopUpHTML = /*html*/ `No Subtasks`
    }
    return subTasksPopUpHTML;
}

/**
 * Returns HTML for a subtask including the checkbox.
 * @param {number} id - The ID of the task.
 * @param {number} i - The index of the subtask within the subtasks array.
 * @param {string} subTask - The subtask.
 * @returns {string} - HTML string for the subtask.
 */
function returnSubTasksHTML(id, i, subTask) {
    return /*html*/ `
        <div class=" subtasks-checkbox user-assigned subTask-hover">
            <input class="checkbox-custom" onclick="saveCheckBoxStatus(${id})" id="box${id}${i}" type="checkbox"/>
            <span>${subTask}</span>
        </div>
    `
}

/**
 * Generates HTML for assigned users in task cards.
 * @param {object} element - The task object containing assigned users.
 * @returns {string} - HTML string for the assigned users in task cards.
 */
function generateAssignedUsers(element) {
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

/**
 * Generates HTML for assigned users in task pop-up.
 * @param {string} names - The names of assigned users.
 * @returns {string} - HTML string for the assigned users in task pop-up.
 */
function generateAssignedUsersPopUp(id) {
    let task = allTasks[id];
    let names = allTasks[id].names;
    let assignedTo = task.assignedTo;
    if(assignedTo !== 0){
        let usersHTML = '';
        for (let i = 0; i < names.length; i++) {
            let user = names[i];
            usersHTML += returnAssignedUserHTMLPopUp(user)
        }
        return usersHTML
    }
    else{
        usersHTML = 'No Users Assigned'    
        return usersHTML
    }
}

/**
 * Returns HTML for assigned users in task pop-up.
 * @param {string} user - The name of the assigned user.
 * @returns {string} - HTML string for the assigned users in task pop-up.
 */
function returnAssignedUserHTMLPopUp(user) {
    return /*html*/`
        <div class="flex align-center">
            <div class="pop-up-user-circle">${getInitials(user)}</div>
            <span>${user}</span>
        </div>
    `
}

/**
 * Displays a message when there are no tasks in an area.
 * @param {string} category - The category of tasks.
 */
function noTasksInArea(category) {
    let taskArea = '';
    switch (category) {
        case 'todo':
            taskArea = 'No tasks To do';
            break;
        case 'inprogress':
            taskArea = 'No tasks in Progress';
            break;
        case 'feedback':
            taskArea = 'No tasks await Feedback';
            break;
        case 'done':
            taskArea = 'No tasks Done';
            break;
    }
    let catContainer = document.getElementById(category);
    catContainer.innerHTML = `<div class="center no-taskts-to-do">${taskArea}</div>`;
}

/**
 * Assigns the source path for the task priority image based on priority level.
 * @param {string} prio - The priority level of the task ('low', 'medium', or 'urgent').
 * @returns {string} - The source path for the priority image.
 */
function assignPriorityImgTask(prio) {
    if(prio){
        let source;
        let low = '../assets/img/icons/arrow-down.png'
        let medium = '../assets/img/icons/line.png'
        let urgent = '../assets/img/icons/arrow-up.png'
    
        if(prio == 'low') source = low;
        else if(prio == 'medium') source = medium;
        else if(prio == 'urgent') source = urgent;
        return source;
    }
}

/**
 * Assigns background color to task categories.
 */
function assignCategoryColour() {
    const task_category = document.querySelectorAll('.task-category');
    task_category.forEach(task => {
            if(task.innerHTML === 'Technical Task'){
                task.style.backgroundColor = '#1FD7C1';
            }
        });
    };

/**
 * Assigns IDs to tasks according to their position in the allTasks aray.
 */
function assignIDTasks() {
    if(allTasks.length > 0){
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];
            task['id'] = i;
        }
    }
}

/**
 * Assigns background color to users in task cards as assigned to when contacts were added.
 */
function assignUserColourCard() {
    if(allTasks.length > 0){
        for (let i = 0; i < allTasks.length; i++) {
            const task = allTasks[i];
            let divElement = document.getElementById(`assigned-users-${i}`);
            for (let j = 0; j < task['assignedTo'].length; j++) {
                const user = divElement.children[j];
                if(task['colors']){
                    const colour = task['colors'][j];
                    user.style.backgroundColor = colour;
                }
            }
        }
    }
}

/**
 * Assigns background color to users in task pop-up as assigned to when contacts were added.
 * 
 *  * @param {string} names - The name of the assigned people.
 *  * @param {number} id - The ID of the assigned people.
 */
function assignUserColourPopUp(names, id) {
    let task = allTasks[id];
    let assignedTo = task.assignedTo;
    if(assignedTo !== 0){
        let namesArray = names.split(","); 
        const task = allTasks[id];
        let divElement = document.getElementById(`assigned-taskUsers-${id}`);
        for (let j = 0; j < namesArray.length; j++) {
            const user = divElement.children[j].firstElementChild;
            if(task['colors']){
                const colour = task['colors'][j];
                user.style.backgroundColor = colour;
            }
        }
    }
}


