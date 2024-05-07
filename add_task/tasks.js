let allTasks = [];
let emptyArray = [];
let selectedContacts = [];
let prio = '';
let id = [];
let colors = [];
let contactList = [];
let subTasks = [];
let names = [];

/**
 * Initializes the add task functionality.
 *
 * @return {Promise<void>} A promise that resolves when the initialization is complete.
 */
async function initAddTask() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    await loadContacts();
    await loadAllTasks();
    setFilter({ value: `` });
}

/**
 * Filters contacts based on the provided input value and renders the filtered contact list.
 *
 * @param {Object} input - The input object containing the filter value.
 * @return {void} This function does not return any value.
 */
function setFilter(input) {
    let filter = input.value.trim().toLowerCase();
    let filteredContacts;

    if (filter !== '') {
        filteredContacts = contacts.filter(function(contact) {
            return contact.userName.toLowerCase().includes(filter);
        });
    } else {
        filteredContacts = contacts;
    }

    renderAssignedContactList(filteredContacts);
}

/**
 * Renders the list of assigned contacts based on the provided filtered contacts.
 *
 * @param {Array} filteredContacts - The array of filtered contacts.
 * @return {void} This function does not return a value.
 */
function renderAssignedContactList(filteredContacts) {
    if(filteredContacts){
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
}

/**
 * Toggles the visibility of the 'edit' and 'subtaskt' elements.
 *
 * @param {none}
 * @return {none}
 */
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

/**
 * Adds a new task to the list of tasks.
 *
 * @param {string} [workMode='todo'] - The work mode of the task. Defaults to 'todo'.
 * @return {void} This function does not return anything.
 */
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
    allTasks.push(task);
    saveTasks();
    setTimeout(reloadPage, 300);
}

function reloadPage() {
    window.location.reload();
}

/**
 * Toggles the visibility of the contact list.
 *
 * @return {void} This function does not return a value.
 */
function showContactList(){
    let contactList = document.getElementById('selected-contacts');
    if (contactList.classList.contains('d-none')) {
        contactList.classList.remove('d-none');
    } else {
        contactList.classList.add('d-none');
    }
}

/**
 * Saves the tasks by storing them in the local storage.
 *
 * @return {Promise<void>} A promise that resolves when the tasks are successfully saved.
 */
async function saveTasks(){
    setItem('allTasks', JSON.stringify(allTasks));
}

/**
 * Loads all tasks from the local storage.
 *
 * @return {Promise<void>} A promise that resolves when the tasks are successfully loaded.
 */
async function loadAllTasks(){
    try {
        allTasks = JSON.parse(await getItem('allTasks')) || [];
    } catch(e) {
        console.error('Loading error:', e);
    }
}

/**
 * Clears the current task by reloading the page.
 *
 * @return {void} This function does not return anything.
 */
function clearTask(){
    location.reload();
}

/**
 * Selects a task contact and triggers the changeCheckedAndColor function.
 *
 * @param {number} i - The index of the contact in the list.
 * @return {void} This function does not return anything.
 */
function selectTaskContact(i){ 
    let contact = document.getElementById(`initials_${i}`).textContent;
    let fullNameElement = document.getElementById(`SingleContact_${i}`).querySelector('.profile-fullname');
    let name = fullNameElement.textContent.trim();
    changeCheckedAndColor(i, contact, name);
}

/**
 * Renders the initials of a contact and updates the background color of the selected initial.
 *
 * @param {number} i - The index of the contact.
 * @param {string} colors - The background color of the selected initial.
 * @return {void} This function does not return anything.
 */
function renderInitals(i, colors){
    let initials = document.getElementById(`initials_${i}`).textContent; // Extrahiere den Inhalt des div-Elements
    let selectedInitials = document.getElementById(`selectedInitial_${i}`);
    let content = document.getElementById(`contactInitals`);
    content.innerHTML += renderInitialsHTML(i, initials);
    selectedInitials.style.backgroundColor = colors;
}

/**
 * Removes the initials div element with the given index from the DOM.
 *
 * @param {number} i - The index of the initials div element to remove.
 * @return {void} This function does not return anything.
 */
function removeInital(i){
    let selectedInitials = document.getElementById(`selectedInitial_${i}`);
    selectedInitials.remove();
}

/**
 * Changes the checked status and color of a contact list entry based on user interaction.
 *
 * @param {number} i - The index of the contact list entry.
 * @param {string} contact - The contact information.
 * @param {string} name - The name of the contact.
 * @return {void} This function does not return anything.
 */
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

/**
 * Sets the priority and updates the color of the priority buttons.
 *
 * @param {string} i - The priority to be set.
 * @return {void} This function does not return a value.
 */
function selectPrio(i, origin) {
    prio = i;
    if (origin == "edit") {
        setPrioButtonsColorEdit(prio);
    }
    else if(origin == "board"){
        setPrioButtonsColorBoard(prio);
    }
    else{
        setPrioButtonsColor(prio);
    }
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

/**
 * Handle click event on priority buttons.
 * Set the priority to the given value and update the color of the buttons.
 * 
 * @param {string} i - The priority to be set.
 * @returns {void} This function does not return a value.
 */
function handleClickPrio(i, origin = "") {
    if (i) {
        selectPrio(i, origin); // Set the given priority
    }
}

/**
 * Renders the subtasks on the webpage.
 *
 * @param {none} 
 * @return {void} This function does not return a value.
 */
function renderSubtasks() {
    let subTaskContainer = document.getElementById('subTaskContainer');
    subTaskContainer.innerHTML = ""; // Clear previous content
    
    // Iterate through subTasks array and render each subtask
    for (let i = 0; i < subTasks.length; i++) {
        let subTaskHTML = addSubtaskHTML(subTasks[i], i);
        subTaskContainer.innerHTML += subTaskHTML;
    }
}

/**
 * Adds a subtask to the subTasks array and triggers the rendering of subtasks on the webpage.
 *
 * @param {none}
 * @return {void}
 */
function addSubtask() {
    let subTaskInput = document.getElementById('subTaskInput').value;
    subTasks.push(subTaskInput);
    renderSubtasks(); // Rendere die Unteraufgaben neu
    document.getElementById('subTaskInput').value = "";
}

/**
 * Clears the value of the input element with the ID 'subTaskInput'.
 *
 * @return {void} This function does not return anything.
 */
function clearInputAddTask() {
    document.getElementById('subTaskInput').value = '';
}

/**
 * Edits a subtask by replacing its text content with an input field for editing.
 *
 * @param {number} id - The ID of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function editSubtask(id) {
    // Hier kannst du die Logik für die Bearbeitung des Subtasks implementieren
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

/**
 * A function to delete a specific subtask.
 *
 * @param {number} id - The ID of the subtask to be deleted.
 * @return {void} This function does not return anything.
 */
function deleteSubtask(id) {
    let elementToRemove = document.getElementById(`subTask_${id}`);
        elementToRemove.remove();
        subTasks.splice(id, 1);
}

/**
 * Saves the edited subtask by replacing its text content with the value of the input field.
 *
 * @param {number} id - The ID of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function saveEditSubtask(id) {
    let elementToRemove = document.getElementById(`subTask_${id}`);
    let subTaskTextInput = elementToRemove.querySelector("input").value;
    let saveEditSubtasks = document.getElementById(`saveEditSubtasks_${id}`);
    let editSubtasks = document.getElementById(`editSubtasks_${id}`);
    if (elementToRemove) {
        elementToRemove.remove();
        subTasks.splice(id, 1);
        subTasks.push(subTaskTextInput);
        renderSubtasks();
        saveEditSubtasks.classList.remove("d-none");
        editSubtasks.classList.add("d-none");
    }
}

/**
 * Generates the HTML markup for a subtask element.
 *
 * @param {string} subTask - The text content of the subtask.
 * @param {number} i - The index of the subtask.
 * @return {string} The HTML markup for the subtask element.
 */
function addSubtaskHTML(subTask, i) {
    return `
    <div id="subTask_${i}" class="singleSubTasks">
        <div>${subTask}</div>
            <div class="flex edit-trash">
                <div>
                    <img id="saveEditSubtasks_${i}" class="edit d-none" onclick="saveEditSubtask(${i})" src="../assets/img/svg/Subtasks icons12.svg" alt="">
                    <img id="editSubtasks_${i}" class="edit" onclick="editSubtask(${i})" src="../assets/img/svg/pencil.svg" alt="">
                </div>
                <div class="seperator">
                </div>
            <div>
                <img class="edit" onclick="deleteSubtask(${i})" src="../assets/img/svg/trash.svg" alt="">
            </div>
        </div>
    </div>
    `
}

/**
 * Returns the HTML markup for a task element.
 *
 * @return {string} The HTML markup for the task element.
 */
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

/**
 * Generates the HTML code for a div element containing initials with a background color.
 *
 * @param {number} i - The index of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} computedStyle - The background color of the initials div.
 * @return {string} The HTML code for the initials div.
 */
function renderInitialsHTML(i, initials, computedStyle){
    return `
        <div id="selectedInitial_${i}" style="background-color: ${computedStyle}" class="initials">${initials}</div>
    `;
}

/**
 * Generates the HTML code for a contact list entry for a task.
 *
 * @param {number} i - The index of the contact in the list.
 * @param {string} userName - The name of the user.
 * @param {string} initialsString - The initials of the user.
 * @return {string} The HTML code for the contact list entry.
 */
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