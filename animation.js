window.addEventListener("load", () => {
  document.getElementById("loadAnimation").classList.add("loader-hidden");
  setTimeout(() => {
    document.getElementById("loadAnimation").classList.add("d-none");
  }, 1000);
});
