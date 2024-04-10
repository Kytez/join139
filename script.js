const STORAGE_TOKEN = 'BWWMEZDTZCQQOXJAJAFR8E89G4VCXBKCXC2VP92F';
const STORAGE_URL = 'https://remote-storage.developerakademie.org/item';

let users = [];


async function init() {
    loadUsers();
}

async function loadUsers() {
    try {
        users = JSON.parse(await getItem('users'));
    } catch(e) {
        console.error('Loading error:', e);
    }
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


async function signUp() {
    let name = document.getElementById('nameInputSignUp');
    let email = document.getElementById('emailInputSignUp');
    let password = document.getElementById('passwordInputSignUp');
    let btnSignUp = document.getElementById('btnSignUp');

    btnSignUp.disabled = true;

    users.push({
        name: name.value,
        email: email.value,
        password: password.value
    });

    await setItem('users', JSON.stringify(users));

    resetForm(name, email, password, btnSignUp);
    moveToLogIn();
}

function resetForm(name, email, password, btnSignUp) {
    let confirmPassword = document.getElementById('confirmPasswordInputSignUp');
    let privacyCheckboxInputSignUp = document.getElementById('privacyCheckboxInputSignUp');

    name.value = '';
    email.value = '';
    password.value = '';
    confirmPassword.value = '';
    privacyCheckboxInputSignUp.checked = false;

    btnSignUp.disabled = false;
}

function moveToLogIn() {
    window.location.href = '../index.html';
}


async function includeHTML() {
  let includeElements = document.querySelectorAll('[w3-include-html]');
  for (let i = 0; i < includeElements.length; i++) {
      const element = includeElements[i];
      file = element.getAttribute("w3-include-html"); // "includes/header.html"
      let resp = await fetch(file);
      if (resp.ok) {
          element.innerHTML = await resp.text();
      } else {
          element.innerHTML = 'Page not found';
      }
  }
}