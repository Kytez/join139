function addSubtaskEdit() {
  let edit = document.getElementById("editEditContainer");
  let subtaskt = document.getElementById("subTaskEdit");
    let subTaskInput = document.getElementById('subTaskInputEdit').value;
    subTaskContainer = document.getElementById('subTaskContainerEdit');
    subTasks.push(subTaskInput);
    renderSubtasksEdit();
    document.getElementById('subTaskInputEdit').value = "";
    edit.classList.add("d-none");
    subtaskt.classList.remove("d-none");

}

function addExistingSubtaskEdit(id) {
    subTaskContainer = document.getElementById('subTaskContainerEdit');
    subTaskContainer.innerHTML = '';
    subTasks = [];
    subTask = allTasks[id]["subTask"]
    if(subTask){
        for (let i = 0; i < allTasks[id]["subTask"].length; i++) {
          let subTaskHTML = (allTasks[id]["subTask"][i]);
        //   console.log(subTaskHTML);
        //   console.log(subTasks);
          subTasks.push(subTaskHTML);
          subTaskContainer.innerHTML += addSubtaskHTML(subTaskHTML, i);
        }
    }
}

function renderSubtasksEdit() {
  let subTaskContainer = document.getElementById("subTaskContainerEdit");
  subTaskContainer.innerHTML = '';
//   console.log(subTasks);
  for (let i = 0; i < subTasks.length; i++) {
    // console.log(i);
    let subTaskHTML = addSubtaskHTML(subTasks[i], i);
    subTaskContainer.innerHTML += subTaskHTML;
  }
}

function addSubtaskHTML(subTask, i) {
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
                <img class="edit" onclick="deleteSubtaskEdit(${i})" src="../assets/img/svg/trash.svg" alt="">
            </div>
        </div>
    </div>
    `;
}

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

function deleteSubtaskEdit(id) {
  // const index = subTasks.findIndex((element) => element.id === id);
  subTasks.splice(id, 1);
  renderSubtasksEdit();
  // entry.remove();

}

function saveEditSubtaskEdit(id) {
    let elementToRemove = document.getElementById(`subTaskEdit_${id}`);
    let subTaskTextInput = elementToRemove.querySelector("input").value;
    let saveEditSubtasks = document.getElementById(`saveEditSubtasksEdit_${id}`);
    let editSubtasks = document.getElementById(`editSubtasksEdit_${id}`);
    // console.log(subTaskTextInput);
    if (elementToRemove) {
        elementToRemove.remove();
        subTasks.splice(id, 1);
        subTasks.push(subTaskTextInput);
        renderSubtasksEdit();
        saveEditSubtasks.classList.remove("d-none");
        editSubtasks.classList.add("d-none");
    }
}

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

function clearInputAddTaskEdit() {
  document.getElementById("subTaskInputEdit").value = "";
}