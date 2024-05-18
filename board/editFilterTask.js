/**
 * Sets the filter for the edit mode.
 *
 * @param {HTMLInputElement} input - The input element for filtering.
 * @return {void} This function does not return anything.
 */
function setFilterEdit(input) {
  document.getElementById("contactInitalsEdit").innerHTML ="";
  selectedContacts = [];
  colors = [];
  names = [];
  singleContactId = [];
  
  filterContactsEdit(input);
}

/**
 * Filters contacts based on the provided input value and renders the filtered contact list in the edit mode.
 *
 * @param {HTMLInputElement} input - The input element for filtering.
 * @return {void} This function does not return anything.
 */
function filterContactsEdit(input){
  let filter = input.value.trim().toLowerCase();
  let filteredContacts;

  if (filter !== "") {
    filteredContacts = contacts.filter(function (contact) {
        return contact.userName.toLowerCase().includes(filter);
  });
  } else {
    filteredContacts = contacts;
    document.getElementById("contactInitalsEdit").innerHTML ="";
    selectedContacts = [];
    colors = [];
    names = [];
    singleContactId = [];
  }
  renderAssignedContactListEdit(filteredContacts);
}
  
/**
 * Renders the list of assigned contacts based on the provided filtered contacts in the edit mode.
 *
 * @param {Array} filteredContacts - The array of filtered contacts.
 * @return {void} This function does not return anything.
 */
function renderAssignedContactListEdit(filteredContacts) {
  let assignedTo = document.getElementById("selected-contactsEdit");
  assignedTo.innerHTML = "";

  for (let i = 0; i < filteredContacts.length; i++) {
    generateAssignedContactFieldEdit(assignedTo, filteredContacts, i)
  }
}

/**
 * Generates the HTML for a contact field in the edit mode and appends it to the assignedTo element.
 *
 * @param {HTMLElement} assignedTo - The element to which the contact field will be appended.
 * @param {Array} filteredContacts - The array of filtered contacts.
 * @param {number} i - The index of the contact in the filteredContacts array.
 * @return {void} This function does not return anything.
 */
function generateAssignedContactFieldEdit(assignedTo, filteredContacts, i){
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
  let user = document.getElementById(`initialsEdit_${i}`);
  user.style.backgroundColor = color;
}