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