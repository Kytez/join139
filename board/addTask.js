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