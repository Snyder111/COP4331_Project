// Function to fetch chip balance
function getChipBalance() {
    fetch('/getChipBalance', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ username: 'test' }) // Replace 'test' with the actual username
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to fetch chip balance');
        }
        return response.json();
    })
    .then(data => {
        const chipBalance = data.chipBalance;
        document.getElementById('chipBalance').textContent = chipBalance;
    })
    .catch(error => {
        console.error('Error fetching chip balance:', error);
        document.getElementById('chipBalance').textContent = 'Error'; // Display error message if fetching fails
    });
}

// Function to purchase chips
function purchaseChips() {
    const amount = parseInt(document.getElementById('amount').value);
    if (isNaN(amount) || amount <= 0) {
        document.getElementById('message').textContent = 'Please enter a valid amount.';
        return;
    }

    fetch('/purchaseChips', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ amount: amount })
    })
    .then(response => response.json())
    .then(data => {
        document.getElementById('message').textContent = data.message;
        getChipBalance(); // Update chip balance after successful purchase
    })
    .catch(error => {
        console.error('Error purchasing chips:', error);
        document.getElementById('message').textContent = 'An error occurred. Please try again later.';
    });
}

// Call getChipBalance function when the page loads to fetch initial chip balance
window.addEventListener('load', function() {
    getChipBalance();
});