document.addEventListener('DOMContentLoaded', () => {
    console.log('DOM fully loaded and parsed.');

    // Get the login form
    const form = document.getElementById('login-form');
    if (!form) {
        console.error('Login form not found!');
        return;
    }
    console.log('Login form found:', form);

    // Attach the submit event listener
    form.addEventListener('submit', async (event) => {
        event.preventDefault();
        console.log('Form submitted!');

        // Get email and password inputs
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        console.log(`Email: ${email}, Password: [hidden]`);

        try {
            // Send the login request to the API
            const response = await fetch('https://api.cpnacademy.co.uk/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            console.log('Fetch response:', response);

            if (response.ok) {
                // Parse the result
                const result = await response.json();
                console.log('Fetch result:', result);

                // Ensure `token` exists in the response
                const sessionToken = result.token;
                if (sessionToken) {
                    console.log('Session Token:', sessionToken);
                    // Store the session token in localStorage
                    localStorage.setItem('session_token', sessionToken);

                    // Decode the token to extract the email
                    const userEmail = parseJwt(sessionToken).email;
                    console.log('Decoded Email:', userEmail);

                    if (userEmail) {
                        alert(`Welcome, ${userEmail}! Redirecting to your dashboard.`);
                        window.location.href = '/browse/dashboard.html';
                    } else {
                        console.error('Email not found in token payload.');
                        alert('Failed to decode user information. Please try again.');
                    }
                } else {
                    console.error('Session token not returned from API.');
                    alert('Failed to log in. No session token provided.');
                }
            } else {
                const result = await response.json();
                console.error('Error response:', result);
                alert('Error: ' + result.message);
            }
        } catch (error) {
            console.error('Failed to sign in:', error);
            alert('Failed to sign in. Please try again.');
        }
    });

    // Check localStorage on page load
    const sessionToken = localStorage.getItem('session_token');
    if (sessionToken) {
        console.log('Session Token from localStorage:', sessionToken);

        // Decode the token to check if it's valid
        const userEmail = parseJwt(sessionToken).email;
        if (userEmail) {
            console.log('User email from token:', userEmail);
        } else {
            console.error('Invalid token structure.');
        }
    } else {
        console.log('No session token found in localStorage.');
    }
});

// Utility function to decode JWT
function parseJwt(token) {
    try {
        const base64Payload = token.split('.')[1]; // Extract the payload
        const payload = atob(base64Payload); // Decode Base64
        return JSON.parse(payload); // Parse as JSON
    } catch (error) {
        console.error('Error decoding JWT:', error);
        return {};
    }
}
