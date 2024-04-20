<?php
session_start(); // Start or resume a session
// Database connection parameters
$host = 'sql5.freesqldatabase.com';  // Your actual host
$dbname = 'sql5700190';  // Your actual database name
$user = 'sql5700190';  // Your actual database user
$pass = 'KLk8Zr8C7N';  // Your actual password
try {
    // Attempt a PDO connection to your database
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    // Set the PDO error mode to exception to catch potential errors
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Securely fetch the data from the POST array
        $userId = filter_input(INPUT_POST, 'user_id', FILTER_SANITIZE_STRING);
        $password = filter_input(INPUT_POST, 'password', FILTER_SANITIZE_STRING);

        // SQL query to fetch the user
        $sql = "SELECT * FROM Users WHERE Username = :userId";

        // Prepare the statement
        $stmt = $pdo->prepare($sql);

        // Bind parameters to statement variables
        $stmt->bindParam(':userId', $userId);

        // Execute the statement
        $stmt->execute();

        if ($stmt->rowCount() > 0) {
            $user = $stmt->fetch(PDO::FETCH_ASSOC);
            // Verify the password with the hashed password in the database
            if (password_verify($password, $user['password'])) {
                // Password is correct, so start a new session
                // Store data in session variables
                $_SESSION["loggedin"] = true;
                $_SESSION["id"] = $user['id']; // Assuming your user table has an 'id'
                $_SESSION["user_id"] = $userId; // Store the user_id

                // Redirect user to welcome page or your desired page
                echo "Login successful!";
                // header("location: welcome.php");
            } else {
                // Password is not valid
                echo "Invalid password.";
            }
        } else {
            // UserId doesn't exist
            echo "No account found with that Username.";
        }
    }
} catch (PDOException $e) {
    die("Error connecting to database: " . $e->getMessage());
}
?>

