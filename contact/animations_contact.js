let contactViewOpen;

/**
 * Stops propagation of a function effect on further div elements.
 *
 * @param {event} event The event is triggered as a click-event
 */
function doNotClose(event) {
  event.stopPropagation();
}

/**
 * Listens to a click event once a contact in the contact list has been clicked, and changes its background-color.
 */
document.addEventListener("DOMContentLoaded", function () {
  const list = document.getElementById("list");
  list.addEventListener("click", function (event) {
    const clickedContact = event.target.closest(".contact");
    const contacts = document.querySelectorAll(".contact");
    if (clickedContact && window.innerWidth > 992) {
      changeContactBgDark(clickedContact, contacts);
    }
  });
});

/**
 * Removes the class "selected" for all contacts and then adds it back to the clicked-contact specifically.
 *
 * @param {object} clickedContact This is the contact that was clicked within the contact-list
 * @param {object} contacts These are all contacts with the contact-class
 */
function changeContactBgDark(clickedContact, contacts) {
  contacts.forEach((contact) => {
    contact.addEventListener("click", function () {
      contacts.forEach((c) => {
        c.classList.remove("selected");
      });
    });
    clickedContact.classList.add("selected");
  });
}

/**
 * Opens the view for the options pop-up for editing and deleting contacts.
 * It opens the view by changing the CSS property transform: translateX().
 */
function showOptions() {
  document.getElementById("toggle-options").style = "transform: translateX(0)";
}

/**
 * Closes the view for the options pop-up for editing and deleting contacts.
 * It closes the view by changing the CSS property transform: translateX().
 */
function closeOptions() {
  document.getElementById("toggle-options").style =
    "transform: translateX(200%)";
}

/**
 * Shows the contact view container in the mobile version up to a width of 992 px.
 * It then also renders the information within the container depending on the contact viewed via the received parameters, in mobile as well as desktop.
 * It changes the variable contactViewOpen to enable later closing of the container, in the event of display resizing.
 *
 * @param {String} userName This is the name of the contact.
 * @param {String} email  This is the email of the contact.
 * @param {String} phone  This is the phone number of the contact.
 * @param {String} colour This is the random color assigned to the contact.
 * @param {number} id This is the id of the contact.
 */
function viewContact(userName, email, phone, colour, id) {
  contactViewOpen = true;
  renderViewedContact(userName, email, phone, colour, id);
  if (window.innerWidth < 992) {
    document.getElementById("contact-list").classList.add("d-non");
    document.getElementById("viewedContact").classList.remove("d-non");
  } else moveContactDesktop();
}

/**
 * Moves the contact container in the desktop version with a slide effect, due to transform: translateX().
 */
function moveContactDesktop() {
  let contactContainer = document.getElementById("contact-container-desktop");
  setTimeout(() => {
    contactContainer.style = "transform: translateX(0)";
  }, 100);
}

/**
 * Closes the contact view container in the mobile version.
 * It also changes the variable contactViewOpen to signal the closure.
 */
function closeContact() {
  contactViewOpen = false;
  document.getElementById("viewedContact").classList.add("d-non");
  document.getElementById("contact-list").classList.remove("d-non");
}

/**
 * Enables responsiveness of the contact view container in the event of resizing of the display.
 * It relies on the contactViewOpen variable and display-width as triggers.
 */
window.addEventListener("resize", () => {
  if (contactViewOpen && window.innerWidth > 992) showContactDesktopView();

  if (contactViewOpen && window.innerWidth < 992) showContactMobileView();

  if (!contactViewOpen && window.innerWidth < 992) removeViewedContactDesktop();

  if (window.innerWidth < 992) removeContactBgOnResize();
});

/**
 * Hides the contact view in the mobile version to allow responsive view in the desktop version.
 */
function showContactDesktopView() {
  document.getElementById("viewedContact").classList.add("d-non");
  document.getElementById("contact-list").classList.remove("d-non");
}

/**
 * Shows the viewed Contact in the mobile version.
 */
function showContactMobileView() {
  document.getElementById("viewedContact").classList.remove("d-non");
  document.getElementById("contact-list").classList.add("d-non");
}

/**
 * Removes the content of the view-container in the desktop version, if it is no longer being viewed after deselection in the mobile-view.
 */
function removeViewedContactDesktop() {
  document.getElementById("viewedContactDesktop").innerHTML = "";
}

/**
 * Removes the background-color of the viewed Contact in the list only when user moves from Desktop display to Mobile display view.
 */
function removeContactBgOnResize() {
  const contacts = document.querySelectorAll(".contact");
  window.onclick = function (event) {
    if (event.target.classList.contains("return-arrow")) {
      contacts.forEach((contact) => {
        contact.classList.remove("selected");
      });
    }
  };
}

/**
 * Controls the visual events after a new contact is added, in mobile or desktop.
 * It renders the new contact information in the contact view container.
 * It closes the add-contact container and shows the pop-up for success.
 *
 * @param {String} userName This is the name of the contact.
 * @param {String} email  This is the email of the contact.
 * @param {String} phone  This is the phone number of the contact.
 * @param {String} colour This is the random color assigned to the contact.
 */
function showNewContactInformation(userName, email, phone, colour) {
  if (window.innerWidth < 992) {
    viewContact(userName, email, phone, colour);
    closeAddContact();
    successPopUp();
  } else {
    closeAddContact();
    successPopUp();
  }
}

/**
 * Shows the container for adding a new contact, in mobile or desktop.
 * It opens the container by changing the CSS property transform: translateY() or transform: translateX().
 */
function showAddContact() {
  changeBgDark('overlayAdd');
  if (window.innerWidth < 992) {
    document.getElementById("add-contact").style = "transform: translateY(0)";
  } else {
    document.getElementById("add-contact").style = "transform: translateX(0)";
  }
}

/**
 * Changes the background / overlay dark.
 */
function changeBgDark(overlayContainer) {
  let overlay = document.getElementById(overlayContainer);
  overlay.style.position = "fixed";
  overlay.style.backgroundColor = "#0000005c";
}

/**
 * Closes the container for adding a new contact, in mobile or desktop.
 * It closes the container by changing the CSS property transform: translateY() or transform: translateX().
 */
function closeAddContact() {
  changeBgBright('overlayAdd');
  if (window.innerWidth < 992) {
    document.getElementById("add-contact").style =
      "transform: translateY(275%)";
  } else {
    document.getElementById("add-contact").style =
      "transform: translateX(300%)";
  }
}

/**
 * Returns the background into its regular color / makes the overlay transparent.
 */
function changeBgBright(overlayContainer) {
  let overlay = document.getElementById(overlayContainer);
  overlay.style.backgroundColor = "#00000000";
  setTimeout(() => {
    overlay.style.position = "static";
  }, 500);
}

/**
 * Controls the visual pop-up for successfully adding a new contact, in mobile or desktop.
 */
function successPopUp() {
  if (window.innerWidth < 992) showSucessPopUpMobile();
  else showSuccessPopUpDesktop();
}

/**
 * Shows the success pop-up in the mobile version.
 * It shows and hides the container by changing the CSS property transform: translateY().
 */
function showSucessPopUpMobile() {
  setTimeout(() => {
    document.getElementById("success-popup").style = `transform: translateY(0)`;
    setTimeout(() => {
      document.getElementById(
        "success-popup"
      ).style = `transform: translateY(275%)`;
    }, 1000);
  }, 200);
}

/**
 * Shows the success pop-up in the desktop version.
 * It shows and hides the container by changing the CSS property transform: translateX().
 */
function showSuccessPopUpDesktop() {
  setTimeout(() => {
    document.getElementById(
      "success-popup-desktop"
    ).style = `transform: translateX(0)`;
    setTimeout(() => {
      document.getElementById(
        "success-popup-desktop"
      ).style = `transform: translateX(300%)`;
    }, 1000);
  }, 200);
}

/**
 * Shows the contact edit container, in mobile or desktop.
 * It shows the container by changing the CSS property transform: translateY() or transform: translateX().
 */
function showEditContact() {
  changeBgDark('overlayEdit');
  if (window.innerWidth < 992) {
    document.getElementById("edit-contact").style.transform = "translateY(0)";
  } else {
    document.getElementById("edit-contact").style.transform = "translateX(0)";
  }
}

/**
 * Closes the contact edit container, in mobile or desktop.
 * It closes the container by changing the CSS property transform: translateY() or transform: translateX().
 */
function closeEditContact() {
  changeBgBright('overlayEdit');
  if (window.innerWidth < 992) {
    document.getElementById("edit-contact").style.transform =
      "translateY(275%)";
  } else {
    document.getElementById("edit-contact").style.transform =
      "translateX(300%)";
  }
}
