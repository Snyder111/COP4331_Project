// Javascript file to handle user placing bets. Called by both free and premium dashboards.

console.log("bets.js is loaded.");

document.getElementById('betForm').addEventListener('submit', function(event) {
  event.preventDefault(); // Prevent form submission

  // Get input values
  var userId = document.getElementById('userId').value.trim();
  var betAmount = parseInt(document.getElementById('betAmount').value);
  var racecar = parseInt(document.getElementById('racecar').value);

  // Check if any fields are empty or invalid
  if (userId === '' || isNaN(betAmount) || betAmount <= 0 || isNaN(racecar) || racecar < 1 || racecar > 10) {
    showMessage("Please fill in all fields and enter valid bet details.");
    return;
  }

  // Disable form submission button to prevent multiple bets
  document.getElementById('submitBtn').disabled = true;

  // Send AJAX request to server
  var xhr = new XMLHttpRequest();
  xhr.open('POST', 'bets.php');
  xhr.setRequestHeader('Content-Type', 'application/json');

  xhr.onload = function() {
    if (xhr.status === 200) {
      var response = JSON.parse(xhr.responseText);
      if (response.success) {
        showMessage("Bet placed successfully.");
      } else {
        showMessage(response.message || "Error placing bet.");
      }
    } else {
      showMessage("Error placing bet. Please try again later.");
    }
    // Re-enable form submission button after handling response
    document.getElementById('submitBtn').disabled = false;
  };    
  xhr.send(JSON.stringify({userId: userId, betAmount: betAmount, racecar: racecar }));
});    

// Message display
function showMessage(message) {
  document.getElementById('message').textContent = message;
}
