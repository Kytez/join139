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

    if (users.some(user => user.email === email.value)) {
        alert('This Email already exist');
    } else {
    users.push({
        name: name.value,
        email: email.value,
        password: password.value
    });

    await setItem('users', JSON.stringify(users));

    resetForm(name, email, password, btnSignUp);
    moveToLogIn();
}
}

function checkPasswordMatch() {
    let password = document.getElementById('passwordInputSignUp');
    let confirmPassword = document.getElementById('confirmPasswordInputSignUp');
    let tooltip = document.getElementById('tooltipPasswordNotMatching');

    if(password.value !== confirmPassword.value) {
        confirmPassword.classList.add('border-red', 'border-red:focus');
        tooltip.classList.remove('d-none');
    } else {
        confirmPassword.classList.remove('border-red', 'border-red:focus');
        tooltip.classList.add('d-none');
    }
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
    window.location.href = '../index.html?msg=You signed up successfully';
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