const form = document.querySelector(".signup_form");
const inputs = document.querySelectorAll("input:not([type='submit'])");

// Add event listeners to each input
inputs.forEach(input => {
    // Trigger error message on invalid input
    input.addEventListener('invalid', (e) => {
        e.preventDefault(); // Prevent default browser tooltip
        addErrorMessage(e);
    });

    // Check for errors on blur
    input.addEventListener('blur', (e) => {
        if (!e.target.checkValidity()) {
            addErrorMessage(e);
        }
    });

    // Remove error message on focus
    input.addEventListener('focus', removeErrorMessage);
});

// Validate all inputs on form submission
form.addEventListener('submit', (e) => {
    e.preventDefault(); // Prevent form submission for testing

    let isValid = true;

    // Validate all inputs
    inputs.forEach(input => {
        if (!input.checkValidity()) {
            addErrorMessage({ target: input });
            isValid = false;
        }
    });

    // If all inputs are valid, show a pop-up and reset the form
    if (isValid) {
        alert("You have successfully logged in!"); // Pop-up confirmation
        form.reset(); // Reset the form
        inputs.forEach(input => input.classList.remove('error')); // Remove error styles
    }
});

function addErrorMessage(e) {
    const name = e.target.getAttribute("name");

    // Check if error elements already exist
    if (document.querySelector(`[data-id="${name}"].error-icon`) || document.querySelector(`[data-id="${name}"].error-message`)) {
        return; // Exit if error elements already exist
    }

    // Create error icon
    const error_icon = document.createElement('span');
    error_icon.setAttribute("data-id", name);
    error_icon.classList.add("error-icon");
    error_icon.innerHTML = "<img src='images/icon-error.svg' alt='Error Icon'>";

    // Create error message
    const error_message = document.createElement('span');
    error_message.setAttribute("data-id", name);
    error_message.classList.add("error-message");

    if (e.target.value.trim() === "") {
        error_message.innerHTML = e.target.getAttribute('placeholder') + " cannot be empty.";
    } else if (e.target.name === "first-name" || e.target.name === "last-name") {
        if (!/^[A-Za-z]+$/.test(e.target.value)) {
            error_message.innerHTML = e.target.getAttribute('aria-label') + " should only contain letters.";
        }
    } else {
        error_message.innerHTML = "Looks like this is not a valid " + e.target.getAttribute("aria-label") + ".";
    }

    // Append error elements
    e.target.after(error_message);
    e.target.after(error_icon);

    // Add error class to input
    e.target.classList.add('error');
}

function removeErrorMessage(e) {
    const elements = document.querySelectorAll(`[data-id="${e.target.getAttribute("name")}"]`);

    elements.forEach(error_element => {
        error_element.remove();
    });
    e.target.classList.remove('error');
}