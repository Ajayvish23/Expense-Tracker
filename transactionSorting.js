

// Function to sort transactions by date (ascending or descending)
export function sortTransactionsByDate(transactions, order = 'asc') {
    return transactions.sort((a, b) => {
        const dateA = new Date(a.date); // Assuming transaction has a 'date' property
        const dateB = new Date(b.date);
        return order === 'asc' ? dateA - dateB : dateB - dateA;
    });
}

// Function to sort transactions by amount (highest or lowest)
export function sortTransactionsByAmount(transactions, order = 'desc') {
    return transactions.sort((a, b) => {
        return order === 'asc' ? a.amount - b.amount : b.amount - a.amount;
    });
}

// Function to sort transactions by category (alphabetical order)
export function sortTransactionsByCategory(transactions) {
    return transactions.sort((a, b) => {
        return a.category.localeCompare(b.category);
    });
}


const sortingOptions = document.getElementById('sorting-options');

sortingOptions.addEventListener('change', () => {
    const selectedOption = sortingOptions.value;

    // Determine the sort type and apply it
    if (selectedOption === 'date-asc') {
        transactions = sortTransactionsByDate(transactions, 'asc');
    } else if (selectedOption === 'date-desc') {
        transactions = sortTransactionsByDate(transactions, 'desc');
    } else if (selectedOption === 'amount-asc') {
        transactions = sortTransactionsByAmount(transactions, 'asc');
    } else if (selectedOption === 'amount-desc') {
        transactions = sortTransactionsByAmount(transactions, 'desc');
    } else if (selectedOption === 'category') {
        transactions = sortTransactionsByCategory(transactions);
    }

    // Update the UI after sorting
    updateHistoryList();
});
