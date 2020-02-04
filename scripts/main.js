const form = document.getElementById('form');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');
const passwordConfirm = document.getElementById('password-confirm');
const passwordFields = document.querySelectorAll(`input[type="password"]`);
const fieldIcon = document.querySelectorAll('.field-icon');
console.log(passwordFields);
const CONFIG = {
    usernameMinLength: 3,
    usernameMaxLength: 15,
    passwordMinLength: 6,
    passwordMaxLength: 25
}

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

function getFieldName(input) {
    if (!input.id.includes("-")) {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1);
    } else {
        return input.id.charAt(0).toUpperCase() + input.id.slice(1).replace("-", " ");

    }
}

function checkIfEmailIsProper(input) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (re.test(input.value.trim())) {
        showSuccess(input);
    } else {
        showError(input, 'Email is not valid');
    }
}

function checkFieldLength(input, min, max) {
    if (input.value.length < min) {
        showError(
            input,
            `${getFieldName(input)} must be at least ${min} characters`
        );
    } else if (input.value.length > max) {
        showError(
            input,
            `${getFieldName(input)} must be less than ${max} characters`
        );
    } else {
        showSuccess(input);
    }
}

function checkPasswordsMatch(input1, input2) {
    if (input1.value !== input2.value) {
        showError(input2, 'Passwords do not match');
    }
}

function checkRequired(inputArr) {
    inputArr.forEach((input) => {
        if (input.value.trim() === '') {
            showError(input, `${getFieldName(input)} is required`)
        } else {
            showSuccess(input)
        }
    })
}

// function toggleIcon(icon) {
//     if (icon.classList.contains('fa-eye')) {
//         icon.classList.replace('fa-eye', 'fa-eye-slash');
//     } else {
//         icon.classList.replace('fa-eye-slash', 'fa-eye');
//     }
// }

// function showPassword(input) {
//     if (input.type === 'password') {
//         input.type === 'text';
//         console.log('asdasdsad');
//     } else {
//         input.type === 'password';
//         console.log('asdasdasdasdasdasdas');
//     }
// }

function setEventListeners() {
    form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        checkRequired([username, email, password, passwordConfirm]);
        checkFieldLength(username, CONFIG.usernameMinLength, CONFIG.usernameMaxLength);
        checkFieldLength(password, CONFIG.passwordMinLength, CONFIG.passwordMaxLength);
        checkIfEmailIsProper(email);
        checkPasswordsMatch(password, passwordConfirm);
    });
    // fieldIcon.forEach(icon => {
    //     icon.addEventListener('click', (evt) => {
    //         toggleIcon(icon);
    //         passwordFields.forEach(password => {
    //             password.addEventListener('click', (evt) => {
    //                 showPassword(password);
    //             } )
    //         })
    //     })
    // })

}

function main() {
    setEventListeners();
}

window.addEventListener("DOMContentLoaded", main);