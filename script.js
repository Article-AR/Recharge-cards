// Variables to store user data for simulation
var userData = {
    name: '',
    email: '',
    password: ''
};

function showLogin() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('login-container').style.display = 'block';
}

function showSignup() {
    document.getElementById('main-container').style.display = 'none';
    document.getElementById('signup-container').style.display = 'block';
}

function goToEmail() {
    var name = document.getElementById('name').value;
    var nameError = document.getElementById('name-error');
    var nameLengthError = document.getElementById('name-length-error');

    if (!name) {
        nameError.style.display = 'block';
        nameLengthError.style.display = 'none';
    } else if (name.length < 6) {
        nameError.style.display = 'none';
        nameLengthError.style.display = 'block';
    } else {
        nameError.style.display = 'none';
        nameLengthError.style.display = 'none';
        userData.name = name; // Store the name
        document.getElementById('signup-container').style.display = 'none';
        document.getElementById('email-container').style.display = 'block';
    }
}

function goToPassword() {
    var email = document.getElementById('email').value;
    var emailErrorGmail = document.getElementById('email-error-gmail');
    var emailErrorLang = document.getElementById('email-error-lang');
    var emailAlreadyExistsError = document.getElementById('email-already-exists-error');

    var emailGmailRegex = /^[A-Za-z0-9._%+-]+@gmail\.com$/;
    var emailLangRegex = /[^\x00-\x7F]+/;

    emailErrorGmail.style.display = 'none';
    emailErrorLang.style.display = 'none';
    emailAlreadyExistsError.style.display = 'none';

    if (!email.endsWith("@gmail.com")) {
        emailErrorGmail.style.display = 'block';
    } else if (email.match(emailLangRegex)) {
        emailErrorLang.style.display = 'block';
    } else if (email.match(emailGmailRegex)) {
        if (checkEmailExists(email)) {
            emailAlreadyExistsError.style.display = 'block';
        } else {
            userData.email = email; // Store the email
            document.getElementById('email-container').style.display = 'none';
            document.getElementById('password-container').style.display = 'block';
        }
    }
}

function submitSignup() {
    var password = document.getElementById('password').value;
    var confirmPassword = document.getElementById('confirm-password').value;
    var passwordError = document.getElementById('password-error');
    var confirmPasswordError = document.getElementById('confirm-password-error');

    if (password.length < 10) {
        passwordError.style.display = 'block';
    } else {
        passwordError.style.display = 'none';
    }

    if (password !== confirmPassword) {
        confirmPasswordError.style.display = 'block';
    } else {
        confirmPasswordError.style.display = 'none';
    }

    if (password.length >= 10 && password === confirmPassword) {
        userData.password = password; // Store the password
        saveUserData(); // Save user data to localStorage
        document.getElementById('password-container').style.display = 'none';
        document.getElementById('welcome-container').style.display = 'block';
        document.getElementById('welcome-message').textContent = "مرحبا بك يا " + userData.name + " في موقع الكروت المجانية";
    }
}

function submitLogin() {
    var email = document.getElementById('login-email').value;
    var password = document.getElementById('login-password').value;
    var loginErrorMessage = document.getElementById('login-error-message');

    if (checkUserData(email, password)) {
        var userData = getUserData(email);
        document.getElementById('login-container').style.display = 'none';
        document.getElementById('welcome-container').style.display = 'block';
        document.getElementById('welcome-message').textContent = "مرحبا بك يا " + userData.name + " في موقع الكروت المجانية";
    } else {
        loginErrorMessage.style.display = 'block';
    }
}

function showForgotPassword() {
    document.getElementById('login-container').style.display = 'none';
    document.getElementById('forgot-password-container').style.display = 'block';
}

function sendResetLink() {
    var forgotEmail = document.getElementById('forgot-email').value;
    var forgotEmailError = document.getElementById('forgot-email-error');

    if (!forgotEmail || !forgotEmail.endsWith("@gmail.com")) {
        forgotEmailError.style.display = 'block';
    } else {
        forgotEmailError.style.display = 'none';
        alert("تم إرسال رابط إعادة تعيين كلمة المرور إلى البريد الإلكتروني: " + forgotEmail);
        document.getElementById('forgot-password-container').style.display = 'none';
        document.getElementById('login-container').style.display = 'block';
    }
}

function goBack(containerId) {
    var containers = document.getElementsByClassName('container');
    for (var i = 0; i < containers.length; i++) {
        containers[i].style.display = 'none';
    }
    document.getElementById(containerId).style.display = 'block';
}

document.getElementById('toggle-password').addEventListener('click', function() {
    var passwordInput = document.getElementById('password');
    var type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    passwordInput.setAttribute('type', type);
});

document.getElementById('toggle-confirm-password').addEventListener('click', function() {
    var confirmPasswordInput = document.getElementById('confirm-password');
    var type = confirmPasswordInput.getAttribute('type') === 'password' ? 'text' : 'password';
    confirmPasswordInput.setAttribute('type', type);
});

function saveUserData() {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    users.push(userData);
    localStorage.setItem('users', JSON.stringify(users));
}

function getUserData(email) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    return users.find(user => user.email === email);
}

function checkUserData(email, password) {
    var user = getUserData(email);
    return user && user.password === password;
}

function checkEmailExists(email) {
    var users = JSON.parse(localStorage.getItem('users')) || [];
    return users.some(user => user.email === email);
}
