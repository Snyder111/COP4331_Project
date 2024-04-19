function doSignUp() {
    document.addEventListener("DOMContentLoaded", function() {
        document.getElementById('registrationForm').addEventListener('submit', function(event){
            doSignUp(event);
        });
      });
      function doSignUp(event) {
        event.preventDefault(); // Prevent the default form submission behavior
        // Collect input values
        const Username = document.getElementById('Username').value;
        const Password = document.getElementById('Password').value;
        // Basic validation example
        if (!Username || !Password) {
            document.getElementById('message').innerHTML = '<p>All fields are required.</p>';
            return;
        }
        document.getElementById('message').innerHTML = '<p>Registering... Please wait.</p>';
        // Perform AJAX request to server for signup
        $.ajax({
            url: 'register.php', // This URL should be the endpoint where your PHP logic for registration is hosted
            type: 'POST',
            data: {
                Username: Username,
                Password: Password
            },
            success: function(response) {
                console.log('Registration Successful', response);
                document.getElementById('message').innerHTML = '<p>Registration successful. Please <a href="login.html">login</a>.</p>';
            },
            error: function(xhr, status, error) {
                console.error('Registration Failed', xhr.responseText);
                document.getElementById('message').innerHTML = `<p>Registration failed. Please try again. Error: ${xhr.responseText}</p>`;
            }
        });
      }
      