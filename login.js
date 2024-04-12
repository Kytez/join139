function logIn() {
    let emailLogin = document.getElementById('emailInputLogin');
    let passwordLogin = document.getElementById('passwordInputLogin');

    let userFound = users.find(function(user) {
        return user.email === emailLogin.value;
    });

    if (userFound) {
        if (userFound.password === passwordLogin.value) {
          alert("ok");
        } else {
          alert("falsches Passwort");
        }
      } else {
        alert("Benutzer nicht vorhanden");
      }

}