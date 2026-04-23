document.querySelector(".comment-form").addEventListener("submit", function () {
  const button = this.querySelector('button[type="submit"]');
  button.dataset.loading = true;
  button.textContent = "Bezig met versturen...";
  button.disabled = true;
});
