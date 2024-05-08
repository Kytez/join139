function hideAndShowEditBoard() {
    let edit = document.getElementById('editBoard');
    let subtaskt = document.getElementById('subTaskBoard');
    if (edit.classList.contains('d-none')) {
        edit.classList.remove('d-none');
        subtaskt.classList.add('d-none');
    }else {
        edit.classList.add('d-none');
        subtaskt.classList.remove('d-none');
    }
}

function clearInputAddTaskBoard() {
    document.getElementById('subTaskInputBoard').value = '';
}

function addSubtaskBoard() {
    let subTaskInput = document.getElementById('subTaskInputBoard').value;
    subTasks.push(subTaskInput);
    renderSubtasks(); // Rendere die Unteraufgaben neu
    document.getElementById('subTaskInputBoard').value = "";
}

function renderSubtasks() {
    let subTaskContainer = document.getElementById('subTaskContainerBoard');
    subTaskContainer.innerHTML = ""; // Clear previous content
    
    // Iterate through subTasks array and render each subtask
    for (let i = 0; i < subTasks.length; i++) {
        let subTaskHTML = addSubtaskHTML(subTasks[i], i);
        subTaskContainer.innerHTML += subTaskHTML;
    }
}

function showContactListBoard(){
    let contactList = document.getElementById('selected-contactsBoard');
    if (contactList.classList.contains('d-none')) {
        contactList.classList.remove('d-none');
    } else {
        contactList.classList.add('d-none');
    }
}

function setFilterBoard(input) {
    let filter = input.value.trim().toLowerCase();
    let filteredContacts;

    if (filter !== '') {
        filteredContacts = contacts.filter(function(contact) {
            return contact.userName.toLowerCase().includes(filter);
        });
    } else {
        filteredContacts = contacts;
    }

    renderAssignedContactListBoard(filteredContacts);
}

function renderAssignedContactListBoard(filteredContacts) {
    let assignedTo = document.getElementById('selected-contactsBoard');
    assignedTo.innerHTML = ""; // Clear previous content
    
    for (let i = 0; i < filteredContacts.length; i++) {
        let userName = filteredContacts[i].userName;
        let initialsString = ''; 
        let color = filteredContacts[i].colour;
        
        let words = userName.split(' ');
        let initials = words.map(word => word.charAt(0).toUpperCase());
        initialsString = initials.join('');
        
        assignedTo.innerHTML += contactListAddTaskBoardHTML(i, userName, initialsString);
        let user = document.getElementById(`initials_${i}`);
        user.style.backgroundColor = color;
    }
}

function contactListAddTaskBoardHTML (subTask, i) {
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
                <img class="edit" onclick="deleteSubtask(this.parentElement.parentElement, ${i})" src="../assets/img/svg/trash.svg" alt="">
            </div>
        </div>
    </div>
    `
}