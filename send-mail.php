<?php
require 'phpmailer/src/Exception.php';
require 'phpmailer/src/PHPMailer.php';
require 'phpmailer/src/SMTP.php';

// Set your email address here
$to = "kkapoor2604@gmail.com";

// Sanitize inputs
$name    = htmlspecialchars(trim($_POST['name']));
$phone   = htmlspecialchars(trim($_POST['phone']));
$email   = filter_var(trim($_POST['email']), FILTER_SANITIZE_EMAIL);
$message = htmlspecialchars(trim($_POST['message']));

// Validate email
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    die("Invalid email format");
}

// Email subject & body
$subject = "New Contact Form Submission";
$body = "
Name: $name
Phone: $phone
Email: $email
Message:
$message
";

// Headers
$headers = "From: $name <$email>\r\n";
$headers .= "Reply-To: $email\r\n";

// Send mail
if (mail($to, $subject, $body, $headers)) {
    echo "success";
} else {
    echo "error";
}
