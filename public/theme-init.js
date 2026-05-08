(function () {
  try {
    var t = localStorage.getItem("fjh-theme-v1");
    if (t !== "light" && t !== "dark") {
      t = "dark";
    }
    document.documentElement.classList.add(t);
    document.documentElement.style.colorScheme = t;
  } catch (e) {
    document.documentElement.classList.add("dark");
  }
})();
