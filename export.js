// Function to export transactions as CSV
function exportToCSV() {
    const csvRows = [
        ['Transaction Name', 'Amount', 'Category', 'Date'], // Headers
        ...transactions.map(transaction => [
            transaction.text,
            transaction.amount,
            transaction.category,
            new Date(transaction.id).toLocaleDateString()
        ])
    ];

    const csvContent = csvRows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'transaction_history.csv';
    link.click();
}

document.getElementById('export-csv-btn').addEventListener('click', exportToCSV);

// Export as PDF function
document.getElementById('export-pdf-btn').addEventListener('click', () => {
    const { jsPDF } = window.jspdf; // Access jsPDF
    const doc = new jsPDF(); // Create a new jsPDF instance

    let y = 10; // Vertical spacing for content

    // Title for the PDF
    doc.setFontSize(18);
    doc.text('Transaction History', 10, y);
    y += 10; // Add spacing below the title

    // Include the graph from the canvas element
    const chartCanvas = document.getElementById('expenseChart'); // Assuming 'expenseChart' is the canvas ID
    const chartImage = chartCanvas.toDataURL('image/png', 1.0); // Convert chart to base64 image
    // Get canvas dimensions to maintain aspect ratio
    const canvasWidth = chartCanvas.width;
    const canvasHeight = chartCanvas.height;
    // Define PDF width for the graph
    const pdfWidth = 90; // Set a maximum width for the graph in the PDF
    const pdfHeight = (canvasHeight / canvasWidth) * pdfWidth; // Calculate height to maintain aspect ratio

    // Add graph to PDF
    doc.addImage(chartImage, 'PNG', 10, y, pdfWidth, pdfHeight);
    y += pdfHeight + 10; // Adjust Y position below the graph

    // Check if there are transactions
    if (transactions.length === 0) {
        doc.setFontSize(12);
        doc.text('No transactions found.', 10, y);
    } else {
        // Add table header
        doc.setFontSize(12);
        doc.text('Name', 10, y);
        doc.text('Amount', 60, y);
        doc.text('Category', 110, y);
        y += 10; // Spacing below the header

        // Add transaction data
        transactions.forEach(transaction => {
            const sign = transaction.amount < 0 ? '-' : '+';
            const transactionText = `${sign}₹${Math.abs(transaction.amount)}`;
            doc.text(transaction.text, 10, y);
            doc.text(transactionText, 60, y);
            doc.text(transaction.category, 110, y);
            y += 10; // Add spacing for the next row

            // Add a new page if content exceeds the page height
            if (y > 280) {
                doc.addPage();
                y = 10; // Reset vertical spacing for the new page
            }
        });
    }




    // Save the PDF
    doc.save('Transaction_History.pdf');
});
