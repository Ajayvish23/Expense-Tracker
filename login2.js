document.addEventListener('DOMContentLoaded', () => {
    // Get references to DOM elements
const closeModalBtn = document.getElementById('close-modal-btn');
const closeRegisterModalBtn = document.getElementById('close-register-modal-btn');
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');

    // Ensure elements exist before attaching event listeners
if (loginBtn) {
    loginBtn.addEventListener('click', () => {
        document.getElementById('login-modal').style.display = 'flex';
    });
}

if (registerBtn) {
    registerBtn.addEventListener('click', () => {
        document.getElementById('register-modal').style.display = 'flex';
    });
}

    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            document.getElementById('login-modal').style.display = 'none';
        });
    }

    if (closeRegisterModalBtn) {
        closeRegisterModalBtn.addEventListener('click', () => {
            document.getElementById('register-modal').style.display = 'none';
        });
    }
});


// Slideshow Functionality
let slideIndex = 0;
const slides = document.querySelectorAll('.slideshow img');

function showSlides() {
    slides.forEach((slide, index) => {
        slide.style.opacity = index === slideIndex ? '1' : '0';
    });
    slideIndex = (slideIndex + 1) % slides.length;
    setTimeout(showSlides, 5000); // Change image every 5 seconds
}

showSlides();

// Login and Register Button Functionality
const loginBtn = document.getElementById('login-btn');
const registerBtn = document.getElementById('register-btn');
const loginModal = document.getElementById('login-modal');
const registerModal = document.getElementById('register-modal');
const closeModalBtn = document.getElementById('close-modal-btn');
const closeRegisterModalBtn = document.getElementById('close-register-modal-btn');

loginBtn.addEventListener('click', () => {
    loginModal.style.display = 'flex';
});

registerBtn.addEventListener('click', () => {
    registerModal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    loginModal.style.display = 'none';
});

closeRegisterModalBtn.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

// Login Functionality
function login(event) {
    event.preventDefault();

    const username = document.getElementById('modal-username').value.trim();
    const password = document.getElementById('modal-password').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!username || !password) {
        alert('Please enter both username and password!');
        return;
    }

    if (users[username] && users[username].password === password) {
        alert('Login successful!');
        localStorage.setItem('loggedInUser', username);
        // Redirect only after successful login
        window.location.href = 'index.html';
    } else {
        alert('Invalid username or password!');
    }
}


// Register Functionality
function register(event) {
    event.preventDefault(); // Prevent default action (e.g., form submission)

    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!username || !password) {
        alert('Please fill out all fields!');
        return;
    }

    if (users[username]) {
        alert('Username already exists! Please choose another one.');
    } else {
        users[username] = { password };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        document.getElementById('register-modal').style.display = 'none';
    }
}

// Event Listeners
document.getElementById('modal-login-btn').addEventListener('click', login);
document.getElementById('modal-register-btn').addEventListener('click', register);

// Modal Close Buttons
document.getElementById('close-modal-btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('login-modal').style.display = 'none';
});

document.getElementById('close-register-modal-btn').addEventListener('click', (event) => {
    event.preventDefault();
    document.getElementById('register-modal').style.display = 'none';
});