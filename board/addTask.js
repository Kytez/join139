function hideAndShowEditBoard() {
    setFilterBoard({ value: `` });
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
    renderSubtasks();
    document.getElementById('subTaskInputBoard').value = "";
}

function renderSubtasks() {
    let subTaskContainer = document.getElementById('subTaskContainerBoard');
    subTaskContainer.innerHTML = "";
    for (let i = 0; i < subTasks.length; i++) {
        let subTaskHTML = addSubtaskHTML(subTasks[i], i);
        subTaskContainer.innerHTML += subTaskHTML;
    }
}

function showContactListBoard() {
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
    console.log(filteredContacts);
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
    assignedTo.innerHTML = "";
    console.log(filteredContacts);
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

function contactListAddTaskBoardHTML (i, userName, initialsString) {
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


