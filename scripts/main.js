const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const confirmPassword = document.getElementById('confirm-password');


function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const small = formControl.querySelector('small');
    small.innerText = message;
}

function showSuccess(input) {
    const formControl = input.parentElement;
    formControl.className = 'form-control success';

}

form.addEventListener('submit', function (evt) {
    evt.preventDefault();
    console.log('submit');
    if (username.value === '') {
        showError(username, "Username is required")
    } else {
        showSuccess(username);
    }

    if (email.value === '') {
        showError(email, "Email is required")
    } else {
        showSuccess(email);
    }

    if (password.value === '') {
        showError(password, "Password is required")
    } else {
        showSuccess(password);
    }

    if (confirmPassword.value === '') {
        showError(confirmPassword, "Please confirm password")
    } else {
        showSuccess(confirmPassword);
    }
})