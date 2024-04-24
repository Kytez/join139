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
        noTasksInArea('todo');
    }
    else{
        generateTask('todo', todo_list);

    }
}



function updateInProgressHTML(){
    let inprogress_list = tasks_test.filter(t => t['work-mode'] == 'inprogress');
    if(inprogress_list.length == 0){
        noTasksInArea('inprogress');
    }
    else{
        generateTask('inprogress', inprogress_list);

    }
}


function updateFeedbackHTML(){
    let feedback_list = tasks_test.filter(t => t['work-mode'] == 'feedback');
    if(feedback_list.length == 0){
        noTasksInArea('feedback');
    }
    else{
        generateTask('feedback', feedback_list);
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

function noTasksInArea(id){
    document.getElementById(id).innerHTML = `
        <div class="center no-taskts-to-do">No tasks To do</div>
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