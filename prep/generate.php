<?php
header("Content-Type: application/json");

// --- SECURE CONFIGURATION ---
$api_key = "YOUR_OPENAI_API_KEY"; 
$api_url = "https://openai.com";

// Grab the raw JSON input coming from the frontend form
$input_data = json_decode(file_get_contents("php://input"), true);
$text_material = isset($input_data['material']) ? trim($input_data['material']) : '';

if (empty($text_material)) {
    echo json_encode(["error" => "No source text material provided."]);
    exit;
}

// Build the exact structured configuration prompt payload for the engine
$payload = [
    "model" => "gpt-4o-mini",
    "messages" => [
        [
            "role" => "system",
            "content" => "You are an elite, strict college university professor. Analyze the provided study materials thoroughly. Generate a mock exam consisting of 5 highly challenging multiple-choice questions and 2 short-answer questions. Every question must be directly grounded in the text provided. Do not use external assumptions or outside facts. Provide an answer key at the very bottom."
        ],
        [
            "role" => "user",
            "content" => "Here is the course material to build the exam from:\n\n" . $text_material
        ]
    ],
    "temperature" => 0.3
];

// Execute the secure server-to-server HTTP request via cURL
$ch = curl_init($api_url);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
curl_setopt($ch, CURLOPT_POST, true);
curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($payload));
curl_setopt($ch, CURLOPT_HTTPHEADER, [
    "Content-Type: application/json",
    "Authorization: Bearer " . $api_key
]);

$response = curl_exec($ch);
$http_status = curl_getinfo($ch, CURLINFO_HTTP_CODE);
curl_close($ch);

if ($http_status !== 200) {
    echo json_encode(["error" => "Computational API gateway communication failure. Status: " . $http_status]);
} else {
    // Pass the clean response back to your customer frontend interface
    echo $response;
}
?>
