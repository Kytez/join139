const STORAGE_TOKEN = 'BWWMEZDTZCQQOXJAJAFR8E89G4VCXBKCXC2VP92F';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [];

let activeUser;

const guestArray = [{'name': 'Guest'}];


async function init() {
    includeHTML();
    await loadUsers();
    await loadActiveUser();
    renderUserInitials();
    await loadContacts();
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


async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.error('Loading error:', e);
    }
}


async function guestLogIn() {
    activeUser = 'Guest';
    await saveActiveUser(guestArray);
    moveToSummary();
}


async function logIn() {
    let emailLogin = document.getElementById('emailInputLogin');
    let passwordLogin = document.getElementById('passwordInputLogin');

    let userFound = users.find(function(user) {
        return user.email === emailLogin.value;
    });

    if (userFound) {
        if (userFound.password === passwordLogin.value) {
            await saveActiveUser(userFound);
            moveToSummary();
        } else {
          alert("Email and Password is not matching");
        }
      } else {
        alert("Email/User do not exist");
      }
}

function saveActiveUser(user) {
    setItem('activeUser', user);
}

async function loadActiveUser() {
    let activeUserArray = JSON.parse(await getItem('activeUser'));

    console.log(activeUserArray);

    if(activeUserArray['name'] !== 'Guest') {
    activeUser = activeUserArray['name'];
    } else {
        activeUser = 'Guest';
    }
}

function renderUserInitials() {
    let userInitials = document.getElementById('userInitials');
    let userInitialsDesktop = document.getElementById('userInitialsDesktop');

    if(activeUser !== 'Guest') {
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

function moveToSummary() {
    window.location.href = 'summary/summary.html';
}