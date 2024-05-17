function setFilterEdit(input) {
        document.getElementById("contactInitalsEdit").innerHTML ="";
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
        document.getElementById("contactInitalsEdit").innerHTML ="";
        selectedContacts = [];
        colors = [];
        names = [];
        singleContactId = [];
    }
  
    renderAssignedContactListEdit(filteredContacts);
  }
  
  function renderAssignedContactListEdit(filteredContacts) {
    let assignedTo = document.getElementById("selected-contactsEdit");
    assignedTo.innerHTML = "";
    for (let i = 0; i < filteredContacts.length; i++) {
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
  }