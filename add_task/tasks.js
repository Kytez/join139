let allTasks = [];
let emptyArray = [];
let selectedContacts = [];
let prio = '';
let id = [];
let colors = [];
let contactList = [];
let subTasks = [];
let names = [];


async function initAddTask() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadContacts();
    await loadAllTasks();
    setFilter({ value: `` });
}

function setFilter(input) {
    let filter = input.value.trim().toLowerCase(); // Filter aus dem Inputfeld
    let filteredContacts;

    if (filter !== '') {
        // Wenn ein Filter vorhanden ist, filtere die Kontakte basierend auf dem Filter
        filteredContacts = contacts.filter(function(contact) {
            return contact.userName.toLowerCase().includes(filter);
        });
    } else {
        // Wenn kein Filter vorhanden ist, zeige alle Kontakte an
        filteredContacts = contacts;
    }

    renderAssignedContactList(filteredContacts);
}

function renderAssignedContactList(filteredContacts) {
    let assignedTo = document.getElementById('selected-contacts');
    assignedTo.innerHTML = ""; // Clear previous content
    
    for (let i = 0; i < filteredContacts.length; i++) {
        let userName = filteredContacts[i].userName;
        let initialsString = ''; 
        let color = filteredContacts[i].colour;
        
        let words = userName.split(' ');
        let initials = words.map(word => word.charAt(0).toUpperCase());
        initialsString = initials.join('');
        
        assignedTo.innerHTML += contactListAddTaskHTML(i, userName, initialsString);
        let user = document.getElementById(`initials_${i}`);
        user.style.backgroundColor = color;
    }
}

function hideAndShowEdit() {
    let edit = document.getElementById('edit');
    let subtaskt = document.getElementById('subTask');
    if (edit.classList.contains('d-none')) {
        edit.classList.remove('d-none');
        subtaskt.classList.add('d-none');
    }else {
        edit.classList.add('d-none');
        subtaskt.classList.remove('d-none');
    }
}

function addTask(workMode = 'todo') {
    let title = document.getElementById('title');
    let description = document.getElementById('description');
    let date = document.getElementById('date');
    let category = document.getElementById('category');
    let task = {
        'id': allTasks.length + 1,
        'title': title.value,
        'description': description.value,
        'assignedTo': selectedContacts,
        'colors': colors,
        'date': date.value,
        'prio': prio,
        'category': category.value,
        'subTask': subTasks,
        createdAt: new Date().getDate(),
        'workMode': workMode,
        'names': names,
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


function clearTask(){
    location.reload();
}

function selectTaskContact(i){ 
    let contact = document.getElementById(`initials_${i}`).textContent;
    let fullNameElement = document.getElementById(`SingleContact_${i}`).querySelector('.profile-fullname');
    let name = fullNameElement.textContent.trim();
    changeCheckedAndColor(i, contact, name);
}

function renderInitals(i, colors){
    let initials = document.getElementById(`initials_${i}`).textContent; // Extrahiere den Inhalt des div-Elements
    let selectedInitials = document.getElementById(`selectedInitial_${i}`);
    let content = document.getElementById(`contactInitals`);
    content.innerHTML += renderInitialsHTML(i, initials);
    selectedInitials.style.backgroundColor = colors;
}

function renderInitialsHTML(i, initials, computedStyle){
    return `
        <div id="selectedInitial_${i}" style="background-color: ${computedStyle}" class="initials">${initials}</div>
    `;
}

function removeInital(i){
    let selectedInitials = document.getElementById(`selectedInitial_${i}`);
    selectedInitials.remove();
}

function changeCheckedAndColor(i, contact, name){
    let selectedContact = document.getElementById(`SingleContact_${i}`);
    let emptySelect = document.getElementById(`empty_${i}`);
    let checkedSelect = document.getElementById(`checked_${i}`);
    let element = document.getElementById(`initials_${i}`);
    let initials = document.getElementById(`initials_${i}`).textContent;
    let renderInitials = document.getElementById(`contactInitals`);
    
    if (emptySelect.classList.contains("d-none")) {
        selectedContact.style.backgroundColor = "";
        selectedContact.style.color = "black";
        emptySelect.classList.remove("d-none");
        checkedSelect.classList.add("d-none");
        selectedContacts.splice(selectedContacts.indexOf(i), 1);
        colors.splice(colors.indexOf(i), 1);
        names.splice(colors.indexOf(i), 1);
        removeInital(i);
    } else {
        selectedContact.style.backgroundColor = "#2A3647";
        selectedContact.style.color = "white";
        emptySelect.classList.add("d-none");
        checkedSelect.classList.remove("d-none");
        let computedStyle = window.getComputedStyle(element).backgroundColor;
        selectedContacts.push(contact);
        colors.push(computedStyle);
        names.push(name);
        renderInitials.innerHTML += renderInitialsHTML(i, initials, computedStyle);
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

function renderSubtasks() {
    let subTaskContainer = document.getElementById('subTaskContainer');
    subTaskContainer.innerHTML = ""; // Clear previous content
    
    // Iterate through subTasks array and render each subtask
    for (let i = 0; i < subTasks.length; i++) {
        let subTaskHTML = addSubtaskHTML(subTasks[i], i);
        subTaskContainer.innerHTML += subTaskHTML;
    }
}

// Funktion zum Hinzufügen einer Unteraufgabe
function addSubtask() {
    let subTaskInput = document.getElementById('subTaskInput').value;
    subTasks.push(subTaskInput);
    console.log(subTaskInput);
    renderSubtasks(); // Rendere die Unteraufgaben neu
    document.getElementById('subTaskInput').value = "";
}

function clearInputAddTask() {
    document.getElementById('subTaskInput').value = '';
}

function editSubtask(id) {
    // Hier kannst du die Logik für die Bearbeitung des Subtasks implementieren
    console.log("Subtask bearbeiten:", id);
    // Zum Beispiel: Du könntest den Text im Subtask-Div durch ein Eingabefeld ersetzen, um die Bearbeitung zu ermöglichen
    let subTaskDiv = document.getElementById(`subTask_${id}`);
    let subTaskText = subTaskDiv.querySelector("div");
    let subTaskTextInput = document.createElement("input");
    let saveEditSubtasks = document.getElementById(`saveEditSubtasks_${id}`);
    let editSubtasks = document.getElementById(`editSubtasks_${id}`);
    saveEditSubtasks.classList.remove("d-none");
    editSubtasks.classList.add("d-none");
    subTaskTextInput.type = "text";
    subTaskTextInput.value = subTaskText.textContent;
    subTaskDiv.replaceChild(subTaskTextInput, subTaskText);
}

function deleteSubtask(id) {
    let elementToRemove = document.getElementById(`subTask_${id}`);
    if (elementToRemove) {
        elementToRemove.remove();
        subTasks.splice(id, 1);
    }
}

function saveEditSubtask(id) {
    let elementToRemove = document.getElementById(`subTask_${id}`);
    let subTaskTextInput = elementToRemove.querySelector("input").value;
    let saveEditSubtasks = document.getElementById(`saveEditSubtasks_${id}`);
    let editSubtasks = document.getElementById(`editSubtasks_${id}`);
    console.log(subTaskTextInput);
    if (elementToRemove) {
        elementToRemove.remove();
        subTasks.splice(id, 1);
        subTasks.push(subTaskTextInput);
        renderSubtasks();
        saveEditSubtasks.classList.remove("d-none");
        editSubtasks.classList.add("d-none");
    }
}

function addSubtaskHTML(subTask, i) {
    return `
    <div id="subTask_${i}" class="singleSubTasks">
        <div>${subTask}</div>
            <div class="flex edit-trash">
                <div>
                    <img id="saveEditSubtasks_${i}" class="edit d-none" onclick="saveEditSubtask(${i})" src="/join139/assets/img/svg/Subtasks icons12.svg" alt="">
                    <img id="editSubtasks_${i}" class="edit" onclick="editSubtask(${i})" src="/join139/assets/img/svg/pencil.svg" alt="">
                </div>
                <div class="seperator">
                </div>
            <div>
                <img class="edit" onclick="deleteSubtask(${i})" src="/join139/assets/img/svg/trash.svg" alt="">
            </div>
        </div>
    </div>
    `
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
