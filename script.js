const STORAGE_TOKEN = "BWWMEZDTZCQQOXJAJAFR8E89G4VCXBKCXC2VP92F";
const STORAGE_URL = "https://remote-storage.developerakademie.org/item";
// const BASE_URL = 'https://join-10f46-default-rtdb.europe-west1.firebasedatabase.app/';

let users = [];

let activeUser = [];

/**
 * Initializes the login process by loading users and restoring state from local storage.
 *
 * @return {void} This function does not return anything.
 */
function initLogIn() {
  loadUsers();
  loadFromLocalStorage();
}

// async function getItem(path='') {
//   let response = await fetch(BASE_URL + path + '.json');
//   let responseToJson = await response.json();
//   console.log(responseToJson);
//   return responseToJson;
// }

// async function setItem(path='', value={}) {
//   let response = await fetch(BASE_URL + path + '.json', {
//     method: 'POST',
//     header: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(value),
// });
//   let responseToJson = await response.json();
//   console.log(responseToJson);
//   return responseToJson;
// }

/**
 * Sets an item in the storage with the given key and value.
 *
 * @param {string} key - The key of the item to be set.
 * @param {any} value - The value of the item to be set.
 * @return {Promise<any>} A promise that resolves to the response data from the server.
 */
async function setItem(key, value) {
  const payload = { key, value, token: STORAGE_TOKEN };
  return fetch(STORAGE_URL, {
    method: "POST",
    body: JSON.stringify(payload),
  }).then((response) => response.json());
}

/**
 * Retrieves an item from the storage using the provided key.
 *
 * @param {string} key - The key of the item to retrieve.
 * @return {Promise<any>} A promise that resolves to the value of the item if found, or rejects with an error message if not found.
 */
async function getItem(key) {
  const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
  return fetch(url)
    .then((response) => response.json())
    .then((response) => {
      if (response.data) {
        return response.data.value;
      }
      throw `Could not find data with key "${key}".`;
    });
}

/**
 * Asynchronously includes HTML content from specified files into matching elements in the DOM.
 *
 * @return {Promise<void>} A promise that resolves when all HTML content has been included.
 */
async function includeHTML() {
  let includeElements = document.querySelectorAll("[w3-include-html]");
  for (let i = 0; i < includeElements.length; i++) {
    const element = includeElements[i];
    file = element.getAttribute("w3-include-html");
    let resp = await fetch(file);
    if (resp.ok) {
      element.innerHTML = await resp.text();
    } else {
      element.innerHTML = "Page not found";
    }
  }
}

/**
 * Loads the users from the storage.
 *
 * @return {Promise<void>} A promise that resolves when the users are successfully loaded.
 */
async function loadUsers() {
  try {
    users = JSON.parse(await getItem("users"));
  } catch (e) {
    console.error("Loading error:", e);
  }
}

/**
 * Saves the active user to the storage.
 *
 * @param {Object} userFound - The user object to be saved.
 * @return {void} This function does not return anything.
 */
function saveActiveUser(userFound) {
  setItem("activeUser", userFound);
}

/**
 * Loads the active user from storage and sets the active user name.
 *
 * @return {Promise<void>} A promise that resolves when the active user is successfully loaded.
 */
async function loadActiveUser() {
  let activeUserArray = JSON.parse(await getItem("activeUser"));

  if (activeUserArray && activeUserArray["name"]) {
    activeUser = activeUserArray["name"];
  } else {
    activeUser = "Guest";
  }
}

/**
 * Renders the user initials based on the active user's name.
 */
function renderUserInitials() {
  let userInitials = document.getElementById("userInitials");
  let userInitialsDesktop = document.getElementById("userInitialsDesktop");

  if (activeUser === "Guest") {
    userInitials.innerHTML = "G";
    userInitialsDesktop.innerHTML = "G";
  } else {
    let initials = createInitialsFromUsername();

    userInitials.innerHTML = initials;
    userInitialsDesktop.innerHTML = initials;
  }
}

/**
 * Generates initials from a given username by splitting it into words and 
 * taking the first character of each word.
 *
 * @return {string} The initials generated from the username.
 */
function createInitialsFromUsername() {
  let splitName = activeUser.split(" ");
  let initials = "";

  for (let i = 0; i < splitName.length; i++) {
    initials += splitName[i][0].toUpperCase();
  }

  return initials;
}

/**
 * Redirects the user to the summary page.
 *
 * @return {void} This function does not return anything.
 */
function moveToSummary() {
  window.location.assign("summary/summary.html");
}

/**
 * Toggles the visibility of the popup menu header.
 *
 * @param {none} - No parameters.
 * @return {none} - No return value.
 */
function openPopUpMenuHeader() {
  let popUpMenu = document.getElementById('popUpMenuHeader');
  
  if(popUpMenu.classList.contains('d-none')) {
    popUpMenu.classList.remove('d-none');
  } else {
    popUpMenu.classList.add('d-none');
  }
}

/**
 * Logs out the user by removing the active user from local storage, saving an empty user, and redirecting to the login page after a delay.
 */
function logOut() {
  localStorage.removeItem('userActive');
  saveActiveUser([]);
  setTimeout(moveToLogIn, 1500);
}

/**
 * Redirects the user to the login page.
 *
 * @return {void} This function does not return anything.
 */
function moveToLogIn() {
  window.location.assign("../index.html");
}
