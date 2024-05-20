let saveSubTasks = [];
/**
 * moves the edit-task pop-up field into the screenview via translateX and executes rendering of adjusted editable elements for each task.
 *
 * @param {number} id This is the id of the task
 * @param {string} prio This is the priority value for the task
 */
function showEditTask(
  title,
  description,
  date,
  id,
  prio,
  tasks,
  singleContactId,
  names
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
  setFilterEdit({ value: "" });
  renderEditTaskPopUpElements(
    title,
    description,
    date,
    id,
    prio,
    subTasks,
    singleContactId,
    names,
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
  prioTask,
  subTasks,
  singleContactIdTask,
  names,
) {
  let titleEdit = document.getElementById("titleEdit");
  let descriptionEdit = document.getElementById("descriptionEdit");
  let dateEdit = document.getElementById("dateEdit");
  let okButton = document.getElementById("boardEditTaskBtns");
  let addSubTaskBtns = document.getElementById('editEditContainer')
  let closeEditBtn = document.getElementById('closeEditBtnBoard')
  titleEdit.value = title;
  descriptionEdit.value = description;
  dateEdit.value = date;
<<<<<<< HEAD
  setPrioButtonsColorEdit(prio);
  console.log(singleContactId);
  passIdsToSelectTaskContact(singleContactId);
=======
  setPrioButtonsColorEdit(prioTask);
  prio = allTasks[id]["prio"];
  passArrayToSelectTaskContact(names);
>>>>>>> d0d8e29d517dfb79021670f4f27ba3f6328a3b9b
  addExistingSubtaskEdit(id);
  okButton.innerHTML = /*html*/ `
        <button onclick="editTask(${id})"  class="btn-dark-edit pointer">Ok 
            <img src="../assets/img/icons/check_icon.png" alt="">
        </button> 
    `;
  addSubTaskBtns.innerHTML = /*html*/`
    <div>
      <img class="edit" onclick="clearInputAddTaskEdit()" src="../assets/img/svg/Subtasks icons11.svg" alt="">
    </div>
      <div class="seperator"></div>
    <div>
        <img class="edit" onclick="addSubtaskEdit(${id})" src="../assets/img/svg/Subtasks icons12.svg" alt="">
    </div>
  `
  closeEditBtn.innerHTML =/*html*/`
    <img onclick="breakEditSession(${id})" class="close-img pointer" src="../assets/img/icons/close.png">
  `

}

<<<<<<< HEAD
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
  console.log(singleContactId);
=======
/**
 * Passes an array of names to the function `selectTaskContactEdit` to select task contacts.
 *
 * @param {string} names - A comma-separated string of names.
 * @return {void} This function does not return anything.
 */
function passArrayToSelectTaskContact(names) {
>>>>>>> d0d8e29d517dfb79021670f4f27ba3f6328a3b9b
  document.getElementById("contactInitalsEdit").innerHTML = "";
  let namesArray = names.split(",");

  for (let i = 0; i < namesArray.length; i++) {
    let id = contacts.findIndex(contact => contact.userName === namesArray[i]);
    if (!isNaN(id)) {
      selectTaskContactEdit(id);
    }
  }
}

/**
 * Toggles the visibility of the contact list in the edit mode.
 *
 * @return {void} This function does not return a value.
 */
function showContactListEdit() {
  let contactList = document.getElementById("selected-contactsEdit");
  if (contactList.classList.contains("d-none")) {
    contactList.classList.remove("d-none");
  } else {
    contactList.classList.add("d-none");
  }
}

/**
 * Generates the HTML code for a contact list entry in the edit mode.
 *
 * @param {number} i - The index of the contact in the list.
 * @param {string} userName - The name of the user.
 * @param {string} initialsString - The initials of the user.
 * @return {string} The HTML code for the contact list entry.
 */
function contactListAddTaskEditHTML(i, userName, initialsString) {
  return `
    <div id="SingleContactEdit_${i}" onclick="selectTaskContactEdit(${i})" class="contact-list-entry">
        <div class="contact-list-entry">
            <div id="initialsEdit_${i}" class="initials">${initialsString}</div>
            <div class="profile-fullname">${userName} </div> 
        </div>
        <img id="emptyEdit_${i}" class="" src="../assets/img/svg/Check button empty.svg">
        <img id="checkedEdit_${i}" class="d-none" src="../assets/img/svg/Check button checked.svg">
    </div>
    `;
}

/**
 * Selects a task contact in the edit mode and triggers the changeCheckedAndColorEdit function.
 *
 * @param {number} i - The index of the contact in the list.
 * @return {void} This function does not return a value.
 */
function selectTaskContactEdit(i) {
  let contact = document.getElementById(`initialsEdit_${i}`).textContent;
  let fullNameElement = document
    .getElementById(`SingleContactEdit_${i}`)
    .querySelector(".profile-fullname");
  let name = fullNameElement.textContent.trim();
  changeCheckedAndColorEdit(i, contact, name);
}

/**
 * Changes the checked status and color of a contact list entry in the edit mode based on user interaction.
 *
 * @param {number} i - The index of the contact list entry.
 * @param {string} contact - The contact information.
 * @param {string} name - The name of the contact.
 * @return {void} This function does not return a value.
 */
function changeCheckedAndColorEdit(i, contact, name) {
  let selectedContact = document.getElementById(`SingleContactEdit_${i}`);
  let emptySelect = document.getElementById(`emptyEdit_${i}`);
  let checkedSelect = document.getElementById(`checkedEdit_${i}`);
  let element = document.getElementById(`initialsEdit_${i}`);
  let initials = document.getElementById(`initialsEdit_${i}`).textContent;
  let renderInitials = document.getElementById(`contactInitalsEdit`);
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
    removeInitialEdit(i);
  } else {
    selectedContact.style.backgroundColor = "#2A3647";
    selectedContact.style.color = "white";
    emptySelect.classList.add("d-none");
    checkedSelect.classList.remove("d-none");
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

/**
 * Removes the initials div element with the given index from the DOM.
 *
 * @param {number} i - The index of the initials div element to remove.
 * @return {void} This function does not return anything.
 */
function removeInitialEdit(i) {
  let selectedInitials = document.getElementById(`selectedInitialEdit_${i}`);
  selectedInitials.remove();
}

/**
 * Generates the HTML code for a div element containing initials with a background color in the edit mode.
 *
 * @param {number} i - The index of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} computedStyle - The background color of the initials div.
 * @return {string} The HTML code for the initials div in the edit mode.
 */
function renderInitialsHTMLEdit(i, initials, computedStyle) {
  return `
        <div id="selectedInitialEdit_${i}" style="background-color: ${computedStyle}" class="initials">${initials}</div>
  `;
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
  numberAddedSubtasks = 0;

  (allTasks[id]["title"] = titleEdit.value),
  (allTasks[id]["description"] = descriptionEdit.value),
  (allTasks[id]["date"] = dateEdit.value),
  (allTasks[id]["prio"] = prio),
  (allTasks[id]["colors"] = colors),
  (allTasks[id]["names"] = names),
  (allTasks[id]["singleContactId"] = singleContactId),
  (allTasks[id]["assignedTo"] = selectedContacts),
  (allTasks[id]["subTask"] = subTasks),
  updateTasksHTML();
  saveTasks();
  hideEditTask();
  hideTask();
}

