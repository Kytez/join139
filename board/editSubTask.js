/**
 * Adds a subtask to the subTasks array and triggers the rendering of subtasks on the webpage.
 *
 * @return {void} This function does not return anything.
 */
function addSubtaskEdit(id) {
  let edit = document.getElementById("editEditContainer");
  let subtaskt = document.getElementById("subTaskEdit");
  let subTaskInput = document.getElementById('subTaskInputEdit').value;
  let checkboxArray = allTasks[id]['checkbox']

  subTaskContainer = document.getElementById('subTaskContainerEdit');
  if(checkboxArray.includes('a')){
    checkboxArray.splice(0, 1)
    checkboxArray.push(false);
  }else{
    checkboxArray.push(false);
  }
  numberAddedSubtasks++;
  subTasks.push(subTaskInput);
  renderSubtasksEdit(id);
  document.getElementById('subTaskInputEdit').value = "";
  edit.classList.add("d-none");
  subtaskt.classList.remove("d-none");

}

/**
 * Adds existing subtasks to the subTaskContainerEdit element and updates the subTasks array.
 *
 * @param {number} id - The ID of the task whose subtasks are being added.
 * @return {void} This function does not return anything.
 */
function addExistingSubtaskEdit(id) {
  subTaskContainer = document.getElementById('subTaskContainerEdit');
  subTaskContainer.innerHTML = '';
  subTasks = [];
  subTask = allTasks[id]["subTask"]

  if(subTask){
      for (let i = 0; i < allTasks[id]["subTask"].length; i++) {
        let subTaskHTML = (allTasks[id]["subTask"][i]);
        subTasks.push(subTaskHTML);
        subTaskContainer.innerHTML += addSubtaskHTML(subTaskHTML, i, id);
      }
  }
}

/**
 * Renders the subtasks on the webpage.
 *
 * @return {void} This function does not return anything.
 */
function renderSubtasksEdit(id) {
  let subTaskContainer = document.getElementById("subTaskContainerEdit");
  subTaskContainer.innerHTML = '';
  for (let i = 0; i < subTasks.length; i++) {
    let subTaskHTML = addSubtaskHTML(subTasks[i], i, id);
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
function addSubtaskHTML(subTask, i, idTask) {
  return `
    <div id="subTaskEdit_${i}" class="singleSubTasks">
        <div>${subTask}</div>
            <div class="flex edit-trash">
                <div>
                    <img id="saveEditSubtasksEdit_${i}" class="edit d-none" onclick="saveEditSubtaskEdit(${i})" src="../assets/img/svg/Subtasks icons12.svg" alt="">
                    <img id="editSubtasksEdit_${i}" class="edit" onclick="editSubtaskEdit(${i})" src="../assets/img/svg/pencil.svg" alt="">
                </div>
                <div class="seperator">
                </div>
            <div>
                <img class="edit" onclick="deleteSubtaskEdit(${i}, ${idTask})" src="../assets/img/svg/trash.svg" alt="">
            </div>
        </div>
    </div>
  `;
}

/**
 * Edits a subtask by replacing its text content with an input field for editing.
 *
 * @param {number} id - The ID of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function editSubtaskEdit(id) {
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

/**
 * Deletes a subtask from the subTasks array at the specified index and triggers the rendering of subtasks on the webpage.
 *
 * @param {number} id - The index of the subtask to be deleted.
 * @return {void} This function does not return anything.
 */
function deleteSubtaskEdit(subTaskIndex, idTask) {
  // let checkBoxIndex = allTasks[idTask]['checkbox'][subTaskIndex]
  subTasks.splice(subTaskIndex, 1);
  deleteCheckBox(idTask, subTaskIndex)
  renderSubtasksEdit();
  numberAddedSubtasks--;
}

/**
 * Saves the edited subtask by replacing its text content with the value of the input field.
 *
 * @param {number} id - The ID of the subtask to be edited.
 * @return {void} This function does not return anything.
 */
function saveEditSubtaskEdit(id) {
  let elementToRemove = document.getElementById(`subTaskEdit_${id}`);
  let subTaskTextInput = elementToRemove.querySelector("input").value;
  let saveEditSubtasks = document.getElementById(`saveEditSubtasksEdit_${id}`);
  let editSubtasks = document.getElementById(`editSubtasksEdit_${id}`);

  if (elementToRemove) {
      elementToRemove.remove();
      subTasks.splice(id, 1);
      subTasks.push(subTaskTextInput);
      renderSubtasksEdit();
      saveEditSubtasks.classList.remove("d-none");
      editSubtasks.classList.add("d-none");
  }
}

/**
 * Hides or shows the edit container based on the value of the input field.
 *
 * @return {void} This function does not return anything.
 */
function hideAndShowEdit() {
  let edit = document.getElementById("editEditContainer");
  let subtaskt = document.getElementById("subTaskEdit");
  let input = document.getElementById("subTaskInputEdit").value;

  if(input.length > 0){
    if (edit.classList.contains("d-none")) {
      edit.classList.remove("d-none");
      subtaskt.classList.add("d-none");
    }
  }
}

/**
 * Clears the value of the input element with the ID 'subTaskInputEdit'.
 *
 * @return {void} This function does not return anything.
 */
function clearInputAddTaskEdit() {
  document.getElementById("subTaskInputEdit").value = "";
}