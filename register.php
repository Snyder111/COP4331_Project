<?php
ini_set('display_errors', 1);
error_reporting(E_ALL);
$host = 'sql5.freesqldatabase.com'; 
$dbname = 'sql5700190'; 
$user = 'sql5700190';
$pass = 'KLk8Zr8C7N';
try {
    $db = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8mb4", $user, $pass);
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    if ($_SERVER['REQUEST_METHOD'] === 'POST') {
        // Check if the username already exists
        $stmt = $db->prepare("SELECT `Username` FROM `Users` WHERE `Username` = ?");
        $stmt->execute([$_POST['Username']]);
        if ($stmt->fetch()) {
            echo "Error: Username already exists. Please choose a different one.";
            exit;
        }
        $Username = filter_input(INPUT_POST, 'Username', FILTER_SANITIZE_STRING);
        $Password = filter_input(INPUT_POST, 'Password', FILTER_SANITIZE_STRING);
        $hashedPassword = password_hash($Password, PASSWORD_DEFAULT);
        // Remove explicit `UserID` specification and let the database handle it if it's set to auto-increment.
        $sql = "INSERT INTO `Users`(`Username`, `Password`, `PremiumToken`, `Chips`) VALUES (?, ?, ?, ?)";
        $stmt = $db->prepare($sql);
        if ($stmt->execute([$Username, $hashedPassword, NULL, 1000])) {
            echo "Registration successful!";
        } else {
            echo "Error: Registration failed. Please try again.";
        }
    }
} catch (PDOException $e) {
    die("Connection failed: " . $e->getMessage());
}
?>