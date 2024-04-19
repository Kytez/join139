let allTasks = [];
let prio = '';

async function initAddTask() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadContacts();
    renderAssignedContactList();
}

function renderAssignedContactList(){
    let assignedTo = document.getElementById('contact-select');
    let userName = contacts[0].userName;
    for (let i = 0; i < userName.length; i++) {
        let userName = contacts[i].userName;

        if (userName) {
            var words = userName.split(' '); // Teile den userName in Wörter auf
            var initials = words.map(word => word.charAt(0).toUpperCase()); // Extrahiere den ersten Buchstaben jedes Worts
            var initialsString = initials.join(''); // Füge die Initialen zu einem String zusammen
            console.log(initialsString);
        }
        console.log(contacts);
        if(userName.length > 0){
            console.log(userName);
            assignedTo.innerHTML += contactListAddTaskHTML(userName, initialsString);
        }
    }
}

function contactListAddTaskHTML(userName, initialsString){
    return `
    <option value="${userName}"> <div class="initials">${initialsString}</div> ${userName}</option>
    `;
}

function addTask() {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let assignedTo = document.getElementById('contact-select');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let subTask = document.getElementById('subTask');

    let task = {
        'title': title.value,
        'description': description.value,
        'assignedTo': assignedTo.value,
        'date': date.value,
        'prio': prio,
        'category': category.value,
        'subTask': subTask.value,
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
    setPrioButtonsColor(prio);
}

/**
 * Set color of priority buttons based on given priority
 * 
 * @param {Priority} i priority
 * @returns {void} undefined
 */
function setPrioButtonsColor(i) {
    document.getElementById("medium").classList.remove("highlighted-button-medium");
    document.getElementById("low").classList.remove("highlighted-button-low");
    document.getElementById("urgent").classList.remove("highlighted-button-urgent");
    if (i === "medium") {
        document.getElementById("medium").classList.add("highlighted-button-medium");
    } else if (i === "low") {
        document.getElementById("low").classList.add("highlighted-button-low");
    } else if (i === "urgent") {
        document.getElementById("urgent").classList.add("highlighted-button-urgent");
    }
}

function handleClickPrio(i) {
    if (i) {
        selectPrio(i);
    }
}

function clearPrioButtons(i) {
   
}

function addSubtask() {
    let subTask = document.getElementById('subTaskInput');
    document.getElementById('subTask').innerHTML += `${subTask.value} <br>`;
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
