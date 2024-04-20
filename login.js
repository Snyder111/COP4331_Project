function doLogin(event) {
    event.preventDefault(); // Prevent the default form submission
    const userId = document.getElementById('user_id').value;
    const password = document.getElementById('password').value;
    const xhr = new XMLHttpRequest();
    xhr.open('POST', 'login.php', true);
    xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8');
    xhr.onload = function() {
        if (this.status >= 200 && this.status < 300) {
            const response = JSON.parse(this.responseText);
            console.log('Login response:', response);
            if (response.success) {
                window.location.href = 'premium_dash.html';
            } else {
                document.getElementById('message').innerHTML = `<p class="error">${response.message}</p>`;
            }
        } else {
            console.log('The request was completed, but an error occurred.');
            document.getElementById('message').innerHTML = `<p class="error">An error occurred during the login attempt. Please try again later.</p>`;
        }
    };
    xhr.onerror = function () {
        console.error('The request could not be completed.');
        document.getElementById('message').innerHTML = `<p class="error">An error occurred during the login attempt. Please check your network connection and try again.</p>`;
    };
    xhr.send(JSON.stringify({ user_id: userId, password: password }));
}
document.addEventListener('DOMContentLoaded', function () {
    // Attach the doLogin function to the login button
    document.getElementById('loginButton').addEventListener('click', doLogin);
});
