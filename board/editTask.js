
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
//   console.log(tasks);
//   console.log(subTasks);
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
  titleEdit.value = title;
  descriptionEdit.value = description;
  dateEdit.value = date;
  setPrioButtonsColorEdit(prioTask);
  prio = allTasks[id]["prio"];
  passArrayToSelectTaskContact(names);
  addExistingSubtaskEdit(id);
  okButton.innerHTML = /*html*/ `
        <button onclick="editTask(${id})"  class="btn-dark-edit pointer">Ok 
            <img src="../assets/img/icons/check_icon.png" alt="">
        </button> 
    `;
}


function passArrayToSelectTaskContact(names) {
  document.getElementById("contactInitalsEdit").innerHTML = "";
  let namesArray = names.split(",");

  for (let i = 0; i < namesArray.length; i++) {
    let id = contacts.findIndex(contact => contact.userName === namesArray[i]);

    if (!isNaN(id)) {
      selectTaskContactEdit(id);
    }
  }
}

function showContactListEdit() {
  let contactList = document.getElementById("selected-contactsEdit");
  if (contactList.classList.contains("d-none")) {
    contactList.classList.remove("d-none");
  } else {
    contactList.classList.add("d-none");
  }
}

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

function selectTaskContactEdit(i) {
  let contact = document.getElementById(`initialsEdit_${i}`).textContent;
  let fullNameElement = document
    .getElementById(`SingleContactEdit_${i}`)
    .querySelector(".profile-fullname");
  let name = fullNameElement.textContent.trim();
  changeCheckedAndColorEdit(i, contact, name);
}

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

function removeInitialEdit(i) {
  let selectedInitials = document.getElementById(`selectedInitialEdit_${i}`);
  selectedInitials.remove();
}

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

