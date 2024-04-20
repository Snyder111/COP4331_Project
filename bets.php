<?php
// .php file that manages placing bets

// Retrieve input
$data = json_decode(file_get_contents("php://input"));

// Assign input
$userId = intval($data->userId);
$betAmount = intval($data->betAmount);
$racecar = intval($data->racecar);

// Validate input
if($userId <= 0 || $betAmount <= 0 || ($racecar < 1 || $racecar > 10)) {
  echo json_encode(array("success" => false, "message" => "Input invalid. Please try again."));
  exit;
}

// Query to check that user exists
$userQuery = "SELECT * FROM Users WHERE Username = $userId";
$userResult = mysqli_query($connection, $userQuery);

if(!$userResult || mysqli_num_rows($userResult) == 0) {
  // User does not exist
  echo json_encode(array("success" => false, "message" => "Invalid username. Please try again."));
  exit;
}

// Query to check that user has enough chips to place bet
$chipsQuery = "SELECT Chips FROM Users WHERE Username = $userID";
$chipsResult = mysqli_query($connection, $chipsQuery);

if($chipsResult) {
  $row = mysqli_fetch_assoc($result);
  $currentChips = $row['Chips'];

  if($currentChips >= $betAmount) {
    // Take from user's chips
    $newChips = $currentChips - $betAmount;
    $updateQuery = "UPDATE users SET chips = $newChips WHERE Username = $userId";
    $updateResult = mysqli_query($connection, $updateQuery);

    if($updateResult) {
      // Bet placed succesfully
      echo json_encode(array("success" => true);
    } else {
      // Error updating user's chips
      echo json_encode(array("success" => false, "message" "Error updating chips."));
    }
  } else {
      // User has insufficient chips
      echo json_encode(array("success" => false, "message" => "Insufficient chips."));
  }
} else {
  // Error querying database
  echo json_encode(array("success" => false, "message" => "Error querying database.");
}
?>
