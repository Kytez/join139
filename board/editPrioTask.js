/**
 * sets the color for the priority fields depending on the priority value as chosen by user.
 *
 * @param {string} i This is the priority value for the task
 */

function handleClickPrioEdit(i) {
    if (i) {
      selectPrioEdit(i); // Set the given priority
    }
  }
  
  function selectPrioEdit(i) {
    prio = i;
    setPrioButtonsColorEdit(prio);
  }
  
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

  function handleClickPrioBoard(i) {
    if (i) {
      selectPrioBoard(i); // Set the given priority
    }
  }
  
  function selectPrioBoard(i) {
    prio = i;
    setPrioButtonsColorBoard(prio);
  }
  
  function setPrioButtonsColorBoard(i) {
    document
      .getElementById("mediumBoard")
      .classList.remove("highlighted-button-medium");
    document.getElementById("lowBoard").classList.remove("highlighted-button-low");
    document
      .getElementById("urgentBoard")
      .classList.remove("highlighted-button-urgent");
    if (i === "medium") {
      document
        .getElementById("mediumBoard")
        .classList.add("highlighted-button-medium");
    } else if (i === "low") {
      document.getElementById("lowBoard").classList.add("highlighted-button-low");
    } else if (i === "urgent") {
      document
        .getElementById("urgentBoard")
        .classList.add("highlighted-button-urgent");
    }
  }