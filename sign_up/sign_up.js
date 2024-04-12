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

function checkPasswordMatch() {
  let password = document.getElementById("passwordInputSignUp");
  let confirmPassword = document.getElementById("confirmPasswordInputSignUp");
  let tooltip = document.getElementById("tooltipPasswordNotMatching");

  if (password.value !== confirmPassword.value) {
    confirmPassword.classList.add("border-red", "border-red:focus");
    tooltip.classList.remove("d-none");
  } else {
    confirmPassword.classList.remove("border-red", "border-red:focus");
    tooltip.classList.add("d-none");
  }
}

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

function moveToLogIn() {
  window.location.href = "../index.html?msg=You signed up successfully";
}
