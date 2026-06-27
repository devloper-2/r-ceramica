<?php
if (!defined('ABSPATH')) {
    exit;
}

/*
|--------------------------------------------------------------------------
| Start Session
|--------------------------------------------------------------------------
*/

add_action('init', function () {
    if (!session_id()) {
        session_start();
    }
});

/*
|--------------------------------------------------------------------------
| Send OTP
|--------------------------------------------------------------------------
*/

add_action('wp_ajax_nopriv_send_login_otp', 'send_login_otp');
add_action('wp_ajax_send_login_otp', 'send_login_otp');

function send_login_otp()
{
    $mobile = preg_replace('/\D/', '', $_POST['mobile']);

    if (strlen($mobile) != 10) {
        wp_send_json_error('Invalid mobile number.');
    }

    $otp = rand(100000, 999999);

    $_SESSION['login_otp']    = $otp;
    $_SESSION['login_mobile'] = $mobile;

    $payload = [
        "messaging_product" => "whatsapp",
        "to" => "91" . $mobile,
        "type" => "template",
        "template" => [
            "name" => WA_TEMPLATE_NAME,
            "language" => [
                "code" => "en"
            ],
            "components" => [
                [
                    "type" => "body",
                    "parameters" => [
                        [
                            "type" => "text",
                            "text" => (string) $otp
                        ]
                    ]
                ]
            ]
        ]
    ];

    $response = wp_remote_post(
        'https://graph.facebook.com/v23.0/' . WA_PHONE_NUMBER_ID . '/messages',
        [
            'headers' => [
                'Authorization' => 'Bearer ' . WA_ACCESS_TOKEN,
                'Content-Type'  => 'application/json'
            ],
            'body' => wp_json_encode($payload),
            'timeout' => 30
        ]
    );

    if (is_wp_error($response)) {
        wp_send_json_error($response->get_error_message());
    }

    $body = json_decode(wp_remote_retrieve_body($response), true);

    if (isset($body['error'])) {
        wp_send_json_error($body['error']['message']);
    }

    wp_send_json_success('OTP Sent Successfully');
}

/*
|--------------------------------------------------------------------------
| Verify OTP
|--------------------------------------------------------------------------
*/

add_action('wp_ajax_nopriv_verify_login_otp', 'verify_login_otp');
add_action('wp_ajax_verify_login_otp', 'verify_login_otp');

function verify_login_otp()
{
    $otp = sanitize_text_field($_POST['otp']);

    if (
        empty($_SESSION['login_otp']) ||
        $otp != $_SESSION['login_otp']
    ) {
        wp_send_json_error('Invalid OTP');
    }

    $mobile = $_SESSION['login_mobile'];

    $users = get_users([
        'meta_key'   => 'mobile_number',
        'meta_value' => $mobile,
        'number'     => 1
    ]);

    if (empty($users)) {
        wp_send_json_error('User not found');
    }

    $user = $users[0];

    wp_set_current_user($user->ID);
    wp_set_auth_cookie($user->ID, true);

    unset($_SESSION['login_otp']);
    unset($_SESSION['login_mobile']);

    wp_send_json_success([
        'redirect' => home_url('/catalogue/')
    ]);
}