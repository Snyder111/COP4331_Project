function doLogin(event) {
    // Prevent the default form submission behavior
    event.preventDefault();
    // Extract the form data
    var userId = document.getElementById('user_id').value;
    var password = document.getElementById('password').value;
    // Validate form data 
    if (userId === '' || password === '') {
        document.getElementById('message').innerHTML = '<p>User ID and Password are required.</p>';
        return;
    }
    // Simulate credential validation for demonstration purposes
    // A real application should send an AJAX request to a server-side script to validate the credentials
    console.log("Attempting to log in with User ID:", userId);
    // Example of an AJAX request to validate credentials (Replace URL and uncomment to use)
    
    $.ajax({
        url: 'your-server-endpoint/login', // This should be the URL to which you send the login request.
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify({ userId, password }),
        success: function(response) {
            // Handle success, e.g., redirecting to another page or displaying a welcome message
            console.log('Login Successful', response);
            window.location.href = 'welcome.html'; // Redirect on successful login
        },
        error: function(error) {
            // Handle error, e.g., displaying an error message
            console.log('Login Failed', error);
            document.getElementById('message').innerHTML = '<p>Login failed. Please try again.</p>';
        }
    });
    
    // Placeholder for login success message
    document.getElementById('message').innerHTML = '<p>Login simulated successfully (replace with real login logic).</p>';
  }
  // Attach the login function to the button's click event
  document.getElementById('loginButton').addEventListener('click', doLogin);