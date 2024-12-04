<?php
// Enable error reporting for debugging
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

// Database connection settings
$servername = "localhost";
$username = "subhan";
$password = "weather1234"; // Replace with your MySQL password
$dbname = "weather_app";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$city_name = $_GET['city_name'] ?? ''; // Fetch the city name from GET parameters

// Prepare the SQL query
$sql = "SELECT * FROM weather_data WHERE city_name = ?";
$stmt = $conn->prepare($sql);
$stmt->bind_param("s", $city_name);
$stmt->execute();
$result = $stmt->get_result();

// Check if any results are returned
if ($result->num_rows > 0) {
    $weather_data = $result->fetch_assoc();
    echo json_encode($weather_data);
} else {
    echo json_encode(['error' => 'No data found']);
}

// Close the statement and connection
$stmt->close();
$conn->close();
?>

