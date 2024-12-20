document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded.');

    // Define and load transactions from local storage
    const transactions = JSON.parse(localStorage.getItem('transactions')) || [];
    console.log('Loaded transactions:', transactions);

    // Function to calculate total spent per category
    function calculateCategoryTotals() {
        const totals = {};
        transactions.forEach(transaction => {
            if (!totals[transaction.category]) {
                totals[transaction.category] = 0;
            }
            totals[transaction.category] += Math.abs(transaction.amount);
        });
        console.log('Category totals:', totals);
        return totals;
    }
    // Dynamic suggestions
    // Function to generate suggestions based on data
    function generateSuggestions() {
        const suggestions = [];
        const totals = calculateCategoryTotals();
        const totalExpense = transactions.reduce((sum, txn) => sum + (txn.amount < 0 ? txn.amount : 0), 0);

        // High spending category suggestion
        const highSpendingCategory = Object.keys(totals).reduce((a, b) => totals[a] > totals[b] ? a : b, '');
        if (highSpendingCategory) {
            suggestions.push(`You spend the most on ${highSpendingCategory}. Consider setting limits.`);
        }

        // Budget advice
        if (totalExpense < -5000) {
            suggestions.push("Your total monthly expenses exceed ₹5000. Review non-essential expenses.");
        }

        return suggestions;
    }

    // Get references to DOM elements
    const suggestionList = document.getElementById('suggestion-list');
    const advancedSuggestions = generateSuggestions();

    // Populate suggestions in the list
    advancedSuggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        suggestionList.appendChild(listItem);
    });


// Static suggestions to display at the bottom
    const staticSuggestions = [
        "Consider setting a budget limit for each category.",
        "Track recurring expenses closely and minimize unnecessary subscriptions.",
        "Automate savings by setting up a fixed percentage transfer to savings.",
        "Review your spending patterns every month.",
        "Use cashback and rewards on essential expenses."
    ];

    // Add a separator line (optional)
    const separator = document.createElement('hr');
    suggestionList.appendChild(separator);

    // Display static suggestions
    staticSuggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion;
        suggestionList.appendChild(listItem);
    });


    // Generate chart
    const ctx = document.getElementById('spendingChart').getContext('2d');
    const totals = calculateCategoryTotals();

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: Object.keys(totals),
            datasets: [{
                label: 'Spending by Category',
                data: Object.values(totals),
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });

    console.log('AI suggestions and chart generated successfully.');


    // Add close button functionality
    const closeBtn = document.getElementById('close-btn');
    closeBtn.addEventListener('click', () => {
        window.close();  // Close the current window
    });


});



