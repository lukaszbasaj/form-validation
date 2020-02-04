const $form = document.querySelector('.form');
const $username = document.querySelector('.username');
const $email = document.querySelector('.email');
const $password = document.querySelector('.password');
const $passwordConfirm = document.querySelector('.password-confirm');
const $fieldIcon = document.querySelectorAll('.field-icon');
const CONFIG = {
    usernameMinLength: 3,
    usernameMaxLength: 15,
    passwordMinLength: 6,
    passwordMaxLength: 25
}

function showError(input, message) {
    const formControl = input.parentElement;
    formControl.className = 'form-control error';
    const $small = formControl.querySelector('small');
    $small.innerText = message;
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
    return re.test(input.value.trim()) ? showSuccess(input) : showError(input, 'Email is not valid');
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
        return input.value.trim() === '' ? showError(input, `${getFieldName(input)} is required`) : showSuccess(input);
    })
}

function toggleIcon($icon) {
    return $icon.classList.contains('fa-eye') ? $icon.classList.replace('fa-eye', 'fa-eye-slash') : $icon.classList.replace('fa-eye-slash', 'fa-eye');
}

function showPassword(field) {
    return field.type === "password" ? field.type = "text" : field.type = "password";
}

function setEventListeners() {
    $form.addEventListener('submit', (evt) => {
        evt.preventDefault();
        checkRequired([$username, $email, $password, $passwordConfirm]);
        checkFieldLength($username, CONFIG.usernameMinLength, CONFIG.usernameMaxLength);
        checkFieldLength($password, CONFIG.passwordMinLength, CONFIG.passwordMaxLength);
        checkIfEmailIsProper($email);
        checkPasswordsMatch($password, $passwordConfirm);
    });
    $fieldIcon.forEach($icon => {
        $icon.addEventListener('click', (evt) => {
            toggleIcon($icon);
            showPassword($password);
            showPassword($passwordConfirm);
        }, false)
    })
}

function main() {
    setEventListeners();
}

window.addEventListener("DOMContentLoaded", main);