document.getElementById('filter-btn').addEventListener('click', () => {
    const filterSection = document.getElementById('filter-section');
    filterSection.classList.toggle('hidden');

    if (!historySection.classList.contains('hidden')) {
        historySection.classList.add('hidden');
        historyBtn.innerText = 'View History';
    }
});

document.getElementById('apply-filter-btn').addEventListener('click', () => {
    const category = document.getElementById('filter-category').value;
    const minAmount = parseFloat(document.getElementById('min-amount').value) || -Infinity;
    const maxAmount = parseFloat(document.getElementById('max-amount').value) || Infinity;

    const filteredTransactions = transactions.filter(transaction => {
        return (category === 'all' || transaction.category === category) &&
               transaction.amount >= minAmount && transaction.amount <= maxAmount;
    });

    updateFilteredHistoryList(filteredTransactions);
});

function updateFilteredHistoryList(filteredTransactions) {
    const historyList = document.getElementById('history-list');
    historyList.innerHTML = '';

    if (filteredTransactions.length === 0) {
        historyList.innerHTML = '<li>No matching transactions found.</li>';
    } else {
        filteredTransactions.forEach(transaction => {
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
