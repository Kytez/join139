/**
 * Returns the number of checked and finished subtasks of a task.
 * @param {number} id - The ID of the task.
 * @returns {number} - sum of all finished subtasks checked for a task.
 */
function calculateSumCheckedTasks(id) {
    let checkedTasks = allTasks[id]['checkbox'] 
    let sumTrue = 0;
    if(checkedTasks[0] === true || checkedTasks[0] === false){
        checkedTasks.forEach(value => {
            if (value) {
                sumTrue++;
            }
        });
    }
    return sumTrue;
}

/**
 * Saves the status of checkboxes, checked or not, for subtasks.
 * @param {number} id - The ID of the task.
 */
function saveCheckBoxStatus(id) {
    let subTasks = allTasks[id]['subTask']
    subTaskIsChecked(id, subTasks)
    updateTasksHTML();
    saveTasks();
}

/**
 * Checks if subtasks are checked and updates the status in the allTasks array in the key checkbox.
 * @param {number} id - The ID of the task.
 * @param {array} subTasks - this is an array with all subtasks for a task
 */
function subTaskIsChecked(id, subTasks) {
    if(subTasks){
        for (let i = 0; i < subTasks.length; i++) {
            const checkbox = document.getElementById(`box${id}${i}`)
            if(checkbox.checked){
                allTasks[id]['checkbox'][i] = true;
            }
            else{
                allTasks[id]['checkbox'][i] = false;
            }
        }
    }
}

/**
 * Loads the status of checkboxes for subtasks and checks the boxes in the task pop-up accordingly.
 * @param {number} id - The ID of the task.
 */
function loadCheckBoxStatus(id) {
    let checkBoxValue = allTasks[id]['checkbox']
    if(checkBoxValue[0] === true || checkBoxValue[0] === false){
        checkSubTasks(id, checkBoxValue)
    }
}

/**
 * Checks subtasks based on their status and updates the corresponding checkboxes.
 * @param {number} id - The ID of the task.
 * @param {array} checkBoxValue - The array of checkbox values for subtasks with boolean values.
 */
function checkSubTasks(id, checkBoxValue) {
    if(checkBoxValue){
        for (let i = 0; i < checkBoxValue.length; i++) {
            const value = checkBoxValue[i];
            const checkbox = document.getElementById(`box${id}${i}`)
            if(value == true){
                checkbox.checked = true;
            }
            else{
                checkbox.checked = false;
            }
        }
    }
}

