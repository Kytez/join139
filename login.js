function guestLogIn() {
    setItem("activeUser", activeUser);
    setTimeout(moveToSummary, 1500);
  }
  
  function logIn() {
    let emailLogin = document.getElementById("emailInputLogin");
    let passwordLogin = document.getElementById("passwordInputLogin");
  
    let userFound = users.find(function (user) {
      return user.email === emailLogin.value;
    });
  
    if (userFound) {
      if (userFound.password === passwordLogin.value) {
        checkRememberMe(userFound);
        saveActiveUser(userFound);
        setTimeout(moveToSummary, 1500);
      } else {
        alert("Email and Password do not match");
      }
    } else {
      alert("Email/User does not exist");
    }
  }

  function checkRememberMe(userFound) {
    let checkbox = document.getElementById('rememberCheckbox');

    if(checkbox.checked) {
      saveToLocalStorage(userFound);
    }
  }

  function saveToLocalStorage(userFound) {
    let userAsString = JSON.stringify(userFound);

    localStorage.setItem('userActive', userAsString);
  }

  function loadFromLocalStorage() {
    let userAsArray = JSON.parse(localStorage.getItem('userActive'));

    if(userAsArray) {
      fillLoginDataIfUserRemembered(userAsArray);
    }
  }

  function fillLoginDataIfUserRemembered(user) {
    document.getElementById('emailInputLogin').value = user.email;
    document.getElementById('passwordInputLogin').value = user.password;
  }

  function checkIconChange() {
    let passwordLogin = document.getElementById("passwordInputLogin");
    let visibiltyIcon = document.getElementById('iconVisibilityPassword');

    if(passwordLogin.value !== '') {
        passwordLogin.style.backgroundImage="";
        visibiltyIcon.classList.remove('d-none');
    } else {
        passwordLogin.style.backgroundImage="url(assets/img/icons/lock.png)";
        visibiltyIcon.classList.add('d-none');
    }
  }

  function changePasswordVisibility() {
    let visibiltyIcon = document.getElementById('iconVisibilityPassword');
    let inputField = document.getElementById("passwordInputLogin");

    if(inputField.type === 'password') {
    visibiltyIcon.src = 'assets/img/icons/visibility.png';
    inputField.type = 'text';
    } else {
        visibiltyIcon.src = 'assets/img/icons/visibility_off.png';
        inputField.type = 'password';
    }
  }