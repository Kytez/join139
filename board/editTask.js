let saveSubTasks = [];
/**
 * moves the edit-task pop-up field into the screenview via translateX and executes rendering of adjusted editable elements for each task.
<<<<<<< HEAD
 * 
 * @param {number} id This is the id of the task
 * @param {string} prio This is the priority value for the task 
 */

function showEditTask(title, description, date, id, prio, names, tasks, singleContactId){
    document.getElementById('editTaskSection').style.display = 'flex';
    document.getElementById('editTaskFullScreen').style.display = 'flex';
    let popUpElements = document.getElementsByClassName('edit-task-card');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(0)';
            }, 100);
        })(i);
    }
    subTasks.push(tasks);
    console.log(subTasks);
    setFilterEdit({value: ''});
    renderEditTaskPopUpElements(title, description, date, id, prio, names, subTasks, singleContactId);
}

/**
 * renders elements of the task into the edit-task pop-up segments for further editing
 * 
=======
 *
>>>>>>> 52a64397c3ff1a6caadc926fe89ff9fc99259b34
 * @param {number} id This is the id of the task
 * @param {string} prio This is the priority value for the task
 */

<<<<<<< HEAD
function renderEditTaskPopUpElements(title, description, date, id, prio, names, subTasks, singleContactId){
    let titleEdit = document.getElementById('titleEdit');
    let descriptionEdit = document.getElementById('descriptionEdit');
    let dateEdit = document.getElementById('dateEdit');
    let okButton = document.getElementById('boardEditTaskBtns');
    titleEdit.value = title;
    descriptionEdit.value = description;
    dateEdit.value = date;
    setPrioButtonsColorEdit(prio);
    passIdsToSelectTaskContact(singleContactId);
    addExistingSubtaskEdit();
    okButton.innerHTML = /*html*/ `
=======
function showEditTask(
  title,
  description,
  date,
  id,
  prio,
  names,
  tasks,
  singleContactId
) {
  document.getElementById("editTaskSection").style.display = "flex";
  document.getElementById("editTaskFullScreen").style.display = "flex";

  let popUpElements = document.getElementsByClassName("edit-task-card");
  for (let i = 0; i < popUpElements.length; i++) {
    popUpElements[i].style.transition = "transform 400ms";
    (function (index) {
      setTimeout(function () {
        popUpElements[index].style.transform = "translateX(0)";
      }, 100);
    })(i);
  }
  subTasks.push(tasks);
  console.log(subTasks);
  console.log(subTasks);
  setFilterEdit({ value: "" });
  renderEditTaskPopUpElements(
    title,
    description,
    date,
    id,
    prio,
    names,
    subTasks,
    singleContactId
  );
}

/**
 * renders elements of the task into the edit-task pop-up segments for further editing
 *
 * @param {number} id This is the id of the task
 * @param {string} prio This is the priority value for the task
 */

function renderEditTaskPopUpElements(
  title,
  description,
  date,
  id,
  prio,
  names,
  subTasks,
  singleContactId
) {
  let titleEdit = document.getElementById("titleEdit");
  let descriptionEdit = document.getElementById("descriptionEdit");
  let dateEdit = document.getElementById("dateEdit");
  let okButton = document.getElementById("boardEditTaskBtns");
  titleEdit.value = title;
  descriptionEdit.value = description;
  dateEdit.value = date;
  setPrioButtonsColorEdit(prio);
  passIdsToSelectTaskContact(singleContactId);
  addSubtaskEdit();
  okButton.innerHTML = /*html*/ `
>>>>>>> 52a64397c3ff1a6caadc926fe89ff9fc99259b34
        <button onclick="editTask(${id})"  class="btn-dark-edit pointer">Ok 
            <img src="../assets/img/icons/check_icon.png" alt="">
        </button> 
    `;
}

function addSubtaskEdit() {
<<<<<<< HEAD
    let subTaskInput = document.getElementById('subTaskInputEdit').value;
    subTaskContainer = document.getElementById('subTaskContainerEdit');
    subTaskContainer.innerHTML = '';
    subTasks.push(subTaskInput);
    renderSubtasksEdit();
    document.getElementById('subTaskInputEdit').value = "";
=======
  let subTaskInput = document.getElementById("subTaskInputEdit").value;
  subTasks.push(subTaskInput);
  renderSubtasksEdit();
  document.getElementById("subTaskInputEdit").value = "";
>>>>>>> 52a64397c3ff1a6caadc926fe89ff9fc99259b34
}

function addExistingSubtaskEdit() {
    subTaskContainer = document.getElementById('subTaskContainerEdit');
    subTaskContainer.innerHTML = '';
    renderSubtasksEdit();
}

function renderSubtasksEdit() {
  let subTaskContainer = document.getElementById("subTaskContainerEdit");
  subTaskContainer.innerHTML = "";
  for (let i = 0; i < subTasks.length; i++) {
    console.log(subTasks[i]);
    let subTaskHTML = addSubtaskHTML(subTasks[i], i);
    subTaskContainer.innerHTML += subTaskHTML;
  }
}

function addSubtaskHTML(subTask, i) {
<<<<<<< HEAD
    return `
    <div id="subTaskEdit_${i}" class="singleSubTasks">
=======
  return `
    <div id="subTask_${i}" class="singleSubTasks">
>>>>>>> 52a64397c3ff1a6caadc926fe89ff9fc99259b34
        <div>${subTask}</div>
            <div class="flex edit-trash">
                <div>
                    <img id="saveEditSubtasksEdit_${i}" class="edit d-none" onclick="saveEditSubtaskEdit(${i})" src="../assets/img/svg/Subtasks icons12.svg" alt="">
                    <img id="editSubtasksEdit_${i}" class="edit" onclick="editSubtaskEdit(${i})" src="../assets/img/svg/pencil.svg" alt="">
                </div>
                <div class="seperator">
                </div>
            <div>
                <img class="edit" onclick="deleteSubtaskEdit(this.parentElement.parentElement, ${i})" src="../assets/img/svg/trash.svg" alt="">
            </div>
        </div>
    </div>
    `;
}

function editSubtaskEdit(id) {
    console.log("Subtask bearbeiten:", id);
    let subTaskDiv = document.getElementById(`subTaskEdit_${id}`);
    let subTaskText = subTaskDiv.querySelector("div");
    let subTaskTextInput = document.createElement("input");
    let saveEditSubtasks = document.getElementById(`saveEditSubtasksEdit_${id}`);
    let editSubtasks = document.getElementById(`editSubtasksEdit_${id}`);
    saveEditSubtasks.classList.remove("d-none");
    editSubtasks.classList.add("d-none");
    subTaskTextInput.type = "text";
    subTaskTextInput.value = subTaskText.textContent;
    subTaskDiv.replaceChild(subTaskTextInput, subTaskText);
}

function deleteSubtaskEdit(entry, id) {
  const index = subTasks.findIndex((element) => element.id === id);
  subTasks.splice(index, 1);
  entry.remove();
}

function saveEditSubtaskEdit(id) {
    let elementToRemove = document.getElementById(`subTaskEdit_${id}`);
    let subTaskTextInput = elementToRemove.querySelector("input").value;
    let saveEditSubtasks = document.getElementById(`saveEditSubtasksEdit_${id}`);
    let editSubtasks = document.getElementById(`editSubtasksEdit_${id}`);
    console.log(subTaskTextInput);
    if (elementToRemove) {
        elementToRemove.remove();
        subTasks.splice(id, 1);
        subTasks.push(subTaskTextInput);
        renderSubtasksEdit();
        saveEditSubtasks.classList.remove("d-none");
        editSubtasks.classList.add("d-none");
    }
}

function passIdsToSelectTaskContact(singleContactId) {
  document.getElementById("contactInitalsEdit").innerHTML = "";
  // Überprüfe, ob singleContactId eine gültige Variable ist
  if (!singleContactId || typeof singleContactId !== "string") {
    console.error("Ungültige Eingabe.");
    return;
  }

  // Durchlaufe jede Zahl in singleContactId und rufe selectTaskContact für jede Zahl auf
  for (let i = 0; i < singleContactId.length; i++) {
    let id = parseInt(singleContactId[i]);
    if (!isNaN(id)) {
      selectTaskContactEdit(id);
    }
  }
}

/**
 * saves edited values into the allTasks array, overwriting the old values and updates the array on the server and the HTML of the page.
 *
 * @param {number} id This is the id of the task
 */
function editTask(id) {
  let titleEdit = document.getElementById("titleEdit");
  let descriptionEdit = document.getElementById("descriptionEdit");
  let dateEdit = document.getElementById("dateEdit");

  (allTasks[id]["title"] = titleEdit.value),
    (allTasks[id]["description"] = descriptionEdit.value),
    (allTasks[id]["date"] = dateEdit.value),
    (allTasks[id]["prio"] = prio),
    (allTasks[id]["colors"] = colors),
    (allTasks[id]["names"] = names),
    (allTasks[id]["subTask"] = subTasks),
    (allTasks[id]["singleContactId"] = singleContactId),
    (allTasks[id]["assignedTo"] = selectedContacts),
    updateTasksHTML();
  saveTasks();
  hideEditTask();
  hideTask();
  singleContactId = [];
  subTasks = [];
  names = [];
  colors = [];
}

/**
 * sets the color for the priority fields depending on the priority value as chosen by user.
 *
 * @param {string} i This is the priority value for the task
 */

function setPrioButtonsColorEdit(i) {
  document
    .getElementById("mediumEdit")
    .classList.remove("highlighted-button-medium");
  document.getElementById("lowEdit").classList.remove("highlighted-button-low");
  document
    .getElementById("urgentEdit")
    .classList.remove("highlighted-button-urgent");
  if (i === "medium") {
    document
      .getElementById("mediumEdit")
      .classList.add("highlighted-button-medium");
  } else if (i === "low") {
    document.getElementById("lowEdit").classList.add("highlighted-button-low");
  } else if (i === "urgent") {
    document
      .getElementById("urgentEdit")
      .classList.add("highlighted-button-urgent");
  }
}

/**
 * hides the edit-task pop-up field from the screen via translateX.
 */

function hideEditTask() {
<<<<<<< HEAD
    document.getElementById('editTaskSection').style.display = 'none';
    document.getElementById('editTaskFullScreen').style.display = 'none';
    subTasks = [];
    let popUpElements = document.getElementsByClassName('edit-task-card');
    for (let i = 0; i < popUpElements.length; i++) {
        popUpElements[i].style.transition = 'transform 400ms';
        (function(index) {
            setTimeout(function() {
                popUpElements[index].style.transform = 'translateX(275%)';
            }, 100);
        })(i);
    }
=======
  document.getElementById("editTaskSection").style.display = "none";
  document.getElementById("editTaskFullScreen").style.display = "none";
  saveSubTasks = [];
  let popUpElements = document.getElementsByClassName("edit-task-card");
  for (let i = 0; i < popUpElements.length; i++) {
    popUpElements[i].style.transition = "transform 400ms";
    (function (index) {
      setTimeout(function () {
        popUpElements[index].style.transform = "translateX(275%)";
      }, 100);
    })(i);
  }
>>>>>>> 52a64397c3ff1a6caadc926fe89ff9fc99259b34
}

function showContactListEdit() {
  let contactList = document.getElementById("selected-contactsEdit");
  if (contactList.classList.contains("d-none")) {
    contactList.classList.remove("d-none");
  } else {
    contactList.classList.add("d-none");
  }
}

function setFilterEdit(input) {
  let filter = input.value.trim().toLowerCase();
  let filteredContacts;
  if (filter !== "") {
    filteredContacts = contacts.filter(function (contact) {
      return contact.userName.toLowerCase().includes(filter);
    });
  } else {
    filteredContacts = contacts;
  }

  renderAssignedContactListEdit(filteredContacts);
}

function renderAssignedContactListEdit(filteredContacts) {
  let assignedTo = document.getElementById("selected-contactsEdit");
  assignedTo.innerHTML = "";
  for (let i = 0; i < filteredContacts.length; i++) {
    let userName = filteredContacts[i].userName;
    let initialsString = "";
    let color = filteredContacts[i].colour;

    let words = userName.split(" ");
    let initials = words.map((word) => word.charAt(0).toUpperCase());
    initialsString = initials.join("");

    assignedTo.innerHTML += contactListAddTaskEditHTML(
      i,
      userName,
      initialsString
    );
    let user = document.getElementById(`initials_${i}`);
    user.style.backgroundColor = color;
  }
}

function contactListAddTaskEditHTML(i, userName, initialsString) {
  return `
    <div id="SingleContact_${i}" onclick="selectTaskContactEdit(${i})" class="contact-list-entry">
        <div class="contact-list-entry">
            <div id="initials_${i}" class="initials">${initialsString}</div>
            <div class="profile-fullname">${userName} </div> 
        </div>
        <img id="empty_${i}" class="" src="../assets/img/svg/Check button empty.svg">
        <img id="checked_${i}" class="d-none" src="../assets/img/svg/Check button checked.svg">
    </div>
    `;
}

function hideAndShowEditBoard() {
  setFilterBoard({ value: `` });
  let edit = document.getElementById("editBoard");
  let subtaskt = document.getElementById("subTaskBoard");
  if (edit.classList.contains("d-none")) {
    edit.classList.remove("d-none");
    subtaskt.classList.add("d-none");
  } else {
    edit.classList.add("d-none");
    subtaskt.classList.remove("d-none");
  }
}

function clearInputAddTaskEdit() {
  document.getElementById("subTaskInputEdit").value = "";
}

function selectTaskContactEdit(i) {
  let contact = document.getElementById(`initials_${i}`).textContent;
  let fullNameElement = document
    .getElementById(`SingleContact_${i}`)
    .querySelector(".profile-fullname");
  let name = fullNameElement.textContent.trim();
  changeCheckedAndColorEdit(i, contact, name);
}

function changeCheckedAndColorEdit(i, contact, name) {
  let selectedContact = document.getElementById(`SingleContact_${i}`);
  let emptySelect = document.getElementById(`empty_${i}`);
  let checkedSelect = document.getElementById(`checked_${i}`);
  let element = document.getElementById(`initials_${i}`);
  let initials = document.getElementById(`initials_${i}`).textContent;
  let renderInitials = document.getElementById(`contactInitalsEdit`);

  if (emptySelect.classList.contains("d-none")) {
    selectedContact.style.backgroundColor = "";
    selectedContact.style.color = "black";
    emptySelect.classList.remove("d-none");
    checkedSelect.classList.add("d-none");
    selectedContacts.splice(selectedContacts.indexOf(i), 1);
    colors.splice(colors.indexOf(i), 1);
    names.splice(names.indexOf(i), 1);
    singleContactId.splice(singleContactId.indexOf(i), 1);
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
    singleContactId.push(i);
    renderInitials.innerHTML += renderInitialsHTMLEdit(
      i,
      initials,
      computedStyle
    );
  }
}

function removeInital(i) {
  let selectedInitials = document.getElementById(`selectedInitial_${i}`);
  selectedInitials.remove();
}

function renderInitals(i, colors) {
  let initials = document.getElementById(`initials_${i}`).textContent; // Extrahiere den Inhalt des div-Elements
  let selectedInitials = document.getElementById(`selectedInitial_${i}`);
  let content = document.getElementById(`contactInitalsEdit`);
  content.innerHTML += renderInitialsHTMLEdit(i, initials);
  selectedInitials.style.backgroundColor = colors;
}

function renderInitialsHTMLEdit(i, initials, computedStyle) {
  return `
        <div id="selectedInitial_${i}" style="background-color: ${computedStyle}" class="initials">${initials}</div>
    `;
}

function hideAndShowEdit() {
  setFilterBoard({ value: `` });
  let edit = document.getElementById("editEditContainer");
  let subtaskt = document.getElementById("subTaskEdit");
  if (edit.classList.contains("d-none")) {
    edit.classList.remove("d-none");
    subtaskt.classList.add("d-none");
  } else {
    edit.classList.add("d-none");
    subtaskt.classList.remove("d-none");
  }
}
