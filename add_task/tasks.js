let allTasks = [];
let prio = '';
function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assignedTo = document.getElementById('contact-select');
    let category = document.getElementById('category');

    let task = {
        'title': title.value,
        'description': description.value,
        'assignedTo': assignedTo.value,
        'category': category.value,
        'prio': prio,
        createdAt: new Date().getDate()
    };

    allTasks.push(task);
    console.log(allTasks);

    let allTasksAsString = JSON.stringify(allTasks);;
    localStorage.setItem('allTasks', allTasksAsString);
}

function loadAllTasks() {
    let allTasksAsString = localStorage.getItem('allTasks');
    if (allTasksAsString) {
        allTasks = JSON.parse(allTasksAsString);
    }
}

function selectPrio(i) {
    prio = i;
    console.log(prio);
}

function taskHtml() {
    return html`
    <div onclick="showTask()" class="tasks">
                <div class="task-padding">
                    <div class="task-title">User Story</div>
                    <span class="task-description">Kochwelt Page & Recipe Recommender</span> <br>
                    <span>Build start page with recipe recoomendation...</span> <br>
                    <div class="subtasks">
                    <span>1/2 Subtasks</span>   
                </div>
                <div class="user-container flex">
                    <div class="flex">
                        <div class="user-circle"><span>AM</span></div>
                        <div class="margin-left user-circle"><span>AM</span></div>
                    </div>
                        <img class="priority" src="../assets/img/icons/line.png" alt="">
                        </div> 
                    </div>
                </div>
            </div>
            `;
}
