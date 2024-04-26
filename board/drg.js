let tasks_test= [{
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recoomendation...',
    'category': 'User Story', 
    'work-mode': 'todo',
    'id': 0,
},
{
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recoomendation...',
    'category': 'User Story', 
    'work-mode': 'inprogress',
    'id': 1,
},
];

// let allTasks = [];

// let task_template = {
//     'title': title.value,
//     'description': description.value,
//     'assignedTo': assignedTo.value,
//     'date': date.value,
//     'prio': prio,
//     'category': category.value,
//     'subTask': subTask.value,
//     createdAt: new Date().getDate()
// };

let currentDraggedElement;


async function initBoard() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadAllTasks();
    await loadContacts();
    updateTasksHTML();
}


function updateTasksHTML() {
    assignIDTasks();
    updateToDoHTML();
    updateInProgressHTML();
    updateFeedbackHTML();
    updateDoneHTML();
    assignCategoryColour();
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
        <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="showTask()" class="todo-task draggable tasks">
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
                <div id="assigned-users" class="flex">
                    ${generateAssignedUsers(element)}
                </div>
                <img id="img-${element['id']}" class="priority" src="${assignPriorityImgTask(element['prio'])}" alt="">
            </div> 
        </div>
    `
}

function generateAssignedUsers(element){
    let assignedUsers = document.getElementById('assigned-users')
    let usersHTML = '';
    for (let i = 0; i < element['assignedTo'].length; i++) {
        const user = element['assignedTo'][i];
        usersHTML += /*html*/`
            <div class="user-circle"><span>${user}</span></div>
        `
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

// Drag Funktionen

function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(workMode) {
    allTasks[currentDraggedElement]['workMode'] = workMode;
    updateTasksHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area');
    
}



function assignIDTasks(){
    for (let i = 0; i < allTasks.length; i++) {
        const task = allTasks[i];
        task['id'] = i;
    }
    saveTasks();
}

function deleteTask(id){
    allTasks.splice(id, 1)
    updateTasksHTML();
}
