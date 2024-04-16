const STORAGE_TOKEN = 'BWWMEZDTZCQQOXJAJAFR8E89G4VCXBKCXC2VP92F';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [];

let activeUser = [];


async function init() {
    await includeHTML();
    await loadActiveUser();
    renderUserInitials();
    loadContacts();
}

async function initSummary() {
    await loadActiveUser();
    setGreetingUserName();
    await includeHTML();
    renderUserInitials();
    loadContacts();
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


function guestLogIn() {
    setItem('activeUser', activeUser);
    setTimeout(moveToSummary, 1500);
}


function logIn() {
    let emailLogin = document.getElementById('emailInputLogin');
    let passwordLogin = document.getElementById('passwordInputLogin');

    let userFound = users.find(function(user) {
        return user.email === emailLogin.value;
    });

    if (userFound) {
        if (userFound.password === passwordLogin.value) {
            saveActiveUser(userFound);
            setTimeout(moveToSummary, 1500);
        } else {
          alert("Email and Password do not match");
        }
      } else {
        alert("Email/User does not exist");
      }
}

function saveActiveUser(userFound) {
    setItem('activeUser', userFound);
}

async function loadActiveUser() {
    let activeUserArray = JSON.parse(await getItem('activeUser'));

    if (activeUserArray && activeUserArray['name']) {
        activeUser = activeUserArray['name'];
    } else {
        activeUser = 'Guest';
    }
}

function renderUserInitials() {
    let userInitials = document.getElementById('userInitials');
    let userInitialsDesktop = document.getElementById('userInitialsDesktop');

    if(activeUser === 'Guest') {
        userInitials.innerHTML = 'G';
        userInitialsDesktop.innerHTML = 'G';
    } else {
        let initials = createInitialsFromUsername();

        userInitials.innerHTML = initials;
        userInitialsDesktop.innerHTML = initials;
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
    window.location.assign('summary/summary.html');
}