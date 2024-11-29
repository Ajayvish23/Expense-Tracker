
const balance = document.getElementById('balance');
const income = document.getElementById('income');
const expense = document.getElementById('expense');
const list = document.getElementById('list');
const form = document.getElementById('form');
const text = document.getElementById('text');
const amount = document.getElementById('amount');
const category = document.getElementById('category');
const darkModeToggle = document.getElementById('dark-mode-icon');
const logoutIcon = document.getElementById('logout_icon');
const dropdownMenu = document.getElementById('dropdown-menu');
const expenseChartCtx = document.getElementById('expenseChart').getContext('2d');
// Handle Profile Details Modal Display
const profileDetailsBtn = document.getElementById('profile-details');
const profileModal = document.getElementById('profile-modal');
const closeProfileModalBtn = document.getElementById('close-profile-modal-btn');
const usernameDisplay = document.getElementById('username-display');

// Handle History Section Toggle
const historyBtn = document.getElementById('history-btn');
const historySection = document.getElementById('history-section');
const historyList = document.getElementById('history-list');

let transactions = [];
let darkMode = false;


historyBtn.addEventListener('click', () => {
    // Toggle visibility of the history section
    historySection.classList.toggle('hidden');

    // Clear the existing history list
    historyList.innerHTML = '';

    // Populate history list
    if (transactions.length === 0) {
        historyList.innerHTML = '<li>No transactions found.</li>';
    } else {
        transactions.forEach(transaction => {
            const sign = transaction.amount < 0 ? '-' : '+';
            const listItem = document.createElement('li');
            listItem.innerHTML = `${transaction.text} - ${sign}₹${Math.abs(transaction.amount)} (${transaction.category})`;
            historyList.appendChild(listItem);
        });
    }

    // Update button text based on visibility
    historyBtn.innerText = historySection.classList.contains('hidden') ? 'View History' : 'Hide History';
});


// Show Profile Details Modal
profileDetailsBtn.addEventListener('click', (e) => {
    e.preventDefault();
    const username = localStorage.getItem('loggedInUser');
    if (username) {
        usernameDisplay.innerText = `Username: ${username}`;
        const userProfile = JSON.parse(localStorage.getItem(`profile_${username}`)) || {};

        document.getElementById('full-name').value = userProfile.fullName || '';
        document.getElementById('age').value = userProfile.age || '';
        document.getElementById('email').value = userProfile.email || '';
        document.getElementById('mobile').value = userProfile.mobile || '';

        profileModal.style.display = 'flex';
    }
});

// Close Profile Modal
closeProfileModalBtn.addEventListener('click', () => {
    profileModal.style.display = 'none';
});

// Save Profile Details
document.getElementById('save-profile-btn').addEventListener('click', () => {
    const username = localStorage.getItem('loggedInUser');
    const profileData = {
        fullName: document.getElementById('full-name').value.trim(),
        age: document.getElementById('age').value.trim(),
        email: document.getElementById('email').value.trim(),
        mobile: document.getElementById('mobile').value.trim(),
    };

    localStorage.setItem(`profile_${username}`, JSON.stringify(profileData));
    alert('Profile details saved successfully!');
    profileModal.style.display = 'none';
});





// Toggle Dropdown Menu
logoutIcon.addEventListener('click', () => {
    dropdownMenu.style.display = dropdownMenu.style.display === 'block' ? 'none' : 'block';
});

// Close Dropdown when clicking outside
window.addEventListener('click', (e) => {
    if (!logoutIcon.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.style.display = 'none';
    }
});

// Handle Profile Details Click
document.getElementById('profile-details').addEventListener('click', (e) => {
    e.preventDefault();

});

// Handle Logout Click
document.getElementById('logout-option').addEventListener('click', (e) => {
    e.preventDefault();
    logout(); // Assuming the logout function is defined elsewhere
});


// Toggle Dark Mode
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    darkMode = !darkMode;
    darkModeToggle.classList.toggle('fa-moon', !darkMode);
    darkModeToggle.classList.toggle('fa-sun', darkMode);
});



// Add Transaction
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const textValue = text.value.trim();
    const amountValue = amount.value.trim();

    if (textValue === '' || amountValue === '') {
        alert('Please provide transaction details');
        return;
    }

    const transaction = {
        id: Date.now(),
        text: textValue,
        amount: +amountValue,
        category: category.value,
    };


    // Add transaction to the array
    transactions.push(transaction);
    updateBalance();  // Update balance
    updateChart();    // Update chart
    updateHistoryList(); // Update the new history section
    saveTransactions(); // Save to Local Storage


    // Clear form inputs
    text.value = '';
    amount.value = '';
});

//save transaction to local storage
function saveTransactions() {
    localStorage.setItem('transactions', JSON.stringify(transactions));
}

//load transaction from local storage
function loadTransactions() {
    const savedTransactions = localStorage.getItem('transactions');
    if (savedTransactions) {
        transactions = JSON.parse(savedTransactions); // Parse saved transactions
        updateBalance(); // Update the balance
        updateChart();   // Update the chart
        updateHistoryList(); // Update the history
    }
}


// Function to Update History List
// Function to Update History List (now using LocalStorage)
function updateHistoryList() {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (transactions.length === 0) {
        historyList.innerHTML = '<li>No transactions found.</li>';
    } else {
        transactions.forEach(transaction => {
            const sign = transaction.amount < 0 ? '-' : '+';
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                <div class="transaction-item">
                    <span>${transaction.text} - ${sign}₹${Math.abs(transaction.amount)} (${transaction.category})</span>
                    <button class="delete-btn" onclick="deleteTransaction(${transaction.id})">Delete</button>
                </div>
            `;

            historyList.appendChild(listItem);
        });
    }
}

// Function to Update Balance, Income, and Expense
function updateBalance() {
    const amounts = transactions.map(transaction => transaction.amount);

    const totalBalance = amounts.reduce((acc, amount) => acc + amount, 0).toFixed(2);
    const totalIncome = amounts
        .filter(amount => amount > 0)
        .reduce((acc, amount) => acc + amount, 0)
        .toFixed(2);
    const totalExpense = (
        amounts
            .filter(amount => amount < 0)
            .reduce((acc, amount) => acc + amount, 0) * -1
    ).toFixed(2);

    balance.innerText = `₹${totalBalance}`;
    income.innerText = `+₹${totalIncome}`;
    expense.innerText = `-₹${totalExpense}`;
}



// Initialize Chart
let chart;
function updateChart() {
    const categories = [...new Set(transactions.map(t => t.category))];
    const categoryData = categories.map(cat => {
        return transactions.filter(t => t.category === cat).reduce((acc, curr) => acc + curr.amount, 0);
    });

    // Destroy previous chart instance if it exists
    if (chart) chart.destroy();

    // Adjust chart size dynamically
    const chartContainer = document.querySelector('.left-section');
    const chartElement = document.getElementById('expenseChart');
    chartElement.height = chartContainer.offsetHeight;

    //Create new chart instance
    chart = new Chart(expenseChartCtx, {
        type: 'pie',
        data: {
            labels: categories,
            datasets: [{
                data: categoryData,
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
            }],
        },
         options: {
             responsive: true,
             maintainAspectRatio: false, // Allow chart to resize dynamically
         }
    });
}



// Check if user is logged in on page load
document.addEventListener('DOMContentLoaded', () => {
    const loggedInUser = localStorage.getItem('loggedInUser');

        loadTransactions(); // Load transactions from Local Storage
        form.addEventListener('submit', (e) => {
        e.preventDefault();
        const textValue = text.value.trim();
        const amountValue = amount.value.trim();


        const transaction = {
            id: Date.now(),
            text: textValue,
            amount: +amountValue,
            category: category.value,
        };



    });

    if (loggedInUser) {
        // Show full access dashboard with logout button
        document.getElementById('welcome-msg').innerText = `Welcome, ${loggedInUser}!`;
        document.getElementById('login-btn').style.display = 'none';
        document.getElementById('logout-btn').style.display = 'block';
        document.querySelectorAll('.restricted').forEach(el => el.style.display = 'block');
    } else {
        // Limited access dashboard with login button
        document.getElementById('welcome-msg').innerText = 'Welcome to Expense Tracker!';
        document.getElementById('login-btn').style.display = 'block';
        document.getElementById('logout-btn').style.display = 'none';
        document.querySelectorAll('.restricted').forEach(el => el.style.display = 'none');
    }
});

// Logout Function
function logout() {
    localStorage.removeItem('loggedInUser');
    alert('You have been logged out.');
    window.location.href = 'login2.html'; // Redirect to the login page
}

// Delete button
function deleteTransaction(id) {
    // Filter out the transaction to be deleted
    transactions = transactions.filter(transaction => transaction.id !== id);

    // Update LocalStorage with the remaining transactions
    localStorage.setItem('transactions', JSON.stringify(transactions));

                     // Save updated transactions to Local Storage
    updateBalance(); // Update balance
    updateChart(); // Update the chart
    updateHistoryList(); // Refresh the history list
}