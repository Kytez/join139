const STORAGE_TOKEN = 'BWWMEZDTZCQQOXJAJAFR8E89G4VCXBKCXC2VP92F';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [];

let activeUser;


async function init() {
    await includeHTML();
    loadUsers();
    await setActiveUser();
    renderUserInitials();
}


async function setItem(key, value) {
    const payload = {key, value, token: STORAGE_TOKEN};
    return fetch(STORAGE_URL, {method: 'POST', body: JSON.stringify(payload)})
    .then(response => response.json());
}

async function getItem(key) {
    const url = `${STORAGE_URL}?key=${key}&token=${STORAGE_TOKEN}`;
    return fetch(url).then(response => response.json()).then(response => {
        if (response.data) { 
            return response.data.value;
        } throw `Could not find data with key "${key}".`;
    });
}


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.error('Loading error:', e);
    }
}


async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html");
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
}


async function logIn() {
    let emailLogin = document.getElementById('emailInputLogin');
    let passwordLogin = document.getElementById('passwordInputLogin');

    let userFound = users.find(function(user) {
        return user.email === emailLogin.value;
    });

    if (userFound) {
        if (userFound.password === passwordLogin.value) {
            await moveToSummary();
            await setActiveUser(userFound);
        } else {
          alert("Email and Password is not matching");
        }
      } else {
        alert("Email/User do not exist");
      }
}

function renderUserInitials() {
    let userInitials = document.getElementById('userInitials');
    let userInitialsDesktop = document.getElementById('userInitialsDesktop');

    if(activeUser) {
        let initials = createInitialsFromUsername();

        userInitials.innerHTML = initials;
        userInitialsDesktop.innerHTML = initials;
    } else {
        userInitials.innerHTML = 'G';
        userInitialsDesktop.innerHTML = 'G';
    }
}

function createInitialsFromUsername() {
    let splitName = activeUser.split(" ");
    let initials = "";

        for(let i = 0; i < splitName.length; i++) {
            initials += splitName[i][0].toUpperCase();
        }

    return initials;
}

async function setActiveUser(user) {
    activeUser = user.name;
}

function moveToSummary() {
    window.location.href = 'summary/summary.html';
}