/**
 * Adds a new task to the task board.
 *
 * @param {string} [workMode='todo'] - The work mode of the task. Defaults to 'todo'.
 * @return {void} This function does not return anything.
 */
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

/**
 * Hides or shows the edit board based on the value of the input field.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Clears the value of the input element with the ID 'subTaskInputBoard'.
 *
 * @return {void} This function does not return anything.
 */
function clearInputAddTaskBoard() {
  document.getElementById("subTaskInputBoard").value = "";
}

function setDateBoard() {
  document.addEventListener('click', function(event) {
    let contactSelect = document.getElementById('contact-select');
    if (!contactSelect.contains(event.target)) {
    hideContactList();
        }
    });
}

/**
 * Adds a subtask to the subTasks array and triggers the rendering of subtasks on the webpage.
 *
 * @return {void} This function does not return anything.
 */
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

/**
 * Renders the subtasks on the webpage.
 *
 * @return {void} This function does not return anything.
 */
function renderSubtasks() {
  let subTaskContainer = document.getElementById("subTaskContainerBoard");
  subTaskContainer.innerHTML = "";
  
  for (let i = 0; i < subTasks.length; i++) {
    let subTaskHTML = addSubtaskHTMLBoard(subTasks[i], i);
    subTaskContainer.innerHTML += subTaskHTML;
  }
}

/**
 * Generates the HTML markup for a subtask element.
 *
 * @param {string} subTask - The text content of the subtask.
 * @param {number} i - The index of the subtask.
 * @return {string} The HTML markup for the subtask element.
 */
function addSubtaskHTMLBoard(subTask, i) {
  return `
    <div id="subTaskBoard_${i}" class="singleSubTasks">
        <div>${subTask}</div>
            <div class="flex edit-trash">
                <div>
                    <img id="saveEditSubtasksBoard_${i}" class="edit d-none" onclick="saveEditSubtaskBoard(${i})" src="../assets/img/svg/Subtasks icons12.svg" alt="">
                    <img id="editSubtasksBoard_${i}" class="edit" onclick="editSubtaskBoard(${i})" src="../assets/img/svg/pencil.svg" alt="">
                </div>
                <div class="seperator">
                </div>
            <div>
                <img class="edit" onclick="deleteSubtaskBoard(${i})" src="../assets/img/svg/trash.svg" alt="">
            </div>
        </div>
    </div>
  `;
}

/**
 * Saves the subtask by replacing its text content with the value of the input field.
 *
 * @param {number} id - The ID of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function saveEditSubtaskBoard(id) {
  let elementToRemove = document.getElementById(`subTaskBoard_${id}`);
  let subTaskTextInput = elementToRemove.querySelector("input").value;
  let saveEditSubtasks = document.getElementById(`saveEditSubtasksBoard_${id}`);
  let editSubtasks = document.getElementById(`editSubtasksBoard_${id}`);

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
 * Edits a subtask by replacing its text content with an input field for editing.
 *
 * @param {number} id - The ID of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function editSubtaskBoard(id) {
  let subTaskDiv = document.getElementById(`subTaskBoard_${id}`);
  let subTaskText = subTaskDiv.querySelector("div");
  let subTaskTextInput = document.createElement("input");
  let saveEditSubtasks = document.getElementById(`saveEditSubtasksBoard_${id}`);
  let editSubtasks = document.getElementById(`editSubtasksBoard_${id}`);

  saveEditSubtasks.classList.remove("d-none");
  editSubtasks.classList.add("d-none");
  subTaskTextInput.type = "text";
  subTaskTextInput.value = subTaskText.textContent;
  subTaskDiv.replaceChild(subTaskTextInput, subTaskText);
}

/**
 * Deletes a subtask from the subTasks array at the specified index and triggers the rendering of subtasks on the webpage.
 *
 * @param {number} id - The index of the subtask to be deleted.
 * @return {void} This function does not return anything.
 */
function deleteSubtaskBoard(id) {
  subTasks.splice(id, 1);
  renderSubtasks();
}

/**
 * Toggles the visibility of the contact list.
 *
 * @return {void} This function does not return a value.
 */
function showContactListBoard() {
  let contactList = document.getElementById("selected-contactsBoard");
  if (contactList.classList.contains("d-none")) {
    contactList.classList.remove("d-none");
  } else {
    contactList.classList.add("d-none");
  }
}

/**
 * Filters contacts based on the provided input value and renders the filtered contact list.
 *
 * @param {Object} input - The input object containing the filter value.
 * @return {void} This function does not return any value.
 */
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

/**
 * Renders the list of assigned contacts based on the provided filtered contacts.
 *
 * @param {Array} filteredContacts - The array of filtered contacts.
 * @return {void} This function does not return a value.
 */
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

/**
 * Generates the HTML code for a contact list entry for a task in the board.
 *
 * @param {number} i - The index of the contact in the list.
 * @param {string} userName - The name of the user.
 * @param {string} initialsString - The initials of the user.
 * @return {string} The HTML code for the contact list entry.
 */
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

/**
 * Selects a task contact and triggers the changeCheckedAndColor function.
 *
 * @param {number} i - The index of the contact in the list.
 * @return {void} This function does not return anything.
 */
function selectTaskContactBoard(i) {
  let contact = document.getElementById(`initialsBoard_${i}`).textContent;
  let fullNameElement = document.getElementById(`SingleContactBoard_${i}`)
    .querySelector(".profile-fullname");
  let name = fullNameElement.textContent.trim();
  changeCheckedAndColorBoard(i, contact, name);
}

/**
 * Changes the checked status and color of a contact list entry based on user interaction.
 *
 * @param {number} i - The index of the contact list entry.
 * @param {string} contact - The contact information.
 * @param {string} name - The name of the contact.
 * @return {void} This function does not return anything.
 */
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

/**
 * Removes the initials div element with the given index from the DOM.
 *
 * @param {number} i - The index of the initials div element to remove.
 * @return {void} This function does not return anything.
 */
function removeInitialBoard(i) {
  let selectedInitials = document.getElementById(`selectedInitialBoard_${i}`);
  selectedInitials.remove();
}

/**
 * Generates the HTML code for a div element containing initials with a background color.
 *
 * @param {number} i - The index of the contact.
 * @param {string} initials - The initials of the contact.
 * @param {string} computedStyle - The background color of the initials div.
 * @return {string} The HTML code for the initials div.
 */
function renderInitialsHTML(i, initials, computedStyle) {
  return `
        <div id="selectedInitialBoard_${i}" style="background-color: ${computedStyle}" class="initials">${initials}</div>
    `;
}

function closeContactList(origin){
  let contactList = document.getElementById(origin)
  contactList.classList.add("d-none");
}