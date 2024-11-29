
const loginBtn = document.getElementById('login-btn');
const modal = document.getElementById('login-modal');
const closeModalBtn = document.getElementById('close-modal-btn');

const registerBtn = document.getElementById('register-btn');
const registerModal = document.getElementById('register-modal');
const closeRegisterModalBtn = document.getElementById('close-register-modal-btn');


// Handle Login Modal Display
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    modal.style.display = 'flex';
});

closeModalBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

//Handle Register Modal Display
registerBtn.addEventListener('click', (e) => {
    e.preventDefault();
    registerModal.style.display = 'flex';
});

closeRegisterModalBtn.addEventListener('click', () => {
    registerModal.style.display = 'none';
});

// Login Functionality with Redirection
function login() {
    const username = document.getElementById('modal-username').value.trim();
    const password = document.getElementById('modal-password').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!username || !password) {
        alert('Please enter both username and password!');
        return;
    }

    if (users[username] && users[username].password === password) {
        localStorage.setItem('loggedInUser', username);
        alert('Login successful!');
        window.location.href = 'index.html'; // Redirect to the main dashboard
    } else {
        alert('Invalid username or password!');
    }
}

// Handle Registration
function register() {
    const username = document.getElementById('register-username').value.trim();
    const password = document.getElementById('register-password').value.trim();
    const users = JSON.parse(localStorage.getItem('users')) || {};

    if (!username || !password) {
        alert('Please enter both a username and a password!');
        return;
    }

    if (users[username]) {
        alert('Username already exists! Please choose another one.');
    } else {
        users[username] = { password, transactions: [] };
        localStorage.setItem('users', JSON.stringify(users));
        alert('Registration successful! You can now log in.');
        registerModal.style.display = 'none';
    }
}

document.getElementById('modal-register-btn').addEventListener('click', (e) => {
    e.preventDefault();
    register();
});



// Event Listener for Modal Login Button
document.getElementById('modal-login-btn').addEventListener('click', (e) => {
    e.preventDefault();
    login();
});
