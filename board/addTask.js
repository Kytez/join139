function addTaskBoard(workMode = "todo") {
  let title = document.getElementById("titleBoard");
  let description = document.getElementById("descriptionBoard");
  let date = document.getElementById("dateBoard");
  let category = document.getElementById("categoryBoard");
  if (
    title.value.trim() === "" &&
    category.value.trim() === "" &&
    date.value.trim() === ""
  ) {
  } else {
      let task = {
        id: allTasks.length + 1,
        singleContactId: singleContactId,
        title: title.value,
        description: description.value,
        assignedTo: selectedContacts,
        colors: colors,
        date: date.value,
        prio: prio,
        category: category.value,
        subTask: subTasks,
        createdAt: new Date().getDate(),
        workMode: workMode,
        names: names,
        checkbox: ['a'],
    };
  allTasks.push(task);
  saveTasks();
  updateTasksHTML();
  hideAddTask();
  }
}

function hideAndShowEditBoard() {
  let edit = document.getElementById("editBoard");
  let subtaskt = document.getElementById("subTaskBoard");
  let input = document.getElementById("subTaskInputBoard").value;
  if(input.length>0){
    if (edit.classList.contains("d-none")) {
      edit.classList.remove("d-none");
      subtaskt.classList.add("d-none");
    }
  }
}

function clearInputAddTaskBoard() {
  document.getElementById("subTaskInputBoard").value = "";
}

function addSubtaskBoard() {
  let edit = document.getElementById("editBoard");
  let subtaskt = document.getElementById("subTaskBoard");
  let subTaskInput = document.getElementById("subTaskInputBoard").value;

  subTasks.push(subTaskInput);
  renderSubtasks();
  document.getElementById("subTaskInputBoard").value = "";
  edit.classList.add("d-none");
  subtaskt.classList.remove("d-none")
}

function renderSubtasks() {
  let subTaskContainer = document.getElementById("subTaskContainerBoard");
  subTaskContainer.innerHTML = "";
  
  for (let i = 0; i < subTasks.length; i++) {
    let subTaskHTML = addSubtaskHTML(subTasks[i], i);
    subTaskContainer.innerHTML += subTaskHTML;
  }
}

function showContactListBoard() {
  let contactList = document.getElementById("selected-contactsBoard");
  if (contactList.classList.contains("d-none")) {
    contactList.classList.remove("d-none");
  } else {
    contactList.classList.add("d-none");
  }
}

function setFilterBoard(input) {
  document.getElementById("contactInitalsBoard").innerHTML ="";
  selectedContacts = [];
  colors = [];
  names = [];
  singleContactId = [];
  let filter = input.value.trim().toLowerCase();
  let filteredContacts;

  if (filter !== "") {
    filteredContacts = contacts.filter(function (contact) {
      return contact.userName.toLowerCase().includes(filter);
    });
  } else {
    filteredContacts = contacts;
    document.getElementById("contactInitalsBoard").innerHTML ="";
    selectedContacts = [];
    colors = [];
    names = [];
    singleContactId = [];
  }
  renderAssignedContactListBoard(filteredContacts);
}

function renderAssignedContactListBoard(filteredContacts) {
  let assignedTo = document.getElementById("selected-contactsBoard");
  assignedTo.innerHTML = "";
  for (let i = 0; i < filteredContacts.length; i++) {
    let userName = filteredContacts[i].userName;
    let initialsString = "";
    let color = filteredContacts[i].colour;
    let words = userName.split(" ");
    let initials = words.map((word) => word.charAt(0).toUpperCase());

    initialsString = initials.join("");
    assignedTo.innerHTML += contactListAddTaskBoardHTML(
      i,
      userName,
      initialsString
    );
    let user = document.getElementById(`initialsBoard_${i}`);
    user.style.backgroundColor = color;
  }
}

function contactListAddTaskBoardHTML(i, userName, initialsString) {
  return `
    <div id="SingleContactBoard_${i}" onclick="selectTaskContactBoard(${i})" class="contact-list-entry">
        <div class="contact-list-entry">
            <div id="initialsBoard_${i}" class="initials">${initialsString}</div>
            <div class="profile-fullname">${userName} </div> 
        </div>
        <img id="emptyBoard_${i}" class="" src="../assets/img/svg/Check button empty.svg">
        <img id="checkedBoard_${i}" class="d-none" src="../assets/img/svg/Check button checked.svg">
    </div>
    `;
}

function selectTaskContactBoard(i) {
  let contact = document.getElementById(`initialsBoard_${i}`).textContent;
  let fullNameElement = document.getElementById(`SingleContactBoard_${i}`)
    .querySelector(".profile-fullname");
  let name = fullNameElement.textContent.trim();
  changeCheckedAndColorBoard(i, contact, name);
}

function changeCheckedAndColorBoard(i, contact, name) {
  let selectedContact = document.getElementById(`SingleContactBoard_${i}`);
  let emptySelect = document.getElementById(`emptyBoard_${i}`);
  let checkedSelect = document.getElementById(`checkedBoard_${i}`);
  let element = document.getElementById(`initialsBoard_${i}`);
  let initials = document.getElementById(`initialsBoard_${i}`).textContent;
  let renderInitials = document.getElementById(`contactInitalsBoard`);
  let computedStyle = window.getComputedStyle(element).backgroundColor;

  if (emptySelect.classList.contains("d-none")) {
    selectedContact.style.backgroundColor = "";
    selectedContact.style.color = "black";
    emptySelect.classList.remove("d-none");
    checkedSelect.classList.add("d-none");
    selectedContacts.splice(selectedContacts.indexOf(contact), 1);
    colors.splice(colors.indexOf(computedStyle), 1);
    names.splice(names.indexOf(name), 1);
    singleContactId.splice(singleContactId.indexOf(i), 1);
    removeInitialBoard(i);
  } else {
    selectedContact.style.backgroundColor = "#2A3647";
    selectedContact.style.color = "white";
    emptySelect.classList.add("d-none");
    checkedSelect.classList.remove("d-none");
    selectedContacts.push(contact);
    colors.push(computedStyle);
    names.push(name);
    singleContactId.push(i);
    renderInitials.innerHTML += renderInitialsHTML(i, initials, computedStyle);
  }
}

function removeInitialBoard(i) {
  let selectedInitials = document.getElementById(`selectedInitialBoard_${i}`);
  selectedInitials.remove();
}

function renderInitialsHTML(i, initials, computedStyle) {
  return `
        <div id="selectedInitialBoard_${i}" style="background-color: ${computedStyle}" class="initials">${initials}</div>
    `;
}