window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("loadAnimation").classList.add("loader-hidden");
  }, 200);
  setTimeout(() => {
    document.getElementById("loadAnimation").classList.add("d-none");
  }, 1000);
});
