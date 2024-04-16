function doSignUp() {
    // Prevent form from submitting
    event.preventDefault();
    // Extract the form data
    var userId = document.getElementById('user_id').value;
    var password = document.getElementById('password').value;
    var name = document.getElementById('name').value;
    var lastName = document.getElementById('lastname').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;
  
    // Validate form data here (if needed beyond HTML5)
  
    // Simulate form data submission (e.g., via AJAX)
    const formData = {
            userId,
            password,
            name,
            lastName,
            email,
            phone
        };
        // AJAX Request to Server
        $.ajax({
            url: 'your-server-endpoint', // Replace 'your-server-endpoint' with your actual server end point
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(formData),
            success: function(response) {
                // Success handler
                console.log('Registration Successful', response);
                document.getElementById('message').innerHTML = '<p>Registration successful!</p>';
            },
            error: function(error) {
                // Error handler
                console.log('Registration Failed', error);
                document.getElementById('message').innerHTML = '<p>Registration failed. Please try again.</p>';
            }
        });
    }
  }
  // Attach the function to the submit button (optional if button onclick is already set in HTML)
  document.getElementById('createAccount').addEventListener('click', doSignUp);