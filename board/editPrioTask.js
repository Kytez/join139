/**
 * sets the color for the priority fields depending on the priority value as chosen by user.
 *
 * @param {string} i This is the priority value for the task
 */
function handleClickPrioEdit(i) {
    if (i) {
      selectPrioEdit(i); 
    }
  }
  
/**
 * Sets the priority and updates the color of the priority buttons on the edit task form.
 *
 * @param {string} i - The priority to be set.
 * @return {void} This function does not return a value.
 */
function selectPrioEdit(i) {
  prio = i;
  setPrioButtonsColorEdit(prio);
}
  
/**
 * Sets the color of the priority buttons on the edit task form based on the given priority.
 *
 * @param {string} i - The priority of the button ("medium", "low", or "urgent").
 * @return {void} This function does not return a value.
 */
function setPrioButtonsColorEdit(i) {
  document.getElementById("mediumEdit").classList.remove("highlighted-button-medium");
  document.getElementById("lowEdit").classList.remove("highlighted-button-low");
  document.getElementById("urgentEdit").classList.remove("highlighted-button-urgent");
  if (i === "medium") {
    document.getElementById("mediumEdit").classList.add("highlighted-button-medium");
  } else if (i === "low") {
    document.getElementById("lowEdit").classList.add("highlighted-button-low");
  } else if (i === "urgent") {
    document.getElementById("urgentEdit").classList.add("highlighted-button-urgent");
  }
}

/**
 * Handles the click event on the priority buttons on the board.
 *
 * @param {string} i - The priority value chosen by the user.
 * @return {void} This function does not return a value.
 */
function handleClickPrioBoard(i) {
  if (i) {
    selectPrioBoard(i);
  }
}

/**
 * Sets the priority and updates the color of the priority buttons on the board.
 *
 * @param {string} i - The priority to be set.
 * @return {void} This function does not return a value.
 */
function selectPrioBoard(i) {
  prio = i;
  setPrioButtonsColorBoard(prio);
}

/**
 * Sets the color of the priority buttons on the board based on the given priority.
 *
 * @param {string} i - The priority of the button ("medium", "low", or "urgent").
 * @return {void} This function does not return a value.
 */
function setPrioButtonsColorBoard(i) {
  document.getElementById("mediumBoard").classList.remove("highlighted-button-medium");
  document.getElementById("lowBoard").classList.remove("highlighted-button-low");
  document.getElementById("urgentBoard").classList.remove("highlighted-button-urgent");
  if (i === "medium") {
    document.getElementById("mediumBoard").classList.add("highlighted-button-medium");
  } else if (i === "low") {
    document.getElementById("lowBoard").classList.add("highlighted-button-low");
  } else if (i === "urgent") {
    document.getElementById("urgentBoard").classList.add("highlighted-button-urgent");
  }
}