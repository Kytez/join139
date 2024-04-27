
async function initBoard() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadAllTasks();
    await loadContacts();
    updateTasksHTML();
    renderAssignedContactList()
}


function updateTasksHTML() {
    assignIDTasks();
    updateToDoHTML();
    updateInProgressHTML();
    updateFeedbackHTML();
    updateDoneHTML();
    assignCategoryColour();
    assignUserColour();

}

function updateToDoHTML(){
    let todo_list = allTasks.filter(t => t['workMode'] == 'todo');
    if(todo_list.length == 0){
        noTasksInArea('todo');
    }
    else{
        generateTask('todo', todo_list);

    }
}



function updateInProgressHTML(){
    let inprogress_list = allTasks.filter(t => t['workMode'] == 'inprogress');
    if(inprogress_list.length == 0){
        noTasksInArea('inprogress');
    }
    else{
        generateTask('inprogress', inprogress_list);

    }
}


function updateFeedbackHTML(){
    let feedback_list = allTasks.filter(t => t['workMode'] == 'feedback');
    if(feedback_list.length == 0){
        noTasksInArea('feedback');
    }
    else{
        generateTask('feedback', feedback_list);
    }
}

function updateDoneHTML(){
    let done_list = allTasks.filter(t => t['workMode'] == 'done');
    if(done_list.length == 0){
        noTasksInArea('done');
    }
    else{
        generateTask('done', done_list);
    }
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
        <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="showTask('${element['title']}', '${element['description']}', '${element['date']}', '${element['id']}')" class="todo-task draggable tasks">
            <div class="task-padding">
                <div class="task-category">${element['category']}</div>
                <span class="task-title">${element['title']}</span> <br>
                <div >
                    <span class="description">${element['description']}</span> <br>
                </div>
                <div class="subtasks">
                    <span>1/2 Subtasks</span>   
                </div>
            </div>
            <div class="user-container flex">
                <div id="assigned-users-${element['id']}" class="flex">
                    ${generateAssignedUsers(element)}
                </div>
                <img id="img-${element['id']}" class="priority" src="${assignPriorityImgTask(element['prio'])}" alt="">
            </div> 
        </div>
    `
}


function renderTasksPopUp(title, description, date, id){
    let taskPopUp = document.getElementById('taskPopUp')

    taskPopUp.innerHTML = /*html*/`
        <div class="task-padding gap">
            <div class="space-between subtasks-checkbox">
                <div class="task-title">User Story</div> 
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
                    <span>medium</span> 
                    <img src="../assets/img/icons/line.png" alt="">
                </div>
            </div>
            <div class="margin-top-16">
                <span>Assigned To:</span>
                <div class="margin-top-16 user-flex user-assigned subtasks-checkbox">
                    <div class="pop-up-user-circle">AM</div>
                    <span>Emanuel DeiMudda</span>
                </div>
            </div>
            <div class="margin-top-16">
                <span>Subtasks:</span>
                <div class="">
                    <div class="margin-top-16 subtasks-checkbox user-assigned">
                        <img src="../assets/img/icons/check box mobile.png" alt="">
                        <span>Implement Recipe recoomendation</span>
                    </div>
                    <div class="margin-top-16 subtasks-checkbox user-assigned">
                        <img src="../assets/img/icons/check button mobile.png" alt="">
                        <span>Start Page Layout</span>
                    </div>
                </div>
            </div>
            <div class="margin-top-16 subtask-edit-delete user-flex">
                <div onclick="deleteTask(${id})" class="subtasks-checkbox">
                    <img src="../assets/img/icons/delete.png" alt="">
                    <span>Delete</span>
                </div>
                <div class="subtasks-seperator"></div>
                <div class="subtasks-checkbox">
                    <img src="../assets/img/icons/edit.png" alt="">
                    <span>Edit</span>
                </div>
            </div>
        </div>
    `
}

function generateAssignedUsers(element){
    let assignedUsers = document.getElementById('assigned-users')
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

function noTasksInArea(id){
    document.getElementById(id).innerHTML = `
        <div class="center no-taskts-to-do">No tasks To do</div>
    `
}

function assignPriorityImgTask(prio){
    let source;
    let low = '../assets/img/icons/down.png'
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
    saveTasks();
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

function deleteTask(id){
    allTasks.splice(id, 1)
    updateTasksHTML();
}
