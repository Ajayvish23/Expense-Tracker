// charts.js
// Chart instance
let chart; 

// Function to Update Chart Based on Selected Type
function updateChart() {
    const categories = [...new Set(transactions.map(t => t.category))];
    const categoryData = categories.map(cat => {
        return transactions.filter(t => t.category === cat).reduce((acc, curr) => acc + curr.amount, 0);
    });

    // Destroy previous chart instance if it exists
    if (chart) chart.destroy();

    // Get selected chart type
    const chartType = document.getElementById('chart-type').value;

    // Create new chart instance
    chart = new Chart(expenseChartCtx, {
        type: chartType,
        data: {
            labels: categories,
            datasets: [{
                label: 'Expense Breakdown',
                data: categoryData,
                backgroundColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
                borderColor: ['#007bff', '#28a745', '#ffc107', '#dc3545'],
                borderWidth: 1,
            }],
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            scales: chartType !== 'pie' ? {
                x: { beginAtZero: true },
                y: { beginAtZero: true }
            } : {},
        }
    });
}

// Event Listener for Chart Type Selection
document.getElementById('chart-type').addEventListener('change', updateChart);

// Load Transactions and Initialize Chart on Page Load
document.addEventListener('DOMContentLoaded', () => {
    loadTransactions(); // Load transactions from LocalStorage
    updateChart();      // Initialize chart
});
