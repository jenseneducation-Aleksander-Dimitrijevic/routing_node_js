const form = document.querySelector("form");
const inputs = document.querySelectorAll("input");
const errorMessages = document.querySelectorAll(".error");
const required = ["name", "email", "password"];
const successMessage = document.querySelector(".success");
form.addEventListener("submit", validateForm);

function validateForm(e) {
  e.preventDefault();
  let data = {};
  let error = false;
  errorMessages.forEach(error => {
    error.style.display = "none";
  });

  inputs.forEach(input => {
    let fieldName = input.getAttribute("name");
    if (fieldName !== null) {
      input.style.borderColor = "#ccc";
      if (input.value.length == 0 && required.includes(fieldName)) {
        addError(input, "is required", fieldName);
        error = true;
      } else if (fieldName == "email") {
        let checkValidEmail = /^\S+@\S+\.\S+$/;
        let result = checkValidEmail.test(input.value);
        if (!result) {
          addError(input, "is invalid", fieldName);
          error = true;
        }
      } else if (fieldName == "password") {
        if (input.value.length < 6) {
          addError(input, "need to be at least 6 characters long", fieldName);
          error = true;
        }
      }
      if (fieldName == "name") {
        let checkForNumbers = /^[\+\-]?\d*\.?\d+(?:[Ee][\+\-]?\d+)?$/;
        let nameResult = checkForNumbers.test(input.value);
        if (nameResult) {
          addError(input, "cannot contain any numbers", fieldName);
          error = true;
        }
      }
      data[fieldName] = input.value;
    }
  });
  if (!error) {
    form.remove();
    successMessage.classList.add("show");
    error = false;
  }
}

function addError(input, msg, fieldName) {
  let tempError = input.nextElementSibling;
  tempError.style.display = "block";
  tempError.style.background = "rgba(30,30,30,.8)";
  tempError.style.padding = "10px";
  tempError.textContent = fieldName.toLowerCase() + " " + msg;
}
