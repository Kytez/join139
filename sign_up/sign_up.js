/**
 * Asynchronously signs up a user with the provided information.
 *
 * @return {Promise<void>} A promise that resolves when the user is successfully signed up.
 */
async function signUp() {
  let name = document.getElementById("nameInputSignUp");
  let email = document.getElementById("emailInputSignUp");
  let password = document.getElementById("passwordInputSignUp");
  let confirmPassword = document.getElementById("confirmPasswordInputSignUp");
  let btnSignUp = document.getElementById("btnSignUp");

  btnSignUp.disabled = true;

  if (users.some((user) => user.email === email.value)) {
    alert("This Email already exist");
    resetForm(name, email, password, btnSignUp);
  } else {
    if (password.value !== confirmPassword.value) {
      alert("Passwords don't match");
      resetForm(name, email, password, btnSignUp);
    } else {
      users.push({
        name: name.value,
        email: email.value,
        password: password.value,
      });

      await setItem("users", JSON.stringify(users));

      moveToLogIn();
    }
  }
}

/**
 * Checks if the password matches the confirmed password input. 
 * If they match or the confirmed password is empty, it removes the red border class and hides the tooltip. 
 * Otherwise, it adds the red border class and shows the tooltip.
 *
 */
function checkPasswordMatch() {
  let password = document.getElementById("passwordInputSignUp");
  let confirmPassword = document.getElementById("confirmPasswordInputSignUp");
  let tooltip = document.getElementById("tooltipPasswordNotMatching");

  if (password.value === confirmPassword.value || confirmPassword.value === '') {
    confirmPassword.classList.remove("border-red", "border-red:focus");
    tooltip.classList.add("d-none");
  } else {
    confirmPassword.classList.add("border-red", "border-red:focus");
    tooltip.classList.remove("d-none");
  }
}

/**
 * Checks the change in the password input field and updates the visibility icon accordingly.
 *
 * @return {void} This function does not return anything.
 */
function checkIconChangePassword() {
  let passwordSignup = document.getElementById("passwordInputSignUp");
  let visibiltyIconPassword = document.getElementById('iconVisibilityPasswordSignUp');

  if(passwordSignup.value !== '') {
    passwordSignup.style.backgroundImage="";
    visibiltyIconPassword.classList.remove('d-none');
} else {
    passwordSignup.style.backgroundImage="url(../assets/img/icons/lock.png)";
    visibiltyIconPassword.classList.add('d-none');
}
}

/**
 * Checks the change in the confirm password input field and updates the visibility icon accordingly.
 *
 * @return {void} This function does not return anything.
 */
function checkIconChangeConfirmPassword() {
  let confirmPasswordSignup = document.getElementById("confirmPasswordInputSignUp");
  let visibiltyIconConfirmPassword = document.getElementById('iconVisibilityPasswordConfirmSignUp');

  if(confirmPasswordSignup.value !== '') {
      confirmPasswordSignup.style.backgroundImage="";
      visibiltyIconConfirmPassword.classList.remove('d-none');
  } else {
      confirmPasswordSignup.style.backgroundImage="url(../assets/img/icons/lock.png)";
      visibiltyIconConfirmPassword.classList.add('d-none');
  }
}

/**
 * Toggles the visibility of the password input field and updates the visibility icon accordingly.
 *
 * @return {void} This function does not return anything.
 */
function changePasswordVisibility() {
  let visibiltyIcon = document.getElementById('iconVisibilityPasswordSignUp');
  let inputField = document.getElementById("passwordInputSignUp");

  if(inputField.type === 'password') {
    visibiltyIcon.src = '../assets/img/icons/visibility.png';
    inputField.type = 'text';
  } else {
      visibiltyIcon.src = '../assets/img/icons/visibility_off.png';
      inputField.type = 'password';
  }
}

/**
 * Toggles the visibility of the confirm password input field and updates the visibility icon accordingly.
 *
 * @return {void} This function does not return anything.
 */
function changeConfirmPasswordVisibility() {
  let visibiltyIcon = document.getElementById('iconVisibilityPasswordConfirmSignUp');
  let inputField = document.getElementById("confirmPasswordInputSignUp");

  if(inputField.type === 'password') {
    visibiltyIcon.src = '../assets/img/icons/visibility.png';
    inputField.type = 'text';
  } else {
      visibiltyIcon.src = '../assets/img/icons/visibility_off.png';
      inputField.type = 'password';
  }
}

/**
 * Resets the form by clearing input values, unchecking checkboxes, and enabling the sign-up button.
 *
 * @param {Element} name - The input element for the name.
 * @param {Element} email - The input element for the email.
 * @param {Element} password - The input element for the password.
 * @param {Element} btnSignUp - The sign-up button element.
 * @return {void} This function does not return anything.
 */
function resetForm(name, email, password, btnSignUp) {
  let confirmPassword = document.getElementById("confirmPasswordInputSignUp");
  let privacyCheckboxInputSignUp = document.getElementById("privacyCheckboxInputSignUp");
  let tooltip = document.getElementById("tooltipPasswordNotMatching");

  name.value = "";
  email.value = "";
  password.value = "";
  confirmPassword.value = "";
  privacyCheckboxInputSignUp.checked = false;

  btnSignUp.disabled = false;

  confirmPassword.classList.remove("border-red", "border-red:focus");
  tooltip.classList.add("d-none");
}

/**
 * Redirects the user to the login page with a success message.
 *
 * @return {void} This function does not return anything.
 */
function moveToLogIn() {
  window.location.href = "../index.html?msg=You signed up successfully";
}
