/**
 * Logs in a guest user and redirects to the summary page after a delay.
 *
 * @return {void} This function does not return anything.
 */
function guestLogIn() {
  setItem("activeUser", activeUser);
  setTimeout(moveToSummary, 1500);
}

/**
 * Logs in a user based on the provided email and password.
 *
 * @return {void} This function does not return anything.
 */
function logIn() {
  let emailLogin = document.getElementById("emailInputLogin");
  let passwordLogin = document.getElementById("passwordInputLogin");
  let logInFeedback = document.getElementById("logInFeedback");

  let userFound = users.find(function (user) {
    return user.email === emailLogin.value;
  });

  if (userFound) {
    if (userFound.password === passwordLogin.value) {
      checkRememberMe(userFound);
      saveActiveUser(userFound);
      setTimeout(moveToSummary, 1500);
    } else {
      logInFeedback.innerHTML = "Email and Password do not match";
      logInFeedback.classList.remove("d-none");
        setTimeout(function () {
          logInFeedback.classList.add("hide-animation");
        }, 3000);
        setTimeout(function () {
          logInFeedback.classList.add("d-none");
        }, 5000);
    }
  } else {
      logInFeedback.innerHTML = "Email does not exist";
      logInFeedback.classList.remove("d-none");
        setTimeout(function () {
          logInFeedback.classList.add("hide-animation");
        }, 3000);
        setTimeout(function () {
          logInFeedback.classList.add("d-none");
        }, 5000);
  }
}

/**
 * Checks if the remember checkbox is checked and saves the user to local storage.
 *
 * @param {object} userFound - The user object to be saved to local storage.
 * @return {void} This function does not return anything.
 */
function checkRememberMe(userFound) {
  let checkbox = document.getElementById("rememberCheckbox");

  if (checkbox.checked) {
    saveToLocalStorage(userFound);
  }
}

/**
 * Saves the given user object to the local storage.
 *
 * @param {object} userFound - The user object to be saved.
 * @return {void} This function does not return anything.
 */
function saveToLocalStorage(userFound) {
  let userAsString = JSON.stringify(userFound);

  localStorage.setItem("userActive", userAsString);
}

/**
 * Loads user data from local storage and fills login fields if user is remembered.
 *
 * @return {void} This function does not return anything.
 */
function loadFromLocalStorage() {
  let userAsArray = JSON.parse(localStorage.getItem("userActive"));

  if (userAsArray) {
    fillLoginDataIfUserRemembered(userAsArray);
  }
}

/**
 * Fills the login form with the provided user's email and password if the user is remembered.
 *
 * @param {Object} user - The user object containing the email and password.
 * @return {void} This function does not return anything.
 */
function fillLoginDataIfUserRemembered(user) {
  document.getElementById("emailInputLogin").value = user.email;
  document.getElementById("passwordInputLogin").value = user.password;
}

/**
 * Checks the change in the password input field and updates the visibility icon accordingly.
 *
 * @return {void} This function does not return anything.
 */
function checkIconChange() {
  let passwordLogin = document.getElementById("passwordInputLogin");
  let visibiltyIcon = document.getElementById("iconVisibilityPassword");

  if (passwordLogin.value !== "") {
    passwordLogin.style.backgroundImage = "";
    visibiltyIcon.classList.remove("d-none");
  } else {
    passwordLogin.style.backgroundImage = "url(assets/img/icons/lock.png)";
    visibiltyIcon.classList.add("d-none");
  }
}

/**
 * A function to change the visibility of the password input field.
 *
 * @param {void} This function does not take any parameters.
 * @return {void} This function does not return anything.
 */
function changePasswordVisibility() {
  let visibiltyIcon = document.getElementById("iconVisibilityPassword");
  let inputField = document.getElementById("passwordInputLogin");

  if (inputField.type === "password") {
    visibiltyIcon.src = "assets/img/icons/visibility.png";
    inputField.type = "text";
  } else {
    visibiltyIcon.src = "assets/img/icons/visibility_off.png";
    inputField.type = "password";
  }
}
