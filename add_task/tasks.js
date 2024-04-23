let allTasks = [];
let selectedContacts = [];
let prio = '';

async function initAddTask() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadContacts();
    renderAssignedContactList();
}

function renderAssignedContactList(){
    let assignedTo = document.getElementById('selected-contacts');
    
    for (let i = 0; i < contacts.length; i++) {
        let userName = contacts[i].userName;
        let initialsString = ''; // Definiere initialsString hier, um sicherzustellen, dass sie immer definiert ist

        if (userName) {
            let words = userName.split(' ');
            let initials = words.map(word => word.charAt(0).toUpperCase());
            initialsString = initials.join('');
            console.log(initialsString);
        }
        console.log(contacts);
        if(userName.length > 0){
            console.log(userName);
            assignedTo.innerHTML += contactListAddTaskHTML(i, userName, initialsString);
        }
        saveTasks();
    }
    
}

async function saveTasks(){
    setItem('allTasks', JSON.stringify(allTasks));

}

async function loadAllTasks(){
    try {
        allTasks = JSON.parse(await getItem('allTasks'));
    } catch(e) {
        console.error('Loading error:', e);
    }
}


function contactListAddTaskHTML(i, userName, initialsString){
    return `
    <div id="SingleContact_${i}" onclick="selectTaskContact(${i})" class="contact-list-entry">
        <div class="contact-list-entry">
            <div class="initials">${initialsString}</div>
            <div class="profile-fullname">${userName} </div> 
        </div>
        <img id="empty_${i}" class="" src="../assets/img/svg/Check button empty.svg">
        <img id="checked_${i}" class="d-none" src="../assets/img/svg/Check button checked.svg">
    </div>
    `;
}

function selectTaskContact(i){
    changeCheckedAndColor(i);
    document.getElementById(`SingleContact_${i}`);
}

function changeCheckedAndColor(i){
    let selectedContact = document.getElementById(`SingleContact_${i}`);
    let emptySelect = document.getElementById(`empty_${i}`);
    let checkedSelect = document.getElementById(`checked_${i}`);
    
    if (emptySelect.classList.contains("d-none")) {
        // Wenn bereits ausgewählt, dann ändere auf nicht ausgewählt
        selectedContact.style.backgroundColor = "";
        selectedContact.style.color = "black";
        emptySelect.classList.remove("d-none");
        checkedSelect.classList.add("d-none");
    } else {
        // Wenn nicht ausgewählt, dann ändere auf ausgewählt
        selectedContact.style.backgroundColor = "#2A3647";
        selectedContact.style.color = "white";
        emptySelect.classList.add("d-none");
        checkedSelect.classList.remove("d-none");
    }
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
