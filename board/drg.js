let tasks_test= [{
    'title': 'Kochwelt Page & Recipe Recommender',
    'description': 'Build start page with recipe recoomendation...',
    'category': 'User Story', 
    'work-mode': 'todo',
    'id': 0,
}];

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
    updateToDoHTML();
    updateInProgressHTML();
    updateFeedbackHTML();
    // updateDoneHTML();
}

function updateToDoHTML(){
    let todo_list = tasks_test.filter(t => t['work-mode'] == 'todo');
    if(todo_list.length == 0){
        document.getElementById('todo').innerHTML = `
            <div class="center no-taskts-to-do">No tasks To do</div>
        `
    }
    else{
        document.getElementById('todo').innerHTML = '';
        for (let index = 0; index < todo_list.length; index++) {
            const element = todo_list[index];
            document.getElementById('todo').innerHTML += generateTaskHTML(element);
        }
    }
}



function updateInProgressHTML(){
    let inprogress_list = tasks_test.filter(t => t['work-mode'] == 'inprogress');
    if(inprogress_list.length == 0){
        document.getElementById('inprogress').innerHTML = `
            <div class="center no-taskts-to-do">No tasks To do</div>
        `
    }
    else{
        document.getElementById('inprogress').innerHTML = '';
        for (let index = 0; index < inprogress_list.length; index++) {
            const element = inprogress_list[index];
            document.getElementById('inprogress').innerHTML += generateTaskHTML(element);
        }
    }
}


function updateFeedbackHTML(){
    let feedback_list = tasks_test.filter(t => t['work-mode'] == 'feedback');
    if(feedback_list.length == 0){
        document.getElementById('feedback').innerHTML = `
            <div class="center no-taskts-to-do">No tasks To do</div>
        `
    }
    else{
        document.getElementById('feedback').innerHTML = '';
        for (let index = 0; index < feedback_list.length; index++) {
            const element = feedback_list[index];
            document.getElementById('feedback').innerHTML += generateTaskHTML(element);
        }
    }
}

function generateTodoHTML(element) {
    return `<div draggable="true" ondragstart="startDragging(${element['id']})" class="todo">${element['title']}</div>`;
}

function generateTaskHTML(element){
    return /*html*/ `
        <div draggable="true" ondragstart="startDragging(${element['id']})" onclick="showTask()" class="todo-task draggable tasks">
            <div class="task-padding">
                <div class="task-category">${element['category']}</div>
                <span class="task-title">${element['title']}</span> <br>
                <span>${element['description']}</span> <br>
                <div class="subtasks">
                    <span>1/2 Subtasks</span>   
                </div>
            </div>
            <div class="user-container flex">
                <div class="flex">
                    <div class="user-circle"><span>AM</span></div>
                    <div class="margin-left user-circle"><span>AM</span></div>
                </div>
                <img class="priority" src="../assets/img/icons/line.png" alt="">
            </div> 
        </div>
    `
}


function startDragging(id) {
    currentDraggedElement = id;
}


function allowDrop(ev) {
    ev.preventDefault();
}

function moveTo(workMode) {
    tasks_test[currentDraggedElement]['work-mode'] = workMode;
    updateTasksHTML();
}

function highlight(id) {
    document.getElementById(id).classList.add('drag-area');
}

function removeHighlight(id) {
    document.getElementById(id).classList.remove('drag-area');
    
}




// Beim Add-Task abhängig vom Plus-Zeichen Moment, muss ein extra Key zugewiesen werden für todo oder inprogress oder ..., default beim Add-Task ist ToDo aber. Zusätzlich eine ID