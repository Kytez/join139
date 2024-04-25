let allTasks = [];
let emptyArray = [];
let selectedContacts = [];
let prio = '';
let id = [];
let colors = [];


async function initAddTask() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadContacts();
    await loadAllTasks();
    renderAssignedContactList();
}

function renderAssignedContactList(){
    let assignedTo = document.getElementById('selected-contacts');
    
    for (let i = 0; i < contacts.length; i++) {
        let userName = contacts[i].userName;
        let initialsString = ''; 
        let color = contacts[i].colour;
        if (userName) {
            let words = userName.split(' ');
            let initials = words.map(word => word.charAt(0).toUpperCase());
            initialsString = initials.join('');
        }
        console.log(contacts);
        if(userName.length > 0){
            assignedTo.innerHTML += contactListAddTaskHTML(i, userName, initialsString);
            let user = document.getElementById(`initials_${i}`);
            user.style.backgroundColor = color;
        }
    }
    
}

function addTask(workMode = 'todo') {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let subTask = document.getElementById('subTask');
    let task = {
        'id': allTasks.length + 1,
        'title': title.value,
        'description': description.value,
        'assignedTo': selectedContacts,
        'colors': colors,
        'date': date.value,
        'prio': prio,
        'category': category.value,
        'subTask': subTask.value,
        createdAt: new Date().getDate(),
        'workMode': workMode,
    };
    console.log(colors);
    console.log(allTasks);
    allTasks.push(task);
    console.log(allTasks);
    saveTasks();
}

function showContactList(){
    let contactList = document.getElementById('selected-contacts');
    if (contactList.classList.contains('d-none')) {
        contactList.classList.remove('d-none');
    } else {
        contactList.classList.add('d-none');
    }
}

async function saveTasks(){
    setItem('allTasks', JSON.stringify(allTasks));
}

async function loadAllTasks(){
    try {
        allTasks = JSON.parse(await getItem('allTasks')) || [];
    } catch(e) {
        console.error('Loading error:', e);
    }
}

function contactListAddTaskHTML(i, userName, initialsString){
    return `
    <div id="SingleContact_${i}" onclick="selectTaskContact(${i})" class="contact-list-entry">
        <div class="contact-list-entry">
            <div id="initials_${i}" class="initials">${initialsString}</div>
            <div class="profile-fullname">${userName} </div> 
        </div>
        <img id="empty_${i}" class="" src="../assets/img/svg/Check button empty.svg">
        <img id="checked_${i}" class="d-none" src="../assets/img/svg/Check button checked.svg">
    </div>
    `;
}

function selectTaskContact(i){ 
    let contact = document.getElementById(`initials_${i}`).textContent; // Extrahiere den Inhalt des div-Elements
    changeCheckedAndColor(i, contact);
}

function changeCheckedAndColor(i, contact){
    let selectedContact = document.getElementById(`SingleContact_${i}`);
    let emptySelect = document.getElementById(`empty_${i}`);
    let checkedSelect = document.getElementById(`checked_${i}`);
    let element = document.getElementById(`initials_${i}`);
    
    if (emptySelect.classList.contains("d-none")) {
        selectedContact.style.backgroundColor = "";
        selectedContact.style.color = "black";
        emptySelect.classList.remove("d-none");
        checkedSelect.classList.add("d-none");
        selectedContacts.splice(selectedContacts.indexOf(i), 1);
        colors.splice(colors.indexOf(i), 1);
    } else {
        selectedContact.style.backgroundColor = "#2A3647";
        selectedContact.style.color = "white";
        emptySelect.classList.add("d-none");
        checkedSelect.classList.remove("d-none");
        let computedStyle = window.getComputedStyle(element).backgroundColor;
        selectedContacts.push(contact);
        colors.push(computedStyle);
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
