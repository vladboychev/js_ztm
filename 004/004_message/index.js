const { hash } = window.location;
const decrypted = atob(hash.replace("#", ""));

if (decrypted) {
  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#message-show").classList.remove("hide");

  document.querySelector("h1").innerHTML = decrypted;
}

document.querySelector("form").addEventListener("submit", (event) => {
  event.preventDefault();

  document.querySelector("#message-form").classList.add("hide");
  document.querySelector("#link-form").classList.remove("hide");

  const message = document.querySelector("#message-input");
  const encrypted = btoa(message.value);

  const input = document.querySelector("#link-input");

  input.value = `${window.location}#${encrypted}`;
  input.select();
});
