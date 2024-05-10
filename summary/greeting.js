window.addEventListener("load", () => {
  if (window.innerWidth < 992) {
    setTimeout(() => {
      document.getElementById("greetingText").classList.add("fade-out");
      setTimeout(() => {
        document.getElementById("greetingText").classList.add("d-none");
      }, 1000);
    }, 2000);
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth > 992) {
    document.getElementById("greetingText").classList.remove("d-none");
    document.getElementById("greetingText").classList.remove("fade-out");
  }
});

window.addEventListener("resize", () => {
  if (window.innerWidth < 992) {
    document.getElementById("greetingText").classList.add("d-none");
  }
});

/**
 * Sets the greeting user name based on the active user. If the active user is a guest, it clears the greetingsUserName element. Otherwise, it sets the greetingsUserName element to display the active user with a line break.
 *
 */
function setGreetingUserName() {
  if (activeUser === "Guest") {
    document.getElementById("greetingsUserName").innerHTML = "";
  } else {
    document.getElementById("commaText").innerHTML = ",";
    document.getElementById(
      "greetingsUserName"
    ).innerHTML = `<br>${activeUser}`;
  }
}
