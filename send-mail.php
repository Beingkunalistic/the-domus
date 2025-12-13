<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {

    $first  = $_POST['first_name'];
    $last   = $_POST['last_name'];
    $phone  = $_POST['phone'];
    $email  = $_POST['email'];
    $msg    = $_POST['message'];

    $to = "kkapoor2604@gmail.com";
    $subject = "New Contact Form Submission";

    $body = "
    Name: $first $last
    Phone: $phone
    Email: $email
    Message:
    $msg
    ";

    $headers = "From: noreply@yourdomain.com\r\n";
    $headers .= "Reply-To: $email\r\n";

    if (mail($to, $subject, $body, $headers)) {
        echo "success";
    } else {
        echo "error";
    }
}
