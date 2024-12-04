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

// Check if POST data is set and not empty
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_POST['city_name']) && isset($_POST['temperature']) && isset($_POST['description']) && isset($_POST['feels_like']) && isset($_POST['humidity']) && isset($_POST['wind_speed']) && isset($_POST['icon'])) {
        $city_name = $_POST['city_name'];
        $temperature = $_POST['temperature'];
        $description = $_POST['description'];
        $feels_like = $_POST['feels_like'];
        $humidity = $_POST['humidity'];
        $wind_speed = $_POST['wind_speed'];
        $icon = $_POST['icon'];

        // Prepare and bind
        $stmt = $conn->prepare("INSERT INTO weather_data (city_name, temperature, description, feels_like, humidity, wind_speed, icon) VALUES ('New York', 25.3, 'clear sky', 24.5, 60, 5.5, '01d')");
        $stmt->bind_param("sdsdids", $city_name, $temperature, $description, $feels_like, $humidity, $wind_speed, $icon);

        // Execute the statement
        if ($stmt->execute()) {
            echo "New record created successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        // Close the statement and connection
        $stmt->close();
    } else {
        echo "Error: Missing POST data";
    }
} else {
    echo "Error: Invalid request method";
}

$conn->close();
?>


